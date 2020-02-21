const onsave = `const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }`

const usestate = `const [edit, setEdit] = useState(false)`



const code1 = `const [allow, setAllow] = useState(EditStatus.EDIT)
  return (
    <>
      <Switch checked={allow} onChange={checked => setAllow(!allow)} style={{ marginBottom: 10 }} size="small"></Switch>
      <Input placeholder='基本用法' allowEdit={allow} />
    </>
  )`

const code2 = `const [edit, setEdit] = useState(EditStatus.CANCEL)
  return (
    <>
          <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">点击切换</Button>
          <Input placeholder='单行输入框' edit={edit} style={{ margin: '5px 0' }} />
          <TextArea placeholder='多行输入框' edit={edit} style={{ margin: '5px 0' }} />
          <Password placeholder='密码输入框' edit={edit} style={{ margin: '5px 0' }} />
        </>
  )`


const code3 = `${usestate}
  const [ value, setValue ] = useState('')
  ${onsave}
  return (
    <TextArea placeholder='多行编辑' value={value} onChange={setValue} onSave={onSave} />
  )`



const code4 = `${usestate}
  const [ value, setValue ] = useState('')
  ${onsave}
  return (
    <Password placeholder='密码输入框' value={value} onChange={setValue} onSave={onSave} />
  )`



const codeList = [
  code1,
  code2,
  code3,
  code4
]

export default codeList