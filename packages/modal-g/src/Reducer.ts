import React from 'react'
import { ModalsState, PrivateModalStateProps, ActionTypes, Action } from './interface'

export const getModalState = (state: ModalsState, id: string): PrivateModalStateProps => state.modals[id] || state.initialModalState

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value))

const getAxis = (windowMeter: number, targetMeter: number, num?: number | string) => {
    if (typeof num == 'number') return num
    return (windowMeter - targetMeter) / 2
}
const convertPercentage = (target: string | number, windowSize: number, inital: number) => {
    if (typeof target == 'number') return target
    let reg = new RegExp(/^\d+%$/)
    if (reg.test(target)) return Math.floor(windowSize * (Number(target.replace("%", "")) / 100))
    return inital
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

/**
 * 获取当前页面以展示的所有modal的最大zIndex
 * @param originMaxZindex 原有的maxZIndex
 * @returns
 */
 function getPageMaxZIndex(originMaxZindex: number) {
  const allModals = document.querySelectorAll('.ant-modal-wrap');
  let maxZindex = originMaxZindex;
  allModals.forEach((modal: HTMLDivElement) => {
    let zIndex = Number(modal?.style?.zIndex || 0);
    let display = modal?.style?.display;
    if (display != 'none' && zIndex && zIndex > maxZindex) {
      maxZindex = zIndex;
    }
  });

  return maxZindex + 1;
}

const resizableReducer: React.Reducer<ModalsState, Action> = (state, action) => {
    const { minWidth, minHeight, initialModalState, windowSize } = state
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
            combineState.width = convertPercentage(combineState.width, windowSize.width, <number>initialModalState.width)
            combineState.height = convertPercentage(combineState.height, windowSize.height, <number>initialModalState.height)
            const x = getAxis(windowSize.width, combineState.width, combineState.x)
            const y = getAxis(windowSize.height, combineState.height, combineState.y)
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
            const modalState = { ...state.modals[action.id] }
            const needKeep = modalState.keepStateOnClose
            const { inital, maximize } = modalState
            const target = needKeep ? modalState : inital
            if (!needKeep) {
                typeof inital.width == 'string' && (modalState.width = convertPercentage(inital.width, windowSize.width, <number>initialModalState.width))
                typeof inital.height == 'string' && (modalState.height = convertPercentage(inital.height, windowSize.height, <number>initialModalState.height))
            }
            const maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex
            const centerX = getAxis(windowSize.width, <number>modalState.width, target.x)
            const centerY = getAxis(windowSize.height, <number>modalState.height, target.y)

            let isMaximized = modalState.isMaximized
            let position = clampDrag(
                windowSize.width,
                windowSize.height,
                centerX,
                centerY,
                <number>modalState.width,
                <number>modalState.height,
            )
            let size = clampResize(
                minWidth,
                minHeight,
                windowSize.width,
                windowSize.height,
                position.x,
                position.y,
                <number>modalState.width,
                <number>modalState.height,
            )

            if (!needKeep && maximize) {
                position = { x: 0, y: 0 }
                size = { width: windowSize.width, height: windowSize.height }
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
                width: convertPercentage(modalState.inital.width, windowSize.width, <number>initialModalState.width),
                height: convertPercentage(modalState.inital.height, windowSize.height, <number>initialModalState.height),
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
            target.width = convertPercentage(target.width, windowSize.width, <number>initialModalState.width)
            target.height = convertPercentage(target.height, windowSize.height, <number>initialModalState.height)
            let x = target.x != undefined ? target.x : getAxis(windowSize.width, target.width)
            let y = target.y != undefined ? target.y : getAxis(windowSize.height, target.height)
            const position = clampDrag(
                windowSize.width,
                windowSize.height,
                x,
                y,
                target.width,
                target.height,
            )
            const size = clampResize(
                minWidth,
                minHeight,
                windowSize.width,
                windowSize.height,
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
            return {
                ...state,
                maxZIndex: getNextZIndex(state, action.id),
                modals: {
                    ...state.modals,
                    [action.id]: {
                        ...state.modals[action.id],
                        height:action.height,
                        width:action.width,
                        x:action.x,
                        y:action.y,
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
                            windowSize.width,
                            windowSize.height,
                            action.x,
                            action.y,
                            <number>state.modals[action.id].width,
                            <number>state.modals[action.id].height,
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
                        <number>modalState.width,
                        <number>modalState.height,
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
                            <number>modalState.width,
                            <number>modalState.height,
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