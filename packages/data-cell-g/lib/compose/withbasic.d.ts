import React from 'react';
import EditStatus from '../edit-status';
export declare type OnSave = <T>(id: string, value: T, cb: Function) => void;
export interface WithBasicProps {
    onSave?: OnSave;
    onCancel?: () => void;
    edit?: EditStatus;
    allowEdit?: boolean;
    disabledBlur?: boolean;
    isInner?: boolean;
    confirmable?: boolean;
    wrapperStyle?: React.CSSProperties;
    wrapperClassName?: string;
    autoFocus?: boolean;
    emptyText?: string;
}
export interface WithEditInProps<T> extends WithBasicProps {
    value?: T;
    onChange?: (v: T) => void;
    onBlur?: Function;
    onFocus?: Function;
}
export declare const withBasic: (popupClassName?: string) => any;
