import React, { useState } from 'react';
import ColorPicker from '@color-picker';
import { ColorPicker as DataCellColorPicker } from '@data-cell';
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js';

function BasicUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器</h3>
    <ColorPicker
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

function BottomUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器(向下弹出)</h3>
    <ColorPicker
      placement="bottom"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

function ReadOnlyUse() {
  const [color, setColor] = useState('#EB2F96');
  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }

  return <>
    <h3 style={{ color }}>颜色选择器（读写分离）</h3>
    <DataCellColorPicker
      edit={false}
      value={color}
      onSave={onSave}
      onChange={setColor.bind(null)}
    />
  </>
}

function DisabledUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（只读）</h3>
    <DataCellColorPicker
      allowEdit={false}
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}

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
      title: '向下弹出用法',
      describe: '向下弹出的用法',
      cmp: BottomUse
    },
    {
      title: '读写分离',
      describe: '读写分离的用法',
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

