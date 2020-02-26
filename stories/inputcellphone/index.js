
import { InputCellPhone, SwitchStatus } from '@data-cell'
import React, { useState } from 'react';
import { Button } from 'antd'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const cmps = [
  () => {
    const [value, setValue] = useState({ phone: "18811012138" })
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputCellPhone placeholder='不可编辑' allowEdit={false} value={{ phone: "18811012138" }} />
      <InputCellPhone placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
    </>
  },
  () => {
    const [edit, setEdit] = useState('CANCEL')
    return <>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
      <InputCellPhone placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
    </>
  },
  () => {
    const [value, setValue] = useState({ phone: '18811012138' })
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputCellPhone placeholder='手机号码校验' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
    </>
  }
]


const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>📱 手机号校验</b>
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
      describe: '由外部控制编辑状态',
      cmp: cmps[1]
    },
    {
      title: '校验',
      describe: '+86的手机号码只接受13|14|15|18开头',
      cmp: cmps[2]
    }
  ]
}

export default () => <CodeDecorator config={config} />