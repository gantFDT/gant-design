export default [
  `
  import React, { useState } from 'react';
  import {InputCellPhone} from 'gantd';
  
  const Demo = () => {
    const localeList = [
      {
        locale: 'zh-CN',
        label: '中文',
        value: ''
      },
      {
        locale: 'en-US',
        label: '英文',
        value: ''
      }
    ]
    const [value, setValue] = useState({ locale: 'zh-CN', value: '中文' })
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputLanguage localeList={localeList} placeholder='不可编辑' allowEdit={false} value={{ locale: 'zh-CN', value: '中文' }} />
      <InputLanguage localeList={localeList} placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
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
    const localeList = [
      {
        locale: 'zh-CN',
        label: '中文',
        value: ''
      },
      {
        locale: 'en-US',
        label: '英文',
        value: ''
      }
    ]
    const [edit, setEdit] = useState('CANCEL')
    const [value, setValue] = useState({ locale: 'zh-CN', value: '你好' })
    return <>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
      <InputLanguage localeList={localeList} placeholder='请输入' value={value} onChange={setValue} edit={edit} style={{ margin: '5px 0' }} />
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
    const localeList = [
      {
        locale: 'zh-CN',
        label: '中文',
        value: ''
      },
      {
        locale: 'en-US',
        label: '英文',
        value: ''
      }
    ]
    const [value, setValue] = useState({ locale: 'en-US', value: 'Hello' })
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputLanguage localeList={localeList} placeholder='请输入' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
    </>
  }
  
  ReactDOM.render(
      <Demo />,
      mountNode,
  );
  `,
    
  
  
  ]
  
  
  
  