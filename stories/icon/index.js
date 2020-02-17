
import { Icon } from '@pkgs/gantd/src';
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';



function BasicUse() {
  return (
    <Icon type="star" theme="filled"
      style={{
        color: '#333',
        fontSize: '16px',
        verticalAlign: 'text-bottom',
        marginRight: '5px',
        cursor: 'pointer'
      }}
    />
  )
}

function CustomizeUse() {
  const PartIcon = Icon.createFromIconfontCN('partIcon', {
    scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
  })
  return (
    <PartIcon type="icon-msnui-protect"
      style={{
        color: '#FFC000', fontSize: '16px',
        verticalAlign: 'text-bottom', marginRight: '5px', cursor: 'pointer'
      }}
    />
  )
}

function DyncmicIcon() {

  setTimeout(() => {
    Icon.updateFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1252237_d3o5b6zp99f.js'
    })
  }, 5000)
  return (
    <Icon type="icon-jiaoseguanli_old" />
  )
}

const config = {
  codes: code.map(item => {
    return `
      import { Icon } from 'gantd';
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
    },
    {
      title: '自定义用法',
      describe: '获取自定义图标的方法，key会挂载到Icon上，可以直接通过Icon.Key获取组件',
      cmp: CustomizeUse
    },
    {
      title: '动态更新图标库',
      describe: '在使用图标期间，通过updateFromIconfontCN方法更新使用到的图标',
      cmp: DyncmicIcon
    },
  ]
};

export default () => <CodeDecorator config={config} />