import { createElement, lazy } from 'react';

export default [
  {
    title: '基本用法',
    describe:
      '最简单的用法，默认模态窗口、宽高520、从相对浏览器文档显示区的中心位置弹出，鼠标悬浮到弹窗右下角边界，会出现能大小伸缩的图标，拖动则即时更改弹窗大小',
    cmp: createElement(lazy(() => import('./basic'))),
    code: require('./basic/code').default,
  },
  {
    title: '自定义宽高',
    describe: '设置符合场景需求的弹窗大小，支持px和百分比，可通过回调获取即时的宽高值',
    cmp: createElement(lazy(() => import('./custom'))),
    code: require('./custom/code').default,
  },
  {
    title: '自定义弹出位置',
    describe: '可通过设置x,y属性指定弹窗默认弹出位置',
    cmp: createElement(lazy(() => import('./position'))),
    code: require('./position/code').default,
  },
  {
    title: '默认最大化状态',
    describe: '弹窗打开时以最大化模式进行展开',
    cmp: createElement(lazy(() => import('./maximize'))),
    code: require('./maximize/code').default,
  },
  {
    title: '功能禁用',
    describe: '对是否可以改变弹窗尺寸、是否可最大化最小化切换的属性的控制',
    cmp: createElement(lazy(() => import('./forbidden'))),
    code: require('./forbidden/code').default,
  },
  {
    title: '状态存储',
    describe: '支持在组件挂载期存储弹窗关闭前的定位与尺寸信息',
    cmp: createElement(lazy(() => import('./keepstate'))),
    code: require('./keepstate/code').default,
  },
  {
    title: '同屏多弹窗模式',
    describe: '支持同屏多非模态型的弹窗，可通过点击改变当前选中弹窗层级',
    cmp: createElement(lazy(() => import('./multiple'))),
    code: require('./multiple/code').default,
  },
  {
    title: '自适应高度',
    describe: '自适应高度',
    cmp: createElement(lazy(() => import('./autoheight'))),
    code: require('./autoheight/code').default,
  },
];
