import React, { useState } from 'react'
import { Button } from 'antd'
import { InputLanguage, SwitchStatus } from '@packages/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `const [value, setValue] = useState('')
  return <InputLanguage value={value} localeList={localeList} onChange={(v) => setValue(v)} onSave={onSave} />`,
  `const [edit, setEdit] = useState(EditStatus.CANCEL)
  return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputLanguage edit={edit} />
          </>
        )`,
  `return <InputLanguage value={{ locale: 'en-US', value: 'English' }} />`
]

const localeList = [
  {
    locale: 'zh-CN',
    label: '中文',
    value: '中文问'
  },
  {
    locale: 'en-US',
    label: '英文',
    value: '英文文'
  }
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import { InputLanguage, EditStatus, SwitchStatus } from 'gantd';
import { Button } from 'antd';
import React, { useState } from 'react';
const localeList = [
  {
    locale: 'zh-CN',
    label: '中文',
    value: '中文问'
  },
  {
    locale: 'en-US',
    label: '英文',
    value: '英文文'
  }
]
function Demo(){
  const onSave = (id, value, cb) => cb()
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '',
      cmp: WrapperValue({ locale: 'zh-CN', value: '中文' })(({ value, setValue }) => <InputLanguage value={value} localeList={localeList} onChange={(v) => setValue(v)} onSave={onSave} />)
    },
    {
      title: '编辑受控',
      describe: '基本使用',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <InputLanguage edit={edit} localeList={localeList} />
          </>
        )
      })
    },
    {
      title: '设置语言',
      describe: "通过locale属性设置语言",
      cmp: () => <InputLanguage value={{ locale: 'en-US', value: 'English' }} localeList={localeList} />
    }
  ]
}


export default () => <CodeDecorator config={config} />