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
    align?: "left" | "right";
    Component?: any;
    countLimitStyle?: React.CSSProperties;
}>, "style" | "mode" | "className" | "prefixCls" | "role" | "onChange" | "disabled" | "size" | "align" | "addonBefore" | "addonAfter" | "locale" | "total" | "defaultCurrent" | "current" | "defaultPageSize" | "pageSize" | "hideOnSinglePage" | "showSizeChanger" | "pageSizeOptions" | "showQuickJumper" | "showTotal" | "simple" | "selectPrefixCls" | "itemRender" | "showLessItems" | "beginIndex" | "countLimit" | "numberGoToMode" | "onRefresh" | "tooltipTotal" | "Component" | "countLimitStyle">>;
export default _default;
export declare const paginationShowTotal: (total: any, range: any, limit: any, tooltipTotal: any) => React.JSX.Element;
