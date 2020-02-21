
import React, { useState } from 'react';
import { Input, TextArea, Password, SwitchStatus } from '@pkgs/gantd/src'
import { Button } from 'antd'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const cmps = [
  () => {
    const [value, setValue] = useState('')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <Input placeholder='不可编辑' allowEdit={false} value='不可编辑' />
      <Input placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
    </>
  },
  () => {
    const [edit, setEdit] = useState('CANCEL')
    return <>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
      <Input placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
      <TextArea placeholder='多行输入框' edit={edit} style={{ margin: '5px 0' }} />
      <Password placeholder='密码输入框' edit={edit} style={{ margin: '5px 0' }} />
    </>
  },
  () => {
    const [value, setValue] = useState('')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <Input placeholder='不能输入特殊字符' allowEdit={true} strict value={value} onSave={onSave} onChange={setValue} />
    </>
  },
  () => {
    const [value, setValue] = useState('')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <TextArea placeholder='多行编辑' value={value} onChange={setValue} onSave={onSave} />

  },
  () => {
    const [value, setValue] = useState('')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <Password placeholder='密码输入框' value={value} onChange={setValue} onSave={onSave} />
  }
]


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
      cmp: cmps[0]
    },
    {
      title: '编辑状态受控',
      describe: '受其他组件控制展示的形态',
      cmp: cmps[1]
    },
    {
      title: '校验',
      describe: '开启strict特殊字符会被过滤',
      cmp: cmps[2]
    },
    {
      title: '多行文本',
      describe: '',
      cmp: cmps[3]
    },
    {
      title: '密码输入框',
      describe: '',
      cmp: cmps[4]
    },
  ]
}

export default () => <CodeDecorator config={config} />