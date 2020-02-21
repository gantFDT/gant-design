export default [
`
import React, { useState } from 'react';
import {InputCellPhone} from 'gantd';

const Demo = () => {
  const [value, setValue] = useState('18811012138')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputCellPhone placeholder='不可编辑' allowEdit={false}  value="18811012138"/>
      <InputCellPhone placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
    </>
}

ReactDOM.render(
    <Demo />,
    mountNode,
);
`,







`
import React, { useState } from 'react';
import {InputCellPhone, SwitchStatus} from 'gantd';

const Demo = () => {
  const [edit, setEdit] = useState('CANCEL')
    return <>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
      <InputCellPhone placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
    </>
}

ReactDOM.render(
    <Demo />,
    mountNode,
);
`,
  



`
import React, { useState } from 'react';
import {InputCellPhone} from 'gantd';

const Demo = () => {
  const [value, setValue] = useState('18811012138')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputCellPhone placeholder='手机号码校验' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
    </>
}

ReactDOM.render(
    <Demo />,
    mountNode,
);
`,
  


]



