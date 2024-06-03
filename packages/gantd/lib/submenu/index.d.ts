import React from 'react';
import { ClickParam } from 'antd/lib/menu';
declare type menuItem = {
    title: string;
    key: string;
    icon: [React.ReactNode, string];
    count: number;
    disabled?: boolean;
    [key: string]: any;
};
declare type MenuMode = 'horizontal' | 'inline';
export interface SubmenuIF {
    collapsed: boolean;
    mode: MenuMode;
    selectedKey?: string;
    width: number | string;
    fixedTopHeight?: number;
    zIndex?: number;
    subMinHeight: number | string;
    collapsedWidth: number | string;
    extra?: React.ReactNode;
    menuData: menuItem[];
    bordered?: boolean;
    style?: React.CSSProperties;
    classname?: string;
    showMenuMagnet: boolean;
    showFlipOverFooter: boolean;
    onSwitchChange: (nowMode: MenuMode) => void;
    onCollapseChange: (collapsed: boolean) => void;
    onSelectedChange: (key: string, record: menuItem, e?: Event) => void;
}
export default class Submenu extends React.Component<any, Partial<SubmenuIF>> {
    static defaultProps: {
        collapsed: boolean;
        mode: string;
        width: number;
        fixedTopHeight: number;
        collapsedWidth: number;
        subMinHeight: number;
        selectedKey: string;
        menuData: any[];
        bordered: boolean;
        showMenuMagnet: boolean;
        showFlipOverFooter: boolean;
        style: {};
    };
    warpRef: null | HTMLDivElement;
    prefixCls: null | string;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentWillUnmount(): void;
    setMenuWidthByStatusChange: () => void;
    handleScroll: () => void;
    onSwitchClick: () => void;
    toggleCollapsed: () => void;
    onClick: ({ key, item }: ClickParam) => void;
    onFooterSelectedChange: (nowKey: any, record: any) => void;
    renderSubMenu(prefixCls: any): React.JSX.Element;
    renderInlineMenu(prefixCls: any): React.JSX.Element;
    renderHorMenu(prefixCls: any): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
