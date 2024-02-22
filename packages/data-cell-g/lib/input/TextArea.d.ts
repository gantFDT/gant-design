import React from 'react';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import { WithBasicProps } from '../compose/withbasic';
export interface GantTextAreaProps extends TextAreaProps, WithBasicProps {
    onChange?: (val: any) => void;
}
declare class TextArea extends React.Component<GantTextAreaProps> {
    static defaultProps: {
        style: {};
    };
    render(): React.JSX.Element;
}
export default TextArea;
