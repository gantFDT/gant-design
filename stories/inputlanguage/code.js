export default [
`
import React, { useState } from 'react';
import { InputLanguage } from 'gantd'


const Use = () => {
  const [value, setValue] = useState([
    {
      value: "中文文本",
      locale: 'zh-CN'
    }
  ])
  const onSave = (id, value, cb) => {
    cb()
  }
  return <>
    <InputLanguage placeholder='输入当前语言文本' size="small" onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Use />, mountNode)`,]