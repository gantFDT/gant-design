// import '@packages/anchor-g/src/style';
import CodeDecorator from '../_util/CodeDecorator'
import codes from './code.js'
/*! Start !*/
import React, { useState, useCallback } from 'react'
import { Modal, Button, Switch } from 'antd';
import { withKeyevent } from '@gantd';
/*! Split !*/
function BasicUse() {
  const [visible, setVisible] = useState(false);
  const [needFocus, setNeedFocus] = useState(false);


  const handlerVisible = useCallback(() => {
    setVisible(!visible)
  },[visible])
  return withKeyevent(
    {
      onMetaShiftU: handlerVisible
    },
    needFocus
  )(
    <div>
      <p>{needFocus&&'聚焦时，'}按下Meta+Shift+U试试看</p>
      <Switch checkedChildren="需要聚焦" unCheckedChildren="不需要聚焦" checked={needFocus} onChange={setNeedFocus} />
      <Modal
        title="弹框标题"
        visible={visible}
        onCancel={handlerVisible}
        onOk={handlerVisible}
        cancelText="取消"
        okText="确定"
      >
        <div>
          弹框内容
        </div>
      </Modal>
    </div>
  )
}
/*! End !*/
const config = {
  codes,
  useage: `
  <b>🕯 自定义按键组合</b></br>
  基于 Alt Ctrl Meta Shift 四个特殊按键的自由按键组合，例如：Ctrl+Shift+Alt+M, Ctrl+S等</br>
  <b>🤸‍♂️ 聚焦监听</b></br>
  有些情况下，需要组件聚焦时才监听按键组合，这时候需要用到</br>
  `,
  showAnchor: false,
  children: [
    {
      title: '基本用法',
      describe: '注意："Meta"按键标识符在MacOS下为 command 按键，在Windows下为 win 按键',
      cmp: BasicUse
    },

  ]
};
export default () => <CodeDecorator config={config} />