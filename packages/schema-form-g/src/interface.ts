import { ReactElement, ReactHTML } from 'react';
import { EditStatus } from '@data-cell';
import { Gutter } from 'antd/lib/grid/row';
import { ColProps } from 'antd/lib/grid/col';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form.d';
import { FormLabelAlign } from 'antd/lib/form/FormItem';
import { FieldsType } from './maps';
export type Type = 'object' | 'array' | 'number' | 'string' | 'boolean' | 'date';
export enum Types {
  object = 'object',
  array = 'array',
  number = 'number',
  string = 'string',
  bool = 'bool',
  date = 'date',
}
export interface Context {
  form: WrappedFormUtils;
  onSave: (id: any, value: any, cb: any) => any;
  data?: object | undefined;
  customFields?: CustomFields[];
  backgroundColor?: string;
  edit?: EditStatus | EditObject;
  // emitDependenciesChange: (key: string, value: any) => void;
  prefixCls?: string;
  defalutProps?: any;
  collectInitialValue: (name: string, value: any) => void;
}
export interface Schema {
  name?: string;
  title?: string;
  operator?: string;
  type?: Type | string;
  componentType?: string | FieldsType;
  propertyType?: {
    [propsname: string]: Schema;
  };
  required?: Array<string> | boolean;
  items?: any;
  options?: GetFieldDecoratorOptions;
  dependencies?: Array<string>;
  onDependenciesChange?: (value: any, props: any, form: WrappedFormUtils) => any;
  props?: any;
  hide?: boolean;
}
export interface CustomFields {
  type: string;
  component: React.ElementType;
}
interface EditObject {
  [propname: string]: EditStatus | EditObject;
}
export interface OptionalProps {
  schema: Schema;
  onSchemaChange?: (schema: Schema) => void;
  uiSchema?: UISchema;
  edit?: EditStatus | EditObject;
  titleConfig?: TitleSchema;
  data?: object;
  onChange?: Function;
  customFields?: CustomFields[];
  backgroundColor?: string;
  wrappedComponentRef?: any;
  onRef?: any;
  className?: any;
  ref?: any | ReactElement | ReactHTML | HTMLDivElement;
  size?: 'small' | 'defalut' | 'large';
  onSizeChange?: (size: { height: number; width: number }) => void;
}

export interface LocaleProps {
  required: string;
}
export interface Props extends OptionalProps {
  prefixCls?: string;
  onSave: (id: any, value: any, cb: any) => any;
  form: WrappedFormUtils;
  // emitDependenciesChange: (key: string, value: any) => void;
  resetDependenciesChange: (changedValue: Object) => void;
  withoutAnimation?: boolean;
}
export interface UISchema {
  'ui:orders'?: string[];
  'ui:col'?: ColProps | number;
  'ui:extra'?: string;
  'ui:labelCol'?: ColProps | number;
  'ui:wrapperCol'?: ColProps | number;
  'ui:gutter'?: Gutter | [Gutter, Gutter];
  'ui:labelAlign'?: FormLabelAlign;
  'ui:padding'?: string | number;
  'ui:backgroundColor'?: string;
  'form:orders'?: string[];
  'form:style'?: React.CSSProperties;
  'form:className'?: string;
  'form:gutter'?: Gutter | [Gutter, Gutter];
  'field:col'?: ColProps | number;
  'field:extra'?: string;
  'field:labelCol'?: ColProps | number;
  'field:wrapperCol'?: ColProps | number;
  'field:labelAlign'?: FormLabelAlign;
  [propName: string]:
  | ColProps
  | number
  | string
  | string[]
  | Gutter
  | [Gutter, Gutter]
  | FormLabelAlign
  | React.CSSProperties
  | UISchema;
}
export interface TitleSchema {
  'title:visible'?: boolean;
  'title:type'?: string;
  'title:size'?: string;
  'title:extra'?: Element | string;
  'title:beforeExtra'?: Element | string;
  'title:icon'?: string;
  'title:num'?: string | number;
  'title:color'?: string;
  'title:bottomLine'?: boolean;
  'title:canWrap'?: boolean;
  [propName: string]: boolean | string | Element | number | TitleSchema;
}
