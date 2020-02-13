import _ from 'lodash';
import React, { useEffect, useReducer } from 'react';
import { ModalContext } from './Context';
import { resizableReducer, ActionTypes } from './Reducer';

/// <reference path='types.d.ts' />


const getWindowSize = (): WindowSize => ({
    width: window.innerWidth || 0,
    height: window.innerHeight || 0,
})

const initialModalState: ModalStateOutter = {
    x: 0,
    y: 0,
    width: 520,
    height: 520,
    zIndex: 0,
    visible: false,
    maximized: false,
}

interface ResizableProviderProps {
    initalState?: ModalStateOutter,
    maxZIndex?: number,
    minWidth?: number,
    minHeight?: number
}

export const ResizableProvider: React.FC<ResizableProviderProps> = ({ initalState = {}, maxZIndex = 0, minWidth = 200, minHeight = 200, children }) => {

    const initialModalsState: ModalsState = {
        modals: {},
        maxZIndex,
        minWidth,
        minHeight,
        windowSize: getWindowSize(),
        initialModalState: _.assign({ ...initialModalState }, initalState)
    };

    const [state, dispatch] = useReducer(resizableReducer, initialModalsState)

    useEffect(() => {
        if (typeof window !== 'object') return;
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
