import React, { ReactNode } from 'react';
export declare type ViewType = 'company' | 'system' | 'custom';
export interface UpdateViewProps {
    type: 'delete' | 'rename';
    views: any[];
    operateView: any;
    hideModal?: Function;
}
export interface DefaultView {
    type: ViewType;
    viewId: string;
}
export interface ViewProps {
    splitLine?: boolean;
    viewId: string;
    viewName: string;
    defaultView?: DefaultView;
    userId?: string;
    systemViews: any[];
    customViews: any[];
    companyViews?: any[];
    switchActiveView: (view: any) => void;
    updateView: (params: UpdateViewProps) => void;
    onDefaultViewChange?: (params: DefaultView) => void;
    renameLoading?: boolean;
    loading?: boolean;
    config?: ReactNode;
    getPopupContainer?: () => HTMLElement;
    withoutAnimation?: boolean;
}
/**
 * 视图组件
 * @param props
 */
export default function View(props: ViewProps): React.JSX.Element;
