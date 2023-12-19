import EditStatus from '../edit-status';
import { Schema, TitleSchema, UISchema } from './interface';
export declare function getOrders(orders: string[], targetArray: string[]): string[];
export declare function getUIData(uiSchema: UISchema, type: "field" | "form", pathName?: string): any;
export declare function getEdit(edit: EditStatus | object, pathName?: string): EditStatus;
export declare function getTitle(title: TitleSchema, pathName?: string): any;
export declare function getColumns(items: any, required?: string[]): {
    columns: any[];
    schema: {
        type: string;
        required: string[];
        propertyType: any;
    };
};
export declare function getBackgroundColor(backgroundColor: string, len: number): string;
export declare function getNewValue(formVals: any, data: any, schema: any): any;
export declare function getDateToForm(data: any, schema: Schema): any;
export declare function getKey(): string;
export declare function getFieldItemSizeClass(className: string): "gant-form-item-sm" | "gant-form-item-lg" | "gant-form-item";
export declare function getSchemaRenderCount(schema: Schema): number;
