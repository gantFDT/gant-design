import React from 'react';
import { Action } from './Reducer';

/// <reference path='types.d.ts' />

export const ModalContext = React.createContext({} as {
    state: ModalsState,
    dispatch: React.Dispatch<Action>
});
