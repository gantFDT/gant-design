/// <reference types="react" />
import { FilterModifiedEvent } from 'ag-grid-community';
interface filterHooksParams {
    treeData?: boolean;
    treeDataForcedFilter?: boolean;
    handleFilterModified?: (event: FilterModifiedEvent) => void;
    getRowNodeId: (data: any) => any;
    dataSource?: any[];
    context: any;
}
export declare function filterDateComparator(filterLocalDateAtMidnight: any, cellValue: any): 1 | -1 | 0;
export declare function filterHooks(params: filterHooksParams): {
    onFilterModified: (event: FilterModifiedEvent<any>) => void;
    filterDataRef: import("react").MutableRefObject<{}>;
    forcedGridKey: number;
    filterModelRef: import("react").MutableRefObject<any>;
    columnIdRef?: undefined;
} | {
    onFilterModified: (filterModifiedEvent: FilterModifiedEvent) => void;
    filterDataRef: import("react").MutableRefObject<{}>;
    forcedGridKey: number;
    filterModelRef: import("react").MutableRefObject<any>;
    columnIdRef: import("react").MutableRefObject<any>;
};
export {};
