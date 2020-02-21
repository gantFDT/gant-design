import React from 'react';
import {Toolbar} from '@packages/gantd/src';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';
import { Button, Tooltip, Icon } from 'antd'



function BasicUse() {
    return <>
        <Toolbar
            extraLeft={<Button size="small">返回</Button>}
            extraRight={<>
                <Tooltip placement="top" title='提示'>
                    <Icon type="exclamation-circle" />
                </Tooltip>
                <Tooltip title='新增'>
                    <Button icon="plus" size="small" type="primary" />
                </Tooltip>
                <Tooltip title='编辑'>
                    <Button icon="edit" size="small" />
                </Tooltip>
                <Tooltip title='保存'>
                    <Button icon="save" size="small">保存</Button>
                </Tooltip>
                <Tooltip title='复制'>
                    <Button icon="copy" size="small">复制</Button>
                </Tooltip>
                <Tooltip title='删除'>
                    <Button icon="delete" size="small" type="danger" />
                </Tooltip>
            </>}
        />

    </>
}

function FixedUse() {
    return <>
        <>请查看底部</>
        <Toolbar
            fixed={true}
            extraLeft={<Button size="small">返回</Button>}
            extraRight={<>
                <Tooltip placement="top" title='提示'>
                    <Icon type="exclamation-circle" />
                </Tooltip>
                <Button type="danger" size="small">删除</Button>
                <Button type="primary" size="small">保存</Button>
            </>}
        />
    </>
}


const config = {
    codes: code,
    // inline: true,
    useage: `
    <b>🎯 可固定在底部</b></br>
    多用于超长型超级表单</br>
    <b>左右工具放置</b></br>
    `,
    children: [{
        title: '基本用法',
        describe: '最简单的用法',
        cmp: BasicUse
    }, {
        title: '固定到底部',
        describe: '固定到底部',
        cmp: FixedUse
    }]
};
export default () => <CodeDecorator config={config} />

