
import { useCallback, useMemo } from 'react'
import { ColGroupDef, ColDef, IsColumnFuncParams, IsColumnFunc } from 'ag-grid-community'
import { get, isNumber, isEmpty } from 'lodash'
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

export const mapColumns = <T>(columns: Columns<T>[], editable: boolean, size: Size, getRowNodeId: any, defaultSelection: boolean, defaultSelectionCol: ColDef, rowSelection): Col[] => {
    function getColumnDefs(columns: Columns<T>[]) {
        return columns.map(({ title: headerName, fieldName: field, children, render, editConfig, cellRenderer, fixed, ...item }, index) => {
            const ColEditable = typeof editConfig !== 'undefined';
            console.log("item", item)
            const colDef = {
                headerName,
                field,
                cellRendererParams: {
                    render,
                    // innerRenderer: () => 11111,
                },
                cellClass: (params: any) => {
                    const { colDef: { field }, value } = params
                    const data = get(params, 'data', {});
                    const { _rowType, _rowData = {} } = data;
                    if (_rowType === DataActions.modify) {
                        if (get(_rowData, `${field}`) !== value) return "gant-grid-cell gant-grid-cell-modify"
                        return ""
                    }
                    return get(params, 'data._rowType') ? `gant-grid-cell gant-grid-cell-${params.data._rowType}` : ""
                },
                cellRenderer: cellRenderer ? cellRenderer : "gantRenderCol",
                ...item,

            } as ColDef

            if (!itemisgroup(colDef, children)) {
                // 当前列允许编辑
                if (ColEditable) {
                    colDef.cellEditorParams = {
                        size,
                        props: editConfig.props,
                        changeFormatter: editConfig.changeFormatter,
                        rowkey: getRowNodeId
                    }
                    colDef.cellEditorFramework = EditorCol(editConfig.component)
                    colDef.editable = editable ? ColEditableFn(editConfig.editable) : false
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

export function trackEditValueChange(data: any, field: string, cacheValue: any, value: any) {
    let newRowData: any = data;
    if (data._rowType === DataActions.modify) {
        const rowData = get(data, `_rowData`, {})
        if (cacheValue === rowData[field]) {
            delete rowData[field];
        } else if (!rowData[field] && rowData[field] !== value) {
            rowData[field] = value
        }

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
            treeData.push({ ...itemData, treeDataPath, parent: true })
            const childrenTreeData = flattenTreeData(children, getRowNodeId, treeDataPath, treeDataChildrenName);
            Array.prototype.push.apply(treeData, childrenTreeData);
        } else {
            treeData.push({ ...itemData, treeDataPath })
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
            pageSizeOptions: ["20", "50", "80", "120"],
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
                    onChange(beginIndex, pageSize)
                }
            },
            [onChange],
        )
        pagitation.onChange = onPageChange

        if (isnumber(pagitation.beginIndex)) {
            pagitation.current = pagitation.beginIndex / pageSize + 1
        }
        return { ...defaultPagetation, ...pagitation, onShowSizeChange: onPageChange }
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

export function createFakeServer(fakeServerData, getRowNodeId) {
    function FakeServer(allData) {
        this.data = allData;
    }
    FakeServer.prototype.getData = function (request) {
        function extractRowsFromData(groupKeys, data) {
            if (groupKeys.length === 0) return data;
            var key = groupKeys[0];
            for (var i = 0; i < data.length; i++) {
                if (getRowNodeId(data[i]) === key) {
                    const children = data[i].children ? data[i].children.slice() : []
                    return extractRowsFromData(
                        groupKeys.slice(1),
                        children
                    );
                }
            }
        }
        return extractRowsFromData(request.groupKeys, this.data);
    };
    return new FakeServer(fakeServerData);
}
export function createServerSideDatasource(fakeServer) {
    function ServerSideDatasource(fakeServer) {
        this.fakeServer = fakeServer;
    }
    ServerSideDatasource.prototype.getRows = function (params) {
        var rows = this.fakeServer.getData(params.request);
        params.successCallback(rows, rows.length);
    };
    return new ServerSideDatasource(fakeServer);
}