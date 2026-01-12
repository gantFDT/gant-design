import React from 'react';
declare const _default: React.NamedExoticComponent<Pick<import("./interface").ProtoExtends<import("antd/lib/pagination").PaginationProps, {
    beginIndex?: number;
    onChange?: (beginIndex: number, pageSize?: number, current?: number, countLimit?: number) => void;
    addonAfter?: React.ReactNode;
    addonBefore?: React.ReactNode;
    countLimit?: number;
    numberGoToMode?: boolean;
    onRefresh?: () => void;
    mode?: "limit" | "default";
    tooltipTotal?: () => number;
    align?: "left" | "right";
    Component?: any;
    countLimitStyle?: React.CSSProperties;
}>, "style" | "locale" | "className" | "total" | "defaultCurrent" | "disabled" | "current" | "defaultPageSize" | "pageSize" | "onChange" | "hideOnSinglePage" | "showSizeChanger" | "pageSizeOptions" | "showQuickJumper" | "showTotal" | "size" | "simple" | "prefixCls" | "selectPrefixCls" | "itemRender" | "role" | "showLessItems" | "beginIndex" | "addonAfter" | "addonBefore" | "countLimit" | "numberGoToMode" | "onRefresh" | "mode" | "tooltipTotal" | "align" | "Component" | "countLimitStyle">>;
export default _default;
export declare const paginationShowTotal: (total: any, range: any, limit: any, tooltipTotal: any) => React.JSX.Element;
