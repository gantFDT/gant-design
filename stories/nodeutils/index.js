import React, { useState } from 'react'
import Header from '@packages/header-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import reactElementToJSXString from 'react-element-to-jsx-string';
import code from './code'

function demo(props) {
  return (<div></div>)
}


const config = {
  codes: code.map(V => `const fs = require('fs');\n
const path = require('path');\n
const exec = require('child_process').exec;\n
const utils = require('node-util-g')\n${V}`),
  inline: true,
  useage: `
    一些常用的nodejs工具类
    `,
  children: [
    {
      title: 'sleep | 暂停函数',
      describe: '',
      cmp: demo,
    },
    {
      title: 'delDir | 同步删除文件夹',
      describe: '',
      cmp: demo,
    },
    {
      title: 'fileReplace | 文件替换内容',
      describe: '',
      cmp: demo,
    },
    {
      title: 'dirReplace | 文件夹替换内容',
      describe: '',
      cmp: demo,
    },
    {
      title: 'mkdirsSync | 递归创建目录 同步方法',
      describe: '',
      cmp: demo,
    },
    {
      title: 'copySync | 同步复制',
      describe: '',
      cmp: demo,
    },
    {
      title: 'copyDir | 同步复制文件夹',
      describe: '',
      cmp: demo,
    }
  ]
};
export default () => <CodeDecorator config={config} />
