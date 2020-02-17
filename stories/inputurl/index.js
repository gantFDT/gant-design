import React, { useState } from 'react'
import { Button } from 'antd'
import { InputUrl } from '@pkgs/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `
  const [value, setValue] = useState('');
  return (
    <>
      <InputUrl placeholder='请输入网址' value={value} onChange={(v) => setValue(v)}/>
      <InputUrl placeholder='请输入网址' edit style={{marginTop: 10}} />
    </>
  )`,
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import { InputUrl } from 'gantd';
import React, { useState } from 'react';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '当输入的文本符合URI规则的时候,将以链接的形式呈现,否则将退化成普通文本',
      cmp: WrapperValue('')(({ value, setValue }) => (
        <>
          <InputUrl placeholder='请输入网址' value={value} onChange={(v) => setValue(v)} onSave={onSave} />
          <InputUrl placeholder='请输入网址' edit style={{ marginTop: 10 }} />
        </>
      ))
    }
  ],
  inline: true,
}


export default () => <CodeDecorator config={config} />