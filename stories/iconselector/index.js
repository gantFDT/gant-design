
import { IconSelector } from '@pkgs/gantd/src';
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';



function BasicUse() {
  return (
    <IconSelector />
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
  useage: '语义化的矢量图形。',
  children: [
    {
      title: '基本用法',
      describe: '最简单的用法',
      cmp: BasicUse
    }
  ]
};

export default () => <CodeDecorator config={config} />