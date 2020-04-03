import React, { useState, useCallback, useRef, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridApi, GridOptions, ColumnApi, GridReadyEvent, ValueFormatterParams } from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from "ag-grid-enterprise"
import 'ag-grid-enterprise';
import { get } from 'lodash'
import { Pagination } from 'antd'

import key from './license'
import Header from '@header';
import { mapColumns, NonBool, isbool, isstring, isarray, ispromise, isfunc, flattenTreeData, usePagination } from './utils'
import { Filter, Size, Fixed, GridPropsPartial, Api, API, RowSelection } from './interface'
import "./style"

export * from './interface'
import './style'

// 设置licenseKey才会在列头右侧显示
// 切换列头显示、固定列的控制栏
LicenseManager.setLicenseKey(key)


export const defaultProps = {
    resizable: true,
    /**是否处于编辑状态 */
    editable: false,
    /**单列的过滤器 */
    filter: false,
    /**禁止调整列顺序 */
    // lockPosition: false,
    /**直接在列头下面显示过滤器 */
    floatingFilter: false,
    /**编辑状态下的尺寸 */
    size: Size.small,
    /**rowkey */
    rowkey: "key",
    width: "100%",
    height: 400,
}

export const defaultRowSelection = {
    multiple: true,
    checkboxIndex: 0
}

const Grid = function Grid<T>(props: GridPropsPartial<T>) {

    const {
        dataSource: initDataSource,
        // headerProps,
        // editActions,
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
        pagination,
        onEdit,
        ...orignProps
    } = props

    const apiRef = useRef<GridApi>();

    const columnsRef = useRef<ColumnApi>();
    const [dataSource, setDataSource]: [T[], Dispatch<SetStateAction<T[]>>] = useState([]);

    // 分页事件
    const computedPagination = usePagination(pagination)

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



    // 进入编辑时遍历一遍初始数据
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

    useEffect(() => {
        if (isfunc(onEdit)) {
            onEdit(editApi)
        }
    }, [onEdit])

    const getDataPath = useCallback((data) => {
        return data.treeDataPath;
    }, [])

    return (
        <>
            {/* <div className="gant-grid-header">{header}</div> */}
            <div className="ag-theme-balham" style={{ width, height }}>

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
                    // stopEditingWhenGridLosesFocus
                    defaultColDef={{
                        resizable,
                        filter,
                        minWidth: 100,
                    }}
                    getDataPath={getDataPath}
                // 分页信息
                // {...gridPagination}
                // deltaColumnMode
                />
            </div>
            {computedPagination && <Pagination style={{ marginTop: 4 }} {...computedPagination} />}

        </>
    )
}

Grid.defaultProps = defaultProps

export default Grid
