import React from 'react'
/// <reference path='types.d.ts' />

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

export const resizableReducer: React.Reducer<ModalsState, Action> = (state, action) => {
    const { minWidth, minHeight, initialModalState } = state
    const needIncrease = Object.keys(state.modals).length != 1
    switch (action.type) {
        case ActionTypes.mount:
            let itemState = action.itemState || {}
            let combineState = { ...initialModalState, ...itemState }
            let inital = { width: combineState.width, height: combineState.height }
            return {
                ...state,
                maxZIndex: state.maxZIndex + 1,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        inital,
                        ...combineState,
                        x: (state.windowSize.width - combineState.width) / 2,
                        y: (state.windowSize.height - combineState.height) / 2,
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
            const maximized = modalState.maximized
            const maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex
            const centerX = (state.windowSize.width - modalState.width) / 2
            const centerY = (state.windowSize.height - modalState.height) / 2
            const position = maximized ? { x: 0, y: 0 } : clampDrag(
                state.windowSize.width,
                state.windowSize.height,
                centerX,
                centerY,
                modalState.width,
                modalState.height,
            )
            const size = maximized ?
                { width: state.windowSize.width, height: state.windowSize.height }
                : clampResize(
                    minWidth,
                    minHeight,
                    state.windowSize.width,
                    state.windowSize.height,
                    position.x,
                    position.y,
                    modalState.width,
                    modalState.height,
                )
            return {
                ...state,
                maxZIndex,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        ...position,
                        ...size,
                        maximize: maximized,
                        zIndex: maxZIndex,
                        visible: true,
                    },
                },
            }
        }
        case ActionTypes.hide: {
            const modalState = state.modals[action.id]
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        width: modalState.inital.width,
                        height: modalState.inital.height,
                        maximize: false,
                        visible: false,
                    },
                },
            }
        }
        case ActionTypes.max: {
            const modalState = state.modals[action.id]
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
                        maximize: true
                    }
                }
            }
        }
        case ActionTypes.reset: {
            const modalState = state.modals[action.id]
            const inital = modalState.inital
            const centerX = (state.windowSize.width - inital.width) / 2
            const centerY = (state.windowSize.height - inital.height) / 2
            const position = clampDrag(
                state.windowSize.width,
                state.windowSize.height,
                centerX,
                centerY,
                inital.width,
                inital.height,
            )
            const size = clampResize(
                minWidth,
                minHeight,
                state.windowSize.width,
                state.windowSize.height,
                position.x,
                position.y,
                inital.width,
                inital.height,
            )
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...modalState,
                        ...position,
                        ...size,
                        maximize: false,
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
                    const position = modalState.maximize ? { x: 0, y: 0 } : clampDrag(
                        action.size.width,
                        action.size.height,
                        modalState.x,
                        modalState.y,
                        modalState.width,
                        modalState.height,
                    )
                    const size = modalState.maximize ?
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