import React from 'react';
import { Schema } from './interface';
interface SchemaField extends Schema {
    isRequired?: boolean;
    edit: any;
    uiData: any;
}
declare const SchemaField: (props: SchemaField, ref: any) => JSX.Element;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<SchemaField & React.RefAttributes<unknown>>>;
export default _default;
