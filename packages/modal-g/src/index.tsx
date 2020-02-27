import React, { useContext, useEffect } from 'react'
import ResizableModal from './ResizableModal'
import ResizableProvider from './ResizableProvider'
import ModalContext from './Context'
/// <reference path='types.d.ts' />

const uuid = 'modal-g-uuid'

const ContextContent = ({ id, onSizeChange, children }) => {
    const { state: { modals } } = useContext(ModalContext)
    const { width, height } = modals[id]

    useEffect(() => {
        onSizeChange && onSizeChange(width, height)
    }, [width, height])

    return <>{children}</>
}

const Modal = function (props) {
    const {
        maxZIndex,
        minWidth,
        minHeight,
        children,
        onSizeChange,
        ...restProps
    } = props

    return <ResizableProvider
        maxZIndex={maxZIndex}
        minWidth={minWidth}
        minHeight={minHeight}
    >
        <ResizableModal
            id={uuid}
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

export default Modal
export { ResizableModal, ResizableProvider, ModalContext }