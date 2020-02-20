import React, { useState } from 'react';
import AutoReload from '@pkgs/auto-reload-g/src';
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js';

function Use1() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh1') }}
    />
  </>
}

function Use2() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh2') }}
      auto={true}
      interval={10}
      time={'自定义显示'}
    />
  </>
}



const config = {
  codes: code,
  inline: true,
  useage: `有些业务场景需要轮询，AutoReload即可满足让用户决定是否开启定时刷新`,
  children: [
    {
      title: '基本用法',
      describe: '最简单的用法',
      cmp: Use1
    },
    {
      title: '其他属性',
      describe: '其他属性的用法',
      cmp: Use2
    }
  ]
};
export default () => <CodeDecorator config={config} />

