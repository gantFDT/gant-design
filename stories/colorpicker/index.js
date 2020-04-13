import '@data-cell/color-picker/style';
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js';
/*! Start !*/
import React, { useState } from 'react';
import { ColorPicker } from '@gantd';
const { PurePicker } = ColorPicker;
// import { ColorPicker } = '@color-picker-g'; 此处的ColorPicker同PurePicker，即不添加读写分离的选择器
/*! Split !*/
function BasicUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器</h3>
    <PurePicker
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
/*! Split !*/
function SizeUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器(迷你大小)</h3>
    <PurePicker
      size="small"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
/*! Split !*/
function BottomUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器(向下弹出)</h3>
    <PurePicker
      placement="bottom"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
/*! Split !*/
function ReadWriteUse() {
  const [color, setColor] = useState('#EB2F96');
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }

  return <>
    <h3 style={{ color }}>颜色选择器（读写分离）</h3>
    <ColorPicker
      value={color}
      onSave={onSave}
      onChange={setColor.bind(null)}
    />
  </>
}
/*! Split !*/
function ReadOnlyUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（只读）</h3>
    <ColorPicker
      allowEdit={false}
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
/*! Split !*/
function DisabledUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（禁用）</h3>
    <PurePicker
      disabled
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
/*! End !*/
const config = {
  useage: `<b>🖍 读写分离</b></br>
    <b>🎨 antd标准颜色板</b>
  `,
  codes: code,
  inline: true,
  children: [
    {
      title: '基本用法',
      describe: '最简单的用法',
      cmp: BasicUse
    },
    {
      title: '尺寸用法',
      describe: '修改尺寸的用法',
      cmp: SizeUse
    },
    {
      title: '向下弹出用法',
      describe: '向下弹出的用法',
      cmp: BottomUse
    },
    {
      title: '读写分离',
      describe: '读写分离的用法, 此功能仅 <b>data-cell-g</b> 里面的ColorPicker组件提供。',
      cmp: ReadWriteUse
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

