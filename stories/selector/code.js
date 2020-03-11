const BasicUse = `const dataSource = useMemo(() => ['Jhon', 'Dan', 'Tom'], []);
const [value, setValue] = useState('Jhon')

const dataSource2 = useMemo(() => [
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'C',
    value: 'c',
  },
  {
    label: 'PHP',
    value: 'php',
    disabled: true,
  },
], []);
const [value2, setValue2] = useState('c')
const [edit2, setedit2] = useState(EditStatus.CANCEL)

return (
  <>
    1、传递字符串数组作为选项列表<br />
    <Selector dataSource={dataSource} style={{ margin: '5px 0' }} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
    2、传递对象作为选项列表<br />
    <>
      <Button onClick={() => { setedit2(SwitchStatus) }}>编辑</Button>
      <Button onClick={() => { setedit2(SwitchStatus) }}>取消</Button>
      <Button onClick={() => { setedit2(EditStatus.SAVE) }}>保存</Button>
    </>

    <Selector dataSource={dataSource2} selectorId='language' edit={edit2} style={{ margin: '5px 0' }} value={value2} onChange={setValue2} onSave={(id, value, cb) => cb()} />
  </>
)`

const GroupUse = `const dataSource = useMemo(() => [
    {
      label: '任务一',
      value: 'task1',
      group: '已完成'
    },
    {
      label: '任务二',
      value: 'task2',
      group: '计划中'
    },
    {
      label: '任务三',
      value: 'task3',
      group: '已完成'
    },
    {
      label: '任务四',
      value: 'task4',
      group: '准备中'
    },
  ], [])
  const [value, setValue] = useState('task1')

  return <Selector selectorId='tasks' edit={EditStatus.EDIT} dataSource={dataSource} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />`

const CustomeProp = `const dataSource = useMemo(() => [
    {
      type: '圆',
      code: 'cycle',
    },
    {
      type: '矩形',
      code: 'rect',
    },
    {
      type: '菱形',
      code: 'diamond',
    },
    {
      type: '梯形',
      code: 'Trapezoid',
    },
  ], [])
  const [value, setValue] = useState("cycle")

  return <Selector selectorId='graphical' valueProp='code' labelProp='type' dataSource={dataSource} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />`


const remoteData = `const [value, setValue] = useState('home')
const data = [
    {
      id: 'home',
      name: '主页'
    },
    {
      id: 'cate',
      name: '分类'
    },
    {
      id: 'mine',
      name: '我的'
    },
  ]
  const query = useCallback(function (filter) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 10000)
    })
  }, [])

  return <Selector selectorId='objselect' valueProp='key' query={query} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />`

const noStorage = `const [list] = useState(['a', 'b', 'j']);
const [value, setValue] = useState('j')

return <Selector useStorage={false} selectorId='objselect2' edit={EditStatus.EDIT} dataSource={list} value={value} onChange={setValue} />`

const multiple = `const [list] = useState([
    {
      value: "INITIAL_CREATE",
      label: '初始创建'
    },
    {
      value: "EARLY_CONTROL",
      label: '早期受控'
    },
  ]);
  const [value, setValue] = useState()

  return <Selector multiple selectorId='multiple' dataSource={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />`

const extraOption = `const dataSource = useMemo(() => [
    {
      value: 'a1',
      label: 'a1'
    },
    {
      value: 'b2',
      label: 'b2'
    },
    {
      value: 'c3',
      label: 'c3'
    },
  ], [])
  const [optionLabel, setoptionLabel] = useState('')
  const [value, setValue] = useState('a1')
  const setNew = useCallback(() => {
    setValue('d4')
    setoptionLabel('新设置的d4')
  }, [])

  return (
    <>
      <Button onClick={setNew}>点击设置一个不存在列表中的值</Button>
      <Selector selectorId='optionLabel' optionLabel={optionLabel} style={{ marginTop: 8 }} dataSource={dataSource} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
    </>
  )`

export default [BasicUse, GroupUse, CustomeProp, remoteData, noStorage, multiple, extraOption]