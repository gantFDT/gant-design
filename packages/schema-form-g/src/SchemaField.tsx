import React, { useMemo, useContext, useCallback, useEffect, Fragment } from 'react';
import classnames from 'classnames';
import { EditStatus, Input } from '@data-cell';
import { FormContext } from './index';
import { Form, Col } from 'antd';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import { Schema } from './interface';
import { get, findIndex } from 'lodash';
import { getFields } from './maps';
import en from './locale/en-US';
import zh from './locale/zh-CN';
import { getFieldItemSizeClass } from './utils';

const langs = {
  en: en,
  'zh-cn': zh,
};
interface SchemaField extends Schema {
  isRequired?: boolean;
  edit: any;
  uiData: any;
}
const SchemaField = (props: SchemaField) => {
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
    hideTitle
  } = useContext(FormContext);

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
      ...othterProps,
      edit: itemEdit,
      onCancel,
      onSave: onItemSave,
    });
  }, [renderFieldProps, itemEdit, onCancel, onItemSave, componentType, customFields]);

  useEffect(() => {
    collectInitialValue(name, initialValue);
    // if (![null, undefined].includes(initialValue)) {
    //   emitDependenciesChange(name as string, initialValue);
    // }
  }, []);
  return (
    <Col {...colLayout}>
      <LocaleReceiver>
        {(local, localeCode = 'zh-cn') => {
          let locale = langs[localeCode] || langs['zh-cn'];
          return (
            <Form.Item
              label={hideTitle ? <>{title}</> : title}
              className={classnames(className, getFieldItemSizeClass(renderFieldProps.size))}
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
                      required: typeof required === 'boolean' ? required : isRequired,
                      message: `${title}${locale.required}`,
                    },
                    ...optionsRules,
                  ],
                })(fieldComponent)}
            </Form.Item>
          );
        }}
      </LocaleReceiver>
    </Col>
  );
};
export default SchemaField;
