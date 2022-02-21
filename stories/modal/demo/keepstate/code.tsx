export default ` 
import { Modal } from 'gantd';
import { Button, ConfigProvider } from 'antd';
import React, { useState } from 'react';

const zhCN = {
  locale: 'zh_CN',
  Modal: {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
  },
};

function KeepState() {
  const [visible, setVisible] = useState(false)
  return (
      <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 10 }}>
              <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
          </div>
          <ConfigProvider locale={zhCN}>
              <Modal
                  title='默认弹窗'
                  visible={visible}
                  itemState={{ keepStateOnClose: true }}
                  onCancel={() => { setVisible(false) }}
              >
                  挂载期-存储弹窗状态（宽高、定位、最大化）
          </Modal>
          </ConfigProvider>
      </div>
  )
}

export default KeepState;
 
 `