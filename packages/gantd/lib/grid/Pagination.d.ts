import React from 'react';
declare const _default: React.NamedExoticComponent<Pick<import("./interface").ProtoExtends<import("antd/lib/pagination").PaginationProps, {
    beginIndex?: number;
    onChange?: (beginIndex: number, pageSize?: number, current?: number, countLimit?: number) => void;
    addonAfter?: React.ReactNode;
    addonBefore?: React.ReactNode;
    countLimit?: number;
    numberGoToMode?: boolean;
    onRefresh?: () => void;
    mode?: "default" | "limit";
    tooltipTotal?: () => number;
    align?: import("antd/lib/collapse/Collapse").ExpandIconPosition;
    Component?: any;
}>, "disabled" | "style" | "size" | "locale" | "onChange" | "prefixCls" | "className" | "role" | "addonBefore" | "addonAfter" | "itemRender" | "mode" | "align" | "total" | "defaultCurrent" | "current" | "defaultPageSize" | "pageSize" | "hideOnSinglePage" | "showSizeChanger" | "pageSizeOptions" | "showQuickJumper" | "showTotal" | "simple" | "selectPrefixCls" | "showLessItems" | "beginIndex" | "countLimit" | "numberGoToMode" | "onRefresh" | "tooltipTotal" | "Component">>;
export default _default;
export declare const paginationShowTotal: (total: any, range: any, limit: any, tooltipTotal: any) => JSX.Element;
