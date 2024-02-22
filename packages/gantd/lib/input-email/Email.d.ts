import React, { Component } from 'react';
import { WithBasicProps } from '../compose/withbasic';
export interface GantEmailProps extends WithBasicProps {
    value?: string;
    defaultValue?: string;
    dropdownMenuStyle?: React.CSSProperties;
    autoFocus?: boolean;
    backfill?: boolean;
    onChange?: (value: string) => void;
    disabled?: boolean;
    defaultActiveFirstOption?: boolean;
    allowClear?: boolean;
    dropdownClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}
export default class EmailWrapper extends Component<GantEmailProps> {
    render(): React.JSX.Element;
}
