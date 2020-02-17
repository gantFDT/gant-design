
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
  inline: true,
  children: [
    {
      title: '基本用法',
      describe: '在后面展示一个编辑按钮，通过修改allowEdit参数控制是否可以编辑，allowEdit默认true',
      cmp: () => {
        const [allow, setAllow] = useState(EditStatus.EDIT)
        return (
          <>
            <Switch checked={allow} onChange={checked => setAllow(checked)} style={{ marginBottom: 10 }}></Switch>
            <Input placeholder='基本用法' allowEdit={allow} />
          </>
        )
      }
    },
    {
      title: '编辑受控',
      describe: '受其他组件控制展示的形态',
      cmp: WrapperEdit(({ edit, setEdit }) => (
        <>
          <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }}>点击切换</Button>
          <Input placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
          <TextArea placeholder='多行输入框' edit={edit} style={{ margin: '5px 0' }} />
          <Password placeholder='密码输入框' edit={edit} style={{ margin: '5px 0' }} />
          <Search placeholder='搜索框' edit={edit} style={{ margin: '5px 0' }} />
        </>
      ))
    },
    {
      title: '可编辑',
      describe: '读模式下通过value传入展示的值,strict属性可以让onChange自动过滤掉特殊字符，只保留数字，汉字和字母',
      cmp: WrapperValue('哈哈哈')(({ value, setValue }) => <Input value={value} strict onChange={setValue} onSave={onSave} />)
    },
    {
      title: '多行编辑',
      describe: '',
      cmp: WrapperValue()(({ value, setValue }) => <TextArea placeholder='多行编辑' value={value} onChange={setValue} onSave={onSave} />)
    },
    {
      title: '密码输入框',
      describe: '',
      cmp: WrapperValue()(({ value, setValue }) => <Password placeholder='密码输入框' value={value} onChange={setValue} onSave={onSave} />)
    },
    {
      title: '搜索输入框',
      describe: '',
      cmp: WrapperValue()(({ value, setValue }) => <Search placeholder='搜索框' value={value} onChange={setValue} onSave={onSave} />)
    },
  ]
}

export default () => <CodeDecorator config={config} />