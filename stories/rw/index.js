import '@data-cell/edit-status/style'
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';
/*! Start !*/
import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { Input, EditStatus, SwitchStatus } from '@gantd'
/*! Split !*/
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
        wrapClassName='gant-margin-5'
      />
    </>
  )
}
/*! Split !*/
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
        wrapClassName='gant-margin-5'
      />
    </>
  )
}
/*! End !*/

const config = {
  useage: `
  对于对象的信息，我们并不是一上来就要去更改，更多的时候应该是先去读这个对象。</br>
  我们需要一种机制让读写分离开,而不是让用户一来就看到很多编辑框。</br>
  <b>🦁 数据单元是什么？</b></br>
  数据单元是数据展示的最小单元组件，它可以支持只读模式和写模式。</br>
  <b>✊🏼 同时支持在表单和表格中使用</b></br>
  不光是表单分读写，同样，表格也可以分读写
  `,
  codes: codeList,
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