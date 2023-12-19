import { ReactNode } from 'react';
interface HeaderIF {
    type?: 'line' | 'num' | 'icon';
    bottomLine?: boolean;
    title?: string | ReactNode;
    beforeExtra?: ReactNode;
    extra?: ReactNode;
    icon?: string | ReactNode;
    color?: string;
    style?: object;
    className?: string;
    num?: number;
    prefixCls?: string;
    size?: 'small' | 'large' | 'default';
    suppressMap?: boolean;
}
export declare const sizeDefinitions: {
    height: {
        small: number;
        default: number;
        large: number;
    };
    title: {
        small: number;
        default: number;
        large: number;
    };
    lineWidth: {
        small: number;
        default: number;
        large: number;
    };
    lineHeight: {
        small: number;
        default: number;
        large: number;
    };
    icon: {
        small: number;
        default: number;
        large: number;
    };
    marginLeft: {
        small: number;
        default: number;
        large: number;
    };
    num: {
        minWidth: {
            small: number;
            default: number;
            large: number;
        };
        fontSize: {
            small: number;
            default: number;
            large: number;
        };
        lineHeight: {
            small: number;
            default: number;
            large: number;
        };
        height: {
            small: number;
            default: number;
            large: number;
        };
    };
};
declare const Header: (headerProps: HeaderIF) => JSX.Element;
export { setGlobalConfig } from './utils';
export default Header;
