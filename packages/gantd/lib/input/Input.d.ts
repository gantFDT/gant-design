import { InputProps } from 'antd/lib/input';
import React from 'react';
import { WithBasicProps } from '../compose/withbasic';
import Password from './Password';
import Search from './Search';
import TextArea from './TextArea';
export interface GantInputProps extends InputProps, WithBasicProps {
    strict?: boolean;
    trimmed?: boolean;
    onChange?: (value: any) => void;
    wrapperRef?: any;
}
declare class Input extends React.Component<GantInputProps> {
    static TextArea: typeof TextArea;
    static Search: typeof Search;
    static Password: typeof Password;
    static defaultProps: GantInputProps;
    static setDefaultProps: (props: GantInputProps) => void;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    render(): JSX.Element;
}
export default Input;
