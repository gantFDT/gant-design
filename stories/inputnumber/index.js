import React, { useState } from 'react'
import { Button } from 'antd'
import { InputNumber, EditStatus, SwitchStatus } from '@packages/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `const [value, setValue] = useState("aaasd1111")
  return (<InputNumber value={value} onChange={(v) => setValue(v)} onSave={onSave} />)`,
  `const [edit, setEdit] = useState(EditStatus.CANCEL)
  return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputNumber edit={edit} />
          </>
        )`
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import React, { useState } from 'react';
import { Switch, Button } from 'antd';
import { InputNumber, EditStatus, SwitchStatus } from 'gantd';

const onSave = (id, value, cb) => cb()

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '如果不是初始值纯数字,将会被忽略',
      cmp: WrapperValue('aaasd1111')(({ value, setValue }) => <InputNumber value={value} onChange={(v) => setValue(v)} onSave={onSave} />)
    },
    {
      title: '编辑受控',
      describe: '基本使用',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputNumber edit={edit} />
          </>
        )
      })
    },
  ]
}


export default () => <CodeDecorator config={config} />