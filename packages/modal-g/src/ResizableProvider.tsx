import React, { useEffect, useReducer } from 'react'
import ModalContext from './Context'
import resizableReducer, { ActionTypes } from './Reducer'
import { WindowSizeProps, ModalStateProps, ModalsState, ResizableProviderProps } from './interface'

const getWindowSize = (): WindowSizeProps => ({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
})

const initial: ModalStateProps = {
    width: 520,
    height: 520,
    zIndex: 0,
    visible: false,
    maximize: false,
    keepStateOnClose: false,
}

const ResizableProvider: React.FC<ResizableProviderProps> = ({ initalState, maxZIndex, minWidth, minHeight, children }) => {

    const initialModalsState: ModalsState = {
        modals: {},
        maxZIndex,
        minWidth,
        minHeight,
        windowSize: getWindowSize(),
        initialModalState: { ...initial, ...initalState }
    }

    const [state, dispatch] = useReducer(resizableReducer, initialModalsState)

    useEffect(() => {
        if (typeof window !== 'object') return
        const onResize = () => dispatch({ type: ActionTypes.windowResize, size: getWindowSize() })
        window.addEventListener('resize', onResize)
        onResize()
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <ModalContext.Provider value={{ state, dispatch }}>
            {children}
        </ModalContext.Provider>
    )
}

ResizableProvider.defaultProps = {
    initalState: {},
    maxZIndex: 0,
    minWidth: 200,
    minHeight: 200,
}
export default ResizableProvider