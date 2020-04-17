export default [
`
import React, { useState } from 'react';
import { InputLanguage } from 'gantd'


const Use = () => {
  // const [value, setValue] = useState([
  //   {
  //     value: "中文文本",
  //     locale: 'zh-CN'
  //   }
  // ])
  const [value, setValue] = useState({
    "zh_CN": "中文"
  })
  const [localeList] = useState([
    {
      locale: "zh_CN",
      label: "中文"
    },
    {
      locale: "en",
      label: "英文"
    },
  ])


  const onSave = (id, value, cb) => {
    cb()
  }
  return <>
    <InputLanguage placeholder='输入当前语言文本' size="small" onSave={onSave} value={value} onChange={setValue} localeList={localeList} defalutLocale="en" />
  </>
}

ReactDOM.render(<Use />, mountNode)`,]