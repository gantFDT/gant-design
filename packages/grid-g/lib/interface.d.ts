/// <reference types="react" />
import { ColDef, ColumnApi as AgColumnApi, GetContextMenuItemsParams, GridApi as AgGridApi, GridReadyEvent, IServerSideGetRowsParams, ITooltipParams, RowNode, ValueFormatterParams } from 'ag-grid-community';
import { AgGridReactProps } from 'ag-grid-react';
import { PaginationProps } from 'antd/lib/pagination';
import { RuleItem } from 'async-validator';
import GridManager from './gridManager';
import { defaultProps } from './index';
export * from 'ag-grid-community';
export { default as GridManager } from './gridManager';
import { ICellRendererParams } from 'ag-grid-community';
export declare type Size = 'small' | 'large' | 'default';
export declare enum Filter {
    Number = "agNumberColumnFilter",
    Text = "agTextColumnFilter",
    Date = "agDateColumnFilter"
}
export declare enum DataActions {
    add = "add",
    remove = "remove",
    modify = "modify",
    removeTag = "remove_tag"
}
export declare enum Fixed {
    left = "left",
    right = "right"
}
export declare enum Move {
    up = "up",
    down = "down"
}
export declare type ProtoExtends<T, U> = U & {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>;
};
export declare type PartRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>;
/**删除数据时的回调方法，可以返回boolean、array或者是一个能够提供boolean、array类型返回值的promise */
export declare type RemoveCallBack = (selected: any[]) => Promise<boolean> | boolean;
export declare type OnReady = (api: GridReadyEvent, gridManager: GridManager) => void;
export declare type GridApi = AgGridApi;
export declare type ColumnApi = AgColumnApi;
export declare type RowSelection = {
    /**是否多选 */
    type?: 'single' | 'multiple';
    /**checkbox所在索引 */
    checkboxIndex?: number;
    onSelect?: (keys: string[], rows: any[]) => void;
    selectedKeys?: string[];
    selectedRows?: any[];
    showDefalutCheckbox?: boolean;
    defaultSelectionCol?: ColDef;
    rowMultiSelectWithClick?: boolean;
    rowDeselection?: boolean;
    onSelectedChanged?: (keys: string[], rows: any[]) => void;
};
declare type EditComponentProps = {};
interface GantdRuleItem extends Omit<RuleItem, 'type'> {
    type?: 'string' | 'number' | 'boolean' | 'object' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'any';
}
export declare type EditConfig<T> = {
    component: React.ComponentClass<EditComponentProps> | React.FunctionComponent<EditComponentProps>;
    /**是否开启编辑，当全局editable为true时生效 */
    editable?: ColumnEdiatble<T>;
    props?: ((record: T, rowIndex: number) => any) | any;
    changeFormatter?: (v: any, record: any) => any;
    onCellChange?: (value: any, record: T, records: T[]) => void;
    refName?: string;
    valuePropName?: string;
    rules?: GantdRuleItem | GantdRuleItem[] | any;
    signable?: ColumnSignable;
    initValueFormatter?: (params: any) => any;
    /**是否禁用该列粘贴，Grid属性suppressManagerPaste为false时生效 */
    suppressManagerPaste?: boolean;
};
export interface CreateConfig {
    id: string;
    path: string;
    toPath: (parentPath: string[], data?: any) => any;
    defaultParentPath?: string[] | number[];
}
export declare type ColumnEdiatble<T> = boolean | ((record: T, params: any) => boolean);
export declare type ColumnSignable = boolean | ((params: any) => boolean);
export declare type RowKey<T> = (data: T) => string;
export interface Columns<T extends {} = {}> extends ColDef {
    /**标题 */
    title?: React.ReactNode;
    /**索引的字段名 */
    fieldName: string;
    /**单元格渲染函数 */
    render?: (text: string, record: any, rowIndex: number, params: ICellRendererParams) => React.ReactNode;
    /**子节点 */
    children?: Columns<T>[];
    /**当前列宽度,如果没有，将以defaultColumnWidth显示 */
    /**是否显示选择器 */
    checkboxSelection?: boolean;
    /**当前列是否支持排序 */
    sortable?: boolean;
    /**当前列的过滤形式 */
    filter?: Filter | string;
    /**是否隐藏 */
    hide?: boolean;
    /**当前列是否不允许导出 */
    suspressExport?: boolean;
    /**编辑时配置 */
    editConfig?: EditConfig<T>;
    /**固定列 */
    fixed?: Fixed | undefined;
    valueFormatter?: (params: ValueFormatterParams) => string;
    rowGroupIndex?: number;
    type?: string | string[];
    [props: string]: any;
    /** Group ID */
    groupId?: string;
    /** Open by Default */
    openByDefault?: boolean;
    /** If true, group cannot be broken up by column moving, child columns will always appear side by side, however you can rearrange child columns within the group */
    marryChildren?: boolean;
    /** The custom header group component to be used for rendering the component header. If none specified the default ag-Grid is used**/
    headerGroupComponent?: string;
    /** The custom header group component to be used for rendering the component header in the hosting framework (ie: React/Angular). If none specified the default ag-Grid is used**/
    headerGroupComponentFramework?: any;
    /** The custom header group component to be used for rendering the component header. If none specified the default ag-Grid is used**/
    headerGroupComponentParams?: any;
    tooltipRender?: (params: ITooltipParams) => string | React.ReactNode;
}
export declare type GantPaginationProps = Omit<ProtoExtends<PaginationProps, {
    beginIndex?: number;
    onChange?: (beginIndex: number, pageSize?: number, current?: number, countLimit?: number) => void;
    addonAfter?: string | React.ReactNode;
    addonBefore?: string | React.ReactNode;
    countLimit?: number;
    numberGoToMode?: boolean;
    onRefresh?: () => void;
    mode?: 'default' | 'limit';
    tooltipTotal?: () => number | number;
    align?: 'left' | 'right';
}>, 'onShowSizeChange'>;
export interface DefaultJsonParams {
    title?: string;
    onlySelected?: boolean;
    coverData?: boolean;
}
export interface Props<T extends any> {
    columns?: Columns<T>[];
    boxColumnIndex?: number | string[] | string;
    dataSource?: T[];
    onReady?: OnReady;
    rowSelection?: RowSelection | true;
    rowkey: RowKey<T> | string;
    gridKey?: string;
    editable?: boolean;
    width?: string | number;
    height?: string | number;
    treeData?: boolean;
    pagination?: GantPaginationProps;
    loading?: boolean;
    className?: string;
    isServerSideGroup?: (data: any) => boolean;
    treeDataChildrenName?: string;
    locale?: object;
    defaultJsonParams?: DefaultJsonParams;
    serverGroupExpend?: (param: IServerSideGetRowsParams, cd: (row: any[]) => void) => void;
    serialNumber?: boolean | ColDef;
    isCompute?: boolean;
    multiLineVerify?: boolean;
    onCellEditChange?: (record: any, fieldName: string, newValue: any, oldValue: any) => any;
    onCellEditingChange?: (record: any, fieldName: string, newValue: any, oldValue: any, params: any) => any;
    onCellChanged?: (record: any, fieldName: string, newValue: any, oldValue: any) => void;
    openEditSign?: boolean;
    createConfig?: CreateConfig;
    hideMenuItemExport?: boolean;
    exportExcludeColumns?: string[];
    exportHiddenFields?: boolean;
    hideMenuItemExpand?: boolean;
    hiddenMenuItemNames?: string[];
    showMenuItemClearFilter?: boolean;
    onMenuItemClearFilter?: () => void;
    pasteToGridManager?: boolean;
    showCut?: ((params: GetContextMenuItemsParams) => boolean) | boolean;
    showCutChild?: boolean;
    onRowsCut?: (rows: RowNode[]) => boolean;
    onRowsPaste?: (rows: RowNode[], targetRow?: RowNode, dir?: 'top' | 'bottom' | 'inner') => boolean;
    onRowsPasteEnd?: (data: any) => void;
    hideSelectedBox?: boolean;
    selectedBoxHeight?: number;
    selectedBoxWidth?: number;
    editChangeCallback?: (isChanged: boolean) => void;
    drawerMode?: boolean;
    defaultDrawerWidth?: number;
    customDrawerContent?: (params: any) => any;
    visibleDrawer?: boolean;
    doubleClickedExpanded?: boolean;
    suppressRightClickSelected?: boolean;
    treeDataForcedFilter?: boolean;
    themeClass?: string;
    gantThemeClass?: string;
    gantDateComponent?: boolean;
    autoHeight?: boolean;
    maxAutoHeight?: number | string;
    minAutoHeight?: number | string;
    numberGoToMode?: boolean;
    suppressGroupSelectParent?: boolean;
    onContextChangeRender?: (context: any, diffKeys: string[]) => {
        columns?: string[];
        nodeIds?: string[];
    } | null | false;
    size?: Size;
    border?: boolean;
    zebra?: boolean;
    autoRowHeight?: boolean;
    controlCellWordWrap?: boolean;
    onColumnsChange?: (columns: ColDef[]) => void;
    suppressManagerPaste?: boolean;
    suppressCreateWhenPaste?: boolean;
    removeRowSelectable?: boolean;
}
export declare type CustomProps<T> = ProtoExtends<typeof defaultProps, Props<T>>;
export declare type GridProps<T> = ProtoExtends<AgGridReactProps, CustomProps<T>>;
export declare type GridVariableRef = {
    hasSelectedRows?: boolean;
    hideSelectedBox?: boolean;
    selectedRows?: any[];
};
