import React, { useState, useContext, useMemo } from 'react'
import { Button, Switch } from 'antd'
import { ResizableModal, ResizableProvider, ModalContext } from '@pkgs/modal-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'

const ButtonGroup = Button.Group

const ModalContent = ({ id }) => {
    const { state: { modals } } = useContext(ModalContext);
    const { width, height } = modals[id];
    return <div>
        <h4>使用自定义宽高400</h4>
        <div style={{ marginTop: 20 }}>动态宽高获取:</div>
        <div>{`width:${width}px`}</div>
        <div>{`height:${height}px`}</div>
    </div>
}


function BasicUse() {
    const [visible, setVisible] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <ResizableProvider maxZIndex={12} >
                <div style={{ marginBottom: 10 }}>
                    <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
                </div>
                <ResizableModal
                    id='1'
                    title='弹窗标题'
                    visible={visible}
                    footer={null}
                    onCancel={() => { setVisible(false) }}
                >
                    默认宽高520
            </ResizableModal>
            </ResizableProvider>
        </div>
    )
}
function CustomUse() {
    const [visible2, setVisible2] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <ResizableProvider maxZIndex={12} >
                <div style={{ marginBottom: 10 }}>
                    <Button size="small" onClick={() => { setVisible2(true) }}>second-modal</Button>
                </div>
                <ResizableModal
                    itemState={{ height: 400, width: 400 }}
                    id='2'
                    title='第二个弹窗'
                    okBtnSolid
                    visible={visible2}
                    onCancel={() => { setVisible2(false) }}
                >
                    <ModalContent id='2' />
                </ResizableModal>
            </ResizableProvider>
        </div>
    )
}

function DialogUse() {
    const [visible3, setVisible3] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <ResizableProvider maxZIndex={12} >
                <div style={{ marginBottom: 10 }}>
                    <Button size="small" onClick={() => { setVisible3(true) }}>modaldialog</Button>
                </div>
                <ResizableModal
                    id='3'
                    title='模态窗口'
                    isModalDialog
                    visible={visible3}
                    onCancel={() => { setVisible3(false) }}
                >
                    必须关闭才能进行其他操作的弹窗
            </ResizableModal>
            </ResizableProvider>
        </div>
    )
}

const config = {
    codes: code,
    useage: '这是一个弹出式对话框。支持拖拽移动和大小伸缩、窗口化和全屏化状态的切换、实时响应浏览器窗口变化、模态窗口模式等功能，并支持同屏展示多个弹出框。',
    inline: true,
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法，默认宽高为520，鼠标悬浮到弹窗右下角边界，会出现能大小伸缩的图标，拖动则即时更改弹窗大小',
            cmp: BasicUse
        },
        {
            title: '自定义宽高的弹窗',
            describe: '设置符合场景需求的弹窗大小，可通过回调获取即时的宽高值',
            cmp: CustomUse
        },
        {
            title: '模态弹窗',
            describe: '设置为必须进行关闭才能进行其他操作的弹窗',
            cmp: DialogUse
        },
    ]
};

export default () => <CodeDecorator config={config} />