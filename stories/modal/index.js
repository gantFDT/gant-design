import React from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import children from './demo';
import {setGlobalConfig} from '@modal'

// setGlobalConfig({
//   type:'autoHeight'
// })

const config = {
  useage: `
    <b>支持拖拽移动和大小伸缩</b></br>
    <b>窗口化和全屏化状态的切换</b></br>
    <b>实时响应浏览器窗口变化</b></br>
    <b>支持挂载期弹窗状态留存</b></br>
    <b>可支持非模态窗口模式等功能，并支持同屏展示多个弹出框</b></br>
    `,
  children,
};

export default () => <CodeDecorator config={config} />;
