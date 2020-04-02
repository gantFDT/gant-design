import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridApi as AgGridApi, GridOptions, ColumnApi, GridReadyEvent, ValueFormatterParams } from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from "ag-grid-enterprise"
import 'ag-grid-enterprise';
import { get } from 'lodash'

import key from './license'
import Header from '@header';
import { PartRequired, ProtoExtends } from "@util/type"
import { mapColumns, NonBool, isbool, isstring } from './utils'
import { Filter, Size, Fixed } from './interface'
import "./style"

export * from './interface'
import './style'

// 设置licenseKey才会在列头右侧显示
// 切换列头显示、固定列的控制栏
LicenseManager.setLicenseKey(key)


const defaultProps = {
    resizable: true,
    editable: false,
    /**单列的过滤器 */
    filter: false,
    /**禁止调整列顺序 */
    // lockPosition: false,
    /**直接在列头下面显示过滤器 */
    floatingFilter: false,
    /**分页 */
    pagination: true,
    /**编辑状态下的尺寸 */
    size: Size.small,
    /**rowkey */
    rowkey: "key"
}

export interface Api {
    undo(): void,
    getModel(): void,
    [key: string]: any
}

export type EditActions = (api: Api, keys: Array<string>) => React.ReactElement

export type OnReady = (api: Api) => void

export type GridApi = AgGridApi

const defaultRowSelection = {
    multiple: true,
    checkboxIndex: 0
}

export type RowSelection = {
    /**是否多选 */
    multiple?: boolean,
    /**checkbox所在索引 */
    checkboxIndex?: number,
} | boolean

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

export type ColumnEdiatble<T> = (record: T) => boolean

export type RowKey<T> = (data: T) => string

// Column Api
export type Columns<T extends {} = {}> = {
    /**标题 */
    title: React.ReactNode,
    /**索引的字段名 */
    dataIndex: string,
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
    valueFormatter?: (params: ValueFormatterParams) => string
}

// TODO:取消 拿到原始值 重新set 然后关闭编辑状态
// TODO:保存 关闭编辑状态即可
// TODO:编辑 打开编辑状态

// Grid Api
interface Props<T> {
    filter?: boolean,
    headerProps: {
        extra?: React.ReactNode,
        [key: string]: any
    },
    editActions: EditActions,
    columns: Columns<T>[],
    dataSource: T[],
    onReady: OnReady,
    defaultColumnWidth?: React.ReactText,
    rowSelection: RowSelection,
    rowkey: RowKey<T> | string
}

type CustomProps<T> = ProtoExtends<typeof defaultProps, Props<T>>

export type GridProps<T> = CustomProps<T>

// export type GridProps<T> = ProtoExtends<AgGridReactProps, CustomProps<T>>


export type GridPropsPartial<T> = PartRequired<GridProps<T>, "columns" | "dataSource">


const Grid = function Grid<T>(props: GridPropsPartial<T>) {

    const { headerProps, editActions, onReady, columns: columnDefs, editable, defaultColumnWidth, rowSelection: rowSel, size, rowkey, } = props

    const apiRef = useRef<GridApi>()

    const columnsRef = useRef<ColumnApi>()

    const defaultWidth = useMemo(() => {
        if (isstring(defaultColumnWidth)) {
            return parseFloat(defaultColumnWidth)
        }
        return defaultColumnWidth
    }, [defaultColumnWidth])

    // 自适应宽度
    const shouldFitCol = useCallback(
        (api = apiRef.current) => {
            if (typeof defaultColumnWidth === "undefined") api.sizeColumnsToFit()
        }, [defaultColumnWidth])

    const getRowNodeId = useCallback(
        (data) => {
            if (typeof rowkey === 'string') {
                return get(data, rowkey)
            }
            return rowkey(data)
        },
        [rowkey],
    )



    const editApi = useMemo<Api>(() => {
        return {
            undo() {
                apiRef.current.undoCellEditing()
            },
            getModel() { apiRef.current.getModel() }
        }
    }, [])

    const onGridReady = useCallback((params: GridReadyEvent) => {
        apiRef.current = params.api
        columnsRef.current = params.columnApi
        onReady && onReady(editApi)
        // 没有设置默认宽度将自动适配
        shouldFitCol(params.api)
    }, [onReady, shouldFitCol, editApi])

    const rowSelection = useMemo<NonBool<RowSelection>>(() => {
        if (isbool(rowSel)) {
            return defaultRowSelection
        }
        return rowSel
    }, [rowSel])

    const columns = useMemo<ColDef[] | ColGroupDef[]>(() => mapColumns<T>(columnDefs, editable, rowSelection, size, getRowNodeId), [columnDefs, editable, rowSelection, size, getRowNodeId])

    useEffect(() => {
        if (apiRef.current) {
            apiRef.current.setColumnDefs(columns)
            shouldFitCol()
        }
    }, [columns])

    const gridOptions = useMemo<GridOptions>(() => {
        const {
            dataSource: rowData,
            resizable,
            filter,
            // lockPosition,
            floatingFilter,
            pagination,
            rowSelection
        } = props
        const defaultColDef: ColDef = {
            resizable,
            filter: floatingFilter ? false : filter,
            // lockPosition,
            width: defaultWidth,
            // editable: true,
        }

        const defaultColGroupDef: ColGroupDef = {
            children: undefined
        }

        return {
            rowData,
            columnDefs: columns,
            floatingFilter,
            pagination,
            rowSelection: ["signal", "multiple"][+get(rowSelection, "multiple")],
            paginationAutoPageSize: true,
            defaultColDef,
            defaultColGroupDef,
            enableCellChangeFlash: true,
        }
    }, [props, columns, defaultWidth, rowSelection])

    const [autoGroupColumnDef, setautoGroupColumnDef] = useState({
        headerName: "Model",
        field: 'model',
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
            checkbox: true,
        }
    })

    const actions = useMemo(() => {
        // if (editActions) {
        if (editActions && editable) {
            return editActions(editApi, [])
        }
        return undefined
    }, [editActions, editApi, editable])

    const mergedHeaderProps = useMemo(() => {
        if (headerProps) {
            const props = headerProps || {}
            if (!props.extra) {
                props.extra = actions
            } else {
                props.extra = (
                    <>
                        {actions}
                        {headerProps.extra}
                    </>
                )
            }
            return props
        }
        return undefined
    }, [actions, headerProps])

    const header = useMemo(() => {
        if (mergedHeaderProps) {
            return (
                <Header {...mergedHeaderProps} />
            )
        }
        return undefined
    }, [mergedHeaderProps])

    return (
        <div className="ag-theme-balham" style={{ width: 600, height: 320 }}>
            <div className="gant-grid-header">{header}</div>
            <AgGridReact
                gridOptions={gridOptions}
                getRowNodeId={getRowNodeId}
                onGridReady={onGridReady}
                // undo\redo
                undoRedoCellEditing={true}
                enableFillHandle={true}
                undoRedoCellEditingLimit={5}
                stopEditingWhenGridLosesFocus
            // rowSelection="multiple"
            // animateRows
            // onGridReady={param => ref.current = param.api}
            // autoGroupColumnDef={autoGroupColumnDef}
            // groupSelectsChildren
            // componentWrappingElement="span"
            //  // 行拖拽
            // rowDragManaged
            // suppressRowDrag
            // defaultColDef={{
            //     sortable: true,
            //     filter: true,
            //     // headerComponentFramework: "div",
            //     headerComponentParams: {
            //         name: '123'
            //     }
            // }}
            />
        </div>
    )
}

Grid.defaultProps = defaultProps

export default Grid