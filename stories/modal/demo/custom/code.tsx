export default ` 
import { Modal } from 'gantd';
import { Button } from 'antd';
import React, { useState } from 'react';


function CustomUse() {
  const [visible, setVisible] = useState(false)
  const [widthAndHei, setWidthAndHei] = useState([0, 0])
  const onSizeChange = (width, height) => {
      setWidthAndHei([width, height])
  }
  return (
      <div style={{ margin: 10 }}>
          <div style={{ marginBottom: 10 }}>
              <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
          </div>
          <Modal
              title='自定义属性标题'
              itemState={{ height: 400, width: '60%' }}
              visible={visible}
              footer={null}
              onCancel={() => { setVisible(false) }}
              onSizeChange={onSizeChange}
          >
              <div>
                  <h4>动态宽高获取（包含header+footer）:</h4>
                  <div>{\`width:\${widthAndHei[0]}px\`}</div>
                  <div>{\`height:\${widthAndHei[1]}px\`}</div>
              </div>
          </Modal>
      </div>
  )
}

export default CustomUse;
 
 `