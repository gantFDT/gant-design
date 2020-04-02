import React, { useState, useCallback, useRef, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
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
import { mapColumns, NonBool, isbool, isstring, isarray, ispromise, flattenTreeData } from './utils'
import { Filter, Size, Fixed } from './interface'
import "./style"

export * from './interface'
import './style'

// 设置licenseKey才会在列头右侧显示
// 切换列头显示、固定列的控制栏
LicenseManager.setLicenseKey(key)


const defaultProps = {
    resizable: true,
    /**是否处于编辑状态 */
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
    rowkey: "key",
    width: "100%",
    height: 400,
}

namespace API {
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
    title?: React.ReactNode,
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
    valueFormatter?: (params: ValueFormatterParams) => string,
    rowGroupIndex?: number,
}

export type onEditableChange = (editable: boolean) => void

// TODO:移动
// TODO:取消编辑时恢复添加和删除的数据

// Grid Api
interface Props<T> {
    filter?: boolean,
    headerProps?: {
        extra?: React.ReactNode,
        [key: string]: any
    },
    editActions: EditActions,
    columns: Columns<T>[],
    dataSource: T[],
    onReady: OnReady,
    defaultColumnWidth?: React.ReactText,
    rowSelection: RowSelection,
    rowkey: RowKey<T> | string,
    onEditableChange: onEditableChange,
    width?: string | number,
    height?: string | number,
    treeData?: boolean,
}

type CustomProps<T> = ProtoExtends<typeof defaultProps, Props<T>>

// export type GridProps<T> = CustomProps<T>

export type GridProps<T> = ProtoExtends<AgGridReactProps, CustomProps<T>>


export type GridPropsPartial<T> = PartRequired<GridProps<T>, "columns" | "dataSource">


const Grid = function Grid<T>(props: GridPropsPartial<T>) {

    const {
        dataSource: initDataSource,
        headerProps,
        editActions,
        onReady,
        columns: columnDefs,
        editable,
        defaultColumnWidth,
        rowSelection: rowSel,
        size,
        rowkey,
        resizable,
        filter,
        onEditableChange,
        width,
        height,
        treeData,
        ...orignProps
    } = props

    const apiRef = useRef<GridApi>();

    const columnsRef = useRef<ColumnApi>();
    const [dataSource, setDataSource]: [T[], Dispatch<SetStateAction<T[]>>] = useState([]);
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
    useEffect(() => {
        if (treeData) {
            setDataSource(flattenTreeData(initDataSource, getRowNodeId))
        } else {
            setDataSource(initDataSource)
        }
    }, [initDataSource, treeData, getRowNodeId])


    const originList = useMemo(() => {
        const list = []
        if (editable) {
            apiRef.current.forEachNode((node, index) => {
                list.push(node.data)
            })
        }
        return list
    }, [editable])



    /**删除 */
    const deleteRow = useCallback<API.deleteRow>(
        (cb) => {
            let pro: Promise<boolean | any[]>
            const selected = apiRef.current.getSelectedRows()
            if (!cb) {
                apiRef.current.updateRowData({
                    remove: selected
                })
                return;
            }
            const back = cb(selected)
            if (back) {
                if (ispromise(back)) {
                    pro = back
                } else {
                    pro = new Promise((resolve) => {
                        resolve(back)
                    })
                }
                pro.then((res) => {
                    let deletedRows: Array<any> = []
                    if (isarray(res)) {
                        if (res.length) deletedRows = res
                    } else {
                        deletedRows = selected
                    }
                    // 业务层处理之后可能不需要删除
                    if (deletedRows.length) {
                        // 执行删除
                        apiRef.current.updateRowData({
                            remove: deletedRows
                        })
                    }

                })
            }
        },
        [],
    )

    /**取消编辑 */
    const cancelEdit = useCallback<API.cancel>(
        () => {
            console.log(originList)
            if (onEditableChange) {
                apiRef.current.setRowData(originList)
                onEditableChange(false)
            }
        },
        [originList],
    )

    const editApi = useMemo<Api>(() => {
        return {
            // undo() {
            //     apiRef.current.undoCellEditing()
            // },
            // redo() {
            //     apiRef.current.redoCellEditing()
            // },
            getModel() {
                console.log(apiRef.current.getModel())
            },
            add(index: number = 0, item: object = {}) {
                const res = apiRef.current.updateRowData({
                    add: [item],
                    addIndex: index,
                })
            },
            getSelected() {
                console.log(apiRef.current.getSelectedRows())
            },
            map() {
                apiRef.current.forEachNode((node, index) => {
                    console.log(node)
                })
            },
            /**删除 */
            deleteRow,
            /**取消 */
            cancel: cancelEdit,
            originList,
            save() {
                if (onEditableChange) {
                    apiRef.current.forEachNode((node, index) => {
                        const { _rowData, _rowType, ...data } = node.data
                        if (_rowData) {
                            node.setData(data)
                        }
                    })
                    onEditableChange(false)
                }
            }
        }
    }, [deleteRow, cancelEdit])

    const onGridReady = useCallback((params: GridReadyEvent) => {
        apiRef.current = params.api
        columnsRef.current = params.columnApi

        onReady && onReady(params)
        // 没有设置默认宽度将自动适配
        // shouldFitCol(params.api)
    }, [onReady, shouldFitCol, editApi])

    const rowSelection = useMemo<NonBool<RowSelection>>(() => {
        if (isbool(rowSel)) {
            return defaultRowSelection
        }
        return rowSel
    }, [rowSel])

    const columns = useMemo<ColDef[] | ColGroupDef[]>(() => mapColumns<T>(columnDefs, editable, rowSelection, size, getRowNodeId), [columnDefs, editable, rowSelection, size, getRowNodeId])

    const actions = useMemo(() => {
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
    const getDataPath = useCallback((data) => {
        return data.treeDataPath;
    }, [])
    return (
        <div className="ag-theme-balham" style={{ width, height }}>
            <div className="gant-grid-header">{header}</div>
            <AgGridReact
                {...orignProps}
                // rowData={rowData}
                columnDefs={columns}
                rowSelection={["signal", "multiple"][+get(rowSelection, "multiple")]}

                rowData={dataSource}
                getRowNodeId={getRowNodeId}
                onGridReady={onGridReady}
                treeData={treeData}
                // undo\redo
                undoRedoCellEditing
                enableFillHandle
                // undoRedoCellEditingLimit
                stopEditingWhenGridLosesFocus
                defaultColDef={{
                    resizable,
                    // sortable: true,
                    filter,
                    width: 100,
                }}
                getDataPath={getDataPath}
            />
        </div>
    )
}

Grid.defaultProps = defaultProps

export default Grid
