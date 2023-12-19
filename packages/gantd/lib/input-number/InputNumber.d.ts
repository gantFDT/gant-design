import React from 'react';
import { WithBasicProps } from '../compose/withbasic';
import { InputNumberProps } from 'antd/lib/input-number';
export interface GantInputNumberProps extends WithBasicProps, InputNumberProps {
}
declare class InputNumber extends React.Component<GantInputNumberProps> {
    render(): JSX.Element;
}
export default InputNumber;
