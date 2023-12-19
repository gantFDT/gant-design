import React from 'react';
import { AnchorProps } from 'antd/lib/anchor';
declare type layout = 'vertical' | 'horizontal';
interface ListItem {
    key: string;
    id: string;
    title: string;
    complete?: boolean;
    isInvalid?: boolean;
}
export interface GantAnchorProps extends AnchorProps {
    minHeight?: number | string;
    layout?: layout;
    onLayoutChange?: (layout: layout) => void;
    fixedTop?: number;
    list?: ListItem[];
    content?: React.ReactNode | Element | string | number | null | React.ReactNode[];
}
declare const GantAnchor: (props: GantAnchorProps) => JSX.Element;
export default GantAnchor;
