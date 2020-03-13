import React, { useContext, useEffect } from 'react'
import ResizableModal from './ResizableModal'
import ResizableProvider from './ResizableProvider'
import ModalContext from './Context'
import { InnerModalProps } from './interface'
const uuid = 'modal-g-uuid'

export interface ModalProps extends InnerModalProps {
    maxZIndex?: number,
    minWidth?: number,
    minHeight?: number,
    onSizeChange?: (width: number, height: number) => void
}

const ContextContent = ({ id, onSizeChange, children }) => {
    const { state: { modals } } = useContext(ModalContext)
    const { width, height } = modals[id]

    useEffect(() => {
        onSizeChange && onSizeChange(width, height)
    }, [width, height])

    return <>{children}</>
}

class Modal extends React.Component<ModalProps>{
    static ResizableModal: typeof ResizableModal
    static ResizableProvider: typeof ResizableProvider
    static ModalContext: typeof ModalContext

    static defaultProps = {
        maxZIndex: 999,
        isModalDialog: true
    };

    constructor(props) {
        super(props);
    }
    render() {
        const {
            maxZIndex,
            minWidth,
            minHeight,
            children,
            onSizeChange,
            ...restProps
        } = this.props

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
}

Modal.ResizableModal = ResizableModal
Modal.ResizableProvider = ResizableProvider
Modal.ModalContext = ModalContext

export default Modal
export { ResizableModal, ResizableProvider, ModalContext };
