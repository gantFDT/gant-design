import React from 'react';
import ModalContext from './Context';
import { ModalProps } from './interface';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';
declare const ModalComponent: {
    (modelProps: ModalProps): JSX.Element;
    ResizableModal: React.NamedExoticComponent<import("./interface").InnerModalProps>;
    ResizableProvider: React.FC<import("./interface").ResizableProviderProps>;
    ModalContext: React.Context<{
        state: import("./interface").ModalsState;
        dispatch: React.Dispatch<import("./interface").Action>;
    }>;
};
export default ModalComponent;
export { ResizableModal, ResizableProvider, ModalContext };
export { setGlobalConfig } from './utils';
