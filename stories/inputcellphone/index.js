import React, { useState } from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import { WrapperEdit, WrapperValue, onSave } from '../_util/composeUseHooks'
import { InputCellPhone } from '@pkgs/gantd/src'


const codeList = [
  `const [value, setValue] = useState('')
  const onSave = (id, value, cb) => cb()
  
  return (
    <InputCellPhone value={value} onChange={setValue} onSave={onSave} />
  )`,
  `const [value, setValue] = useState('18811012138')
  const onSave = (id, value, cb) => cb()
  return (
    <InputCellPhone value={value} onChange={setValue} onSave={onSave} />
  )`,
  `return (
    <>
      <InputCellPhone value={'18811012138'} allowEdit={false} />
      <InputCellPhone value={'18811012138'} edit style={{ marginTop: 10 }} />
    </>
  )`
]

const config = {
  codes: codeList.map(code => (
    `import { InputCellPhone } from 'gantd';
import React, { useState } from 'react';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`
  )),
  inline: true,
  children: [
    {
      title: '基本用法',
      describe: '手机号码组件-只有正确的手机号码才能点击确认，目前只支持+86',
      cmp: WrapperValue('')(({ value, setValue }) => < InputCellPhone value={value} onChange={setValue} onSave={onSave} />)
    },
    {
      title: '初始值',
      describe: '不是正确的手机号将被忽略',
      cmp: WrapperValue('18811012138')(({ value, setValue }) => < InputCellPhone value={value} onChange={setValue} onSave={onSave} />)
    },
    {
      title: '只展示',
      describe: '组件同样支持edit与allowEdit',
      cmp: () => (
        <>
          <InputCellPhone value={'18811012138'} allowEdit={false} />
          <InputCellPhone value={'18811012138'} edit style={{ marginTop: 10 }} />
        </>
      )
    },
  ]
}


export default () => < CodeDecorator config={config} />