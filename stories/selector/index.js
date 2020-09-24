import '@data-cell/selector/style'
import CodeDecorator from '../_util/CodeDecorator'
import codeList from './code'
/*! Start !*/
import React, { useState, useMemo, useCallback } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from '@data-cell'
/*! Split !*/
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
      {/* 1、传递字符串数组作为选项列表<br />
      <Selector
        defaultValue={'sss'}
        dataSource={dataSource}
        onBlur={() => { console.log("onBlur") }}
        style={{ margin: '5px 0' }} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      2、传递对象作为选项列表<br /> */}
      <>
        <Button size="small" onClick={() => { setedit2(SwitchStatus) }}>编辑</Button>
        <Button size="small" onClick={() => { setedit2(SwitchStatus) }}>取消</Button>
        <Button size="small" onClick={() => { setedit2(EditStatus.SAVE) }}>保存</Button>
      </>

      <Selector dataSource={dataSource2} 
      selectorId='language' 
      edit={EditStatus.EDIT} style={{ margin: '5px 0' }} 
      // value={value2} 
      defaultValue={'ssss'}
      onChange={setValue2} onSave={(id, value, cb) => cb()} />
    </>
  )
}
/*! Split !*/
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
/*! Split !*/
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
/*! Split !*/
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
/*! Split !*/
const Demo5 = () => {
  const [list] = useState(['a', 'b', 'j']);
  const [value, setValue] = useState('j')

  return <Selector useStorage={false} selectorId='objselect2' edit={EditStatus.EDIT} dataSource={list} value={value} onChange={setValue} />
}
/*! Split !*/
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
/*! Split !*/
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
/*! Split !*/
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
/*! End !*/
const config = {
  inline: true,
  useage: `<b>⏱ 自带最近选择</b></br>
    对于同一个业务选择器，常选的业务对象会被记录在下拉列表中，方便用户下次选择。</br>
    <b>📡 支持远程数据源配置</b></br>
    可以动态配置远程数据源</br>
    <b>🎏 支持多选</b></br>
    快速开启多选</br>
  `,
  codes: codeList,
  children: [
    {
      title: '基础用法',
      describe: '通过dataSource传递选项数组',
      cmp: Demo1,
    },
    // {
    //   title: '数据分组',
    //   describe: '在dataSource中设置group实现数据分组',
    //   cmp: Demo2
    // },
    // {
    //   title: '自定义value、label',
    //   describe: 'valueProp、labelProp可以修改datasource中作为value、label的字段。往往在获取远程数据的时候需要调整',
    //   cmp: Demo3
    // },
    // {
    //   title: '远程数据源',
    //   describe: '使用query方法查询数据',
    //   cmp: Demo4
    // },
    // {
    //   title: '不显示最近选择',
    //   describe: "设置useStorage为false之后，将不会展示最近选择选项，也不会记录到storage里面",
    //   cmp: Demo5
    // },
    // {
    //   title: '多选',
    //   describe: "设置multiple属性、或者mode=multiple",
    //   cmp: Demo6
    // },
    // {
    //   title: '通过外部指定选项的lable显示',
    //   describe: "设置optionLabel",
    //   cmp: Demo7
    // },
    // {
    //   title: '过滤选中项',
    //   describe: "设置hideSelected为true",
    //   cmp: Demo8
    // },
  ]
}


export default () => <CodeDecorator config={config} />