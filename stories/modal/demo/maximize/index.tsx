import { Modal } from '@gantd';
import { Button } from 'antd';
import React, { useState } from 'react';


function MaximizeUse() {
  const [visible, setVisible] = useState(false)
  return (
      <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 10 }}>
              <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
          </div>
          <Modal
              title='最大化弹窗'
              itemState={{ maximize: true }}
              visible={visible}
              onCancel={() => { setVisible(false) }}
          >
          </Modal>
      </div>
  )
}

export default MaximizeUse;
