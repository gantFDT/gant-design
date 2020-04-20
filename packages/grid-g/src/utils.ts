
import { useCallback, useMemo } from 'react'
import { ColGroupDef, ColDef, IsColumnFuncParams, IsColumnFunc, IServerSideGetRowsParams } from 'ag-grid-community'
import { EventEmitter } from 'events'
import { get, isNumber, isEmpty, isNil, omit, isEqual } from 'lodash'
import { List } from 'immutable'

import { PaginationProps } from 'antd/lib/pagination'
import { Columns, RowSelection, ColumnEdiatble } from './interface'
import { Size, DataActions, Pagination } from './interface'
import EditorCol from './GridEidtColumn'
import RenderCol from './GirdRenderColumn'

type Col = ColGroupDef | ColDef

function itemisgroup(item, children): item is ColGroupDef {
    return !!children
}

function ColEditableFn(fn: ColumnEdiatble<any>): IsColumnFunc | boolean {
    if (typeof fn === 'function') return ({ data }) => fn(data)
    return fn
}

export const mapColumns = <T>(columns: Columns<T>[], editable: boolean,
    size: Size, getRowNodeId: any, defaultSelection: boolean, defaultSelectionCol: ColDef,
    rowSelection, cellEvents: EventEmitter,
    isServerSideGroup: (data: any) => boolean, serverDataRequest: (params: any, groupKeys: any, successCallback: any) => any): Col[] => {

    // 移除所有已添加事件
    cellEvents.removeAllListeners()
    function getColumnDefs(columns: Columns<T>[]) {
        return columns.map(({ title: headerName, fieldName: field, children, render, editConfig, cellRenderer, fixed, cellRendererParams, ...item }, index) => {

            const ColEditable = typeof editConfig !== 'undefined';
            const colDef = {
                headerName,
                field,
                cellRendererParams: {
                    render,
                    isServerSideGroup,
                    serverDataRequest,
                    ...cellRendererParams,
                },
                cellClass: ["gant-grid-cell"],
                cellClassRules: {
                    "gant-grid-cell-modify": params => {
                        const { data: { _rowType, _rowData, idcard } = {} as any, colDef: { field }, value } = params
                        return _rowType === DataActions.modify && Reflect.has(_rowData, field) && value != get(_rowData, field)
                    },
                    "gant-grid-cell-add": params => get(params, "data._rowType") === DataActions.add,
                    // "gant-grid-cell-delete": params => get(params, "data._rowType") === DataActions.remove,
                },
                cellRenderer: cellRenderer ? cellRenderer : "gantRenderCol",
                ...item,

            } as ColDef

            if (!itemisgroup(colDef, children)) {
                // 当前列允许编辑
                if (ColEditable) {
                    const { props, changeFormatter, component, onCellChange } = editConfig
                    colDef.cellEditorParams = {
                        size,
                        props,
                        changeFormatter,
                        rowkey: getRowNodeId
                    }
                    colDef.cellEditorFramework = EditorCol(component)
                    colDef.editable = editable ? ColEditableFn(editConfig.editable) : false
                    if (onCellChange && isfunc(onCellChange)) {
                        cellEvents.on(field, onCellChange)
                    }
                }
                if (fixed) colDef.pinned = fixed
            }
            else if (itemisgroup(colDef, children)) {
                if (children && children.length) {
                    colDef.children = getColumnDefs(children)
                }
            }
            return colDef
        })
    }
    const defaultCheckboxColSelectionCol: ColDef = {
        width: 24,
        checkboxSelection: true,
        resizable: false,
        sortable: false,
        pinned: true,
        field: "defalutSelection",
        headerCheckboxSelection: rowSelection === "multiple",
        minWidth: 24,
        headerName: "",
        suppressMenu: true,
        lockPosition: true,
        lockVisible: true,
        cellStyle: {
            padding: "0px 3px"
        },
        headerClass: "gant-padding-h-3",
        ...defaultSelectionCol
    }
    return defaultSelection ? [defaultCheckboxColSelectionCol, ...getColumnDefs(columns)] : getColumnDefs(columns)
}


// 去除掉boolean类型
export type NonBool<T> = T extends boolean ? never : T


// boolean类型
export function isbool(t: any): t is boolean {
    return typeof t === 'boolean'
}
// number
export function isnumber(t: any): t is number {
    return typeof t === 'number'
}
// string
export function isstring(t: any): t is string {
    return typeof t === 'string'
}
// array
export function isarray(t: any): t is Array<any> {
    return Array.isArray(t)
}
// promise
export function isfunc(t: any): t is Function {
    return t && typeof t === "function"
}
// promise
export function ispromise(t: any): t is Promise<any> {
    return t && isfunc(t.then)
}


export const isList = function isList<T>(list: any): list is List<T> {
    return List.isList(list)
}

const nil = [null, undefined, '']

export function trackEditValueChange(data: any, field: string, cacheValue: any, value: any) {
    let newRowData: any = data;

    if (data._rowType === DataActions.modify) {
        let rowData = get(data, `_rowData`, {})
        const fieldHasChanged = Reflect.has(rowData, field)
        if (fieldHasChanged) {
            const originValue = Reflect.get(rowData, field)
            const originIsNil = ~~nil.includes(originValue)
            const currinIsNil = ~~nil.includes(cacheValue)
            const sum = originIsNil + currinIsNil
            if (sum === 2 || (sum === 0 && originValue == cacheValue)) {
                // 认定值没有改变
                // 比如之前undefined --> ""
                // 123 --> "123"
                rowData = omit(rowData, [field])
            }
        } else {
            rowData[field] = value
        }

        // if (cacheValue === rowData[field]) {
        //     delete rowData[field];
        // } else if (!rowData[field] && rowData[field] !== value) {
        //     rowData[field] = value
        // }

        if (isEmpty(rowData)) {
            const { _rowType, _rowData, ...newData } = data;
            newRowData = newData;
        } else {
            newRowData = { ...data, _rowData: rowData }
        }
    } else if (!data._rowType) {
        newRowData = { _rowData: { [field]: value }, _rowType: DataActions.modify, ...newRowData }
    }
    return newRowData
}

export function trackRenderValueChange(data: any, field: string, value: any) {
    const { _rowType, rowData, ...newData } = data;
    if (_rowType !== DataActions.modify) return false;
    if (get(rowData, `${field}`) !== value) return false;
    return newData
}

export function flattenTreeData(dataSoruce: any[], getRowNodeId, pathArray: string[] = [], treeDataChildrenName = "children"): any[] {
    let treeData: any[] = []
    dataSoruce.map((item: any) => {
        const { [treeDataChildrenName]: children, ...itemData } = item;
        const treeDataPath = [...pathArray, getRowNodeId(itemData)]
        if (children && children.length) {
            treeData.push({ ...item, treeDataPath, parent: true, })
            const childrenTreeData = flattenTreeData(children, getRowNodeId, treeDataPath, treeDataChildrenName);
            Array.prototype.push.apply(treeData, childrenTreeData);
        } else {
            treeData.push({ ...item, treeDataPath })
        }

    })
    return treeData
}


export function isPagitation(p: Pagination): p is Pagination {
    return typeof p === 'object'
}

export function usePagination(pagitation: Pagination): PaginationProps {
    if (isPagitation(pagitation)) {

        const { onChange, pageSize: size } = pagitation
        const showTotal = useCallback((total, range) => total > 0 ? `第${range[0]} - ${range[1]}条，共${total}条` : '', [])

        const defaultPagetation: Pagination = {
            size: 'small',
            defaultPageSize: 20,
            defaultCurrent: 1,
            pageSizeOptions: ["20", "50", "100", "150", "200", "500"],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal
        }

        const pageSize = useMemo(() => {
            if (isnumber(size)) {
                return size
            }
            return defaultPagetation.defaultPageSize
        }, [size])

        const onPageChange = useCallback(
            (page, pageSize) => {
                const beginIndex = (page - 1) * pageSize;
                if (onChange) {
                    onChange(beginIndex, pageSize, page)
                }
            },
            [onChange],
        )

        if (isnumber(pagitation.beginIndex)) {
            pagitation.current = pagitation.beginIndex / pageSize + 1
        }
        return { ...defaultPagetation, ...pagitation, onChange: onPageChange, onShowSizeChange: onPageChange }
    }

}
export function getSizeClassName(size: Size) {
    switch (size) {
        case "small":
            return "sm"
        default:
            return ""
    }
}

export function createFakeServer(dataManage, getRowNodeId, treeDataChildrenName) {
    function FakeServer(dataManage) {
        this.data = dataManage;
    }
    FakeServer.prototype.getData = function (request) {
        function extractRowsFromData(groupKeys, data) {
            if (groupKeys.length === 0) return data;
            var key = groupKeys[0];
            for (var i = 0; i < data.length; i++) {
                if (getRowNodeId(data[i]) === key) {
                    const children = get(data, `[${i}][${treeDataChildrenName}]`, false)
                    if (!children) return false
                    return extractRowsFromData(
                        groupKeys.slice(1),
                        children.slice()
                    );
                }
            }
        }
        return extractRowsFromData(request.groupKeys, this.data.renderList);
    };
    return new FakeServer(dataManage);
}
export function createServerSideDatasource(fakeServer, asyncCallback, cb?: (params: IServerSideGetRowsParams) => void) {
    function ServerSideDatasource(fakeServer) {
        this.fakeServer = fakeServer;
    }

    ServerSideDatasource.prototype.getRows = function (params) {
        const { request, successCallback, parentNode } = params
        var rows = this.fakeServer.getData(request);
        function requestSuccessCallBack(rows: any[], len: number) {
            successCallback(rows, len);
            cb && cb(params)
        }
        if (Array.isArray(rows)) return requestSuccessCallBack(rows, rows.length);
        asyncCallback(params, request.groupKeys, requestSuccessCallBack)
    }
    return new ServerSideDatasource(fakeServer);
}

export function isDeleted(data) {
    return get(data, "data.isDeleted") || get(data, "data._rowType") === DataActions.remove
}
