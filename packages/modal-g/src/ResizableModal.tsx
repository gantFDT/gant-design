
import './index.less';
import React, { useContext, useEffect, useMemo, useCallback, memo } from 'react';
import { Modal, Button } from 'antd';
import classnames from 'classnames';
import { ConfigContext } from '@gantd/config-provider';
import defaultLocale from '@gantd/locale/default';
import Icon from '@gantd/icon';
import { useDrag, useResize, usePrev } from './Hooks';
import { ModalContext } from './Context';
import { getModalState } from './Reducer';
import { ActionTypes } from './Reducer'

const tr = a => a;
const modalStyle = { margin: 0, paddingBottom: 0 };
const cancelTextDefault = tr('取消');
const okTextDefault = tr('确认');

// const Icon = Icon.createFromIconfontCN('Icon', {
//     scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
// })


type Props = ModalInnerProps & Partial<typeof defaultProps>

const ModalInner: React.FC<Props> = function ModalInner(props) {
    const {
        prefixCls: customizePrefixCls, //自定义class前缀
        id,             //弹窗唯一标识
        itemState,      //单个弹窗的自定义属性
        visible,        //弹窗标题
        title,          //弹窗标题
        style,          //弹窗额外样式
        wrapClassName,  //弹窗层自定义class
        canMaximize,    //是否可以最大化
        canResize,      //是否可以拖动
        confirmLoading, //弹窗加载状态
        isModalDialog,  //是否为模态窗口
        footerLeftExtra,//默认的footer左侧插槽
        footerRightExtra,//默认的footer右侧插槽
        disabled,       //提交按钮是否禁用
        cancelText,     //取消按钮文案
        okText,         //提交按钮文案
        onCancel,       //取消按钮回调
        onOk,           //提交按钮回调
        children,       //自定义弹窗内容
        ...restProps    //弹窗组件接受的其他antd支持的属性值
    } = props;

    const { locale: contextLocale = defaultLocale, getPrefixCls } = React.useContext(ConfigContext);
    // const autoReloadLocale = locale || contextLocale.AutoReload;
    const prefixCls = getPrefixCls('modal', customizePrefixCls);

    const { dispatch, state } = useContext(ModalContext);
    const modalState = getModalState(state, id);
    const visiblePrev = usePrev(visible)

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
    const titleElement = useMemo(
        () => <div
            className={`${prefixCls}-resizableModalTitle`}
            style={canMaximize ? { marginRight: 88 } : { marginRight: 32 }}
            onMouseDown={onMouseDrag}
            onClick={onFocus}
            onDoubleClick={toggleMaximize}
        >
            {title}
        </div>, [onMouseDrag, onFocus, toggleMaximize, title, canMaximize],
    )
    const combineWrapClassName = useMemo(() => {
        return classnames(
            `${prefixCls}-resizableModalWrapper`,
            isModalDialog ? `${prefixCls}-resizableModalDialog` : `${prefixCls}-resizableModalDefault`,
            wrapClassName
        )
    }, [isModalDialog])

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

        footer={<div className={footerLeftExtra ? `${prefixCls}-defaultFooterContent` : null}>
            {footerLeftExtra && <div>{footerLeftExtra}</div>}
            <div>
                {footerRightExtra}
                <Button size="small" onClick={onCancel}>{cancelText}</Button>
                <Button
                    size="small"
                    type='primary'
                    loading={confirmLoading}
                    disabled={disabled}
                    onClick={onOk}
                >{okText}</Button>
            </div>
        </div>}
        {...restProps}
    >
        <div className={`${prefixCls}-resizableModalContent`} onClick={onFocus}>
            {children}
        </div>
        {canMaximize && <div className={`${prefixCls}-maximizeAnchor`} onClick={toggleMaximize}>
            <Icon type={maximize ? 'fullscreen' : 'fullscreen-exit'} />
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
    footerLeftExtra: null,
    footerRightExtra: null,
    disabled: false,
    cancelText: cancelTextDefault,
    okText: okTextDefault,
    onCancel: () => { },
    onOk: () => { },
}
ModalInner.defaultProps = defaultProps

export const ResizableModal = memo<Props>(ModalInner);
