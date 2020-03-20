export default [
`
import React, { useState } from 'react';
import { Button } from 'antd'
import { InputEmail, SwitchStatus } from 'gantd'


const Use1 = () => {
  const [value, setValue] = useState('18811012138@qq.com')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <InputEmail placeholder='不可编辑' allowEdit={false}  value="18811012138@qq.com"/>
    <InputEmail placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Use1 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd'
import { InputEmail, SwitchStatus } from 'gantd'


const Use2 = () => {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
    <InputEmail placeholder='邮箱' edit={edit} wrapperStyle={{ margin: '5px 0' }} />
  </>
}

ReactDOM.render(<Use2 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd'
import { InputEmail, SwitchStatus } from 'gantd'


const Use3 = () => {
  const [value, setValue] = useState('18811012138@qq.com')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <InputEmail placeholder='邮箱校验' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
  </>
}

ReactDOM.render(<Use3 />, mountNode)`,]