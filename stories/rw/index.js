
import { Input, EditStatus, SwitchStatus } from '@pkgs/gantd/src'
import { Alert, Button } from 'antd'
import React, { useState, useCallback } from 'react';
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';


const EditStatusUse = () => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  const [value, setValue] = useState()

  const withoutSwitch = useCallback(
    () => {
      setEdit(status => {
        if (status === EditStatus.EDIT) {
          return EditStatus.CANCEL
        }
        return EditStatus.EDIT
      })
    },
    [edit],
  )

  const onSave = useCallback((id, value, cb) => {
    cb()
  }, [])

  return (
    <>
      {edit === EditStatus.EDIT && <Button onClick={withoutSwitch} className='gant-margin-5' size="small">退出编辑</Button>}
      {edit !== EditStatus.EDIT && <Button onClick={withoutSwitch} className='gant-margin-5' size="small">进入编辑</Button>}
      {edit === EditStatus.EDIT && <Button onClick={() => setEdit(EditStatus.SAVE)} className='gant-margin-5' size="small">保存</Button>}
      <Input
        placeholder='读写分离'
        edit={edit}
        allowEdit
        onSave={onSave}
        value={value}
        onChange={setValue}
        className='gant-margin-5'
      />
    </>
  )
}


const SwitchStatusUse = () => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  const [value, setValue] = useState()

  const useSwitch = useCallback(() => {
    setEdit(SwitchStatus)
  }, []
  )

  const onSave = useCallback((id, value, cb) => {
    cb()
  }, [])

  return (
    <>
      {edit === EditStatus.EDIT && <Button onClick={useSwitch} className='gant-margin-5' size="small">退出编辑</Button>}
      {edit !== EditStatus.EDIT && <Button onClick={useSwitch} className='gant-margin-5' size="small">进入编辑</Button>}
      {edit === EditStatus.EDIT && <Button onClick={() => setEdit(EditStatus.SAVE)} className='gant-margin-5' size="small">保存</Button>}
      <Input
        placeholder='读写分离'
        edit={edit}
        allowEdit
        onSave={onSave}
        value={value}
        onChange={setValue}
        className='gant-margin-5'
      />
    </>
  )
}




const config = {
  useage: '当需要读写分离的时候',
  codes: codeList.map(code => (
    `import React, { useState } from 'react';
     import { Switch, Button } from 'antd';
     import { Input, TextArea, Password, Search, EditStatus, SwitchStatus } from 'gantd';
    function Demo(){
      ${code}
    }
    ReactDOM.render(
      <Demo />,
      mountNode,
    );`
  )),
  // inline: true,
  children: [
    {
      title: '通过EditStatus控制读写分离',
      describe: `EditStatus是读写分离的状态，有三种状态、是一个枚举类型<br />
      EDIT:编辑中<br />
      CANCEL:读状态/放弃编写结果<br />
      SAVE: 保留编写结果。<br />`,
      cmp: EditStatusUse
    },
    {
      title: '通过SwitchStatus控制读写分离',
      describe: `SwitchStatus 可以快速切换EDIT和CANCEL两种状态<br />`,
      cmp: SwitchStatusUse
    }
  ]
}

export default () => <CodeDecorator config={config} />