const code = `import React, { useState, useCallback } from 'react';
import { Button, Slider } from 'antd';
import { OverflowTool } from 'gantd'; 
//or import { OverflowTool } from 'overflow-tool-g'

const style = {
  margin: '0 4px'
}

const Basic = () => {
    const [value, setvalue] = useState(100)
    const onChange = useCallback(
        (v) => {
            setvalue(v)
        },
        []
    )
    return (
        <>
            <Slider min={1} max={100} onChange={onChange} value={value} />
            <div style={{ width: value+'%',display:'flex',justifyContent:'space-between' }}>
                <div>按钮</div>
                <OverflowTool>
                    <Button style={style} size="small" type='primary'>新增</Button>
                    <Button style={style} size="small">编辑</Button>
                    <Button style={style} size="small">保存</Button>
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

ReactDOM.render(<Basic />, mountNode)`

export default [code]