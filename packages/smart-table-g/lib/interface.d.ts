import React from 'react';
import { GantTableListOuterProps, GColumnProps } from 'table-g';
export declare enum Fields {
    Input = "Input",
    InputNumber = "InputNumber",
    InputUrl = "InputUrl",
    InputTelePhone = "InputTelePhone",
    InputCellPhone = "InputCellPhone",
    InputEmail = "InputEmail",
    InputLanguage = "InputLanguage",
    InputMoney = "InputMoney",
    TextArea = "TextArea",
    DatePicker = "DatePicker",
    Selector = "Selector",
    LocationSelector = "LocationSelector"
}
export interface CustomColumnProps<R> extends GColumnProps<R> {
    fieldName: string;
    title: string;
    props?: any;
    type?: string;
    fixed?: 'left' | 'right';
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    componentType?: Fields;
    render?: (text: any, record: R, index: number) => React.ReactNode;
    children?: CustomColumnProps<R>[];
}
export interface ColumnConfig {
    fieldName: string;
    checked?: boolean;
    lock?: boolean;
    fixed?: 'left' | 'right';
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    hidden?: boolean;
}
export interface PanelConfig {
    wrap?: boolean;
    isZebra?: boolean;
    bordered?: boolean;
    clickable?: boolean;
    footerDirection?: 'row' | 'row-reverse';
    heightMode?: 'full' | 'auto';
    pageSize?: number;
    columnFields: ColumnConfig[];
}
export interface ViewConfig {
    viewId: string;
    name: string;
    version: string;
    panelConfig: PanelConfig;
}
export interface SchemaProp<R> {
    supportColumnFields: CustomColumnProps<R>[];
    systemViews: ViewConfig[];
}
export interface ViewListProps {
    systemViews: ViewConfig[];
    customViews: ViewConfig[];
}
export declare type GantTableProps<T> = Omit<Partial<GantTableListOuterProps<T>>, 'columns'>;
export interface SmartTableProps<T> extends GantTableProps<T> {
    searchTableCellResizable?: boolean;
    schema: SchemaProp<T> | CustomColumnProps<T>[];
    viewSchema?: any;
    onViewChange?: (viewSchema: any) => void;
    bindKeys?: any;
    onReload?: () => void;
    bodyMinHeight?: number | string;
    bodyHeight?: number | string;
    bodyWidth?: number | string;
    pageIndex?: number;
    pageSize?: number;
    pageSizeOptions?: string[];
    isGantPageMode?: boolean;
    onPageChange?: (pageIndex: number, pageSize?: number) => void;
    totalCount?: number;
    hasExport?: boolean;
    withoutAnimation?: boolean;
}
export interface SmartTableType {
    <T>(props: SmartTableProps<T>): React.ReactElement;
    setFields?: (field: Object) => void;
}
export declare enum langEnum {
    'zh-CN' = "zh-CN",
    'en-US' = "en-US"
}
export interface LocalWrapperProps<T> extends SmartTableProps<T> {
    locale?: any;
    i18n?: langEnum;
}
