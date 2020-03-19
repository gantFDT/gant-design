
import '@data-cell/icon/style';
import CodeDecorator from '../_util/CodeDecorator';
import codes from './code.js';

/*! Start !*/
import React, { useState } from 'react';
import { Icon } from '@gantd';
/*! Split !*/
function BasicUse() {
  return (
    <>
      <Icon type='api' /> /api/get
    </>
  )
}
/*! Split !*/
function IconSelector() {
  const [value, setvalue] = useState('loading')
  return (
    <Icon allowEdit value={value} onChange={setvalue} onSave={(id, value, cb) => { cb() }} />
  )
}
/*! End !*/

const config = {
  codes,
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