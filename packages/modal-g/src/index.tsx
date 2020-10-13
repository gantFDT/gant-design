import React, { useContext, useCallback, useEffect } from 'react'
import { pick, omit, debounce } from 'lodash'
import ModalContext from './Context'
import ResizableModal from './ResizableModal'
import ResizableProvider from './ResizableProvider'
import { ModalProps, ContextContentProps } from './interface'
const uuid = 'modal-g-uuid'
const providerPropKeys = ['initalState', 'maxZIndex', 'minWidth', 'minHeight']

const ContextContent: React.FC<ContextContentProps> = ({ id, onSizeChange, debounceTime, children }) => {
    const { state: { modals } } = useContext(ModalContext)
    const { width, height } = modals[id]

    useEffect(() => {
        sizeChange(width, height)
    }, [width, height])

    const sizeChange = useCallback(debounce((width, height) => {
        onSizeChange && onSizeChange(width, height)
    }, [debounceTime]), [])

    return <>{children}</>
}

class Modal extends React.Component<ModalProps, {}>{
    static ResizableModal: typeof ResizableModal
    static ResizableProvider: typeof ResizableProvider
    static ModalContext: typeof ModalContext

    static defaultProps = {
        debounce: 0,
        maxZIndex: 999,
        isModalDialog: true
    }

    render() {
        const {
            debounce,
            children,
            onSizeChange,
            ...restProps
        } = this.props

        return <ResizableProvider {...pick(restProps, providerPropKeys)}>
            <ResizableModal id={uuid} {...omit(restProps, providerPropKeys)}>
                <ContextContent id={uuid} children={children} debounceTime={debounce} onSizeChange={onSizeChange} />
            </ResizableModal>
        </ResizableProvider>
    }
}

Modal.ResizableModal = ResizableModal
Modal.ResizableProvider = ResizableProvider
Modal.ModalContext = ModalContext

export default Modal
export { ResizableModal, ResizableProvider, ModalContext }
