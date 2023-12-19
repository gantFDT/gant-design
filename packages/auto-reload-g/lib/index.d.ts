import React from 'react';
export interface LocaleProps {
    tips: string;
    close: string;
    open: string;
    set: string;
    unit: string;
}
export interface Props {
    locale?: LocaleProps;
    prefixCls?: string;
    auto?: boolean;
    interval?: number;
    refresh?: () => void;
    time?: string;
    className?: string;
    style?: object;
}
declare const AutoReload: React.SFC<Props>;
export default AutoReload;
