export default [
`
import React, { useState } from 'react';
import { Button } from 'antd'
import { InputUrl, SwitchStatus } from 'gantd'


const Demo1 = () => {
  const [value, setValue] = useState('https://www.npmjs.com')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <InputUrl placeholder='不可编辑' allowEdit={false}  value="https://www.npmjs.com"/>
    <InputUrl placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Demo1 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd'
import { InputUrl, SwitchStatus } from 'gantd'


const Demo2 = () => {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
    <InputUrl placeholder='请输入' edit={edit} style={{ margin: '5px 0' }} />
  </>
}
const Demo3 = () => {
  const [value, setValue] = useState('https://www.npmjs.com')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <InputUrl placeholder='网址校验' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
  </>
}

ReactDOM.render(<Demo2 />, mountNode)`,]