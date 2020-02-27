export default [
  `
  import React, { useState } from 'react';
  import {InputLanguage} from 'gantd';
  
  const Demo = () => {
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
      <InputLanguage placeholder='输入当前语言文本' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
    </>
  }
  
  ReactDOM.render(
      <Demo />,
      mountNode,
  );
  `,
]



