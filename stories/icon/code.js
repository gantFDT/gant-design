export default [
`
import React, { useState } from 'react';
import { Icon } from 'gantd';


function BasicUse() {
  return (
    <>
      <Icon type='api' /> /api/get
    </>
  )
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState } from 'react';
import { Icon } from 'gantd';


function IconSelector() {
  const [value, setvalue] = useState('loading')
  return (
    <Icon allowEdit value={value} onChange={setvalue} onSave={(id, value, cb) => { cb() }} />
  )
}

ReactDOM.render(<IconSelector />, mountNode)`,]