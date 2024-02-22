import React from 'react';
import { Schema, UISchema, TitleSchema } from './interface';
interface SchemaFormProps {
    schema: Schema;
    uiSchema?: UISchema;
    titleConfig?: TitleSchema;
    withoutAnimation?: boolean;
    frameworkComponents?: object;
}
export default function SchemaForm(props: SchemaFormProps): React.JSX.Element;
export {};
