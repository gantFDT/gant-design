import React, { useEffect, useCallback, useRef } from 'react'
import { ResizeDirection, WindowSize } from './interface'

type OnDragFunc = (c: { x: number, y: number }) => void


function useDrag(x: number, y: number, onDrag: OnDragFunc) {
    const isDragging = useRef(false)
    const initialDragState = useRef({
        initX: 0,
        initY: 0,
        mouseDownX: 0,
        mouseDownY: 0,
    })

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setTextSelectable(false)
        initialDragState.current = {
            initX: x,
            initY: y,
            mouseDownX: e.clientX,
            mouseDownY: e.clientY,
        }
        isDragging.current = true
    }, [x, y])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging.current) {
            const { initX, mouseDownX, initY, mouseDownY } = initialDragState.current
            let dx = e.clientX - mouseDownX
            let dy = e.clientY - mouseDownY
            const x = initX + dx
            const y = initY + dy
            onDrag({ x, y })
        }
    }, [onDrag])

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [])

    useEffect(() => {
        const onMouseUp = () => {
            isDragging.current = false
            setTextSelectable(true)
        }
        window.addEventListener('mouseup', onMouseUp)
        return () => window.removeEventListener('mouseup', onMouseUp)
    }, [])

    return onMouseDown
}

type OnResizeFunc = (c: { x: number, y: number, width: number, height: number }) => void

function useResize(
     x: number,
     y: number,
     width: number,
     height: number,
     minWidth: number,
     minHeight: number,
     windowSize: WindowSize,
     onResize: OnResizeFunc
    ) {
    const isDragging = useRef(false)
    const initialDragState = useRef({
        initX: 0,
        initY: 0,
        initWidth: 0,
        initHeight: 0,
        mouseDownX: 0,
        mouseDownY: 0,
        minWidth,
        minHeight,
        windowSize,
        resizeDirection: undefined,
    })

    const onMouseDown = useCallback((resizeDirection:ResizeDirection, e) => {
        e.stopPropagation()
        setTextSelectable(false)
        initialDragState.current = {
            initX: x,
            initY: y,
            initWidth: width,
            initHeight: height,
            mouseDownX: e.clientX,
            mouseDownY: e.clientY,
            minWidth,
            minHeight,
            windowSize,
            resizeDirection,
        }
        isDragging.current = true
    }, [width, height, x, y, minWidth, minHeight, windowSize])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging.current) {
            const {
                initX,
                initY,
                initWidth,
                mouseDownX,
                initHeight,
                mouseDownY,
                minWidth,
                minHeight,
                windowSize,
                resizeDirection,
            } = initialDragState.current
            let dx = e.clientX - mouseDownX
            let dy = e.clientY - mouseDownY
            let x = initX
            let y = initY
            let width = initWidth
            let height = initHeight
            const isToTop = dy < 0
            const isToleft = dx < 0
            const absDy = Math.abs(dy)
            const absDx = Math.abs(dx)

            // 纵轴初始位置与高度
            if(['top', 'rightTop', 'leftTop'].includes(resizeDirection)){
                y = isToTop ? y - absDy : y + absDy
                height = isToTop ? height + absDy : height - absDy
            }
            
            // 横轴初始位置与宽度
            if(['leftBottom', 'left', 'leftTop'].includes(resizeDirection)){
                x = isToleft ? x - absDx : x + absDx
                width = isToleft ? width + absDx : width - absDx
            }
            
            // 普通场景宽度
            if(['rightTop', 'right', 'rightBottom'].includes(resizeDirection)){
                width += dx
            }

            // 普通场景高度
            if(['rightBottom', 'bottom', 'leftBottom'].includes(resizeDirection)){
                height += dy
            }

            // 处理边界
            // 上边
            if(y < 0){
                height = height - Math.abs(y)
                y = 0
            }
            // 下边
            const maxHeight = windowSize.height - y
            if(height > maxHeight){
                height = maxHeight
            }
            // 左边
            if(x < 0){
                width = width - Math.abs(x)
                x = 0
            }
            const maxWidth = windowSize.width - x
            // 右边
            if(width > maxWidth){
                width = maxWidth
            }
            // 最小宽度
            if(width < minWidth){
                width = minWidth
                if(!isToleft){
                    x = initX + initWidth - minHeight
                }
            }
            // 最小高度
            if(height < minHeight){
                height = minHeight
                if(!isToTop){
                    y = initY + initHeight - minHeight
                }
            }

            return onResize({ x, y, width, height })
        }
    }, [initialDragState, onResize])

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [])

    useEffect(() => {
        const onMouseUp = () => {
            isDragging.current = false
            setTextSelectable(true)
        }
        window.addEventListener('mouseup', onMouseUp)
        return () => window.removeEventListener('mouseup', onMouseUp)
    }, [])

    return onMouseDown
}

function usePrev(value: boolean) {
    const ref = useRef(value)
    useEffect(() => { ref.current = value })
    return ref.current
}

function setTextSelectable(selectable: boolean) {
    document.onselectstart = () => selectable
}

export { useDrag, useResize, usePrev }