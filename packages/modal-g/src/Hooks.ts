import React, { useState, useEffect, useCallback, useRef } from 'react';

function useDrag(x: number, y: number, onDrag = (c: { x: number, y: number }) => { }) {
    const [dragging, setDragging] = useState(false);
    const [initialDragState, setInitialDragState] = useState({
        initX: 0,
        initY: 0,
        mouseDownX: 0,
        mouseDownY: 0,
    });

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        setInitialDragState({
            initX: x,
            initY: y,
            mouseDownX: e.clientX,
            mouseDownY: e.clientY,
        })
        setDragging(true)
    }, [x, y, setDragging, setInitialDragState])

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dragging) {
                const { initX, mouseDownX, initY, mouseDownY } = initialDragState
                let dx = e.clientX - mouseDownX
                let dy = e.clientY - mouseDownY
                const x = initX + dx
                const y = initY + dy
                onDrag({ x, y })
            }
        }
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [initialDragState, dragging, onDrag])

    useEffect(() => {
        const onMouseUp = () => {
            setDragging(false)
        }
        window.addEventListener('mouseup', onMouseUp)
        return () => window.removeEventListener('mouseup', onMouseUp)
    }, [setDragging])

    return onMouseDown
}

type OnResize = (c: { x: number, y: number, width: number, height: number }) => void

function useResize(x: number, y: number, width: number, height: number, onResize: OnResize = _ => _) {
    const [dragging, setDragging] = useState(false)
    const [initialDragState, setInitialDragState] = useState({
        initX: 0,
        initY: 0,
        initWidth: 0,
        initHeight: 0,
        mouseDownX: 0,
        mouseDownY: 0,
    })

    const onMouseDown = useCallback(
        (e) => {
            e.preventDefault()
            setInitialDragState({
                initX: x,
                initY: y,
                initWidth: width,
                initHeight: height,
                mouseDownX: e.clientX,
                mouseDownY: e.clientY,
            })
            setDragging(true)
        },
        [width, height, setDragging, setInitialDragState, x, y],
    )

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dragging) {
                const {
                    initX,
                    initY,
                    initWidth,
                    mouseDownX,
                    initHeight,
                    mouseDownY,
                } = initialDragState
                let dx = e.clientX - mouseDownX
                let dy = e.clientY - mouseDownY
                const width = initWidth + dx
                const height = initHeight + dy
                return onResize({ x: initX, y: initY, width, height })
            }
        }
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [initialDragState, dragging, onResize])

    useEffect(() => {
        const onMouseUp = () => {
            setDragging(false)
        }
        window.addEventListener('mouseup', onMouseUp)
        return () => window.removeEventListener('mouseup', onMouseUp)
    }, [setDragging])

    return onMouseDown
}

function usePrev(value: boolean) {
    const ref = useRef(value);
    useEffect(() => { ref.current = value })
    return ref.current
}

export { useDrag, useResize, usePrev }