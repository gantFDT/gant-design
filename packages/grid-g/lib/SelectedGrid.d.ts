import React from 'react';
import { ColDef } from 'ag-grid-community';
interface SelectedGridProps {
    columnDefs: ColDef[];
    rowData: any[];
    onChange: (keys: string[], rows: any[]) => void;
    getRowNodeId: any;
    apiRef?: any;
    selectedBoxHeight?: number;
    selectedBoxWidth?: number;
    locale?: any;
}
declare const _default: React.NamedExoticComponent<SelectedGridProps>;
export default _default;
