
import { IconSelector } from '@packages/gantd/src';
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';
import { message } from 'antd'



function BasicUse() {
  return (
    <IconSelector onChange={(value) => { message.info(value) }} />
  )
}



const config = {
  codes: code.map(item => {
    return `
      import { IconSelector } from 'gantd';
      ReactDOM.render(
          ${item},
          mountNode,
      );
      `
  }),
  useage: `<b>🖍 读写分离</b></br>
  <b>🎗 Iconfont 选择</b>
`,
  children: [
    {
      title: '图标选择器',
      describe: '可以直接选择Ant自带的icon或者iconfont，如需选择自己项目的iconfont,则需要前置引入',
      cmp: BasicUse
    }
  ]
};

export default () => <CodeDecorator config={config} />