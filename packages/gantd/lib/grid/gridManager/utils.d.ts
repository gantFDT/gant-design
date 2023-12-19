import { CreateConfig } from '../interface';
import { RowNode, GridApi, ColGroupDef, ColDef } from 'ag-grid-community';
export declare function getModifyData(records: any, getRowItemData: any, oldRecords: any, getRowNodeId: any): {
    newRecords: any[];
    hisRecords: any[];
};
export declare function removeTagData(removeNodes: RowNode[], rowData: any[], getRowNodeId: any): {
    newRecords: any[];
    hisRecords: any[];
    removeIndexs: any[];
    removeRecords: any[];
};
export declare const isEmptyObj: (value: any) => any;
export declare const isEqualObj: (obj: any, obj2: any) => any;
export declare function canQuickCreate(config: CreateConfig): boolean;
export declare function isSelectionParentOfTarget(selectedNode: any, targetNode: any): boolean;
export declare function getRowsToUpdate(nodes: any, parentPath: any, createConfig: any, agGridConfig: any): {
    newRowData: any[];
    oldRowData: any[];
};
export declare function onSetcutData(rowsNodes: RowNode[], clear?: boolean): any[];
export declare function getAllChildrenNode(targetKeys: any[], api: GridApi, deleteChildren?: boolean): RowNode[];
export declare function sortAndMergeColumns(columns: any[], localColumns: (ColGroupDef | ColDef)[]): (ColGroupDef | ColDef)[];
export declare function getAllCoumns(columns: any[], parendId?: string): any[];
export declare function replaceRowData({ rowData, targetData, newData, getRowNodeId, up, }: {
    rowData: any[];
    targetData: any;
    newData: any[];
    getRowNodeId: any;
    up: boolean;
}): any[];
