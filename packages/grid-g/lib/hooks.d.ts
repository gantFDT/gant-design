/// <reference types="react" />
import { GridVariableRef, GridManager } from './interface';
interface selectedHooksParams {
    dataSource?: any[];
    selectedRows?: any[];
    gridVariable: GridVariableRef;
    getRowNodeId: (data: any) => any;
    apiRef: any;
    ready: boolean;
    isSingle: boolean;
}
export declare function selectedHooks(params: selectedHooksParams): {
    selectedChangeRef: import("react").MutableRefObject<boolean>;
    updateSelection: (selectedRows: any, dataSource: any) => void;
};
export declare function usePrev<T>(value: T): T;
export interface UseGridPasteProps {
    suppressManagerPaste: boolean;
    columns?: any[];
    suppressCreateWhenPaste?: boolean;
    gridManager: GridManager;
}
export declare function useGridPaste(props: UseGridPasteProps): {
    singleClickEdit?: undefined;
    suppressClipboardPaste?: undefined;
    enableRangeSelection?: undefined;
    enableCellTextSelection?: undefined;
    onRangeSelectionChanged?: undefined;
    processDataFromClipboard?: undefined;
    processCellForClipboard?: undefined;
} | {
    singleClickEdit: boolean;
    suppressClipboardPaste: boolean;
    enableRangeSelection: boolean;
    enableCellTextSelection: boolean;
    onRangeSelectionChanged: (params: any) => void;
    processDataFromClipboard: (params: any) => any;
    processCellForClipboard: (params: any) => any;
};
export {};
