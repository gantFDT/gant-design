export default [
  `import React, { useState } from 'react';
import {InputNumber} from '@data-cell';
  
const Demo = () => {
  const [value, setValue] = useState(99)
  const onSave = (id, value, cb) => {
    cb()
  }
  return <>
    <InputNumber placeholder='可编辑' onSave={onSave} value={value} onChange={setValue} />
  </>
}
  
ReactDOM.render(
    <Demo />,
    mountNode,
);`,
  `import React, { useState } from 'react';
import {InputNumber} from '@data-cell';
  
const Demo = () => {
  return <>
    <InputNumber placeholder='可编辑' value="123" />
  </>
}

ReactDOM.render(
    <Demo />,
    mountNode,
);`,
  `import React, { useState } from 'react';
import {InputNumber, EditStatus} from '@data-cell';

const Demo = () => {
  const [value, setValue] = useState(0)
  const addonBefore = (
    <>RMB</>
  )
  return <>
    <InputNumber placeholder='金额' edit={EditStatus.EDIT} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} addonBefore={addonBefore} />
  </>
}

ReactDOM.render(
    <Demo />,
    mountNode,
);`,
]



