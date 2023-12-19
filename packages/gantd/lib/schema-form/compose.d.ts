import { WrappedFormUtils } from 'antd/es/form/Form';
import { Props, Schema } from './interface';
interface Change {
    key: string[];
    schema: Schema;
}
declare type mapSubSchema = (schema: Schema, changes: Change[], nextTask: () => void) => void;
export declare type Inner = Props & {
    setSchema: (newSchema: Schema | ((s: Schema) => Schema), fn: any) => void;
    mapSubSchema: mapSubSchema;
    schemaState: Schema;
    bakData: any;
    setBakData: any;
    nextTask: () => void;
    resetNextTask: () => void;
};
/**
 * 查找依赖项
 */
export declare const findDependencies: (changedValueObject: object, { ...schema }: Schema, mapSubSchema: mapSubSchema, form: WrappedFormUtils) => void;
export declare const refHoc: any;
declare const _default: any;
export default _default;
