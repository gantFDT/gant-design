export default [
`
import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { Input, EditStatus, SwitchStatus } from 'gantd'


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

ReactDOM.render(<EditStatusUse />, mountNode)`,`
import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { Input, EditStatus, SwitchStatus } from 'gantd'


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

ReactDOM.render(<SwitchStatusUse />, mountNode)`,]