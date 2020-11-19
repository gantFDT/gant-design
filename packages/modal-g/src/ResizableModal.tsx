import React, { useContext, useEffect, useMemo, useCallback, memo } from 'react'
import classnames from 'classnames'
import { Modal } from 'antd'
import { Icon } from '@data-cell'
import ModalContext from './Context'
import { getModalState } from './Reducer'
import { useDrag, useResize, usePrev } from './Hooks'
import { InnerModalProps, ActionTypes } from './interface'
const modalStyle: React.CSSProperties = { position: 'absolute', margin: 0, paddingBottom: 0 }

const ModalInner: React.FC<InnerModalProps> = function ModalInner(props) {
    const {
        //** 自定义class前缀 */
        prefixCls: customizePrefixCls,
        //** 弹窗唯一标识 */
        id,
        //** 单个弹窗的自定义属性 */
        itemState,
        //** 弹窗标题 */
        visible,
        //** 弹窗标题 */
        title,
        //** 弹窗额外样式 */
        style,
        //** 弹窗层自定义class */
        wrapClassName,
        //** 是否可以最大化 */
        canMaximize,
        //** 是否可以拖动 */
        canResize,
        //** 是否为模态窗口 */
        isModalDialog,
        //** 取消按钮回调 */
        onCancel,
        //** 提交按钮回调 */
        onOk,
        /** antd-按钮属性 */
        cancelButtonProps,
        //** antd-按钮属性 */
        okButtonProps,
        //** 自定义弹窗内容 */
        children,
        //** 弹窗组件接受的其他antd支持的属性值 */
        ...restProps
    } = props

    const prefixCls = customizePrefixCls || 'gant' + '-modal'
    const { dispatch, state } = useContext(ModalContext)
    const modalState = getModalState(state, id)
    const visiblePrev = usePrev(visible)

    useEffect(() => {
        dispatch({ type: ActionTypes.mount, id, itemState })
        return () => dispatch({ type: ActionTypes.unmount, id })
    }, [])

    useEffect(() => {
        if (visible || visible !== visiblePrev) dispatch({ type: visible ? ActionTypes.show : ActionTypes.hide, id })
    }, [visible])

    const { visible: modalVisible, zIndex, x, y, width, height, isMaximized } = modalState

    const _style: React.CSSProperties = useMemo(() => ({ ...style, ...modalStyle, top: y, left: x, height }), [y, x, height])

    const onFocus = useCallback(() => dispatch({
        type: ActionTypes.focus, id
    }), [id])

    const onDrag = useCallback(payload => dispatch({
        type: ActionTypes.drag, id, ...payload
    }), [id])

    const onResize = useCallback(payload => dispatch({
        type: ActionTypes.resize, id, ...payload
    }), [id])

    const toggleMaximize = useCallback(() => {
        if (!canMaximize) return
        dispatch({ type: isMaximized ? ActionTypes.reset : ActionTypes.max, id })
    }, [id, isMaximized, canMaximize])

    const onMouseDrag = useDrag(x, y, onDrag)
    const onMouseResize = useResize(x, y, Number(width), Number(height), onResize)

    const titleElement = useMemo(() => (
        <div
            className={classnames(`${prefixCls}-resizableModalTitle`, isMaximized ? '' : `${prefixCls}-canDrag`)}
            style={{ marginRight: canMaximize ? 70 : 30 }}
            onMouseDown={onMouseDrag}
            onClick={onFocus}
            onDoubleClick={toggleMaximize}
        >
            {title}
        </div>
    ), [onMouseDrag, onFocus, toggleMaximize, title, isMaximized, canMaximize],
    )
    const combineWrapClassName = useMemo(() => {
        return classnames(
            `${prefixCls}-resizableModalWrapper`,
            isModalDialog ? `${prefixCls}-resizableModalDialog` : `${prefixCls}-resizableModalDefault`,
            isMaximized && `${prefixCls}-maximize`,
            wrapClassName
        )
    }, [isMaximized, isModalDialog])

    return <Modal
        wrapClassName={combineWrapClassName}
        title={title && titleElement}
        width={width}
        visible={modalVisible}
        zIndex={zIndex}
        style={_style}
        mask={isModalDialog}
        maskClosable={isModalDialog}
        destroyOnClose
        onCancel={onCancel}
        onOk={onOk}
        cancelButtonProps={{ size: 'small', ...cancelButtonProps }}
        okButtonProps={{ size: 'small', ...okButtonProps }}
        {...restProps}
    >
        {/*弹窗内容 */}
        <div className={`${prefixCls}-resizableModalContent`} onClick={onFocus}>{children}</div>
        {/*最大化按钮 */}
        {canMaximize && <div className={`${prefixCls}-maximizeAnchor`} onClick={toggleMaximize}>
            <Icon value={isMaximized ? 'switcher' : 'border'} />
        </div>}
        {/*resize节点 */}
        {canResize && !isMaximized && <div className={`${prefixCls}-resizeAnchor`} onMouseDown={onMouseResize}><i></i></div>}
    </Modal>
}

const defaultProps = {
    itemState: {},
    style: {},
    canMaximize: true,
    canResize: true,
    isModalDialog: false,
    onCancel: () => { },
    onOk: () => { },
}
ModalInner.defaultProps = defaultProps

const ResizableModal = memo<InnerModalProps>(ModalInner)
export default ResizableModal
