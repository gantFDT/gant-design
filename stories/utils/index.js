import React, { useState } from 'react';
import Header from '@packages/header-g/src';
import CodeDecorator from '../_util/CodeDecorator';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Code from './code';

function codeFun(props) {
  return <div></div>;
}

const config = {
  // codes: code.map(V => V),
  useage: `
    🤡 项目中经常会用到的一些公共方法
    `,
  children: [
    {
      title: 'IEVersion | 判断IE版本',
      describe: '',
      cmp: codeFun,
      code: Code['IEVersion'],
    },
    {
      title: 'getCookie | 获取cookie',
      describe: '',
      cmp: codeFun,
      code: Code['getCookie'],
    },
    {
      title: 'delCookie | 删除cookie',
      describe: '',
      cmp: codeFun,
      code: Code['delCookie'],
    },
    {
      title: 'setCookie | 设置cookie',
      describe: '',
      cmp: codeFun,
      code: Code['setCookie'],
    },
    {
      title: 'generateUuid | 生成UUID',
      describe: '',
      cmp: codeFun,
      code: Code['generateUuid'],
    },
    // {
    //   title: 'getType | 判断类型',
    //   describe: '',
    //   cmp: codeFun,
    //   code:Code['getType']
    // },
    // {
    //   title: 'deepCopy4JSON | JSON深拷贝',
    //   describe: '',
    //   cmp: codeFun,
    //   code:Code['deepCopy4JSON']
    // },
    // {
    //   title: 'JSONisEqual | 判断JSON相等',
    //   describe: '',
    //   cmp: codeFun,
    //   code:Code['JSONisEqual']
    // },
    // {
    //   title: 'isParamsEmpty | 判断参数是否为空',
    //   describe: '',
    //   cmp: codeFun,
    //   code:Code['isParamsEmpty']
    // },
    {
      title: 'getTreeNode | 获取树节点',
      describe: '',
      cmp: codeFun,
      code: Code['getTreeNode'],
    },
    {
      title: 'array2Tree | 平铺树形数组转树',
      describe: '',
      cmp: codeFun,
      code: Code['array2Tree'],
    },
    {
      title: 'tree2Array | 树形结构打平',
      describe: ' ',
      cmp: codeFun,
      code: Code['tree2Array'],
    },
    {
      title: 'getIdsFormTree | 获取树节点所有id',
      describe: '',
      cmp: codeFun,
      code: Code['getIdsFormTree'],
    },
    {
      title: 'getFileUnit | 格式化文件大小显示',
      describe: '',
      cmp: codeFun,
      code: Code['getFileUnit'],
    },
    {
      title: 'getTimeInterval | 获取两个时间的间隔',
      describe: '',
      cmp: codeFun,
      code: Code['getTimeInterval'],
    },
    {
      title: 'findDomParentNode | 向上获取dom节点',
      describe: '',
      cmp: codeFun,
      code: Code['findDomParentNode'],
    },
    {
      title: 'getPerformanceTiming | 首屏性能分析',
      describe: '',
      cmp: codeFun,
      code: Code['getPerformanceTiming'],
    },
    {
      title: 'hexToRgba | 16进制色值转rgb',
      describe: '',
      cmp: codeFun,
      code: Code['hexToRgba'],
    },
  ],
};
export default () => <CodeDecorator config={config} />;
