
import { Input, TextArea, Password, Search, EditStatus, SwitchStatus } from '@pkgs/gantd/src'
import { Form, Alert, Button, Switch } from 'antd'
import React, { useState, useCallback } from 'react';
import codeList from './code'
import CodeDecorator from '../_util/CodeDecorator';
import { WrapperEdit, WrapperValue, onSave } from '../_util/composeUseHooks'


const config = {
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
      title: '如何控制读写分离',
      describe: '介绍 EditStatus, SwitchStatus 的作用和用法',
      cmp: () => {
        const [edit, setEdit] = useState(EditStatus.CANCEL)
        const [value, setValue] = useState()

        const withoutSwitch = useCallback(
          () => {
            setEdit(status =>{
              if(status === EditStatus.EDIT){
                return EditStatus.CANCEL
              }
              return EditStatus.EDIT
            })
           
          },
          [edit],
        )

        const useSwitch = useCallback(() => {
            setEdit(SwitchStatus)
          },[]
        )
        return (
          <>
            <Button onClick={withoutSwitch}>切换编辑状态</Button>
            <Button onClick={useSwitch}>切换编辑状态(使用SwitchStatus)</Button>
            <Button onClick={() => setEdit(EditStatus.CANCEL)}>取消</Button>
            <Button onClick={() => setEdit(EditStatus.SAVE)}>保存</Button>
            <Input placeholder='读写分离' edit={edit} allowEdit onSave={(id, value, cb)=> cb()} value={value} onChange={setValue} />
          </>
        )
      }
    },
  ]
}

export default () => <CodeDecorator config={config} />