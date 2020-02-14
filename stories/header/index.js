import React, { useState } from 'react'
import BlockHeader from '@pkgs/header-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'
import { message, Icon, Button, Tooltip, Slider } from 'antd';

function BasicUse() {
    return <>
        <BlockHeader title="标题" />
    </>
}



function TypeUse() {
    return <>
        <BlockHeader type='line' title="标题(短线)" />
        <BlockHeader type='icon' icon="file-text" title="标题(图标)" />
        <BlockHeader type='num' title="标题(数字)" />
    </>
}
function BeforeExtraUse() {
    return <BlockHeader
        title="标题(回退)"
        beforeExtra={
            <Icon
                type="left"
                style={{ marginRight: 10 }}
                onClick={() => { message.info('goback success') }} />
        } />
}
function ExtraUse() {
    const [value, setvalue] = useState(100)
    const onChange = React.useCallback(
        (v) => {
            setvalue(v)
        },
        []
    )
    return <>
        <Slider min={1} max={100} onChange={onChange} value={value} />
        <div style={{ width: `${value}%` }}>
            <BlockHeader
                title="工具栏"
                extra={<>

                    <Tooltip title='新增'>
                        <Button icon="plus" type="primary" />
                    </Tooltip>
                    <Tooltip title='编辑'>
                        <Button icon="edit" />
                    </Tooltip>
                    <Tooltip title='保存'>
                        <Button icon="save">保存</Button>
                    </Tooltip>
                    <Tooltip title='复制'>
                        <Button icon="copy">复制</Button>
                    </Tooltip>
                    <Tooltip title='删除' >
                        <Button icon="delete" type="danger" />
                    </Tooltip>
                </>}
            />
            <BlockHeader
                title="小工具栏"
                extra={<>

                    <Tooltip title='新增'>
                        <Button icon="plus" size="small" type="primary" />
                    </Tooltip>
                    <Tooltip title='编辑'>
                        <Button icon="edit" size="small" />
                    </Tooltip>
                    <>
                        <Tooltip title='保存'>
                            <Button icon="save" size="small">保存</Button>
                        </Tooltip>
                        <>
                            <Tooltip title='复制'>
                                <Button icon="copy" size="small">复制</Button>
                            </Tooltip>
                        </>
                    </>
                    <Tooltip title='删除'>
                        <Button icon="delete" size="small" type="danger" />
                    </Tooltip>
                </>}
            />
        </div>
    </>
}
function ColorUse() {
    return <>
        <BlockHeader title="标题(主题色)" color='theme' />
        <BlockHeader title="标题(自定义颜色)" color='#FFC0CB' />
    </>
}
function BottomLineUse() {
    return <>
        <BlockHeader title="显示分割线" bottomLine={true} />
    </>
}
const config = {
    codes: code,
    inline: true,
    useage: '需要单独使用标头的地方，特色是工具栏溢出效果，也可做为工具栏使用',
    children: [
        {
            title: '基本用法',
            describe: '默认提供的尺寸(最小高度为40 )',
            cmp: BasicUse
        },
        {
            title: '更多类型',
            describe: '短线型、图标型、数字型',
            cmp: TypeUse
        },
        {
            title: '带回退按钮',
            describe: '可自定义的左侧额外扩展',
            cmp: BeforeExtraUse
        },
        {
            title: '溢出式工具栏',
            describe: '超出的工具会被收进下拉按钮组里',
            cmp: ExtraUse
        },
        {
            title: '自定义颜色',
            describe: '通过color属性进行颜色自定义,theme关键字可使用主题色',
            cmp: ColorUse
        },
        {
            title: '显示分割线',
            describe: '显示分割线',
            cmp: BottomLineUse
        },
    ]
};
export default () => <CodeDecorator config={config} />
