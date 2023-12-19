import React from 'react';
import { TableProps, TableRowSelection, ColumnProps } from 'antd/lib/table';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { PaginationConfig as AntPaginationConfig } from 'antd/lib/pagination';
import { EditStatus } from 'data-cell-g';
declare type Direction = 'row' | 'row-reverse';
declare const defaultProps: {
    bordered: boolean;
    columns: any[];
    dataSource: any[];
    pagination: any;
    resizable: boolean;
    headerMarginBottom: number;
    rowSelection: any;
    isZebra: boolean;
    editable: EditStatus;
    wrap: boolean;
    footerDirection: Direction;
    orderList: any[];
    light: boolean;
    cellPadding: number;
    headerProps: {};
    emptyDescription: string;
    withIndex: number;
    onSave: (list: Array<object>, diffData: Array<Array<object>>) => void;
};
export declare type Order = {
    fieldName: string;
    orderType: string;
};
export declare type Record = {
    children?: Record[];
    isDeleted?: boolean;
    [key: string]: any;
};
export declare type RowKey<T> = (record: T, index?: number) => string;
export declare type ProtoExtends<T, U> = U & {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>;
};
export declare type PartRequired<T, U extends keyof T> = Required<Pick<T, U>> & Partial<Omit<T, U>>;
export declare type RowSelection<T> = ProtoExtends<TableRowSelection<T>, {
    selectedRowKeys: string[];
    onSelect?: (rows: any, selected: boolean) => void;
    preventDefault?: boolean;
    clickable?: boolean;
    showFooterSelection?: boolean;
}>;
export declare type EditRender<T = any> = (value: string, record: T, rowIndex: number) => React.ReactElement;
export declare type EditConfig<T> = {
    render: EditRender<T>;
    showDirt?: boolean;
    editValue?: string | ((record: T, rowIndex: number, dataIndex: string) => string);
    clickable?: boolean | ((record: T, rowIndex: number, dataIndex: string) => boolean);
};
export interface GColumnProps<T> extends ColumnProps<T> {
    showFilter?: boolean;
    codeData?: string;
    editConfig?: EditConfig<T>;
    showTip?: boolean;
    placement?: TooltipPlacement;
    expandColumn?: boolean;
}
export declare type EditActions<T> = ([list, Fn]: [Array<T>, React.Dispatch<React.SetStateAction<Array<T>>>], keys: Array<string>) => React.ReactElement;
export declare type OnDragEnd<T> = (list: Array<T>) => void;
export declare type Tail<T> = (currentPageData: Array<T>) => React.ReactNode;
export declare type PaginationConfig = AntPaginationConfig | null | false;
export interface RowHeight<T> {
    (index: number, Record: T): number | string;
}
export interface VirtualScroll<T> {
    threshold?: number;
    rowHeight?: number | string;
    center?: boolean;
}
interface Props<T extends Record> {
    cellPadding: React.ReactText;
    dataSource: T[];
    columns: GColumnProps<T>[];
    editActions: EditActions<T>;
    emptyDescription: React.ReactNode;
    flex?: boolean;
    footerDirection: Direction;
    headerLeft: React.ReactElement;
    headerMarginBottom: number;
    headerRight: React.ReactNode;
    onDragEnd: OnDragEnd<T>;
    orderList: Array<Order>;
    pagination: PaginationConfig;
    resizable: boolean;
    rowSelection: RowSelection<T>;
    scrollKey: string;
    spacing: React.ReactText;
    tableKey: string;
    tail: Tail<T>;
    title: React.ReactNode;
    onScroll: Function;
    virtualScroll: VirtualScroll<T> | true;
}
declare type GantTableProps<T> = ProtoExtends<TableProps<T>, Props<T>>;
declare type GantTableDefaultProps<T> = Partial<typeof defaultProps>;
export declare type GantTableListOuterProps<T> = PartRequired<ProtoExtends<GantTableDefaultProps<T>, GantTableProps<T>>, 'columns' | 'dataSource'>;
export declare type ScrollElement = HTMLElement & {
    scrollTopBackUp: number;
    scrollloaded: boolean;
};
export default class GantTable<T> extends React.Component<GantTableListOuterProps<T>> {
    render(): JSX.Element;
}
export {};
