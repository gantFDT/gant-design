
import './index.less';
import React, { useContext, useEffect, useMemo, useCallback, memo } from 'react';
import { Modal } from 'antd';
import classnames from 'classnames';
import { Icon } from '@data-cell';
import { useDrag, useResize, usePrev } from './Hooks';
import ModalContext from './Context';
import { getModalState } from './Reducer';
import { ActionTypes } from './Reducer';
const modalStyle = { margin: 0, paddingBottom: 0 };

type Props = ModalInnerProps & Partial<typeof defaultProps>

const ModalInner: React.FC<Props> = function ModalInner(props) {
    const {
        prefixCls: customizePrefixCls = 'gant', //自定义class前缀
        id,                 //弹窗唯一标识
        itemState,          //单个弹窗的自定义属性
        visible,            //弹窗标题
        title,              //弹窗标题
        style,              //弹窗额外样式
        wrapClassName,      //弹窗层自定义class
        canMaximize,        //是否可以最大化
        canResize,          //是否可以拖动
        isModalDialog,      //是否为模态窗口
        onCancel,           //取消按钮回调
        onOk,               //提交按钮回调
        cancelButtonProps,  //antd-按钮属性
        okButtonProps,      //antd-按钮属性
        children,           //自定义弹窗内容
        ...restProps        //弹窗组件接受的其他antd支持的属性值
    } = props;

    const prefixCls = customizePrefixCls + '-modal';

    const { dispatch, state } = useContext(ModalContext);
    const modalState = getModalState(state, id);
    const visiblePrev = usePrev(visible);

    useEffect(() => {
        dispatch({ type: ActionTypes.mount, id, itemState })
        return () => dispatch({ type: ActionTypes.unmount, id })
    }, [])

    useEffect(() => {
        if (visible !== visiblePrev) {
            if (visible) {
                dispatch({ type: ActionTypes.show, id })
            } else {
                dispatch({ type: ActionTypes.hide, id })
            }
        }
    }, [visible, visiblePrev, id])

    const { zIndex, x, y, width, height, maximize } = modalState

    const _style = useMemo(() => ({ ...style, ...modalStyle, top: y, left: x, height }), [y, x, height])

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
        if (!canMaximize) return;
        dispatch({ type: maximize ? ActionTypes.reset : ActionTypes.max, id })
    }, [id, maximize, canMaximize])

    const onMouseDrag = useDrag(x, y, onDrag)
    const onMouseResize = useResize(x, y, width, height, onResize)
    const titleElement = useMemo(() => (
        <div
            className={`${prefixCls}-resizableModalTitle`}
            style={canMaximize ? { marginRight: 88 } : { marginRight: 32 }}
            onMouseDown={onMouseDrag}
            onClick={onFocus}
            onDoubleClick={toggleMaximize}
        >
            {title}
        </div>
    ), [onMouseDrag, onFocus, toggleMaximize, title, canMaximize],
    )
    const combineWrapClassName = useMemo(() => {
        return classnames(
            `${prefixCls}-resizableModalWrapper`,
            isModalDialog ? `${prefixCls}-resizableModalDialog` : `${prefixCls}-resizableModalDefault`,
            maximize && `${prefixCls}-maximize`,
            wrapClassName
        )
    }, [maximize, isModalDialog])

    return <Modal
        wrapClassName={combineWrapClassName}
        title={titleElement}
        width={width}
        visible={visible}
        zIndex={zIndex}
        style={_style}
        mask={isModalDialog}
        maskClosable={isModalDialog}
        destroyOnClose
        onCancel={onCancel}
        onOk={onOk}
        cancelButtonProps={{ size: 'small' }}
        okButtonProps={{ size: 'small' }}
        {...restProps}
    >
        <div className={`${prefixCls}-resizableModalContent`} onClick={onFocus}>
            {children}
        </div>
        {canMaximize && <div className={`${prefixCls}-maximizeAnchor`} onClick={toggleMaximize}>
            <Icon type={maximize ? 'switcher' : 'border'} />
        </div>}
        {canResize && !maximize && <div className={`${prefixCls}-resizeAnchor`} onMouseDown={onMouseResize}><i></i></div>}
    </Modal>
}

const defaultProps = {
    itemState: {} as ModalStateOutter,
    style: {},
    canMaximize: true,
    canResize: true,
    isModalDialog: false,
    onCancel: () => { },
    onOk: () => { },
}
ModalInner.defaultProps = defaultProps

const ResizableModal = memo<Props>(ModalInner);
export default ResizableModal;
