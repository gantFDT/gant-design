
import { InputLanguage, SwitchStatus } from '@data-cell'
import '@data-cell/input-language/style'
import React, { useState } from 'react';
import { Button } from 'antd'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const cmps = [
  () => {
    const [value, setValue] = useState([
      {
        value: "中文文本",
        locale: 'zh-CN'
      }
    ])
    const onSave = (id, value, cb) => {
      cb()
    }
    return <>
      <InputLanguage placeholder='输入当前语言文本' onSave={onSave} value={value} onChange={setValue} />
    </>
  },
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
      title: '基本使用',
      describe: '传递需要展示的语言数组',
      cmp: cmps[0]
    },
  ]
}

export default () => <CodeDecorator config={config} />