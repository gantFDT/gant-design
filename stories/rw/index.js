
import { Input, TextArea, Password, Search, EditStatus, SwitchStatus } from '@pkgs/gantd/src'
import { Form, Alert, Button, Switch } from 'antd'
import React, { useState } from 'react';
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
      describe: '介绍 withEdit,EditStatus,SwitchStatus 的作用和用法',
      cmp: () => {
        const [allow, setAllow] = useState(EditStatus.EDIT)
        return (
          <>
            <Input placeholder='读写分离' allowEdit={'SAVE'} />
          </>
        )
      }
    },
  ]
}

export default () => <CodeDecorator config={config} />