import React from 'react';
export interface IExceptionProps {
    type?: '403' | '404' | '500';
    title?: React.ReactNode;
    desc?: React.ReactNode;
    img?: string;
    actions?: React.ReactNode;
    linkElement?: string | any;
    style?: React.CSSProperties;
    className?: string;
    backText?: React.ReactNode;
    redirect?: string;
    [key: string]: any;
}
declare const Exception: (props: IExceptionProps) => JSX.Element;
export default Exception;
