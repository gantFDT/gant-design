import React from 'react';
export interface SaveAsModalProps {
    form: any;
    visible?: boolean;
    loading?: boolean;
    companyViewAuth?: boolean;
    onCancel?: () => void;
    onSubmit?: (values: object) => void;
    systemViews: any[];
    customViews: any[];
    companyViews: any[];
}
declare function SaveAsModal(props: SaveAsModalProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<import("antd/lib/form/interface").ConnectedComponentClass<typeof SaveAsModal, Pick<any, string | number | symbol>>>;
export default _default;
