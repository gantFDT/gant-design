import { Component } from 'react';
import { WithBasicProps } from '../compose/withbasic';
export interface GantTelePhoneProps extends WithBasicProps {
    value?: value;
    onChange?: (val: value) => void;
    placeholder?: string;
    allowClear?: boolean;
}
interface value {
    key: string;
    value: string;
}
export default class TelePhoneWrapper extends Component<GantTelePhoneProps> {
    render(): JSX.Element;
}
export {};
