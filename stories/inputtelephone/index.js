import React, { useState } from 'react'
import { Button } from 'antd'
import { InputTelePhone, SwitchStatus } from '@data-cell'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `const [value, setValue] = useState({ code: "0832", phone: "4300698" })
  return <InputTelePhone value={value} onChange={setValue} />`,
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
      describe: '固定电话基本格式，可以指定区号。国内座机号最多8位',
      cmp: WrapperValue({ code: '0832', phone: '4300698' })(({ value, setValue }) => <InputTelePhone value={value} onChange={setValue} onSave={onSave} />)
    },
  ]
}


export default () => <CodeDecorator config={config} />