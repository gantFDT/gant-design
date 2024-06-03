import { RowClickedEvent } from 'ag-grid-community';
import React from 'react';
import GridManager from './gridManager';
interface GantGridRowFormRendererProps {
    columns?: any[];
    clickedEvent?: RowClickedEvent;
    defaultDrawerWidth?: number;
    gridManager?: GridManager;
    visible?: boolean;
    closeDrawer: () => void;
    onCellEditChange?: (record: any, fieldName: string, newValue: any, oldValue: any) => any;
    onCellEditingChange?: (record: any, fieldName: string, newValue: any, oldValue: any, params?: any) => any;
    customDrawerContent?: (params: any) => any;
    editable?: boolean;
    context: any;
    clickRowIndex: number;
}
export default function GantGridRowFormRenderer(props: GantGridRowFormRendererProps): React.JSX.Element;
export {};
