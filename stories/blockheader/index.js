import React from 'react'
import BlockHeader from '@gantd/blockheader'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'
import { message, Icon, Button, Tooltip } from 'antd';

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
    return <BlockHeader
        title="标题(多功能)"
        size='big'
        extra={<>
            <Tooltip title='新增'>
                <Button icon="plus" style={{ margin: 5 }} />
            </Tooltip>
            <Tooltip title='编辑'>
                <Button icon="edit" style={{ margin: 5 }} />
            </Tooltip>
            <Tooltip title='删除'>
                <Button icon="delete" style={{ margin: 5 }} />
            </Tooltip>
        </>}
    />
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
    useage: '需要在布局中设置定制化的区块标题使用',
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
            title: '多功能按钮',
            describe: '可自定义的右侧额外扩展',
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
