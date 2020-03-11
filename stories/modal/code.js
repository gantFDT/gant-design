const code =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { Modal } from 'gantd'
  // import { Modal } from 'modal-g' //与gantd中引入效果相同

function BasicUse() {
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
        >
            默认宽高520
        </Modal>
      </div>
  )
}

ReactDOM.render(<BasicUse/>,mountNode)
`

const code1 =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { Modal } from 'gantd'
  // import { Modal } from 'modal-g' //与gantd中引入效果相同
  
  function CustomUse() {
    const [visible, setVisible] = useState(false);
    const [widthAndHei, setWidthAndHei] = useState([400, 400]);
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
          itemState={{ height: 400, width: 400 }}
          visible={visible}
          footer={null}
          onCancel={() => { setVisible(false) }}
          onSizeChange={onSizeChange}
      >
          <div>
              <h4>动态宽高获取:</h4>
              <div>{'width:${' + widthAndHei[0] + '}px'}</div>
              <div>{'height:${' + widthAndHei[1] + '}px'}</div>
          </div>
      </Modal>
  </div>
    )
  }
  
  ReactDOM.render(<CustomUse/>,mountNode)
`
const code2 =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { Modal } from 'gantd'
  // import { Modal } from 'modal-g' //与gantd中引入效果相同
  
  function PositionUse() {
    const [visible, setVisible] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
            </div>
            <Modal
                title='默认弹窗'
                itemState={{ x: 0, y: 0, width: 400, height: 400 }}
                visible={visible}
                onCancel={() => { setVisible(false) }}
            >
                从指定的x:0,y:0位置进行弹出
            </Modal>
        </div>
    )
}
  
  ReactDOM.render(<PositionUse/>,mountNode)
`

const code3 =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { Modal } from 'gantd'
  // import { Modal } from 'modal-g' //与gantd中引入效果相同
  
  function MaximizeUse() {
    const [visible, setVisible] = useState(false)

     return (
      <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
            </div>
            <Modal
                title='最大化弹窗'
                itemState={{ maximized: true }}
                visible={visible}
                onCancel={() => { setVisible(false) }}
            >
            </Modal>
        </div>
    )
  }
  
  ReactDOM.render(<MaximizeUse/>,mountNode)
`
const code4 =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { Modal } from 'gantd'
  // import { Modal } from 'modal-g' //与gantd中引入效果相同
  
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
  
  ReactDOM.render(<ForbiddenUse/>,mountNode)
`
const code5 =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { ResizableModal, ResizableProvider } from 'gantd'
  // import { ResizableModal, ResizableProvider } from 'modal-g' //与gantd中引入效果相同
  
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
                    挂载期-存储弹窗状态（宽高、定位）
            </Modal>
            </ConfigProvider>
        </div>
    )
}
  
  ReactDOM.render(<KeepState/>,mountNode)
`

const code6 =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import { Modal } from 'gantd'
  const { ResizableModal, ResizableProvider } = Modal

  function multipleModalsUse() {
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    
     return (
        <ResizableProvider>
          <div style={{ marginBottom: 10 }}>
              <ButtonGroup style={{ marginRight: 10 }}>
                  <Button size="small" onClick={() => { setVisible(true) }}>第一个弹窗</Button>
                  <Button size="small" onClick={() => { setVisible2(true) }}>第二个弹窗</Button>
              </ButtonGroup>
          </div>
          <ResizableModal
              id='1'
              title='第一个弹窗'
              visible={visible}
              footer={null}
              onCancel={() => { setVisible(false) }}
          >
              第一个弹窗-content
          </ResizableModal>
          <ResizableModal
              itemState={{ height: 400, width: 400 }}
              id='2'
              title='第二个弹窗'
              okBtnSolid
              visible={visible2}
              onCancel={() => { setVisible2(false) }}
          >
              第二个弹窗-content
          </ResizableModal>
        </ResizableProvider>
    )
  }
  
  ReactDOM.render(<multipleModalsUse/>,mountNode)
`
export default [code, code1, code2, code3, code4, code5, code6];