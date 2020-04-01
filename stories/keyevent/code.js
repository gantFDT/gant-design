export default [
`
import React, { useState, useCallback } from 'react'
import { Modal, Button, Switch } from 'antd';
import { withKeyevent } from 'gantd';


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

ReactDOM.render(<BasicUse />, mountNode)`,]