import React, { Component } from 'react';
import { WithEditInProps } from '../compose/withbasic';
import { GetText } from '../compose/renderText';
interface DataCellProps extends WithEditInProps<any> {
    children?: (props: any) => React.ReactNode | Element | null;
    renderText?: GetText<any>;
    popupClassName?: string;
    disabledBlur?: boolean;
    [propsname: string]: any;
}
export default class DataEditCell extends Component<DataCellProps> {
    componentDidUpdate(prevProps: any): void;
    render(): React.JSX.Element;
}
export {};
