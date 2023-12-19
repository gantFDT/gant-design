import { DataActions, CreateConfig } from '../interface';
export interface OperationAction {
    type: DataActions;
    recordsIndex?: number[];
    records: any[];
}
export interface Diff {
    remove: any[];
    add: any[];
    modify: any[];
}
export interface AgGridConfig {
    getRowNodeId: (data: any) => any;
    dataSource: any[];
    treeData?: boolean;
    getDataPath?: (data: any) => string[];
    createConfig?: CreateConfig;
    onRowsPasteEnd?: (dataSource: any) => void;
    isCompute?: boolean;
    treeDataChildrenName?: string;
    editChangeCallback?: (boolean: any) => void;
    gridKey?: string;
    multiLineVerify?: boolean;
    cloneDataSource?: boolean;
    pasteToGridManager?: boolean;
}
export interface BatchUpdateDataSourceParams {
    add: any[];
    modify: any[];
    remove: any[];
}
