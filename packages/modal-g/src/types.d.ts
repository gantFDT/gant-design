type State = {
    x: number,
    y: number,
    width: number,
    height: number,
    zIndex: number,
    visible: boolean,
}

type ModalStateOutter = {
    maximized: boolean, // 外部控制默认窗口是否最大化
} & State
type ModalStateInner = {
    maximize: boolean,  // 内部判断当前弹窗的状态
    inital: Rect
} & ModalStateOutter

type Rect = {
    width: number,
    height: number
}

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

interface ModalLocale {
    submit: string,
    cancel: string
}

interface ModalInnerProps {
    prefixCls?: string,
    locale?: ModalLocale,
    id: string,
    itemState: ModalStateOutter,
    visible: boolean,
    title: string,
    wrapClassName?: string,
    confirmLoading?: boolean,
    children?: React.ReactNode
}