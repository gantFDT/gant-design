import React from 'react'
import { Action } from './Reducer'
import { ModalsState } from './interface'

const ModalContext = React.createContext({} as {
    state: ModalsState,
    dispatch: React.Dispatch<Action>
})
export default ModalContext
