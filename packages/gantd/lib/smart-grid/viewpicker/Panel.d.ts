import { ReactNode } from 'react';
import { DefaultView, ViewType } from './index';
interface PanelProps {
    viewId?: string;
    userId?: string;
    viewType: ViewType;
    title: string | ReactNode;
    views: any[];
    isSystemDefault?: boolean;
    switchActiveView: Function;
    updateView: Function;
    setShowModal?: Function;
    setViewName?: Function;
    setEditView?: Function;
    defaultViewId: string;
    onDefaultViewChange: (params: DefaultView) => void;
    extra?: string | ReactNode;
}
declare const _default: (props: PanelProps) => JSX.Element;
export default _default;
