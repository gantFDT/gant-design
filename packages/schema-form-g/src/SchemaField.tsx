import { EditStatus, Input } from '@data-cell';
import { Col, Form } from 'antd';
import Receiver from './locale/Receiver';
import classnames from 'classnames';
import { findIndex, get } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, forwardRef, memo } from 'react';
import { FormContext } from './index';
import { Schema } from './interface';
import { getFields } from './maps';
import { getFieldItemSizeClass } from './utils';

interface SchemaField extends Schema {
  isRequired?: boolean;
  edit: any;
  uiData: any;
}
const SchemaField = (props: SchemaField, ref: any) => {
  const {
    options,
    title,
    props: FieldProps,
    componentType,
    name,
    isRequired,
    required,
    edit,
    uiData,
  } = props;

  const {
    form: { getFieldDecorator, resetFields, validateFieldsAndScroll },
    onSave,
    data,
    customFields,
    // emitDependenciesChange,
    defalutProps,
    collectInitialValue,
    hideTitle,
    frameworkComponents,
    allowEdit,
  } = useContext(FormContext);

  const { LabelComponent } = frameworkComponents;

  const onCancel = useCallback(() => name && resetFields([name]), [componentType, name]);
  const onItemSave = useCallback(
    (id, value, cb) => {
      name &&
        validateFieldsAndScroll([name], (errors: any, values: object) => {
          if (errors) return;
          onSave(id, value, cb);
        });
    },
    [name],
  );

  const optionsRules = options && options.rules ? options.rules : [];
  const { col, labelAlign, labelCol, wrapperCol, extra, style, className } = uiData;
  let initialValue = useMemo(() => {
    return get(options, 'initialValue', get(data, `${name}`, undefined));
  }, [data]);
  const itemEdit = FieldProps && FieldProps.allowEdit === false ? EditStatus.CANCEL : edit;
  const colLayout = typeof col === 'number' ? { span: col } : col;
  const labelColLayout = typeof labelCol === 'number' ? { span: labelCol } : labelCol;
  const wrapperColayout = typeof wrapperCol === 'number' ? { span: wrapperCol } : wrapperCol;
  const renderFieldProps = useMemo(() => {
    return { ...defalutProps, ...FieldProps };
  }, [defalutProps, FieldProps]);
  const fieldComponent = useMemo(() => {
    let component = get(getFields(), `${componentType}`, null);
    let customIndex = -1;
    if (component == null && componentType) {
      customIndex = findIndex(
        customFields,
        item => item.type === componentType || item.name === componentType,
      );
    }
    component = component ? component : get(customFields, `[${customIndex}].component`, Input);
    const { initialValue, pattern, ...othterProps }: any = renderFieldProps || {};

    return React.createElement(component, {
      allowEdit,
      ...othterProps,
      edit: itemEdit,
      onCancel,
      onSave: onItemSave,
    });
  }, [renderFieldProps, itemEdit, onCancel, onItemSave, componentType, customFields, allowEdit]);

  useEffect(() => {
    collectInitialValue(name, initialValue);
    // if (![null, undefined].includes(initialValue)) {
    //   emitDependenciesChange(name as string, initialValue);
    // }
  }, []);
  const requiredFinally = typeof required === 'boolean' ? required : isRequired;
  return (
    <Col {...colLayout}>
      <Receiver>
        {locale => {
          //非中文语言环境下，label和required之间需要有空格
          const separator = locale.targetLang === 'zh-CN' ? '' : ' ';
          return (
            <Form.Item
              label={
                // hideTitle ? <>{title}</> : title
                LabelComponent ? <LabelComponent title={title} /> : title
              }
              // ref={ref}
              className={classnames(
                className,
                getFieldItemSizeClass(renderFieldProps.size),
                requiredFinally ? 'field-required' : '',
              )}
              style={style}
              wrapperCol={wrapperColayout}
              labelAlign={labelAlign}
              labelCol={labelColLayout}
              extra={extra}
            >
              {name &&
                getFieldDecorator(name, {
                  ...options,
                  initialValue,
                  rules: [
                    {
                      required: requiredFinally,
                      message: <>{`${title}${separator}${locale.required}`}</>,
                    },
                    ...optionsRules,
                  ],
                })(fieldComponent)}
            </Form.Item>
          );
        }}
      </Receiver>
    </Col>
  );
};
export default memo(forwardRef(SchemaField));
