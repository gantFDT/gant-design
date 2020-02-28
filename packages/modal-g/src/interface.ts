import { ModalProps } from 'antd/lib/modal'

export interface WindowSizeProps {
    width: number,
    height: number,
}

export interface PositionSizeProps extends WindowSizeProps {
    x?: number,
    y?: number,
}

export interface ModalStateProps {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    zIndex?: number,
    visible?: boolean,
    maximize?: boolean, // 默认窗口是否最大化
    keepStateOnClose?: boolean //是否在组件挂载期保留弹窗关闭前的定位与尺寸信息
}

export interface PrivateModalStateProps extends ModalStateProps {
    isMaximized?: boolean,  // 内部记录当前弹窗的状态
    inital?: PositionSizeProps, //存储用户传递的弹窗信息
    history?: PositionSizeProps //存储最大化切换时小窗口的定位与尺寸信息
}

export interface ResizableProviderProps {
    initalState?: ModalStateProps,
    maxZIndex?: number,
    minWidth?: number,
    minHeight?: number
}

export interface ModalsState {
    modals: {
        [key: string]: PrivateModalStateProps
    },
    maxZIndex: number,
    minWidth: number,
    minHeight: number,
    windowSize: WindowSizeProps,
    initialModalState: ModalStateProps
}
export interface InnerModalProps extends ModalProps {
    prefixCls?: string,
    itemState?: ModalStateProps,
    canMaximize?: boolean,
    canResize?: boolean,
    isModalDialog?: boolean,
    children?: React.ReactNode | string
}