import React from 'react';
import { RowSelection, Record } from './index';
export declare function renderColumnItem(item: any, text: any, record: any, index: any): any;
export declare const useRowSelection: <T extends Record>(rowSelection: import(".").ProtoExtends<import("antd/lib/table").TableRowSelection<T>, {
    selectedRowKeys: string[];
    onSelect?: (rows: any, selected: boolean) => void;
    preventDefault?: boolean;
    clickable?: boolean;
    showFooterSelection?: boolean;
}>, dataSource: T[], bordered: boolean) => [import(".").ProtoExtends<import("antd/lib/table").TableRowSelection<T>, {
    selectedRowKeys: string[];
    onSelect?: (rows: any, selected: boolean) => void;
    preventDefault?: boolean;
    clickable?: boolean;
    showFooterSelection?: boolean;
}>, (record: T) => void, React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any>) | (new (props: any) => React.Component<any, any, any>)>];
export declare const usePagination: (pagination: any, rowselection: any, length?: number) => any;
export declare const setStorageWidth: (ele: any, tableKey: any, key: any) => void;
export declare const getStorageWidth: (key: any) => any;
/**
 *
 * @param {HTMLTbaleElement} table 主table
 */
export declare const toggleFixedTable: (tableParent: HTMLTableElement, ...args: any[]) => void;
export declare const setStyle: (dom: any, text: any) => void;
export declare function getStyleText(p: any): any;
/**
 *
 * @param {*} fix 固定列容器
 * @param {*} hide 隐藏还是显示
 */
export declare const toggleFixedTableScroll: (fix: any, ...args: any[]) => void;
export declare const switchIndex: ([...list]: Iterable<any>, from: any, to: any) => any[];
export declare const setMainTableBorder: (table: any, headerFixed: any, dataLength: any) => void;
export declare const originKey = "__origin";
/**
 * 计算序号和可展开rowKey
 */
export declare const computeIndexAndRowKey: <T extends Record>(list: T[], computedRowKey: any) => [T[], string[]];
export declare const cloneDatasource: <T extends Record>(dataSource: T[]) => T[];
/**
 * 计算diff数据
 * @param {Array<any>} oldList 编辑之前的原始数据
 * @param {Array<any>} newList 编辑之后的列表
 * @param {function} computedRowKey  计算数据的key
 * @param {boolean} isTree 是否是树状结构
 */
export declare const diffList: <T extends Record>(oldList: T[], newList: T[], isTree?: boolean, addList?: any[], delList?: any[], modifyList?: any[]) => any[][];
/**
 * 获取dataindex对应的index
 * 用于列缩放是找到对应的col元素，来设置实际的宽度
 * @param {*} cols 列数据
 */
export declare const getComputedColIndex: (cols: any) => string[];
/**
 * @param {Array} list
 * @param {number} withIndex
 * @param {number} parent
 */
export declare const computeIndex: <T>(list: T[], expandRowKeys: any[], virtualScroll: boolean) => [T[], string[], T[], string[]];
/**
 * 计算虚拟滚动有效数据、防止出现末页数据不足以全部占据table内容区域，而出现底部空白
 * @param list
 * @param start
 * @param length
 */
export declare const getListRange: <T>(list: T[], start: number, length: number) => T[];
export declare const getVirtualList: <T extends Record>(start: number, length: number, renderRowKeys: string[], list: T[]) => T[];
export declare const getPureRecord: <T extends Record>(record: T, exclude?: string[]) => T;
export declare const getPureList: <T extends Record>(list: T[]) => T[];
