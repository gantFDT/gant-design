import React from 'react';
import { EditStatus } from 'data-cell-g';
import { Record, RowKey, RowSelection, GColumnProps } from './index';
declare const DataContext: React.Context<{
    isTree: boolean;
    cellPadding: number | string;
    dataSource: Record[];
    setDataSource: React.Dispatch<React.SetStateAction<Record[]>>;
    computedRowKey: RowKey<Record>;
    editable: EditStatus;
    computedColIndex: string[];
    computedRowSelection: RowSelection<Record>;
    originRowHeight: number;
    originLineHeight: string;
}>;
declare const RowContext: React.Context<{
    dataRowKey: string;
    originRecord: Record;
}>;
declare const TableContext: React.Context<{
    light: boolean;
    spacing: React.ReactText;
    dataSource: Record[];
    emitReCompute: number;
    headerFixed: boolean;
    tableColumns: GColumnProps<any>[];
    onResize: () => void;
    virtualScroll: boolean;
    mainHeight: number;
    tableGroup: Map<string, HTMLTableElement>;
    outlineNum: number;
    thresholdInner: number;
    renderRowKeys: string[];
    storageWidth: number | string;
    scrollY: number | string;
}>;
declare const TableBodyWrapperContext: React.Context<{
    onDragEnd: (result: any) => void;
}>;
export { DataContext, RowContext, TableContext, TableBodyWrapperContext };
