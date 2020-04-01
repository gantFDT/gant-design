
import { ColGroupDef, ColDef } from 'ag-grid-community'

import { Columns } from './index'

type Col = ColGroupDef | ColDef

function itemisgroup(item, children): item is ColGroupDef {
    return !!children
}

export const mapColumns = <T>(columns: Columns<T>[], editable: boolean): Col[] => {
    return columns.map(({ title: headerName, dataIndex: field, children, ...item }) => {
        const colDef = {
            ...item,
            headerName,
            field,
            editable
        } as Col
        if (itemisgroup(colDef, children)) {
            if (children && children.length) {
                colDef.children = mapColumns(children, editable)
            }
        }
        return colDef
    })
}