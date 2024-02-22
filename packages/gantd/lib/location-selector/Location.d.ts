import React, { Component } from 'react';
import { WithBasicProps } from '../compose/withbasic';
export interface LocationProps extends WithBasicProps {
    disabled?: boolean;
    allowClear?: boolean;
    className?: string;
    style?: React.CSSProperties;
    value?: string[];
    onChange?: (value: string[]) => void;
    popupClassName?: string;
    onPopupVisibleChange?: (popupVisible: boolean) => void;
}
export declare const getLocationNameList: (locationList: any) => any[];
export declare const getValue: ({ value }: {
    value: any;
}) => string;
export default class LocationWrapper extends Component {
    static getLocationName: (list: any) => void;
    render(): React.JSX.Element;
}
