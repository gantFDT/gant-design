import React from 'react';
import { EditConfig, Record } from './index';
interface BodyCellProps<T> {
    record: T;
    dataIndex: string;
    rowIndex: number;
    editConfig: EditConfig<T>;
    sortable: boolean;
    wrap: boolean;
    light: boolean;
    className: string;
    style: React.CSSProperties;
    [k: string]: any;
}
declare const BodyCell: <T extends Record = {}>({ record, dataIndex, rowIndex, editConfig, sortable, wrap, light, children, className, style, ...props }: BodyCellProps<T>) => JSX.Element;
export default BodyCell;
