import React from 'react';
declare type Item = {
    title: string;
    [key: string]: any;
};
export interface FlipOverFooterProps {
    prefixCls: string;
    data: Item[];
    nowKey: string;
    className?: string;
    style?: React.CSSProperties;
    itemKey?: string;
    onSelectedChange: (nowKey: string, record: Item) => void;
}
declare const FlipOverFooter: {
    (props: FlipOverFooterProps): React.JSX.Element;
    defaultProps: {
        data: any[];
        itemKey: string;
        style: {};
    };
};
export default FlipOverFooter;
