import { setGridConfig } from '@grid';
import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import {
  BaseGrid,
  BaseGridCode,
  CopyRange,
  CopyRangeCode,
  DrawerModeFrom,
  DrawerModeFromCode,
  TreeGrid,
  TreeGridCode,
} from './demo';

setGridConfig({ gantDateComponent: true });

const config = {
  //代码字符串，通过顺序映射到children
  codes: [BaseGridCode, TreeGridCode, CopyRangeCode, DrawerModeFromCode],
  useage: (
    <div>
      <div>依赖于ag-grid的高性能表格</div>
      <div style={{ fontWeight: 'bold' }}>
        ag-grid-enterprise需商业授权，如需使用ag-grid-enterprise功能，请自行获得LicenseKey
      </div>
      <div>
        <a href="https://www.ag-grid.com/" target="_blank">
          Ag-Grid官网
        </a>
      </div>
      <div>
        <a href="https://github.com/ag-grid/ag-grid/blob/master/LICENSE.txt" target="_blank">
          LICENSE
        </a>
      </div>
    </div>
  ),
  children: [
    // {
    //   title: '基础Grid',
    //   describe: '基础Grid',
    //   cmp: BaseGrid,
    // },
    // {
    //   title: '树形Grid',
    //   describe: 'tree',
    //   cmp: TreeGrid,
    // },
    // {
    //   title: '拷贝单元格',
    //   describe: '可以拖拽一个区域进行复制',
    //   cmp: CopyRange,
    // },
    {
      title: '侧边栏表单详情',
      describe:
        '双击行打开侧边栏表单详情, 如果要实现可编辑，通过editConfig转formItem要考虑的点太多',
      cmp: DrawerModeFrom,
    },
    {
      title: '侧边栏表格详情',
      describe: '双击行打开侧边栏表格详情',
      cmp: DrawerModeFrom,
    },
  ],
};

export default () => <CodeDecorator config={config} />;
