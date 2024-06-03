import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
export interface GantGroupCellRendererProps extends ICellRendererParams {
    render?: (showValue: any, data: any, rowIndex: number, params: ICellRendererParams) => any;
    showFolder?: boolean;
    [propsname: string]: any;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<GantGroupCellRendererProps, React.Key> & React.RefAttributes<unknown>>>;
export default _default;
