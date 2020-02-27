
import { InputMoney, SwitchStatus, EditStatus, InputNumber } from '@data-cell'
import React, { useState } from 'react';
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const cmps = [
  () => {
    const [value, setValue] = useState({ key: "USD", value: 123.123 })
    const [precision, setprecision] = useState(2)
    const onSave = (id, value, cb) => {
      cb()
    }
    return <>
      小数点后位数: <InputNumber style={{ width: 80, display: 'inline-block' }} min={0} edit={EditStatus.EDIT} value={precision} onChange={setprecision} />
      <InputMoney placeholder='可编辑' style={{ marginTop: 8 }} precision={precision} onSave={onSave} value={value} onChange={setValue} />
    </>
  }
]


const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>📨 数字校验</b></br>
    <b>📨 可选常用货币单位</b>
  `,
  codes: codeList,
  inline: true,
  children: [
    {
      title: '精度控制',
      describe: 'precision可以控制显示在小数点后的位数',
      cmp: cmps[0]
    },
  ]
}

export default () => <CodeDecorator config={config} />