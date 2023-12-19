import React from 'react';
import { ModalsState, Action } from './interface';
declare const ModalContext: React.Context<{
    state: ModalsState;
    dispatch: React.Dispatch<Action>;
}>;
export default ModalContext;
