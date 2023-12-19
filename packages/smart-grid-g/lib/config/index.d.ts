import React from 'react';
import { ModalProps } from 'antd/lib/modal';
interface ConfigModalProps extends ModalProps {
    dataSource: any;
    originColumns: any;
    systemViews: any[];
    customViews: any[];
    companyViews: any[];
    gridKey: string;
    onSaveViews: (vals: any) => void;
    companyViewAuth?: boolean;
    userId?: string;
    withoutAnimation?: boolean;
    showDisplayConfig?: boolean;
    onSaveAs: (vals: any, cb: () => void) => void;
    onOk?: (config: any) => void;
    onCancel?: () => void;
    onViewChange?: (viewSchema: any) => void;
}
declare function ConfigModal(props: ConfigModalProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ConfigModal>;
export default _default;
