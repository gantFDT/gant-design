import '@data-cell/input-number/style'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';
/*! Start !*/
import React, { useState } from 'react';
import { InputNumber, EditStatus } from '@gantd';
/*! Split !*/
const Use1 = () => {
  const [value, setValue] = useState(99)
  const onSave = (id, value, cb) => {
    cb()
  }
  return <>
    <InputNumber placeholder='可编辑' onSave={onSave} value={value} onChange={setValue} />
  </>
}
/*! Split !*/
const Use2 = () => {
  return <>
    <InputNumber placeholder='被忽略的值' value="123" />
  </>
}
/*! Split !*/
const Use3 = () => {
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
}
/*! End !*/
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
      cmp: Use1
    },
    {
      title: '忽略不是数字的值',
      describe: '',
      cmp: Use2
    },
    {
      title: '前后置组件',
      describe: '',
      cmp: Use3
    },
  ]
}

export default () => <CodeDecorator config={config} />