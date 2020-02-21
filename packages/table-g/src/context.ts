import React from 'react'
import { EditStatus } from '@data-cell'
import { Record, RowKey, RowSelection, GColumnProps } from './index'

const DataContext = React.createContext({} as {
    isTree: boolean,
    cellPadding: number | string,
    dataSource: Record[],
    setDataSource: React.Dispatch<React.SetStateAction<Record[]>>,
    computedRowKey: RowKey<Record>,
    editable: EditStatus,
    computedColIndex: string[],
    computedRowSelection: RowSelection<Record>
})
const RowContext = React.createContext({} as {
    dataRowKey: string
})
const TableContext = React.createContext({} as {
    light: boolean,
    spacing: React.ReactText,
    dataSource: Record[],
    emitReCompute: number,
    headerFixed: boolean,
    tableColumns: GColumnProps<any>[],
    onResize: () => void,
    virtualScroll: boolean,
    mainHeight: number
})
const TableBodyWrapperContext = React.createContext({} as {
    onDragEnd: (result: any) => void
})

export {
    DataContext,
    RowContext,
    TableContext,
    TableBodyWrapperContext
}