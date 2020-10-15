import CodeDecorator from '../_util/CodeDecorator';
import codeList from './code';
/*! Start !*/
import React from 'react';
import { TreeSelector } from '@data-cell';
const BasicUse = () => {
  return <div  >
      <TreeSelector />
  </div>;
};
const config = {
  codes: codeList,
  inline: true,
  useage: 'treeselector 支持最新选择',
  children: [
    {
      title: '基本用法',
      describe: '最简单的用法',
      cmp: BasicUse,
    },
  ],
};
export default () => <CodeDecorator config={config} />;
