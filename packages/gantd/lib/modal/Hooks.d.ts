import React from 'react';
import { ResizeDirection, WindowSize } from './interface';
declare type OnDragFunc = (c: {
    x: number;
    y: number;
}) => void;
declare function useDrag(x: number, y: number, onDrag: OnDragFunc): (e: React.MouseEvent) => void;
declare type OnResizeFunc = (c: {
    x: number;
    y: number;
    width: number;
    height: number;
}) => void;
declare function useResize(x: number, y: number, width: number, height: number, minWidth: number, minHeight: number, windowSize: WindowSize, onResize: OnResizeFunc): (resizeDirection: ResizeDirection, e: any) => void;
declare function usePrev(value: boolean): boolean;
export { useDrag, useResize, usePrev };
