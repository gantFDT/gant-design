
import { ColGroupDef, ColDef } from 'ag-grid-community'
import { get, isNumber } from 'lodash'
import { Columns, RowSelection } from './index'

type Col = ColGroupDef | ColDef

function itemisgroup(item, children): item is ColGroupDef {
    return !!children
}

export const mapColumns = <T>(columns: Columns<T>[], editable: boolean, rowSelection: RowSelection): Col[] => {

    const cheboxIndex = get(rowSelection, "checkboxIndex")

    return columns.map(({ title: headerName, dataIndex: field, children, ...item }, index) => {
        const colDef = {
            ...item,
            headerName,
            field,
            editable
        } as Col

        if (!itemisgroup(colDef, children)) {
            colDef.checkboxSelection = typeof cheboxIndex === "number" && cheboxIndex === index
        }
        else if (itemisgroup(colDef, children)) {
            if (children && children.length) {
                colDef.children = mapColumns(children, editable, rowSelection)
            }
        }
        return colDef
    })
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