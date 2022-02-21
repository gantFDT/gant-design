export default ` 
import { Modal } from 'gantd';
import { Button } from 'antd';
import React, { useState } from 'react';

function PositionUse() {
  const [visible, setVisible] = useState(false)
  return (
      <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 10 }}>
              <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
          </div>
          <Modal
              title='默认弹窗'
              visible={visible}
              onCancel={() => { setVisible(false) }}
              type="autoHeight"
          >
              从指定的x:0,y:0位置进行弹出
          </Modal>
      </div>
  )
}

export default PositionUse;
 
 `