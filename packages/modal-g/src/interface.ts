import { ModalProps as antdModalProps } from 'antd/lib/modal'

export interface WindowSize {
    width: number,
    height: number,
}
export interface ModalPositionSize {
    width?: number | string,
    height?: number | string,
    x?: number,
    y?: number,
}

export interface ModalStateProps extends ModalPositionSize {
    zIndex?: number,
    visible?: boolean,
    /** 默认窗口是否最大化 */
    maximize?: boolean,
    /** 是否在组件挂载期保留弹窗关闭前的定位与尺寸信息 */
    keepStateOnClose?: boolean
}

export interface PrivateModalStateProps extends ModalStateProps {
    /** 内部记录当前弹窗的状态 */
    isMaximized?: boolean,
    /** 存储用户传递的弹窗信息 */
    inital?: ModalPositionSize,
    /** 存储最大化切换时小窗口的定位与尺寸信息 */
    history?: ModalPositionSize
}

export interface ResizableProviderProps {
    initalState?: ModalStateProps,
    maxZIndex?: number,
    minWidth?: number,
    minHeight?: number
}

export interface ModalsState {
    modals: { [modalId: string]: PrivateModalStateProps },
    maxZIndex: number,
    minWidth: number,
    minHeight: number,
    windowSize: WindowSize,
    initialModalState: ModalStateProps
}
export interface InnerModalProps extends antdModalProps {
    id?:string,
    prefixCls?: string,
    itemState?: ModalStateProps,
    canMaximize?: boolean,
    canResize?: boolean,
    isModalDialog?: boolean,
    children?: React.ReactNode | string
}

export declare type OnSizeChangeFunc = (width: number, height: number) => void

export interface ModalProps extends InnerModalProps, ResizableProviderProps {
    debounce?: number,
    onSizeChange?: OnSizeChangeFunc
}
export interface ContextContentProps {
    id: string,
    children: React.ReactNode,
    /** resize时的节流时长控制 */
    debounceTime?: number,
    /** 弹窗尺寸变化时的回调 */
    onSizeChange?: OnSizeChangeFunc
}

export enum ActionTypes {
    mount = 'mount',
    unmount = 'unmount',
    focus = 'focus',
    show = 'show',
    hide = 'hide',
    max = 'max',
    reset = 'reset',
    resize = 'resize',
    drag = 'drag',
    windowResize = 'windowResize',
}

export type Action = { type: ActionTypes, [key: string]: any }
