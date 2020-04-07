import React, { useState, useCallback, useRef, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import classnames from 'classnames'
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridApi, GridOptions, ColumnApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from "ag-grid-enterprise"
import 'ag-grid-enterprise';
import { Pagination, Spin } from 'antd'
import { get, isEmpty, isEqual } from 'lodash'
import GirdRenderColumn from './GirdRenderColumn'
import key from './license'
import Header from '@header';
import {
    mapColumns, NonBool, isbool, isstring, isarray, ispromise, isfunc,
    flattenTreeData, usePagination, getSizeClassName, createFakeServer, createServerSideDatasource
} from './utils'
import { Filter, Size, Fixed, GridPropsPartial, Api, API, RowSelection, Record } from './interface'
import "./style"
import DataManage from './datamanage'
import RenderCol from './GirdRenderColumn'
export * from './interface'

// 设置licenseKey才会在列头右侧显示
// 切换列头显示、固定列的控制栏
LicenseManager.setLicenseKey(key)


export const defaultProps = {
    /**加载状态 */
    loading: false,
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
    sortable: true,
    treeDataChildrenName: "children"
}

export const defaultRowSelection: RowSelection = {
    type: "multiple",
    // checkboxIndex: 0,
    showDefalutCheckbox: true,
    selectedKeys: [],
}

const Grid = function Grid<T extends Record>(props: GridPropsPartial<T>) {

    const {
        dataSource: initDataSource,
        // headerProps,
        // editActions,
        onReady,
        columns: columnDefs,
        editable,
        rowSelection: rowSel,
        size,
        rowkey,
        resizable,
        filter,
        sortable,
        onEditableChange,
        width,
        height,
        treeData,
        pagination,
        onEdit,
        loading,
        isServer,
        isServerSideGroup,
        getServerSideGroupKey,
        onExpandedRowsChange,
        components,
        treeDataChildrenName,
        ...orignProps
    } = props

    const apiRef = useRef<GridApi>();

    const columnsRef = useRef<ColumnApi>();

    /**编辑时数据 */
    const [editDataSource, seteditDataSource] = useState([])

    const [diff, setdiff] = useState({})

    // 处理selection
    const gantSelection: RowSelection = useMemo(() => {
        if (rowSel === true) {
            return defaultRowSelection
        }
        if (rowSel) return { ...defaultRowSelection, ...rowSel }
        return {}
    }, [rowSel])
    const { onSelect, selectedKeys, showDefalutCheckbox, type: rowSelection, defaultSelectionCol, ...selection } = gantSelection;

    const updateDiff = useCallback(
        (newDiff) => {
            setdiff(diff => {
                return ["remove", "update", "add"].reduce((d, type) => {
                    d[type] = (newDiff[type] || []).concat(diff[type] || [])
                    return d
                }, {})
            })
        },
        [],
    )

    /**管理编辑数据对象 */
    const dataManage = useMemo(() => {
        const manager = new DataManage<T>(apiRef, columnsRef)
        manager.removeAllListeners()
        manager.on("update", (list) => {
            seteditDataSource(list)
        })
        DataManage.getRowNodeId = getRowNodeId
        return manager
    }, [])

    /**出口数据，用于grid显示 */
    useEffect(() => {
        if (editable) {
            dataManage.init(initDataSource)
        }
    }, [editable, initDataSource])

    // 分页事件
    const computedPagination = usePagination(pagination)


    const getRowNodeId = useCallback(
        (data) => {
            if (typeof rowkey === 'string') {
                return get(data, rowkey)
            }
            return rowkey(data)
        },
        [rowkey],
    )
    const nowDataSource = useMemo(() => {
        return editable ? editDataSource : initDataSource
    }, [editable, initDataSource, editDataSource])

    // 判断数据分别处理 treeTable 和普通table
    const dataSource = useMemo(() => {
        if (!treeData) return nowDataSource;
        if (!isServer) return flattenTreeData(nowDataSource, getRowNodeId, [], treeDataChildrenName);
        const fakeServer = createFakeServer(nowDataSource, getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId);
        const serverDataSource = createServerSideDatasource(fakeServer)
        return serverDataSource
    }, [nowDataSource, treeData, treeDataChildrenName, getRowNodeId, isServer, apiRef.current, getServerSideGroupKey, editDataSource, editable])
    useEffect(() => {
        if (nowDataSource.length > 0 && apiRef.current && isServer && treeData) apiRef.current.setServerSideDatasource(dataSource)
    }, [apiRef.current, dataSource, nowDataSource, isServer, treeData])
    const gridPartProps = useMemo(() => {
        if (treeData && isServer) return {
            isServerSideGroup,
            treeData,
            rowModelType: 'serverSide',
            getServerSideGroupKey: getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId,
        }
        return {
            treeData,
            rowData: dataSource
        }
    }, [dataSource, getRowNodeId, isServerSideGroup, treeData, isServer])
    // 进入编辑时遍历一遍初始数据
    const originList = useMemo(() => {
        const list = []
        if (editable && apiRef.current) {
            apiRef.current.forEachNode((node, index) => {
                list.push(node.data)
            })
        }
        return list
    }, [editable, apiRef.current])

    /**删除 */
    const remove = useCallback<API.remove>((removeChildren, cb) => {
        const selectedNodes = apiRef.current.getSelectedNodes()
        const selected = selectedNodes.map(node => node.data)
        return new Promise((res, rej) => {
            let allowDelete: boolean | Promise<boolean> = true
            if (cb) allowDelete = cb(selected)
            res(allowDelete)
        }).then(allowDelete => {
            if (allowDelete) {
                if (selectedNodes.length) {
                    return dataManage.remove(selectedNodes, removeChildren).then(rows => {
                        apiRef.current.updateRowData({
                            remove: rows.map(node => node.data)
                        })
                    })
                }
            }
            return Promise.reject()
        })
    }, [])

    /**取消编辑 */
    const cancel = useCallback<API.cancel>(
        () => {
            if (onEditableChange) {
                apiRef.current.setRowData(originList)
                onEditableChange(false)
            }
        },
        [originList],
    )

    const editApi = useMemo<Api>(() => {
        const { isChanged, canRedo, canUndo } = dataManage
        return {
            isChanged,
            canRedo,
            canUndo,
            deletable: selectedKeys && selectedKeys.length > 0,
            undo() {
                dataManage.undo()
            },
            redo() {
                dataManage.redo()
            },
            add(index: number = 0, item) {
                dataManage.create(index, item as T)
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
            remove,
            /**取消 */
            cancel,
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
    }, [remove, cancel, editDataSource, selectedKeys])

    const onGridReady = useCallback((params: GridReadyEvent) => {
        apiRef.current = params.api
        columnsRef.current = params.columnApi

        onReady && onReady(params)
    }, [onReady])

    const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
        const rows = event.api.getSelectedRows();
        const keys = rows.map(item => getRowNodeId(item))
        typeof onSelect === "function" && onSelect(keys, rows);
    }, [onSelect, getRowNodeId])
    // 处理selection- 双向绑定selectKeys
    useEffect(() => {
        if (selectedKeys && apiRef.current) {
            if (selectedKeys.length == 0) {
                apiRef.current.deselectAll();
            } else {
                selectedKeys.map(id => {
                    const nodeItem = apiRef.current.getRowNode(id);
                    nodeItem.setSelected(true, rowSelection === 'single')
                })
            }
        }
    }, [selectedKeys, apiRef.current, rowSelection])
    // 处理selection-end
    //columns
    const defaultSelection = !isEmpty(gantSelection) && showDefalutCheckbox && !(treeData && isServer);
    const columns = useMemo<ColDef[] | ColGroupDef[]>(() => {
        return mapColumns<T>(columnDefs, editable, size, getRowNodeId, defaultSelection, defaultSelectionCol, rowSelection)
    }, [columnDefs, editable, rowSelection, size, getRowNodeId, defaultSelectionCol, defaultSelection, rowSelection])
    //columns-end
    useEffect(() => {
        if (isfunc(onEdit) && editable) {
            onEdit(editApi)
        }
    }, [onEdit, editable, editApi])
    const getDataPath = useCallback((data) => {
        return data.treeDataPath;
    }, [])

    const cellValueChanged = useCallback(
        (changed) => {
            dataManage.modify(changed)
        },
        [],
    )
    return (
        <>
            <Spin spinning={loading}>
                <div style={{ width, height }} className={classnames('gant-grid', `gant-grid-${getSizeClassName(size)}`)} >
                    <div className="ag-theme-balham" style={{ width: '100%', height: computedPagination ? 'calc(100% - 30px)' : '100%' }}>
                        <AgGridReact
                            frameworkComponents={{
                                "gantRenderCol": RenderCol
                            }}
                            onSelectionChanged={onSelectionChanged}
                            columnDefs={columns}
                            rowSelection={rowSelection}
                            getRowNodeId={getRowNodeId}
                            onGridReady={onGridReady}
                            undoRedoCellEditing
                            enableFillHandle
                            defaultColDef={{
                                resizable,
                                sortable,
                                filter,
                                minWidth: 100,
                            }}
                            rowMultiSelectWithClick
                            headerHeight={24}
                            floatingFiltersHeight={20}
                            getDataPath={getDataPath}
                            rowHeight={size == "small" ? 24 : 32}
                            singleClickEdit
                            {...gridPartProps}
                            {...selection}
                            {...orignProps}
                            suppressRowDrag
                            /**单元格数据变化 */
                            onCellValueChanged={cellValueChanged}
                            /** 这个属性可以在数据变化的时候转化一个transaction用于updateRowData,所以可以保持住原有的排序、过滤、选中等状态。同时还能计算出编辑前后的差异 */
                            deltaRowDataMode
                        />
                    </div>
                    {/* 分页高度为30 */}
                    {computedPagination && <Pagination className="gant-grid-pagination" {...computedPagination} />}
                </div>
            </Spin>
        </>
    )
}

Grid.defaultProps = defaultProps

export default Grid
