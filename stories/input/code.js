export default [
`
import React, { useState } from 'react';
import { Button } from 'antd';
import { Input, SwitchStatus } from 'gantd';
const { TextArea, Password } = Input;


const Use1 = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    cb()
  }
  return <>
    <Input placeholder='不可编辑' allowEdit={false} value='不可编辑' />
    <Input placeholder='可编辑' onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Use1 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd';
import { Input, SwitchStatus } from 'gantd';
const { TextArea, Password } = Input;


const Use2 = () => {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
    <Input placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
    <TextArea placeholder='多行输入框' edit={edit} style={{ margin: '5px 0' }} />
    <Password placeholder='密码输入框' edit={edit} style={{ margin: '5px 0' }} />
  </>
}

ReactDOM.render(<Use2 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd';
import { Input, SwitchStatus } from 'gantd';
const { TextArea, Password } = Input;


const Use3 = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <Input placeholder='不能输入特殊字符' allowEdit={true} strict value={value} onSave={onSave} onChange={setValue} />
  </>
}

ReactDOM.render(<Use3 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd';
import { Input, SwitchStatus } from 'gantd';
const { TextArea, Password } = Input;


const Use4 = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <TextArea placeholder='多行编辑' value={value} onChange={setValue} onSave={onSave} />

}

ReactDOM.render(<Use4 />, mountNode)`,`
import React, { useState } from 'react';
import { Button } from 'antd';
import { Input, SwitchStatus } from 'gantd';
const { TextArea, Password } = Input;


const Use5 = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <Password placeholder='密码输入框' value={value} onChange={setValue} onSave={onSave} />
}

ReactDOM.render(<Use5 />, mountNode)`,]