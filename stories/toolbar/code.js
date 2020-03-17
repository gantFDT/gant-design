export default [
`
import React from 'react'
import { Button, Tooltip, Icon } from 'antd'
import { Toolbar } from 'gantd'


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

ReactDOM.render(<BasicUse />, mountNode)`,`
import React from 'react'
import { Button, Tooltip, Icon } from 'antd'
import { Toolbar } from 'gantd'


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

ReactDOM.render(<FixedUse />, mountNode)`,]