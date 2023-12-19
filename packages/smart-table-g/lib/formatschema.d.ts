import { SchemaProp, CustomColumnProps, ColumnConfig } from './interface';
export declare const setFields: (cmpMap: any) => void;
export default function formatSchema<R>(schema: SchemaProp<R> | CustomColumnProps<R>[]): {
    columns: CustomColumnProps<R>[];
    columnConfigs: ColumnConfig[];
    systemViews: import("./interface").ViewConfig[];
};
