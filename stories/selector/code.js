export default [
`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo1 = () => {
  const dataSource = useMemo(() => ['Jhon', 'Dan', 'Tom'], []);
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
      <Selector
        dataSource={dataSource}
        onBlur={() => { console.log("111") }}
        style={{ margin: '5px 0' }} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      2、传递对象作为选项列表<br />
      <>
        <Button size="small" onClick={() => { setedit2(SwitchStatus) }}>编辑</Button>
        <Button size="small" onClick={() => { setedit2(SwitchStatus) }}>取消</Button>
        <Button size="small" onClick={() => { setedit2(EditStatus.SAVE) }}>保存</Button>
      </>

      <Selector dataSource={dataSource2} selectorId='language' edit={edit2} style={{ margin: '5px 0' }} value={value2} onChange={setValue2} onSave={(id, value, cb) => cb()} />
    </>
  )
}

ReactDOM.render(<Demo1 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo2 = () => {
  const dataSource = useMemo(() => [
    {
      label: '任务一',
      value: 1,
      group: '已完成'
    },
    {
      label: '任务二',
      value: 2,
      group: '计划中'
    },
    {
      label: '任务三',
      value: 3,
      group: '已完成'
    },
    {
      label: '任务四',
      value: 4,
      group: '准备中'
    },
  ], [])
  const [value, setValue] = useState(1)

  return <Selector selectorId='tasks' edit={EditStatus.EDIT} dataSource={dataSource} value={value} valuePropType="number" onChange={v => { console.log(v); setValue(v) }} onSave={(id, value, cb) => cb()} />
}

ReactDOM.render(<Demo2 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo3 = () => {
  const dataSource = useMemo(() => [
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

  return <Selector selectorId='graphical' valueProp='code' labelProp='type' dataSource={dataSource} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
}

ReactDOM.render(<Demo3 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo4 = () => {
  const [value, setValue] = useState('home')
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

  return <Selector selectorId='objselect' valueProp='id' labelProp='name' query={query} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
}

ReactDOM.render(<Demo4 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo5 = () => {
  const [list] = useState(['a', 'b', 'j']);
  const [value, setValue] = useState('j')

  return <Selector useStorage={false} selectorId='objselect2' edit={EditStatus.EDIT} dataSource={list} value={value} onChange={setValue} />
}

ReactDOM.render(<Demo5 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo6 = () => {
  const [list] = useState([
    {
      value: "INITIAL_CREATE",
      label: '初始创建'
    },
    {
      value: "EARLY_CONTROL",
      label: '早期受控'
    },
    {
      value: "EARLY_CONTROL1",
      label: '早期受控1'
    },
    {
      value: "EARLY_CONTROL2",
      label: '早期受控2'
    },
    {
      value: "EARLY_CONTROL3",
      label: '早期受控3'
    },
    {
      value: "EARLY_CONTROL4",
      label: '早期受控4'
    },
    {
      value: "EARLY_CONTROL5",
      label: '早期受控5'
    },
    {
      value: "EARLY_CONTROL6",
      label: '早期受控6'
    },
    {
      value: "EARLY_CONTROL7",
      label: '早期受控7'
    },
    {
      value: "EARLY_CONTROL8",
      label: '早期受控8'
    },
    {
      value: "EARLY_CONTROL9",
      label: '早期受控9'
    },
    {
      value: "EARLY_CONTROL10",
      label: '早期受控10'
    },
  ]);
  const [value, setValue] = useState()

  return <Selector multiple selectorId='multiple' dataSource={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
}

ReactDOM.render(<Demo6 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo7 = () => {
  const dataSource = useMemo(() => [
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
  )
}

ReactDOM.render(<Demo7 />, mountNode)`,`
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from 'gantd'


const Demo8 = () => {
  const dataSource = useMemo(() => [
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
  const [value, setValue] = useState('a1')

  return (
    <>
      <Selector selectorId='hideSelected' hideSelected dataSource={dataSource} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
    </>
  )
}

ReactDOM.render(<Demo8 />, mountNode)`,]