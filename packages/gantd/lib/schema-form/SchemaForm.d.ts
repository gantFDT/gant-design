/// <reference types="react" />
import { Schema, UISchema, TitleSchema } from './interface';
interface SchemaFormProps {
    schema: Schema;
    uiSchema?: UISchema;
    titleConfig?: TitleSchema;
    withoutAnimation?: boolean;
    frameworkComponents?: object;
}
export default function SchemaForm(props: SchemaFormProps): JSX.Element;
export {};
