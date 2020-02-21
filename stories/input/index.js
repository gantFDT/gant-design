
import { Input, TextArea, Password, SwitchStatus } from '@packages/gantd/src'
import React, { useState } from 'react';
import { Button } from 'antd'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const Use1 = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <>
    <Input placeholder='不可编辑' allowEdit={false} value='不可编辑' />
    <Input placeholder='可编辑' allowEdit={true} onSave={onSave} value={value1} onChange={setValue1} />
    <Input placeholder='不能输入特殊字符' allowEdit={true} strict value={value2} onSave={onSave} onChange={setValue2} />
  </>
}

const Use2 = () => {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
    <Input placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
    <TextArea placeholder='多行输入框' edit={edit} style={{ margin: '5px 0' }} />
    <Password placeholder='密码输入框' edit={edit} style={{ margin: '5px 0' }} />
  </>
}

const Use3 = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <TextArea placeholder='多行编辑' value={value} onChange={setValue} onSave={onSave} />

}

const Use4 = () => {
  const [value, setValue] = useState('')
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  return <Password placeholder='密码输入框' value={value} onChange={setValue} onSave={onSave} />
}


const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>可通过strict属性限制输入特殊字符</b>
  `,
  codes: codeList,
  inline: true,
  children: [
    {
      title: '是否可编辑',
      describe: '在后面展示一个编辑按钮，通过修改allowEdit参数控制是否可以编辑，allowEdit默认true',
      cmp: Use1
    },
    {
      title: '编辑状态受控',
      describe: '受其他组件控制展示的形态',
      cmp: Use2
    },
    {
      title: '多行文本',
      describe: '',
      cmp: Use3
    },
    {
      title: '密码输入框',
      describe: '',
      cmp: Use4
    },
  ]
}

export default () => <CodeDecorator config={config} />