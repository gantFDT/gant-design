import '@data-cell/input-email/style'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';
/*! Start !*/
import React, { useState } from 'react';
import { Button } from 'antd'
import { InputEmail, SwitchStatus } from '@gantd'
/*! Split !*/
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
/*! Split !*/
const Use2 = () => {
  const [edit, setEdit] = useState('CANCEL')
  return <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
    <InputEmail placeholder='邮箱' edit={edit} style={{ margin: '5px 0' }} />
  </>
}
/*! Split !*/
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
/*! End !*/
const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>📨 邮箱校验</b>
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
      title: '校验',
      describe: '只接收邮箱格式',
      cmp: Use3
    }
  ]
}

export default () => <CodeDecorator config={config} />