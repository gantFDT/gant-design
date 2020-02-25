import _ from 'lodash';
import React, { useEffect, useReducer } from 'react';
import ModalContext from './Context';
import { resizableReducer, ActionTypes } from './Reducer';
import { IntlProvider } from 'react-intl';
import en from './locale/en-US';
import zh from './locale/zh-CN';

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

const ResizableProvider: React.FC<ResizableProviderProps> = ({ initalState = {}, maxZIndex = 0, minWidth = 200, minHeight = 200, children }) => {

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

const LocalWrapper = (props: any) => {
    const { i18n = navigator.language, ...restProps } = props
    const langs = {
        'en-US': en,
        'zh-CN': zh
    }
    let _i18n = Object.keys(langs).find(i => i == i18n)
    let _locale = _i18n ? _i18n.split('-')[0] : 'en'
    return <IntlProvider locale={_locale} messages={langs[i18n] || en}>
        <ResizableProvider {...restProps} />
    </IntlProvider>
}
export default LocalWrapper