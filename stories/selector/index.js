import React, { useState } from 'react'
import { Button } from 'antd'
import { Selector, EditStatus, SwitchStatus } from '@data-cell'
import '@data-cell/selector/style'
import CodeDecorator from '../_util/CodeDecorator'


const data = [
  {
    key: 'j',
    label: 'Jhon'
  },
  {
    key: 'd',
    label: 'Dan'
  },
  {
    key: 't',
    label: 'Tom'
  },
]

const codeList = [
  `const [list] = useState(['Jhon', 'Dan', 'Tom'])
  const [value, setValue] = useState('Jhon')

  return (
    <>
      <Selector defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      <Selector defaultList={list} edit />
    </>
  )`,
  `const data = [
  {
    key: 'j',
    label: 'Jhon'
  },
  {
    key: 'd',
    label: 'Dan'
  },
  {
    key: 't',
    label: 'Tom'
  },
]
const [list] = useState(data);
  const [value, setValue] = useState('j')
  // getLabelText用于获取显示初始化的label, 可能是异步获取数据
  const getLabelText = (value, setLabel) => data.forEach(item => item.key === value ? setLabel(item.label) : null)

  return <Selector selectorId='objselect' valueProp='key' defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()}/>`,
  `const data = [
  {
    key: 'j',
    label: 'Jhon'
  },
  {
    key: 'd',
    label: 'Dan'
  },
  {
    key: 't',
    label: 'Tom'
  },
]
  const [value, setValue] = useState('j')
  const getLabelText = (value, setLabel) => data.forEach(item => item.key === value ? setLabel(item.label) : null)
  const query = function (filter) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data)
      }, 10000)
    })
  }

  return <Selector selectorId='objselect' valueProp='key' query={query} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />`,
  `const [list] = useState(['a', 'b', 'j']);
  const [value, setValue] = useState('j')
  return <Selector useStorage={false} selectorId='objselect2' edit defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
  `,
  `const [list] = useState(['a', 'b', 'j']);
  const [value, setValue] = useState('j')

  useState(() => {
    setTimeout(() => {
      setValue('a')
    }, 5000)
  })

  return <Selector multiple selectorId='objselect2' defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />`,
  `   const data = [
      {
        key: 'j',
        label: 'Jhon'
      },
      {
        key: 'd',
        label: 'Dan'
      },
      {
        key: 't',
        label: 'Tom'
      },
    ]
    const [list] = useState(data);
    const [optionLabel, setoptionLabel] = useState('')
    const [value, setValue] = useState('j')

    // 模拟选择不存在list当中的项
    setTimeout(() => {
      setValue('jj')
      setoptionLabel('jjj')
    }, 5000)

    return <Selector selectorId='objselect3' optionLabel={optionLabel} valueProp='key' defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
  `
]

const config = {
  inline: true,
  useage:`<b>⏱ 自带最近选择</b></br>
    对于同一个业务选择器，常选的业务对象会被记录在下拉列表中，方便用户下次选择。</br>
    <b>📡 支持远程数据源配置</b></br>
    可以动态配置远程数据源</br>
    <b>🎏 支持多选</b></br>
    快速开启多选</br>
  `,
  codes: codeList.map(code =>
    `import { Selector } from 'gantd'
import React, { useState } from 'react'

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`),
  children: [
    {
      title: '字符数组',
      describe: '通过defaultList传入展示的数据列表',
      cmp: () => {
        const [list] = useState(['Jhon', 'Dan', 'Tom'])
        const [value, setValue] = useState('Jhon')
        const [edit, setedit] = useState(EditStatus.CANCEL)
        return (
          <>
            <Button onClick={() => { setedit(SwitchStatus) }}>切换编辑</Button>
            <Selector defaultList={list} edit={edit} style={{ margin: '5px 0' }} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
            <Selector defaultList={list} edit={edit} style={{ marginTop: 10 }} />
          </>
        )
      }
    },
    {
      title: '对象数组',
      describe: '需要提供selectorId，valueProp，renderItem，getLabelText',
      cmp: () => {
        const [list] = useState(data);
        const [value, setValue] = useState('j')
        // getLabelText用于获取显示初始化的label
        const getLabelText = (value, cb) => data.forEach(item => item.key === value ? cb(item.label) : null)

        return <Selector selectorId='objselect' valueProp='key' getLabelText={getLabelText} defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      }
    },
    {
      title: '远程数据源',
      describe: '使用query方法查询数据',
      cmp: () => {
        const [value, setValue] = useState('j')
        // getLabelText用于获取显示初始化的label
        const getLabelText = (value, cb) => data.forEach(item => item.key === value ? cb(item.label) : null)
        const query = function (filter) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(data)
            }, 10000)
          })
        }

        return <Selector selectorId='objselect' valueProp='key' getLabelText={getLabelText} query={query} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      }
    },
    {
      title: '禁用最近选择',
      describe: "useStorage默认为true表示开启，设置为false禁用之后，将不会展示最近选择选项，也不会记录到storage里面",
      cmp: () => {
        const [list] = useState(['a', 'b', 'j']);
        const [value, setValue] = useState('j')

        return <Selector useStorage={false} selectorId='objselect2' edit defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      }
    },
    {
      title: '多选',
      describe: "设置multiple属性、或者mode=multiple",
      cmp: () => {
        const [list] = useState([
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

        return <Selector multiple selectorId='objselect2' defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      }
    },
    {
      title: '通过外部指定选项的lable显示',
      describe: "设置optionLabel",
      cmp: () => {
        const [list] = useState(data);
        const [optionLabel, setoptionLabel] = useState('')
        const [value, setValue] = useState('j')

        // 模拟选择不存在list当中的项
        setTimeout(() => {
          setValue('jj')
          setoptionLabel('jjj')
        }, 5000)

        return <Selector selectorId='objselect3' optionLabel={optionLabel} valueProp='key' defaultList={list} value={value} onChange={setValue} onSave={(id, value, cb) => cb()} />
      }
    },
  ]
}


export default () => <CodeDecorator config={config} />