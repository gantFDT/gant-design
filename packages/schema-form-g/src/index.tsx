import React from 'react';
import { Form } from 'antd';
import { EditStatus } from '@data-cell';
import { compose, withHandlers, renameProp } from 'recompose';
import _SchemaForm from './SchemaForm';
import { isEmpty, isEqual } from 'lodash';
import { Props, Context } from './interface';
import classnames from 'classnames';
import dependencies, { Inner, findDependencies, refHoc } from './compose';
import { getNewValue, getDateToForm } from './utils';
import { getFieldProps } from './maps'
export const FormContext = React.createContext({} as Context);
export * from './interface';
export * from './maps';
import * as maps from './maps';
class SchemaForm extends React.Component<Props> {
  static maps = maps
  static defaultProps = {
    edit: EditStatus.EDIT,
    onSave: () => true,
    data: {},
    customFields: [],
    uiSchema: {},
    backgroundColor: 'transparent',
  };
  componentDidUpdate(pervPops: Props) {
    const {
      data,
      schema,
      form: { getFieldsValue, setFieldsValue },
    } = this.props;
    const vals = getFieldsValue();
    if (!isEqual(pervPops.data, data) && !isEqual(vals, getDateToForm(data, schema))) {
      const newVals: any = getNewValue(vals, data, schema);
      setFieldsValue(newVals);
    }
  }
  resetFields = (names?: string[]) => {
    const {
      form: { resetFields },
    } = this.props;
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
  render() {
    const {
      schema,
      form,
      edit,
      uiSchema,
      titleConfig,
      onSave,
      data,
      customFields,
      backgroundColor,
      className,
      emitDependenciesChange,
      prefixCls: customizePrefixCls = 'gant',
      size,
    } = this.props;

    if (isEmpty(schema)) {
      return null;
    }
    const prefixCls = customizePrefixCls + '-schemaform';
    const defalutProps = size ? { ...getFieldProps(), size } : { ...getFieldProps() };
    return (
      <FormContext.Provider
        value={{ form, edit, onSave, data, customFields, emitDependenciesChange, prefixCls, defalutProps }}
      >
        <div className={classnames(className)} style={{ backgroundColor }}>
          <_SchemaForm schema={schema} uiSchema={uiSchema} titleConfig={titleConfig} />
        </div>
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
      findDependencies(changedValue, '', schema, mapSubSchema, form);
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
    emitDependenciesChange: ({ schema, form, mapSubSchema }: Inner) => (
      key: string,
      value: any,
    ) => {
      const changedValue = [...key.split('.'), value].reverse().reduce((v, k) => ({ [k]: v }));
      findDependencies(changedValue, '', schema, mapSubSchema, form);
    },
  }),
  renameProp('onRef', 'ref'),
)(SchemaForm);
