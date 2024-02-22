import React from 'react';
import { PasswordProps } from 'antd/lib/input/Password';
import { WithBasicProps } from '../compose/withbasic';
export interface GantPasswordProps extends PasswordProps, WithBasicProps {
    onChange?: (val: any) => void;
}
declare class Password extends React.Component<GantPasswordProps> {
    static defaultProps: {
        style: {};
    };
    render(): React.JSX.Element;
}
export default Password;
