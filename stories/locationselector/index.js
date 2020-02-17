import React, { useState } from 'react'
import { Button } from 'antd'
import { LocationSelector, EditStatus, SwitchStatus } from '@pkgs/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `const [value, setValue] = useState()
  return <LocationSelector value={value} onChange={setValue} />`,
  `const [edit, setEdit] = useState(EditStatus.CANCEL)
  return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <LocationSelector edit={edit} />
          </>
        )`,
  `return LocationSelector.getLocationName(["CHN", "120000", "120102"])`
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import { LocationSelector, EditStatus, SwitchStatus } from 'gantd';
import { Button } from 'antd';
import React, { useState } from 'react';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '基本使用',
      describe: '得到选择地域的数组',
      cmp: WrapperValue('')(({ value, setValue }) => <LocationSelector value={value} onChange={(v) => setValue(v)} onSave={onSave} />)
    },
    {
      title: '编辑受控',
      describe: '基本使用',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 10 }}>切换</Button>
            <LocationSelector edit={edit} />
          </>
        )
      })
    },
    {
      title: '根据代码获取地址的名称',
      describe: '根据代码获取地址的名称',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            {
              LocationSelector.getLocationName(["CHN", "120000", "120102"])
            }
          </>
        )
      })
    },
  ]
}


export default () => <CodeDecorator config={config} />