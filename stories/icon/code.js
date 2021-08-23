export default [
`
import React, { useState } from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import codes from './code.js';



function BasicUse() {
  return (
    <>
      <Icon type='api' /> /api/get
    </>
  )
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState } from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import codes from './code.js';



function IconSelector() {
  Icon.updateFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1252237_rw4vp28ncp.js'
  })
  const [value, setvalue] = useState('loading')
  return (
    <Icon allowEdit value={value} onChange={setvalue} onSave={(id, value, cb) => { cb() }} />
  )
}

ReactDOM.render(<IconSelector />, mountNode)`,]