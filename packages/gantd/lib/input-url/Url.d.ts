import React from 'react';
import { InputProps } from 'antd/lib/input';
import { WithBasicProps } from '../compose/withbasic';
export interface GantUrlProps extends InputProps, WithBasicProps {
    onChange?: (val: any) => void;
}
/**
 * 普通模式下与Input一样
 */
declare class Url extends React.Component<GantUrlProps> {
    render(): JSX.Element;
}
export default Url;
