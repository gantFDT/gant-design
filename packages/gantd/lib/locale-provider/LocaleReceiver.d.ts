import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface LocaleReceiverProps {
    componentName?: string;
    defaultLocale?: object | Function;
    children: (locale: object, localeCode?: string, fullLocale?: object) => React.ReactNode;
}
interface LocaleInterface {
    [key: string]: any;
}
export interface LocaleReceiverContext {
    gantLocale?: LocaleInterface;
}
export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
    static defaultProps: {
        componentName: string;
    };
    static contextTypes: {
        gantLocale: PropTypes.Requireable<object>;
    };
    context: LocaleReceiverContext;
    getLocale(): any;
    getLocaleCode(): any;
    render(): React.ReactNode;
}
export {};
