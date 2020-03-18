export default [
`
import React, { useState } from 'react';
import { InputNumber, EditStatus } from 'gantd';


const Use1 = () => {
  const [value, setValue] = useState(99)
  const onSave = (id, value, cb) => {
    cb()
  }
  return <>
    <InputNumber placeholder='可编辑' onSave={onSave} value={value} onChange={setValue} />
  </>
}

ReactDOM.render(<Use1 />, mountNode)`,`
import React, { useState } from 'react';
import { InputNumber, EditStatus } from 'gantd';


const Use2 = () => {
  return <>
    <InputNumber placeholder='被忽略的值' value="123" />
  </>
}

ReactDOM.render(<Use2 />, mountNode)`,`
import React, { useState } from 'react';
import { InputNumber, EditStatus } from 'gantd';


const Use3 = () => {
  const [value, setValue] = useState(0)
  const addonBefore = (
    <>重量</>
  )
  const addonAfter = (
    <>KG</>
  )
  return <>
    <InputNumber placeholder='金额' edit={EditStatus.CANCEL} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} addonBefore={addonBefore} addonAfter={addonAfter} />
  </>
}

ReactDOM.render(<Use3 />, mountNode)`,]