import BaseGrid from './basegrid';
import BaseGridCode from './basegrid/code';

import BaseEditGrid from './baseeditgrid';
import BaseEditGridCode from './baseeditgrid/code';

import TreeGrid from './treegrid';
import TreeGridCode from './treegrid/code';

import CopyRange from './copyrange';
import CopyRangeCode from './copyrange/code';

import SideFormDetail from './sideformdetail';
import SideFormDetailCode from './sideformdetail/code';

import SideGridDetail from './sidegriddetail';
import SideGridDetailCode from './sidegriddetail/code';

import AutoHeight from './autoheight';
import AutoHeightCode from './autoheight/code';

export default [
  {
    title: '基础展示',
    describe: '基础展示Grid',
    cmp: BaseGrid,
    code: BaseGridCode,
  },
  {
    title: '编辑功能',
    describe:
      '校验规则参考：https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99；valueGetter与editConfig.initValueFormatter配合方式参考‘国籍’',
    cmp: BaseEditGrid,
    code: BaseEditGridCode,
  },
  {
    title: '树形',
    describe: 'tree',
    cmp: TreeGrid,
    code: TreeGridCode,
  },
  {
    title: '拷贝单元格',
    describe: '可以拖拽一个区域进行复制',
    cmp: CopyRange,
    code: CopyRangeCode,
  },
  {
    title: '侧边栏表单详情',
    describe: '双击行打开侧边栏表单详情',
    cmp: SideFormDetail,
    code: SideFormDetailCode,
  },
  {
    title: '侧边栏表格详情',
    describe: '双击行打开侧边栏表格详情,可进行编辑、以及各种状态的联动',
    cmp: SideGridDetail,
    code: SideGridDetailCode,
  },
  {
    title: '自适应高度',
    describe: '表格自适应高度, 建议同时设置最大最小高度，为了兼容横向滚动条，所以预留了横向滚动条的高度，内部的高度其实是根据行数计算得来，顾不支持自动行高',
    cmp: AutoHeight,
    code: AutoHeightCode,
  },
];
