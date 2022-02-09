import { createElement, lazy } from 'react';

export default [
  {
    title: '基础展示',
    describe: '单击行快捷选中,多选时需点击勾选框',
    cmp: createElement(lazy(() => import('./basegrid'))),
    code: require('./basegrid/code').default,
  },
  {
    title: '单元格编辑',
    describe:
      '校验规则参考：https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99；valueGetter与editConfig.initValueFormatter配合方式参考‘国籍’',
    cmp: createElement(lazy(() => import('./baseeditgrid'))),
    code: require('./baseeditgrid/code').default,
  },
  {
    title: '树形单元格编辑',
    describe: '快捷新增根节点，子节点，兄弟节点',
    cmp: createElement(lazy(() => import('./treegrid'))),
    code: require('./treegrid/code').default,
  },
  {
    title: '拷贝单元格',
    describe: '可以拖拽一个区域进行复制',
    cmp: createElement(lazy(() => import('./copyrange'))),
    code: require('./copyrange/code').default,
  },
  {
    title: '侧边栏表单详情',
    describe: '双击行打开侧边栏表单详情',
    cmp: createElement(lazy(() => import('./sideformdetail'))),
    code: require('./sideformdetail/code').default,
  },
  {
    title: '侧边栏表格详情',
    describe: '双击行打开侧边栏表格详情,可进行编辑、以及各种状态的联动',
    cmp: createElement(lazy(() => import('./sidegriddetail'))),
    code: require('./sidegriddetail/code').default,
  },
  {
    title: '自适应高度',
    describe:
      '表格自适应高度, 建议同时设置最大最小高度，为了兼容横向滚动条，所以预留了横向滚动条的高度，内部的高度其实是根据行数计算得来，顾不支持自动行高',
    cmp: createElement(lazy(() => import('./autoheight'))),
    code: require('./autoheight/code').default,
  },
  {
    title: '悬浮过滤器',
    describe: '',
    cmp: createElement(lazy(() => import('./floatingfilter'))),
    code: require('./floatingfilter/code').default,
  },
  {
    title: '表头分组',
    describe: '',
    cmp: createElement(lazy(() => import('./headergroup'))),
    code: require('./headergroup/code').default,
  },
  {
    title: '嵌套表格',
    describe: '',
    cmp: createElement(lazy(() => import('./nested'))),
    code: require('./nested/code').default,
  },
  {
    title: '合并单元格',
    describe: '',
    cmp: createElement(lazy(() => import('./rowspan'))),
    code: require('./rowspan/code').default,
  },
  {
    title: '行选择盒子',
    describe: '',
    cmp: createElement(lazy(() => import('./selectionbox'))),
    code: require('./selectionbox/code').default,
  },
  {
    title: '汇总行',
    describe: '',
    cmp: createElement(lazy(() => import('./summary'))),
    code: require('./summary/code').default,
  },
];
