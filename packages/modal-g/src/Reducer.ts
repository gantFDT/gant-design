import React from 'react'
import { ModalsState } from './interface'

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

export const getModalState = (state: ModalsState, id: string): any => state.modals[id] || state.initialModalState

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value))

const getAxis = (windowMeter: number, targetMeter: number, num?: any) => {
    if (typeof num == 'number') return num
    return (windowMeter - targetMeter) / 2
}

const mapObject = <R, K extends keyof R>(obj: R, fn: (v: R[K]) => R[K]): R => Object.assign({}, ...Object.keys(obj).map(key => ({ [key]: fn(obj[key]) })))

const getNextZIndex = (state: ModalsState, id: string) => {
    const { modals, maxZIndex } = state
    if (Object.keys(modals).length === 1) return maxZIndex
    let modalState = getModalState(state, id)
    return modalState.zIndex === maxZIndex ? maxZIndex : maxZIndex + 1
}

const clampDrag = (windowWidth: number, windowHeight: number, x: number, y: number, width: number, height: number): { x: number, y: number } => {
    const maxX = windowWidth - width
    const maxY = windowHeight - height
    const clampedX = clamp(0, maxX, x)
    const clampedY = clamp(0, maxY, y)
    return { x: clampedX, y: clampedY }
}

const clampResize = (minWidth: number, minHeight: number, windowWidth: number, windowHeight: number, x: number, y: number, width: number, height: number): { width: number, height: number } => {
    const maxWidth = windowWidth - x
    const maxHeight = windowHeight - y
    const clampedWidth = clamp(minWidth, maxWidth, width)
    const clampedHeight = clamp(minHeight, maxHeight, height)
    return { width: clampedWidth, height: clampedHeight }
}

const resizableReducer: React.Reducer<ModalsState, Action> = (state, action) => {
    const { minWidth, minHeight, initialModalState } = state
    const needIncrease = Object.keys(state.modals).length != 1
    switch (action.type) {
        case ActionTypes.mount:
            let combineState = { ...initialModalState, ...action.itemState }
            let inital = {
                width: combineState.width,
                height: combineState.height,
                x: combineState.x,
                y: combineState.y,
            }
            const x = getAxis(state.windowSize.width, combineState.width, combineState.x)
            const y = getAxis(state.windowSize.height, combineState.height, combineState.y)
            return {
                ...state,
                maxZIndex: state.maxZIndex + 1,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        inital,
                        ...combineState,
                        x, y,
                        zIndex: state.maxZIndex + 1,
                    },
                },
            }
        case ActionTypes.unmount:
            const modalsClone = { ...state.modals }
            delete modalsClone[action.id]
            return {
                ...state,
                modals: modalsClone,
            }
        case ActionTypes.focus:
            const modalState = state.modals[action.id]
            const maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex
            return {
                ...state,
                maxZIndex,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        zIndex: maxZIndex,
                    },
                },
            }
        case ActionTypes.show: {
            const modalState = state.modals[action.id]
            const needKeep = modalState.keepStateOnClose
            const { inital, maximize } = modalState
            const target = needKeep ? modalState : inital
            const maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex
            const centerX = getAxis(state.windowSize.width, modalState.width, target.x)
            const centerY = getAxis(state.windowSize.height, modalState.height, target.y)

            let isMaximized = modalState.isMaximized
            let position = clampDrag(
                state.windowSize.width,
                state.windowSize.height,
                centerX,
                centerY,
                modalState.width,
                modalState.height,
            )
            let size = clampResize(
                minWidth,
                minHeight,
                state.windowSize.width,
                state.windowSize.height,
                position.x,
                position.y,
                modalState.width,
                modalState.height,
            )

            if (!needKeep && maximize) {
                position = { x: 0, y: 0 }
                size = { width: state.windowSize.width, height: state.windowSize.height }
                isMaximized = maximize
            }
            return {
                ...state,
                maxZIndex,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        ...position,
                        ...size,
                        isMaximized,
                        zIndex: maxZIndex,
                        visible: true,
                    },
                },
            }
        }
        case ActionTypes.hide: {
            const modalState = state.modals[action.id]
            let resetState = {
                ...modalState,
                width: modalState.inital.width,
                height: modalState.inital.height,
                isMaximized: false,
                visible: false,
            }
            let newState = modalState.keepStateOnClose ? modalState : resetState
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.id]: newState,
                },
            }
        }
        case ActionTypes.max: {
            const modalState = state.modals[action.id]
            const history = {
                x: modalState.x,
                y: modalState.y,
                width: modalState.width,
                height: modalState.height,
            }
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        x: 0,
                        y: 0,
                        height: window.innerHeight,
                        width: window.innerWidth,
                        history,
                        isMaximized: true,
                    }
                }
            }
        }
        case ActionTypes.reset: {
            const modalState = state.modals[action.id]
            const { inital, history } = modalState
            let target = history || inital
            let x = target.x || getAxis(state.windowSize.width, inital.width)
            let y = target.y || getAxis(state.windowSize.height, inital.height)
            const position = clampDrag(
                state.windowSize.width,
                state.windowSize.height,
                x,
                y,
                target.width,
                target.height,
            )
            const size = clampResize(
                minWidth,
                minHeight,
                state.windowSize.width,
                state.windowSize.height,
                position.x,
                position.y,
                target.width,
                target.height,
            )
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        ...position,
                        ...size,
                        history: null,
                        isMaximized: false,
                    },
                },
            }
        }
        case ActionTypes.resize:
            const size = clampResize(
                minWidth,
                minHeight,
                state.windowSize.width,
                state.windowSize.height,
                action.x,
                action.y,
                action.width,
                action.height,
            )
            return {
                ...state,
                maxZIndex: getNextZIndex(state, action.id),
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...state.modals[action.id],
                        ...size,
                        zIndex: getNextZIndex(state, action.id),
                    },
                },
            }
        case ActionTypes.drag:
            return {
                ...state,
                maxZIndex: getNextZIndex(state, action.id),
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...state.modals[action.id],
                        ...clampDrag(
                            state.windowSize.width,
                            state.windowSize.height,
                            action.x,
                            action.y,
                            state.modals[action.id].width,
                            state.modals[action.id].height,
                        ),
                        zIndex: getNextZIndex(state, action.id),
                    },
                },
            }
        case ActionTypes.windowResize:
            return {
                ...state,
                windowSize: action.size,
                modals: mapObject(state.modals, (modalState) => {
                    if (!modalState.visible) {
                        return modalState
                    }
                    const position = modalState.isMaximized ? { x: 0, y: 0 } : clampDrag(
                        action.size.width,
                        action.size.height,
                        modalState.x,
                        modalState.y,
                        modalState.width,
                        modalState.height,
                    )
                    const size = modalState.isMaximized ?
                        { width: action.size.width, height: action.size.height }
                        : clampResize(
                            minWidth,
                            minHeight,
                            action.size.width,
                            action.size.height,
                            position.x,
                            position.y,
                            modalState.width,
                            modalState.height,
                        )
                    return {
                        ...modalState,
                        ...position,
                        ...size,
                    }
                }),
            }
        default:
            throw new Error()
    }
}

export default resizableReducer