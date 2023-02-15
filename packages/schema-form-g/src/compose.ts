import React from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { get, isEqual, isPlainObject, intersection, last, cloneDeep, isEmpty, hasIn } from 'lodash';
import { getKey } from './utils';
import {
  compose,
  renameProp,
  withPropsOnChange,
  withStateHandlers,
  withState,
  withProps,
} from 'recompose';
import { Props, Schema, Types } from './interface';
import { _ } from 'ag-grid-community';

interface Change {
  key: string[];
  schema: Schema;
}

type mapSubSchema = (schema: Schema, changes: Change[], nextTask: () => void) => void;

export type Inner = Props & {
  setSchema: (newSchema: Schema | ((s: Schema) => Schema), fn: any) => void;
  mapSubSchema: mapSubSchema;
  schemaState: Schema;
  bakData: any;
  setBakData: any;
  nextTask: () => void;
  resetNextTask: () => void;
};

const objectToPath = (obj: object, schema): Array<string> => {
  const paths: Array<string> = [];
  const inner = (schema, parentKey = ''): void => {
    Object.keys(schema.propertyType).forEach(k => {
      const combineKey = parentKey ? parentKey + '.' + k : k;
      if (!hasIn(obj, combineKey)) return;
      const value = get(obj, combineKey);
      if (
        value &&
        isPlainObject(value) &&
        get(schema, `propertyType.${k}.type`) === 'object'
      ) {
        inner(get(schema, `propertyType.${k}`), combineKey);
      } else {
        paths.push(combineKey);
      }
    });
  };
  inner(schema);
  return paths;
};

/**
 * 查找依赖项
 */
export const findDependencies = (
  changedValueObject: object,
  { ...schema }: Schema,
  mapSubSchema: mapSubSchema,
  form: WrappedFormUtils,
): void => {
  // 改变的key
  // object.product
  const changeKeys = objectToPath(changedValueObject, schema);
  if (!changeKeys.length) return;
  const dependenciesChangeValue = {};
  function setFieldsValue(data) {
    for (const key of Reflect.ownKeys(data)) {
      Reflect.set(dependenciesChangeValue, key, data[key]);
    }
  }

  /**进入schema子树去寻找依赖项 */
  function inner(schemaKey: string[], subSchema): Array<Promise<Change>> {
    /**将所有变更推送到同一次更新流程、而不再时单独去在整个树上更新、防止出现一次更新流程中，修改了多个子树，导致前后更新不一致的问题 */
    const changedSchema = [];
    const { dependencies = [], onDependenciesChange, type, ...restSchema } = subSchema;
    if (type !== Types.object) {
      if (
        get(dependencies, 'length') &&
        get(intersection(dependencies, changeKeys), 'length') &&
        onDependenciesChange
      ) {
        const dependenciesValues = dependencies.map(deKey => {
          if (changeKeys.includes(deKey)) return get(changedValueObject, deKey);
          return form.getFieldValue(deKey);
        });
        const mergeSchema = onDependenciesChange(dependenciesValues, cloneDeep(restSchema), {
          ...form,
          setFieldsValue,
        });
        changedSchema.push(
          Promise.resolve(mergeSchema).then(newSubSchema => ({
            key: schemaKey,
            schema: { ...subSchema, ...newSubSchema },
          })),
        );
      }
    } else if (subSchema.propertyType) {
      subSchema.propertyType = { ...subSchema.propertyType };
      const entries = Object.entries(subSchema.propertyType);
      for (const [subSchemaKey, schemaValue] of entries) {
        const { dependencies = [], onDependenciesChange, type } = schemaValue as any;
        if (
          // 找到了依赖项或者是object，进入递归
          (get(dependencies, 'length') &&
            get(intersection(dependencies, changeKeys), 'length') &&
            onDependenciesChange) ||
          type === Types.object
        ) {
          const subChangedSchema = inner([...schemaKey, subSchemaKey], schemaValue);
          changedSchema.push(...subChangedSchema);
        }
      }
    }
    return changedSchema;
  }

  const allChange = inner([], schema);
  Promise.all(allChange).then(changes => {
    mapSubSchema(schema, changes, () => {
      if (!isEmpty(dependenciesChangeValue)) {
        form.setFieldsValue(dependenciesChangeValue);
      }
    });
  });
};

// 将subSchema更新到主schema，并返回
const deepMergeSchema = (schemaState: Schema, changes: Change[]): Schema => {
  const schemaTree = cloneDeep(schemaState);
  changes.reduce((schema, change) => {
    const { key, schema: subSchema } = change;
    // 依赖项带"."问题
    let target = schema.propertyType;
    for (const keyPath of key) {
      if (last(key) === keyPath) {
        Reflect.set(target, keyPath, subSchema);
      } else {
        target = get(target, `${keyPath}.propertyType`);
      }
    }
    return schema;
  }, schemaTree);
  return schemaTree;
};

// 处理ref
// onRef代理wrappedComponentRef
export const refHoc = compose(
  React.forwardRef,
  (BC: React.SFC<Props>) => ({ wrappedComponentRef, ...props }: Props, ref: any) => {
    const factory = React.createFactory(BC);
    return factory({
      ...props,
      onRef: ref || wrappedComponentRef,
    });
  },
);

export default compose(
  withStateHandlers(({ schema }: Props) => ({ schemaState: schema, nextTask: null }), {
    mapSubSchema: ({ schemaState }, { onSchemaChange }) => (
      schema: Schema,
      changes: Change[],
      nextTask: () => void,
    ) => {
      /**schema发生变化，将阻断此次依赖更新schema的操作 */
      if (!isEqual(schemaState, schema)) return { schemaState, nextTask: null };
      if (changes.length) {
        const newSchema = deepMergeSchema(schema, changes);
        if (!isEqual(schemaState, newSchema)) {
          if (onSchemaChange) {
            onSchemaChange(newSchema);
          }
          return {
            schemaState: newSchema,
            nextTask,
          };
        }
      }

      return {
        schemaState,
        nextTask,
      };
    },
    setSchema: () => (schema, fn) => {
      fn();
      return { schemaState: schema };
    },
    resetNextTask: () => () => ({ nextTask: null }),
  }),
  withPropsOnChange(['nextTask'], ({ resetNextTask, nextTask }: Inner) => {
    if (nextTask) {
      // 降低nextTask执行的优先级，使Form先更新，得到新的schema
      setTimeout(() => {
        nextTask();
        resetNextTask();
      });
    }
  }),

  withState('bakData', 'setBakData', ({ data }: Inner) => data),
  withPropsOnChange(
    (props: Inner, nextProps: Inner) => {
      const isDataChange = !isEqual(props.data, nextProps.data);
      const isSchemaChange = !isEqual(props.schema, nextProps.schema);
      if (isSchemaChange) {
        nextProps.setSchema(nextProps.schema, () => {
          if (isDataChange) nextProps.setBakData(nextProps.data);
        });
      } else if (isDataChange) {
        // 再schema没有变化
        nextProps.setBakData(nextProps.data);
      }
      return isSchemaChange;
    },
    (props: Inner) => ({ key: getKey() }),
  ),
  renameProp('schemaState', 'schema'),
  renameProp('bakData', 'data'),
);
