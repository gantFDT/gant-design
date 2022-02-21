export default ` 
import { Modal } from 'gantd';
import { Button } from 'antd';
import React, { useState } from 'react';

function ForbiddenUse() {
  const [visible, setVisible] = useState(false)
  return (
      <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 10 }}>
              <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
          </div>
          <Modal
              title='功能禁止的状态弹窗'
              visible={visible}
              canMaximize={false}
              canResize={false}
              onCancel={() => { setVisible(false) }}
          >
          </Modal>
      </div>
  )
}

export default ForbiddenUse;
 
 `