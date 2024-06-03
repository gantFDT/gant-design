import React from 'react';
export interface LocaleInterface {
    [key: string]: any;
}
export interface Props {
    children: (locale: LocaleInterface) => React.ReactNode;
}
declare const _default: (props: Props) => React.JSX.Element;
export default _default;
