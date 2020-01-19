import React, { useState } from 'react';
import ColorPicker from '@/color-picker-g/src';
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js';

function BasicUse() {
  const [color, setColor] = useState('#EB2F96');
  
  return <>
    <h3 style={{color}}>颜色选择器</h3>
    <ColorPicker
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

function ReadOnlyUse() {
  const [color, setColor] = useState('#EB2F96');
  
  return <>
    <h3 style={{color}}>颜色选择器(只读)</h3>
    <ColorPicker
      edit={false}
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

function DisabledUse() {
  const [color, setColor] = useState('#EB2F96');
  
  return <>
    <h3 style={{color}}>颜色选择器(禁用)</h3>
    <ColorPicker
      disabled
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

const config = {
    codes: code,
    inline: true,
    useage: ``,
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法',
            cmp: BasicUse
        },
        {
            title: '只读',
            describe: '只读的用法',
            cmp: ReadOnlyUse
        },
        {
            title: '禁用',
            describe: '禁用的用法',
            cmp: DisabledUse
        }
    ]
};
export default () => <CodeDecorator config={config} />

