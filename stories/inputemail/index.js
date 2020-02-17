import React, { useState } from 'react'
import { Button } from 'antd'
import { InputEmail, EditStatus, SwitchStatus } from '@pkgs/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `return <InputEmail />`,
  `const [edit, setEdit] = useState(EditStatus.CANCEL)
  return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputEmail edit={edit} />
          </>
        )`
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import React, { useState } from 'react';
import { InputEmail, EditStatus, SwitchStatus } from 'gantd';
import { Button } from 'antd';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '输入的邮箱必须满足基本的邮箱格式',
      cmp: WrapperValue('111')(({ value, setValue }) => <InputEmail value={value} onChange={(v) => setValue(v)} onSave={onSave} />)
    },
    {
      title: '编辑受控',
      describe: '基本使用',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputEmail edit={edit} />
          </>
        )
      })
    },
  ]
}


export default () => <CodeDecorator config={config} />