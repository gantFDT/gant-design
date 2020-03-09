
import { Icon, EditStatus } from '@data-cell';
import React, { useState } from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';



function BasicUse() {
  return (
    <>
      <Icon type='api' /> /api/get
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
      title: '仅显示图标',
      describe: '默认支持ant图标，通过updateFromIconfontCN静态方法添加iconfont的图标，达到全局更新Icon作用范围的作用。通过type属性，使其成为一个行内组件，用于和文字排布',
      cmp: BasicUse
    },
    {
      title: '图标选择器',
      describe: '传递value、onChange使组件成为受控组件，一般用于表单中进行修改。通过设置allowEdit: true，点击图标可以唤起选择图标的抽屉',
      cmp: IconSelector
    },
  ]
};

export default () => <CodeDecorator config={config} />