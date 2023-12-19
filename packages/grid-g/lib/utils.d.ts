import { ColDef, ColGroupDef, GridApi, RowNode } from 'ag-grid-community';
import { Schema } from 'schema-form-g';
import { Rules } from 'async-validator';
import { Columns, GantPaginationProps, Size } from './interface';
declare type Col = ColGroupDef | ColDef;
export declare const sizeNumber: {
    small: number;
    default: number;
    large: number;
};
export declare const sizeDefinitions: {
    fontSize: {
        small: number;
        default: number;
        large: number;
    };
    rowHeight: {
        small: number;
        default: number;
        large: number;
    };
    headerHeight: {
        small: number;
        default: number;
        large: number;
    };
    floatingFiltersHeight: {
        small: number;
        default: number;
        large: number;
    };
    paginationHeight: {
        small: number;
        default: number;
        large: number;
    };
};
export declare const selectedMapColumns: <T>(columns: Columns<T>[], index?: number | string | string[]) => any[];
export declare const toFormMap: <T>(columns: Columns<T>[], params: any) => {
    customFields: any[];
    schema: Schema;
    valueMap: {};
    translationName?: undefined;
} | {
    customFields: any[];
    schema: Schema;
    valueMap: {};
    translationName: any[];
};
export declare const mapColumns: <T>(columns: Columns<T>[], getRowNodeId: any, defaultSelection: boolean, defaultSelectionCol: ColDef, rowSelection: any, serialNumber: any, size: Size) => {
    columnDefs: Col[];
    validateFields: Rules;
    requireds: string[];
};
export declare type NonBool<T> = T extends boolean ? never : T;
export declare function isbool(t: any): t is boolean;
export declare function isnumber(t: any): t is number;
export declare function isstring(t: any): t is string;
export declare function isarray(t: any): t is Array<any>;
export declare function isfunc(t: any): t is Function;
export declare function ispromise(t: any): t is Promise<any>;
export declare function flattenTreeData(dataSoruce: any[], getRowNodeId: any, treeDataChildrenName?: string, pathArray?: string[]): any[];
export declare function isPagitation(p: GantPaginationProps): p is GantPaginationProps;
export declare function usePagination(pagitation: GantPaginationProps, size: string, defapagitation: GantPaginationProps): any;
export declare const AG_GRID_STOP_PROPAGATION = "__ag_Grid_Stop_Propagation";
export declare function stopPropagationForAgGrid(event: any): void;
export declare function groupNodeSelectedToggle(node: RowNode, selected: boolean): void;
export declare function checkParentGroupSelectedStatus(node: RowNode, selected: boolean, api: GridApi): void;
/**
 * 判断是否导出隐藏字段
 * @param col 当前列
 * @param exportHiddenFields 隐藏字段导出状态
 */
export declare function isExportHiddenFields(col: ColDef, exportHiddenFields: boolean): boolean;
/**
 * 获取 column 信息
 * @param column
 */
export declare function getColumnInfo(column: any): {
    fieldName: any;
    children: any;
};
export {};
