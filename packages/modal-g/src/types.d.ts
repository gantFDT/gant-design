type ModalStateOutter = {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    zIndex?: number,
    visible?: boolean,
    maximized?: boolean, // 外部控制默认窗口是否最大化
}

type Rect = {
    width: number,
    height: number
}

type ModalStateInner = {
    maximize?: boolean,  // 内部判断当前弹窗的状态
    inital?: Rect
} & ModalStateOutter

type WindowSize = Rect

type ModalsState = {
    modals: {
        [key: string]: ModalStateInner
    },
    maxZIndex: number,
    minWidth: number,
    minHeight: number,
    windowSize: WindowSize,
    initialModalState: ModalStateOutter
}

interface InnerProps {
    prefixCls?: string,
    itemState: ModalStateOutter,
    visible: boolean,
    title: React.ReactNode | string,
    wrapClassName?: string,
    confirmLoading?: boolean,
    children?: React.ReactNode,
    cancelButtonProps?: object,
    okButtonProps?: object,
}
interface ModalInnerProps extends InnerProps {
    id: string,
}

interface CombineModalProps extends InnerProps {
    maxZIndex: number,
    minWidth: number,
    minHeight: number,
    onSizeChange?: (width: number, height: number) => void
}