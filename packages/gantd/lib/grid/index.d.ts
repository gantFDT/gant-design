import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import React from 'react';
import { GridProps, RowSelection } from './interface';
import './style';
export { default as GantGroupCellRenderer } from './GantGroupCellRenderer';
export { default as c } from './GantPromiseCellRender';
export * from './interface';
export { default as GantDateComponent } from './GantDateComponent';
export { setComponentsMaps, setFrameworkComponentsMaps, setGridConfig } from './maps';
export { default as SideGridDetail } from './sidegriddetail';
export declare const GridContext: React.Context<any>;
export declare const defaultProps: {
    /**加载状态 */
    loading: boolean;
    resizable: boolean;
    /**是否处于编辑状态 */
    editable: boolean;
    /**单列的过滤器 */
    filter: boolean;
    /**禁止调整列顺序 */
    /**直接在列头下面显示过滤器 */
    floatingFilter: boolean;
    /**rowkey */
    rowkey: string;
    width: string;
    sortable: boolean;
    treeDataChildrenName: string;
    /** 默认的删除行为 */
    /**是否执行treeDataPath计算 */
    isCompute: boolean;
    openEditSign: boolean;
    gantCustomHeader: boolean;
    /** 是否导出隐藏字段 */
    exportHiddenFields: boolean;
    suppressManagerPaste: boolean;
    suppressCreateWhenPaste: boolean;
};
export declare const defaultRowSelection: RowSelection;
declare const Grid: {
    <T extends unknown>(gridProps: import("./interface").ProtoExtends<import("ag-grid-react").AgGridReactProps<any>, import("./interface").ProtoExtends<{
        /**加载状态 */
        loading: boolean;
        resizable: boolean;
        /**是否处于编辑状态 */
        editable: boolean;
        /**单列的过滤器 */
        filter: boolean;
        /**禁止调整列顺序 */
        /**直接在列头下面显示过滤器 */
        floatingFilter: boolean;
        /**rowkey */
        rowkey: string;
        width: string;
        sortable: boolean;
        treeDataChildrenName: string;
        /** 默认的删除行为 */
        /**是否执行treeDataPath计算 */
        isCompute: boolean;
        openEditSign: boolean;
        gantCustomHeader: boolean;
        /** 是否导出隐藏字段 */
        exportHiddenFields: boolean;
        suppressManagerPaste: boolean;
        suppressCreateWhenPaste: boolean;
    }, import("./interface").Props<T>>>): React.JSX.Element;
    LicenseManager: typeof LicenseManager;
};
export default Grid;
