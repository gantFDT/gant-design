import { Component } from 'react';
import { WithBasicProps } from '../compose/withbasic';
export interface GantInputLangProps extends WithBasicProps {
    allowClear?: boolean;
    placeholder?: string;
    onChange?: (val: value) => void;
    value?: value | {};
    localeList?: localeItem[];
    [props: string]: any;
}
interface value {
    locale: string;
    value: string;
}
interface localeItem {
    locale: string;
    label: string;
}
export default class InputLangWapper extends Component<GantInputLangProps> {
    render(): JSX.Element;
}
export {};
