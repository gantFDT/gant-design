import React, { useState } from 'react'
import { Button, Slider } from 'antd'
import CodeDecorator from '../_util/CodeDecorator';
// import { OverflowTool } from '@'
import OverflowTool from '@packages/overflow-tool-g/src';
import codes from './code'

const style = {
    margin: '0 5px'
}
const Basic = () => {
    const [value, setvalue] = useState(100)
    const onChange = React.useCallback(
        (v) => {
            setvalue(v)
        },
        []
    )
    return (
        <>
            <Slider min={1} max={100} onChange={onChange} value={value} />
            <div style={{ width: `${value}%`,display:'flex',justifyContent:'space-between' }}>
                <div>按钮</div>
                <OverflowTool>
                    <Button style={style} size="small" type='primary'>新增</Button>
                    <Button style={style} size="small">编辑</Button>
                    <Button style={style} size="small">保存</Button>
                    <Button style={style} size="small">另存为</Button>
                    <Button style={style} size="small" type="danger">删除</Button>
                    <Button style={style} size="small" style={{display:'none'}}>复制</Button>
                    <Button style={style} size="small">粘贴</Button>
                    <Button style={style} size="small">回撤</Button>
                    <Button style={style} size="small" icon="reload"/>
                </OverflowTool>
            </div>
        </>
    )
}

const config = {
    codes,
    // inline: true,
    useage: `容器形组件，无需传递任何参数，常用于工具栏上`,
    children: [
        {
            title: '用法',
            describe: '无需传递任何参数',
            cmp: Basic,
        },
    ]
}

export default () => <CodeDecorator config={config} />