
import { IconSelector } from '@pkgs/gantd/src';
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';
import {message} from 'antd'



function BasicUse() {
  return (
    <IconSelector onChange={(value)=>{message.info(value)}}/>
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
  useage: '当业务需要选择一个图标的时候',
  children: [
    {
      title: '图标选择器',
      describe: '可以直接选择Ant自带的icon或者iconfont，如需选择自己项目的iconfont,则需要前置引入',
      cmp: BasicUse
    }
  ]
};

export default () => <CodeDecorator config={config} />