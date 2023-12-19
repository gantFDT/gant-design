/// <reference types="react" />
import { RowClickedEvent } from 'ag-grid-community';
import GridManager from '../gridManager';
import type { Columns } from '../interface';
interface GridDetailProps {
    columns: Columns[];
    clickedEvent: RowClickedEvent;
    editable: boolean;
    onCellEditChange: (record: any, fieldName: string, newValue: any, oldValue: any) => any;
    onCellEditingChange: (record: any, fieldName: string, newValue: any, oldValue: any, params: any) => any;
    gridManager: GridManager | any;
    closeDrawer: () => void;
    height: number | string;
    context: any;
    rowIndex: number;
}
declare const GridDetail: (props: GridDetailProps) => JSX.Element;
export default GridDetail;
