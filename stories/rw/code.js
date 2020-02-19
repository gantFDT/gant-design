const onsave = `const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }`

const usestate = `const [edit, setEdit] = useState(false)`



const code1 = (
  `const [edit, setEdit] = useState(EditStatus.CANCEL)
  const [value, setValue] = useState()
  // 不使用SwitchStatus
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
    // 使用 SwitchStatus
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
  )`
)

const code2 = `const [edit, setEdit] = useState(EditStatus.CANCEL)
  return (
    <div>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }}>点击切换</Button>
      <Input placeholder='单行输入框' edit={edit} style={{margin: '5px 0'}} />
      <TextArea placeholder='多行输入框' edit={edit} style={{margin: '5px 0'}} />
      <Password placeholder='密码输入框' edit={edit} style={{margin: '5px 0'}} />
      <Search placeholder='搜索框' edit={edit} style={{margin: '5px 0'}} />
    </div>
  )`

const code3 = `${usestate}
  const [ value, setValue ] = useState('哈哈哈')
  ${onsave}
  reutrn (
    <Input value={value} onChange={setValue} onSave={onSave} />
  )`

const code4 = `${usestate}
  const [ value, setValue ] = useState('哈哈哈')
  ${onsave}
  return (
    <TextArea placeholder='多行编辑' value={value} onChange={setValue} onSave={onSave} />
  )`



const code5 = `${usestate}
  const [ value, setValue ] = useState('zxc123')
  ${onsave}
  return (
    <Password placeholder='密码输入框' value={value} onChange={setValue} onSave={onSave} />
  )`


const code6 = `${usestate}
  const [ value, setValue ] = useState('哈哈哈')
  ${onsave}
  return (
    <Search placeholder='搜索框' value={value} onChange={setValue} onSave={onSave} />
  )`

const codeList = [
  code1,
  code2,
  code3,
  code4,
  code5,
  code6,
]

export default codeList