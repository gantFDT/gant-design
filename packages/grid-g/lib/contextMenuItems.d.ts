import { GetContextMenuItemsParams } from 'ag-grid-community';
import { DefaultJsonParams } from './interface';
interface ContextMenuItemsConfig {
    downShift?: boolean;
    locale: any;
    onRowsCut?: any;
    onRowsPaste?: any;
    getContextMenuItems?: any;
    getDefalutContextMenuItems?: () => any[];
    defaultJsonParams?: DefaultJsonParams;
    hideMenuItemExport?: boolean;
    exportHiddenFields?: boolean;
    hideMenuItemExpand?: boolean;
    hiddenMenuItemNames?: string[];
    suppressRightClickSelected?: boolean;
    showCutChild?: boolean;
    showMenuItemClearFilter?: boolean;
    onMenuItemClearFilter?: () => void;
}
export declare const gantGetcontextMenuItems: (params: GetContextMenuItemsParams, config: ContextMenuItemsConfig) => any[];
export {};
