import React, { useState } from 'react'
import { Button } from 'antd'
import { LocationSelector, SwitchStatus } from '@data-cell'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'



const codeList = [
  `const [value, setValue] = useState(["CHN", "510000", "510100"])
  return <LocationSelector value={value} onChange={setValue} />`,
  `return LocationSelector.getLocationName(["CHN", "120000", "120102"]).join('、')`
]

const config = {
  inline: true,
  codes: codeList.map(code =>
    `import { LocationSelector, EditStatus, SwitchStatus } from '@data-cell';
import { Button } from 'antd';
import React, { useState } from 'react';

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  useage: `
    <b>🌏 全球省市区三级联动</b></br>
    全球地区信息快速选择
  `,
  children: [
    {
      title: '基本使用',
      describe: '以数组形式传递编码',
      cmp: WrapperValue(["CHN", "510000", "510100"])(({ value, setValue }) => <LocationSelector value={value} onChange={setValue} onSave={onSave} />)
    },
    {
      title: '根据代码获取地址的名称',
      describe: '调用静态方法LocationSelector.getLocationName，根据代码获取地址的名称',
      cmp: WrapperEdit(({ edit, setEdit }) => {
        return (
          <>
            {
              LocationSelector.getLocationName(["CHN", "120000", "120102"]).join('、')
            }
          </>
        )
      })
    },
  ]
}


export default () => <CodeDecorator config={config} />