import React, { useState } from 'react'
import { Button } from 'antd'
import { InputTelePhone, EditStatus, SwitchStatus } from '@packages/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `const [value, setValue] = useState()
  return <InputTelePhone value={value} onChange={(v) => setValue(v)} />`,
  `
  const [edit, setEdit] = useState(EditStatus.CANCEL)
return (
  <>
    <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
    <InputTelePhone edit={edit} />
  </>
)
  `
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import { InputTelePhone, EditStatus, SwitchStatus } from 'gantd';
import { Button } from 'antd';
import React, { useState } from 'react';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '固定电话基本格式',
      cmp: WrapperValue('7897897')(({ value, setValue }) => <InputTelePhone value={value} onChange={(v) => {console.log(v);setValue(v)}} onSave={onSave} />)
    },
    {
      title: '编辑受控',
      describe: '基本使用',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputTelePhone edit={edit} />
          </>
        )
      })
    },
  ]
}


export default () => <CodeDecorator config={config} />