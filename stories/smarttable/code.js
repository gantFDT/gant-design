const code =
  `import React, { useState } from 'react'
  import { Button } from 'antd'
  import SmartTable from 'smart-table-g'

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

ReactDOM.render(
    <BasicUse/>,
    mountNode,
)
`
export default [code];