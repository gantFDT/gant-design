import React from 'react';
interface EditModalProps {
    loading: boolean;
    showModal: boolean;
    setShowModal: Function;
    initValue: string;
    form: any;
    onSubmit: (name: string) => void;
    withoutAnimation?: boolean;
    systemViews: any[];
    customViews: any[];
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<(props: EditModalProps) => React.JSX.Element, Pick<any, string | number | symbol>>;
export default _default;
