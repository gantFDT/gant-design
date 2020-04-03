import { AgGridReactProps } from 'ag-grid-react';
import { GridApi as AgGridApi, GridReadyEvent, ValueFormatterParams, ColDef } from "ag-grid-community";
import { defaultProps, defaultRowSelection } from './index'

import { PaginationProps } from 'antd/lib/pagination'
import { PartRequired, ProtoExtends } from "@util/type"
// 编辑框大小
export enum Size {
    small = "small",
    default = "default"
}

// 过滤器
export enum Filter {
    Number = "agNumberColumnFilter",
    Text = 'agTextColumnFilter',
    Date = "agDateColumnFilter"
}

// 数据修改行为
export enum DataActions {
    add = "add",
    delete = "delete",
    modify = "modify",
    up = "up",
    down = "down"
}

export enum Fixed {
    left = "left",
    right = "right"
}



export namespace API {
    export type deleteRow = (cb?: (selected: any[]) => (Promise<boolean | any[]> | boolean | any[])) => void;
    export type cancel = () => void
}

export interface Api {
    /**撤销 */
    undo?(): void,
    /**重做 */
    redo?(): void,
    /**添加 */
    add(index?: number, item?: object): void,
    /**删除 */
    deleteRow: API.deleteRow,
    getModel(): void,
    /**取消编辑 */
    cancel: API.cancel,
    [key: string]: any
}

export type EditActions = (api: Api, keys: Array<string>) => React.ReactElement

export type OnReady = (api: GridReadyEvent) => void

export type GridApi = AgGridApi


export type RowSelection = {
    /**是否多选 */
    type?: "single" | "multiple"
    /**checkbox所在索引 */
    checkboxIndex?: number,
    onSelect?: (keys: string[], rows: any[]) => void,
    selectedKeys?: string[],
    showDefalutCheckbox?: boolean
    defaultSelectionCol?: ColDef,
    rowMultiSelectWithClick?: boolean,
    rowDeselection?: boolean,
}

type EditComponentProps = {
    // onChange: (value: any) => void
}

export type EditConfig<T> = {
    component: React.ComponentClass<EditComponentProps> | React.FunctionComponent<EditComponentProps>,
    /**是否开启编辑，当全局editable为true时生效 */
    editable?: ColumnEdiatble<T>,
    props?: (record: T, rowIndex: number) => Object
    changeFormatter?: (v: any) => any
}

export type ColumnEdiatble<T> = boolean | ((record: T) => boolean)

export type RowKey<T> = (data: T) => string

// Column Api
export type Columns<T extends {} = {}> = {
    /**标题 */
    title?: React.ReactNode,
    /**索引的字段名 */
    fieldName: string,
    /**单元格渲染函数 */
    render?: (text: string, record: any, rowIndex: number) => React.ReactText,
    /**子节点 */
    children?: Columns<T>[],
    /**当前列宽度,如果没有，将以defaultColumnWidth显示 */
    width?: React.ReactText,
    /**是否显示选择器 */
    checkboxSelection?: boolean,
    /**当前列是否支持排序 */
    sortable?: boolean,
    /**当前列的过滤形式 */
    filter?: Filter,
    /**是否隐藏 */
    hide?: boolean,
    /**编辑时配置 */
    editConfig?: EditConfig<T>,
    /**固定列 */
    fixed?: Fixed | undefined,
    valueFormatter?: (params: ValueFormatterParams) => string,
    rowGroupIndex?: number,
    type?: string | string[]
}

export type onEditableChange = (editable: boolean) => void

export type OnEdit = (api: Api) => void

// TODO:移动
// TODO:取消编辑时恢复添加和删除的数据

// Grid Api
export interface Props<T> {
    filter?: boolean,
    // headerProps?: {
    //     extra?: React.ReactNode,
    //     [key: string]: any
    // },
    // editActions: EditActions,
    columns: Columns<T>[],
    dataSource: T[],
    onReady: OnReady,
    defaultColumnWidth?: React.ReactText,
    rowSelection: RowSelection | true,
    rowkey: RowKey<T> | string,
    onEditableChange: onEditableChange,
    width?: string | number,
    height?: string | number,
    treeData?: boolean,
    pagination: PaginationProps,
    onEdit: OnEdit
}

export type CustomProps<T> = ProtoExtends<typeof defaultProps, Props<T>>

// export type GridProps<T> = CustomProps<T>

export type GridProps<T> = ProtoExtends<AgGridReactProps, CustomProps<T>>


export type GridPropsPartial<T> = PartRequired<GridProps<T>, "columns" | "dataSource">

