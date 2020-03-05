
import { Icon, EditStatus } from '@data-cell';
import React, { useState } from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';



function BasicUse() {
  return (
    <>
      <Icon value='api' /> /api/get
    </>
  )
}
function IconSelector() {
  const [value, setvalue] = useState('loading')
  return (
    <Icon allowEdit value={value} onChange={setvalue} onSave={(id, value, cb) => { cb() }} />
  )
}



const config = {
  codes: code.map(item => {
    return `import { Icon } from 'data-cell-g';
${item}`
  }),
  useage: `<b>🖍 读写分离</b></br>
  <b>🎗 Iconfont 选择</b>
`,
  children: [
    {
      title: '显示Ant图标',
      describe: '默认支持ant图标，通过updateFromIconfontCN静态方法添加iconfont的图标，达到全局更新Icon作用范围的作用',
      cmp: BasicUse
    },
    {
      title: '修改图标',
      describe: '通过设置allowEdit: true，点击图标可以唤起选择图标的抽屉,这个时候需要指定onChange使其成为受控组件',
      cmp: IconSelector
    },
  ]
};

export default () => <CodeDecorator config={config} />