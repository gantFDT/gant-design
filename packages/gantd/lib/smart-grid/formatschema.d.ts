import { SchemaProp, CustomColumnProps, ColumnConfig } from './interface';
export declare const setFields: (cmpMap: any) => void;
export declare const formatColumnFields: (columnFields: any, originColumns: any) => any[];
export default function formatSchema<R>(schema: SchemaProp<R> | CustomColumnProps<R>[], originGridKey: string | undefined, locale?: any, smartGridViewName?: string): {
    columns: CustomColumnProps<R>[];
    columnConfigs: ColumnConfig[];
    systemViews: import("./interface").ViewConfig[];
};
