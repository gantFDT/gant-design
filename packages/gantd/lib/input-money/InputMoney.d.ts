import React, { Component } from 'react';
import { WithBasicProps } from '../compose/withbasic';
interface value {
    key?: string;
    value?: string;
}
export interface GantInputMoneyProps extends WithBasicProps {
    onChange?: (val: value) => void;
    value?: value;
    placeholder?: string;
    allowClear?: boolean;
    precision?: number;
}
export default class InputMoneyWrapper extends Component<GantInputMoneyProps> {
    render(): React.JSX.Element;
}
export {};
