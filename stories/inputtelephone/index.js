import '@data-cell/input-tele-phone/style'
import CodeDecorator from '../_util/CodeDecorator'
import codes from './code'
/*! Start !*/
import React, { useState } from 'react';
import { InputTelePhone } from '@gantd';

const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  const factory = React.createFactory(Component)
  return factory({ value, setValue })
}

const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}
/*! Split !*/
const Demo = WrapperValue({ key: '0832', value: '4300698' })(({ value, setValue }) => <InputTelePhone value={value} onChange={setValue} onSave={onSave} />);
/*! End !*/

const config = {
  inline: true,
  codes,
  children: [
    {
      title: '基本使用',
      describe: '固定电话基本格式，可以指定区号。国内座机号最多8位',
      cmp: Demo
    },
  ]
}


export default () => <CodeDecorator config={config} />