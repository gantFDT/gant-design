/// <reference types="react" />
import { ModalProps } from 'antd/lib/modal';
interface ConfigModalProps extends ModalProps {
    dataSource: any;
    originColumns: any;
    views: any;
    onSaveViews: (vals: any) => void;
    withoutAnimation?: boolean;
    onSaveAs: (vals: any, cb: () => void) => void;
    tableKey?: string;
    onOk?: (config: any) => void;
    onCancel?: () => void;
    onViewChange?: (viewSchema: any) => void;
}
declare function ConfigModal(props: ConfigModalProps): JSX.Element;
export default ConfigModal;
