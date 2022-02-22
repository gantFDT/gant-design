import React from 'react';
import { Form } from 'antd';
import { EditStatus } from '@data-cell';
import { compose, withHandlers, renameProp } from 'recompose';
import _SchemaForm from './SchemaForm';
import { isEmpty, isEqual, get } from 'lodash';
import { Props, Context } from './interface';
import classnames from 'classnames';
import dependencies, { Inner, findDependencies, refHoc } from './compose';
import { getNewValue, getDateToForm, getSchemaRenderCount } from './utils';
import { getFieldProps } from './maps';
import ReactResizeDetector from 'react-resize-detector';
import { bind } from 'lodash-decorators';
export const FormContext = React.createContext({} as Context);
export * from './interface';
export * from './maps';
import * as maps from './maps';

class SchemaForm extends React.Component<Props, { schemaCount: number }> {
  static maps = maps;
  static defaultProps = {
    edit: EditStatus.EDIT,
    onSave: () => true,
    data: {},
    customFields: [],
    uiSchema: {},
    backgroundColor: 'transparent',
    frameworkComponents: {},
  };

  /**收集所有子级节点的初始数据 */
  initialValueMap = new Map();
  constructor(props) {
    super(props);
    const { schema } = props;
    this.state = {
      schemaCount: getSchemaRenderCount(schema),
    };
  }

  componentDidUpdate(pervPops: Props) {
    const {
      data,
      schema,
      form: { getFieldsValue, setFieldsValue },
    } = this.props;
    const vals = getFieldsValue();
    if (!isEqual(pervPops.data, data) && !isEqual(vals, getDateToForm(data, schema))) {
      // schema更改或者data变化，清空map
      this.initialValueMap.clear();
      const newVals: any = getNewValue(vals, data, schema);
      setFieldsValue(newVals);
    }
  }

  resetDependencies(cb: (a, b) => boolean, names?: string[]) {
    const {
      form: { getFieldsValue },
      resetDependenciesChange,
    } = this.props;
    const { initialValueMap } = this;
    const currentValues = getFieldsValue();
    /**initialValueMap中包含所有当前field的值 */
    // 需要被重置的所有字段
    const resetsValue = [...initialValueMap.entries()]
      .filter(([key, initialValue]) => {
        if (!names || names.includes(key)) {
          const currentValue = get(currentValues, key);
          return cb(initialValue, currentValue);
        }
        return false;
      })
      .reduce((result, [key, value]) => {
        const changedValue = [...key.split('.'), value].reverse().reduce((v, k) => ({ [k]: v }));
        return {
          ...result,
          ...changedValue,
        };
      }, {});
    resetDependenciesChange(resetsValue);
  }

  /**names:["user.name", "user.addr.street"] */
  resetFields = (names?: string[]) => {
    const {
      form: { resetFields, getFieldsValue },
    } = this.props;
    this.resetDependencies((init, current) => init !== current, names);
    return resetFields(names);
  };
  validateForm = (names: string[]) => {
    const {
      form: { validateFieldsAndScroll },
    } = this.props;
    return new Promise(resolve => {
      validateFieldsAndScroll(names, (errors, values) => resolve({ errors, values }));
    });
  };
  getFieldsValue = (names?: string[]) => {
    const {
      form: { getFieldsValue },
    } = this.props;
    return getFieldsValue(names);
  };
  setFieldsValue = (data: object) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue(data);
  };
  collectInitialValue = (name, initialValue) => {
    const { schemaCount } = this.state;
    this.initialValueMap.set(name, initialValue);
    if (this.initialValueMap.size === schemaCount) {
      this.resetDependencies(init => ![null, undefined].includes(init));
    }
  };
  @bind()
  onResize(width: number, height: number) {
    const { onSizeChange } = this.props;
    onSizeChange && onSizeChange({ width, height });
  }
  getFormNode = () => {
    return this.refs.formNodeRef;
  };
  render() {
    const {
      schema,
      form,
      edit,
      allowEdit,
      uiSchema,
      titleConfig,
      onSave,
      data,
      customFields,
      backgroundColor,
      className,
      // emitDependenciesChange,
      withoutAnimation = false,
      prefixCls: customizePrefixCls = 'gant',
      size,
      hideTitle,
      formKey,
      frameworkComponents,
    } = this.props;
    if (isEmpty(schema)) {
      return null;
    }
    const prefixCls = customizePrefixCls + '-schemaform';
    const defalutProps = size ? { ...getFieldProps(), size } : { ...getFieldProps() };
    return (
      <FormContext.Provider
        value={{
          form,
          edit,
          onSave,
          data,
          customFields,
          // emitDependenciesChange,
          prefixCls,
          defalutProps,
          collectInitialValue: this.collectInitialValue.bind(this),
          hideTitle,
          frameworkComponents,
          allowEdit,
        }}
      >
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}>
          <div
            className={classnames(className)}
            style={{ backgroundColor }}
            ref="formNodeRef"
            data-refid={formKey}
          >
            <_SchemaForm
              schema={schema}
              uiSchema={uiSchema}
              titleConfig={titleConfig}
              withoutAnimation={withoutAnimation}
              frameworkComponents={frameworkComponents}
            />
          </div>
        </ReactResizeDetector>
      </FormContext.Provider>
    );
  }
}

export default compose(
  refHoc,
  dependencies,
  Form.create<Inner>({
    onValuesChange: (props, changedValue, allValues) => {
      const { schema, form, mapSubSchema } = props;
      findDependencies(changedValue, schema, mapSubSchema, form);
      // props.onChange && props.onChange(changedValue, allValues)
      // 因为有findDependencies的存在, 导致了可能会存在allValues不准确的问题
      // 在这里，异步更新值的组件不会有问题，因为其他组件的值都已经更新
      // 主要问题在于，多层依赖都是同步更新的情况，当调用栈回退到外层更新的时候，此时的allValues中，内层依赖项的值仍然是更新之前的值，
      // 所以此时allValues的数据不可信
      props.onChange &&
        props.onChange(changedValue, {
          ...form.getFieldsValue(), // 保证其他组件的值已经更新
          ...changedValue, // 保证当前改变值的组件值更新
        });
    },
  }),
  withHandlers({
    // emitDependenciesChange: ({ schema, form, mapSubSchema }: Inner) => (
    //   key: string,
    //   value: any,
    // ) => {
    //   const changedValue = [...key.split('.'), value].reverse().reduce((v, k) => ({ [k]: v }));
    //   findDependencies(changedValue, schema, mapSubSchema, form);
    // },
    resetDependenciesChange: ({ schema, form, mapSubSchema }: Inner) => (changedValue: Object) => {
      findDependencies(changedValue, schema, mapSubSchema, form);
    },
  }),
  renameProp('onRef', 'ref'),
)(SchemaForm);

export { setGlobalConfig } from './maps';
