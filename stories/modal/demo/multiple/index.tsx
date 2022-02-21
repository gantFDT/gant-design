import { Modal } from '@gantd';
import { Button } from 'antd';
import React, { useState } from 'react';
const { ResizableModal, ResizableProvider } = Modal;
const ButtonGroup = Button.Group;


function MultipleModalsUse() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <ButtonGroup style={{ marginRight: 10 }}>
          <Button
            size="small"
            onClick={() => {
              setVisible(true);
            }}
          >
            第一个弹窗
          </Button>
          <Button
            size="small"
            onClick={() => {
              setVisible2(true);
            }}
          >
            第二个弹窗
          </Button>
          <Button
            size="small"
            onClick={() => {
              setVisible3(true);
            }}
          >
            第三个弹窗
          </Button>
          <Button
            size="small"
            onClick={() => {
              setVisible4(true);
            }}
          >
            第四个弹窗
          </Button>
        </ButtonGroup>
      </div>
      <ResizableProvider>
        <ResizableModal
          id="1"
          title="第一个弹窗"
          visible={visible}
          footer={null}
          onCancel={() => {
            setVisible(false);
          }}
        >
          第一个弹窗-content
        </ResizableModal>
        <ResizableModal
          itemState={{ height: 400, width: 400 }}
          id="2"
          title="第二个弹窗"
          visible={visible2}
          onCancel={() => {
            setVisible2(false);
          }}
        >
          第二个弹窗-content
        </ResizableModal>
      </ResizableProvider>
      <ResizableProvider>
        <ResizableModal
          id="1"
          title="第三个弹窗"
          visible={visible3}
          footer={null}
          onCancel={() => {
            setVisible3(false);
          }}
        >
          第三个弹窗-content
        </ResizableModal>
        <ResizableModal
          itemState={{ height: 400, width: 400 }}
          id="2"
          title="第四个弹窗"
          visible={visible4}
          onCancel={() => {
            setVisible4(false);
          }}
        >
          第四个弹窗-content
        </ResizableModal>
      </ResizableProvider>
    </>
  );
}

export default MultipleModalsUse;
