import React, { Component } from 'react';
import { SelectProps, SelectValue as AntSelectValue } from 'antd/lib/select';
import { WithBasicProps } from '../compose/withbasic';
declare type ProtoExtends<T, U> = U & {
    [K in Exclude<keyof T, keyof U>]?: NonNullable<T[K]>;
};
export declare enum ValueType {
    number = "number",
    string = "string"
}
declare const defaultprop: {
    query: any;
    valueProp: string;
    valuePropType: string;
    labelProp: string;
    style: {};
    dataSource: any[];
    multiple: boolean;
    allowClear: boolean;
    showSearch: boolean;
    readOnly: boolean;
    useStorage: boolean;
    useCache: boolean;
    optionLabel: any;
    isFilter: boolean;
    hideSelected: boolean;
    onSearch: (_: any) => any;
    onSelect: (_: any) => any;
    onChange: (_: any) => any;
    onDeselect: (_: any) => any;
    afterQuery: (_: any) => any;
    onDropdownVisibleChange: (_: any) => any;
    blurOnSelect: boolean;
    wrap: boolean;
    historyLength: number;
    customNotDataContent: string;
};
declare type NArray<T> = T | T[];
export declare type SelectValue = AntSelectValue | NArray<boolean>;
export declare type Query<T> = (f: string) => Promise<T[]>;
declare type Label = NArray<string>;
declare type DefaultProps<R> = ProtoExtends<typeof defaultprop, {
    query?: Query<R>;
    dataSource?: R[];
    style?: React.CSSProperties;
    optionLabel?: Label;
    multiple?: boolean;
    onSelect?: (k: string, item: R) => void;
    selectorId?: string;
    onChange?: (key: SelectValue, items: R[]) => void;
    wrap?: boolean;
    onApiRef?: (api: any) => void;
    customLabel: (data: any) => any;
}>;
declare type BasicSelectorProps<T, R> = ProtoExtends<SelectProps<T>, DefaultProps<R>>;
export declare type SelectorProps<T, R> = ProtoExtends<WithBasicProps, BasicSelectorProps<T, R>>;
export default class Selector<T, R> extends Component<SelectorProps<T, R>> {
    render(): JSX.Element;
}
export {};
