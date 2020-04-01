import React, { useState, useCallback, useRef, useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridApi as AgGridApi, GridOptions, ColumnApi, GridReadyEvent, } from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from "ag-grid-enterprise"
import { get } from 'lodash'
// import "ag-grid-enterprise"
import key from './license'
import Header from '@header';
import { PartRequired, ProtoExtends } from "@util/type"
import { mapColumns, NonBool, isbool, isstring } from './utils'

// 设置licenseKey才会在列头右侧显示
// 切换列头显示、固定列的控制栏
LicenseManager.setLicenseKey(key)

const defaultProps = {
    resizable: true,
    editable: false,
    // 单列的过滤器
    filter: false,
    // 禁止调整列顺序
    lockPosition: true,
    // 直接在列头下面显示过滤器
    floatingFilter: false,
    // 分页
    pagination: true,
}

export enum Filter {
    Number = "agNumberColumnFilter",
    Text = 'agTextColumnFilter',
    Date = "agDateColumnFilter"
}

export type EditActions = (manage: object, keys: Array<string>) => React.ReactElement

export type OnReady = (api: GridApi) => void

export type GridApi = AgGridApi

const defaultRowSelection = {
    multiple: true,
    checkboxIndex: 0
}

export type RowSelection = {
    // 是否多选
    multiple?: boolean,
    // checkbox所在索引
    checkboxIndex?: number,
} | boolean

// Column Api
export type Columns<T extends {} = {}> = {
    title: React.ReactNode,
    dataIndex: string,
    render?: (record: T) => React.ReactNode,
    children?: Columns<T>[],
    width?: React.ReactText,
    checkboxSelection?: boolean,
    sortable?: boolean,
    filter?: Filter,
    hide?: boolean,
}

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
    rowSelection: RowSelection
}

type CustomProps<T> = ProtoExtends<typeof defaultProps, Props<T>>

export type GridProps<T> = CustomProps<T>

// export type GridProps<T> = ProtoExtends<AgGridReactProps, CustomProps<T>>


export type GridPropsPartial<T> = PartRequired<GridProps<T>, "columns" | "dataSource">


const Grid = function Grid<T>(props: GridPropsPartial<T>) {

    const { headerProps, editActions, onReady, columns: columnDefs, editable, defaultColumnWidth, rowSelection: rowSel } = props

    const apiRef = useRef<GridApi>()

    const columnsRef = useRef<ColumnApi>()

    const defaultWidth = useMemo(() => {
        if (isstring(defaultColumnWidth)) {
            return parseFloat(defaultColumnWidth)
        }
        return defaultColumnWidth
    }, [defaultColumnWidth])

    const onGridReady = useCallback((params: GridReadyEvent) => {
        apiRef.current = params.api
        columnsRef.current = params.columnApi
        onReady && onReady(params.api)
        // 没有设置默认宽度将自动适配
        if (typeof defaultColumnWidth === "undefined") params.api.sizeColumnsToFit()
    }, [onReady, defaultColumnWidth])

    const rowSelection = useMemo<NonBool<RowSelection>>(() => {
        if (isbool(rowSel)) {
            return defaultRowSelection
        }
        return rowSel
    }, [rowSel])

    const columns = useMemo<ColDef[] | ColGroupDef[]>(() => mapColumns<T>(columnDefs, editable, rowSelection), [columnDefs, editable, rowSelection])

    const gridOptions = useMemo<GridOptions>(() => {
        const {
            dataSource: rowData,
            resizable,
            filter,
            lockPosition,
            floatingFilter,
            pagination,
            rowSelection
        } = props
        const defaultColDef: ColDef = {
            resizable,
            filter: floatingFilter ? false : filter,
            lockPosition,
            width: defaultWidth
        }

        const defaultColGroupDef: ColGroupDef = {
            children: undefined
        }

        return {
            rowData,
            columnDefs: columns,
            onGridReady,
            floatingFilter,
            pagination,
            rowSelection: ["signal", "multiple"][+get(rowSelection, "multiple")],
            paginationAutoPageSize: true,
            defaultColDef,
            defaultColGroupDef
        }
    }, [props, onGridReady, columns, defaultWidth, rowSelection])

    const [autoGroupColumnDef, setautoGroupColumnDef] = useState({
        headerName: "Model",
        field: 'model',
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
            checkbox: true,
        }
    })

    const actions = useMemo(() => {
        if (editActions) {
            return editActions({}, [])
        }
        return undefined
    }, [editActions])

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
            {header}
            <AgGridReact
                gridOptions={gridOptions}
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