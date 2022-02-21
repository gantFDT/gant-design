import { Modal } from '@gantd';
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

function BasicUse() {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ margin: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <Button
          size="small"
          onClick={() => {
            setVisible(true);
          }}
        >
          触发弹窗
        </Button>
      </div>
      <ConfigProvider locale={zhCN}>
        <Modal
          title="默认弹窗"
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
        >
          默认宽高520
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default BasicUse;
