export default [
`
import React, { useState,useMemo } from 'react'
import { message, Icon, Button, Tooltip, Slider } from 'antd';
import { Header } from 'gantd'


function BasicUse() {
    return <>
        <Header type='line' title="标题(短线)" />
        <Header type='icon' icon="file-text" title="标题(图标)" />
        <Header type='num' title="标题(数字)" />
        <Header
            title="标题(回退)"
            beforeExtra={
                <Icon
                    type="left"
                    style={{ marginRight: 10 }}
                    onClick={() => { message.info('goback success') }}
                />
            }
        />
    </>
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState,useMemo } from 'react'
import { message, Icon, Button, Tooltip, Slider } from 'antd';
import { Header } from 'gantd'


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
        <div style={{ width: \`\${value}%\` }}>
            <Header
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
            <Header
            title="小工具栏"
            extra={<>
                
                <Tooltip title='复制'>
                    <Button icon="copy" size="small">复制</Button>
                </Tooltip>
                <Tooltip title='删除'>
                    <Button icon="delete" size="small" type="danger" />
                </Tooltip>
            </>}
        />
        </div>
    </>
}

ReactDOM.render(<ExtraUse />, mountNode)`,`
import React, { useState,useMemo } from 'react'
import { message, Icon, Button, Tooltip, Slider } from 'antd';
import { Header } from 'gantd'


function ColorUse() {
    return <>
        <Header type='line' title="标题(短线)" color="#1890ff" />
        <Header type='icon' icon="file-text" title="标题(图标)" color="#1890ff" />
        <Header type='num' title="标题(数字)" color="#1890ff" />
        <Header
            title="标题(回退)"
            beforeExtra={
                <Icon
                    type="left"
                    style={{ marginRight: 10, color: "#1EA7FD" }}
                    onClick={() => { message.info('goback success') }}
                />
            }
            color="#1890ff"
        />
    </>
}

ReactDOM.render(<ColorUse />, mountNode)`,`
import React, { useState,useMemo } from 'react'
import { message, Icon, Button, Tooltip, Slider } from 'antd';
import { Header } from 'gantd'


function BottomLineUse() {
    return <>
        <Header title="显示分割线" bottomLine={true} />
    </>
}

ReactDOM.render(<BottomLineUse />, mountNode)`,]