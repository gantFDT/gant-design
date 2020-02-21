import React, { useState } from 'react'
import { Button } from 'antd'
import { InputMoney, SwitchStatus } from '@packages/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `return <InputMoney />`,
  `const [edit, setEdit] = useState(false)
  return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputMoney edit={edit} />
          </>
        )`
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import { Button } from 'antd';
import { InputMoney, EditStatus, SwitchStatus } from 'gantd';
import React, { useState } from 'react';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '',
      cmp: WrapperValue('')(({ value, setValue }) => <InputMoney value={value} onChange={(v) => setValue(v)} onSave={onSave} />)
    },
    {
      title: '编辑受控',
      describe: '',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputMoney edit={edit} />
          </>
        )
      })
    },
  ]
}


export default () => <CodeDecorator config={config} />