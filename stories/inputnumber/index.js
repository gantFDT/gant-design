
import { InputNumber, SwitchStatus, EditStatus } from '@data-cell'
import '@data-cell/input-number/style'
import React, { useState } from 'react';
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const cmps = [
  () => {
    const [value, setValue] = useState(99)
    const onSave = (id, value, cb) => {
      cb()
    }
    return <>
      <InputNumber placeholder='可编辑' onSave={onSave} value={value} onChange={setValue} />
    </>
  },
  () => {
    return <>
      <InputNumber placeholder='被忽略的值' value="123" />
    </>
  },
  () => {
    const [value, setValue] = useState(0)
    const addonBefore = (
      <>重量</>
    )
    const addonAfter = (
      <>KG</>
    )
    return <>
      <InputNumber placeholder='金额' edit={EditStatus.CANCEL} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} addonBefore={addonBefore} addonAfter={addonAfter} />
    </>
  },
]


const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>📨 数字校验</b>
  `,
  codes: codeList,
  inline: true,
  children: [
    {
      title: '基本使用',
      describe: '在后面展示一个编辑按钮，通过修改allowEdit参数控制是否可以编辑，allowEdit默认true',
      cmp: cmps[0]
    },
    {
      title: '忽略不是数字的值',
      describe: '',
      cmp: cmps[1]
    },
    {
      title: '前后置组件',
      describe: '',
      cmp: cmps[2]
    },
  ]
}

export default () => <CodeDecorator config={config} />