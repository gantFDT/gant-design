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
  getRowNodeId: (data) => any;
  dataSource: any[];
  treeData?: boolean;
  getDataPath?: (data: any) => string[];
  createConfig?: CreateConfig;
  onRowsPasteEnd?: (dataSource) => void;
  isCompute?: boolean;
  treeDataChildrenName?: string;
  editChangeCallback?: (boolean) => void;
  gridKey?:string
}
export interface BatchUpdateDataSourceParams {
  add: any[];
  modify: any[];
  remove: any[];
}
