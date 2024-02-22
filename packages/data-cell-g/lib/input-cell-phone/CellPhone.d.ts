import React, { Component } from 'react';
import { WithBasicProps } from '../compose/withbasic';
interface value {
    key?: string;
    value?: string;
}
export interface GantCellPhoneProps extends WithBasicProps {
    value?: value;
    onChage?: (val: value) => void;
    placeholder?: string;
    allowClear?: boolean;
}
export default class CellPhoneWrapper extends Component<GantCellPhoneProps> {
    render(): React.JSX.Element;
}
export {};
