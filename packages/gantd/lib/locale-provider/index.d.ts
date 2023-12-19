import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface Locale {
    locale: string;
    AutoReload: any;
    SmartTable: any;
    Modal: any;
    SchemaForm: any;
}
export interface LocaleProviderProps {
    locale: Locale;
    children?: React.ReactNode;
}
export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
    static defaultProps: {
        locale: {};
    };
    static childContextTypes: {
        antLocale: PropTypes.Requireable<object>;
    };
    constructor(props: LocaleProviderProps);
    getChildContext(): {
        antLocale: {
            exist: boolean;
            locale: string;
            AutoReload: any;
            SmartTable: any;
            Modal: any;
            SchemaForm: any;
        };
    };
    componentDidUpdate(prevProps: LocaleProviderProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
