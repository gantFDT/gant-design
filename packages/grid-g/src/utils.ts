
import { useCallback } from 'react'
import { ColGroupDef, ColDef, IsColumnFuncParams, IsColumnFunc } from 'ag-grid-community'
import { get, isNumber, isEmpty } from 'lodash'
import { PaginationProps } from 'antd/lib/pagination'
import { Columns, RowSelection, ColumnEdiatble } from './interface'
import { Size, DataActions } from './interface'
import EditorCol from './GridEidtColumn'
import RenderCol from './GirdRenderColumn'

type Col = ColGroupDef | ColDef

function itemisgroup(item, children): item is ColGroupDef {
    return !!children
}

function ColEditableFn(fn: ColumnEdiatble<any>): IsColumnFunc | boolean {
    if (isbool(fn)) return fn
    return ({ data }) => fn(data)
}

export const mapColumns = <T>(columns: Columns<T>[], editable: boolean, rowSelection: RowSelection, size: Size, getRowNodeId: any): Col[] => {

    const cheboxIndex = get(rowSelection, "checkboxIndex")

    function getColumnDefs(columns: Columns<T>[]) {
        return columns.map(({ title: headerName, fieldName: field, children, render, editConfig, fixed, ...item }, index) => {
            const ColEditable = typeof editConfig !== 'undefined'

            const colDef = {
                ...item,
                headerName,
                field,
                cellRendererParams: {
                    size,
                    render,
                    rowkey: getRowNodeId
                },
                cellRendererFramework: RenderCol,
                cellClass: (params: any) => {
                    return get(params, 'data._rowType') ? `gant-grid-cell gant-grid-cell-${params.data._rowType}` : ""
                }
            } as Col


            if (!itemisgroup(colDef, children)) {
                colDef.checkboxSelection = typeof cheboxIndex === "number" && cheboxIndex === index

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

    return getColumnDefs(columns)
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
    if (!rowData[field] !== value) return false;
    return newData
}

export function flattenTreeData(dataSoruce: any[], getRowNodeId, pathArray: string[] = []): any[] {
    let treeData: any[] = []
    dataSoruce.map((item: any) => {
        const { children, ...itemData } = item;
        const treeDataPath = [...pathArray, getRowNodeId(itemData)]
        treeData.push({ ...itemData, treeDataPath })
        if (children && children.length) {
            const childrenTreeData = flattenTreeData(children, getRowNodeId, treeDataPath);
            [].push.apply(treeData, childrenTreeData);
        }
    })
    return treeData
}


export function isPagitation(p: PaginationProps): p is PaginationProps {
    return typeof p === 'object'
}

export function usePagination(pagitation: PaginationProps): PaginationProps {
    if (isPagitation(pagitation)) {
        const showTotal = useCallback((total, range) => total > 0 ? `第${range[0]} - ${range[1]}条，共${total}条` : '', [])
        const defaultPagetation: PaginationProps = {
            size: 'small',
            defaultPageSize: 20,
            defaultCurrent: 1,
            pageSizeOptions: ["20", "50", "80", "120"],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal
        }
        return { ...defaultPagetation, ...pagitation }
    }

}
