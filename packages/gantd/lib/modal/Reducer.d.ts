import React from 'react';
import { ModalsState, PrivateModalStateProps, Action } from './interface';
export declare const getModalState: (state: ModalsState, id: string) => PrivateModalStateProps;
declare const resizableReducer: React.Reducer<ModalsState, Action>;
export default resizableReducer;
