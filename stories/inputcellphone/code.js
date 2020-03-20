export default [
`
import React, { useState, useRef } from 'react';
import { Button } from 'antd'
import { InputCellPhone, SwitchStatus } from 'gantd'


const Use1 = () => {
  const [value, setValue] = useState({
    key: '236',
    value: '13945689732'
  })
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  const cellRef = useRef(null)
  return <>
    <InputCellPhone placeholder='可编辑' ref={cellRef} onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Use1 />, mountNode)`,`
import React, { useState, useRef } from 'react';
import { Button } from 'antd'
import { InputCellPhone, SwitchStatus } from 'gantd'


const Use2 = () => {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
    <InputCellPhone placeholder='单行输入框' edit={edit} wrapperStyle={{ margin: '5px 0' }} />
  </>
}

ReactDOM.render(<Use2 />, mountNode)`,`
import React, { useState, useRef } from 'react';
import { Button } from 'antd'
import { InputCellPhone, SwitchStatus } from 'gantd'


const Use3 = () => {
  const [value, setValue] = useState({ value: '18811012138' })
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <InputCellPhone placeholder='手机号码校验' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
  </>
}

ReactDOM.render(<Use3 />, mountNode)`,]