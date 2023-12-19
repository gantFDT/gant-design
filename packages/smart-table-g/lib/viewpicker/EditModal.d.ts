/// <reference types="react" />
interface EditModalProps {
    loading: boolean;
    showModal: boolean;
    setShowModal: Function;
    initValue: string;
    form: any;
    onSubmit: (name: string) => void;
    withoutAnimation?: boolean;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<(props: EditModalProps) => JSX.Element, Pick<any, string | number | symbol>>;
export default _default;
