import React from 'react'
import { ModalsState, Action } from './interface'

const ModalContext = React.createContext({} as {
    state: ModalsState,
    dispatch: React.Dispatch<Action>
})

export default ModalContext
