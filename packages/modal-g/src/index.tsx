import React, { useContext, useEffect } from 'react';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';
import ModalContext from './Context';
const uuid = 'modal-g-uuid';

const ContextContent = ({
    id,
    onSizeChange,
    children
}) => {
    const { state: { modals } } = useContext(ModalContext);
    const { width, height } = modals[id];

    useEffect(() => {
        onSizeChange && onSizeChange(width, height);
    }, [width, height]);

    return <>{children}</>
}

const Modal = function (props) {
    const {
        i18n,
        maxZIndex,
        minWidth,
        minHeight,
        itemState,
        title,
        visible,
        style,
        classname,
        canMaximize,
        canResize,
        children,
        onSizeChange,
        ...restProps
    } = props;

    return <ResizableProvider
        maxZIndex={maxZIndex}
        minWidth={minWidth}
        minHeight={minHeight}
    >
        <ResizableModal
            id={uuid}
            title={title}
            wrapClassName={classname}
            style={style}
            itemState={itemState}
            visible={visible}
            canMaximize={canMaximize}
            canResize={canResize}
            {...restProps}
        >
            <ContextContent id={uuid} onSizeChange={onSizeChange}>
                {children}
            </ContextContent>
        </ResizableModal>
    </ResizableProvider>
}
Modal.defaultProps = {
    maxZIndex: 999,
    isModalDialog: true
}

export default Modal;
export { ResizableModal, ResizableProvider, ModalContext };