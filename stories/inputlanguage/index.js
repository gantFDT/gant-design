
import { InputLanguage, SwitchStatus } from '@data-cell'
import React, { useState } from 'react';
import { Button } from 'antd'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const cmps = [
  () => {
    const localeList = [
      {
        locale: 'zh-CN',
        label: '中文',
        value: ''
      },
      {
        locale: 'en-US',
        label: '英文',
        value: ''
      }
    ]
    const [value, setValue] = useState({ locale: 'zh-CN', value: '中文' })
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputLanguage localeList={localeList} placeholder='不可编辑' allowEdit={false} value={{ locale: 'zh-CN', value: '中文' }} />
      <InputLanguage localeList={localeList} placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
    </>
  },
  () => {
    const localeList = [
      {
        locale: 'zh-CN',
        label: '中文',
        value: ''
      },
      {
        locale: 'en-US',
        label: '英文',
        value: ''
      }
    ]
    const [edit, setEdit] = useState('CANCEL')
    const [value, setValue] = useState({ locale: 'zh-CN', value: '你好' })
    return <>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
      <InputLanguage localeList={localeList} placeholder='请输入' value={value} onChange={setValue} edit={edit} style={{ margin: '5px 0' }} />
    </>
  },
  () => {
    const localeList = [
      {
        locale: 'zh-CN',
        label: '中文',
        value: ''
      },
      {
        locale: 'en-US',
        label: '英文',
        value: ''
      }
    ]
    const [value, setValue] = useState({ locale: 'en-US', value: 'Hello' })
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputLanguage localeList={localeList} placeholder='请输入' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
    </>
  }
]


const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>🛰 多语言输入</b></br>
    在数据录入时，有些情况需要同时录入多种语言的值
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
      title: '赋值',
      describe: '值是对象格式，语言键locale，语言值value',
      cmp: cmps[2]
    }
  ]
}

export default () => <CodeDecorator config={config} />