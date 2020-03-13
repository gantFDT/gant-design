const codeGenerator = (code, islocalDemo) =>
  `import React, { useState } from 'react'
  import { Divider, Tag, Radio, Switch, Button, message, ConfigProvider } from 'antd'
  import { SmartTable } from 'gantd'
  ${islocalDemo ? "import zhCN from 'antd/es/locale/zh_CN'" : ''}
  ${islocalDemo ? "import enUS from 'antd/es/locale/en_US'" : ''}
//import { SmartTable } from 'smart-table-g';//与gantd中引入效果相同
const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '四川成都 春熙路1号',
    tags: ['宅', '程序猿'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '北京 天安门大道123号',
    tags: ['高富帅'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '天津 南京路23号',
    tags: ['矮矬穷', '教师'],
  },
]


const tableColumns = [
  {
    title: '姓名',
    fieldName: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '年龄',
    fieldName: 'age',
  },
  {
    title: '住址',
    fieldName: 'address',
  },
  {
    title: '标签',
    fieldName: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '操作',
    fieldName: 'action',
    render: (text, record) => (
      <span>
        <a>邀请 {record.name}</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
]

${code}

ReactDOM.render(
  <TableUse/>,
  mountNode,
)`;

const code1 =
  `
function TableUse() {
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="TableUse"
          schema={tableColumns}
          dataSource={dataSource}
        />
      </div>
  )
}`

const code2 =
  `
function TableUse() {
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView1',
        name: "系统视图1",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          columnFields: [
            {
              fieldName: 'tags',
              fixed: 'left',
              width: 300
            },
            {
              fieldName: 'name',
              align: 'right'
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'action',
              align: 'center'
            },
          ]
        }
      }
    ]
  }
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="TableUse"
          schema={tableSchema}
          dataSource={dataSource}
        />
      </div>
  )
}`

const code3 =
  `
function TableUse() {
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView1',
        name: "系统视图1",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          wrap: false,
          isZebra: false,
          bordered: false,
          clickable: false,
          footerDirection: 'row-reverse',
          heightMode: 'auto',
          columnFields: tableColumns.map(column => ({ fieldName: column.fieldName }))
        }
      }
    ]
  }
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="TableUse"
          schema={tableSchema}
          dataSource={dataSource}
        />
      </div>
  )
}`

const code4 =
  `
function TableUse() {
  const tableSchema = {
    supportColumnFields: tableColumns,
    systemViews: [
      {
        viewId: 'systemView1',
        name: "隐藏年龄",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          columnFields: [
            {
              fieldName: 'tags',
              fixed: 'left',
              width: 300
            },
            {
              fieldName: 'name',
              align: 'right'
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'action',
              align: 'center'
            },
          ]
        }
      },
      {
        viewId: 'systemView2',
        name: "禁止操作",
        version: '2020-02-10 09:45:37',
        panelConfig: {
          columnFields: [
            {
              fieldName: 'name',
              align: 'right'
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'age',
            },
            {
              fieldName: 'tags',
              width: 300
            },
          ]
        }
      }
    ]
  }
  return (
      <div style={{ margin: 10 }}>
        <SmartTable
          tableKey="TableUse"
          schema={tableSchema}
          dataSource={dataSource}
        />
      </div>
  )
}`
const code5 = `function LocalUse() {
  const [i18n, setI18n] = useState(zhCN)
  return (
    <div style={{ margin: 10 }}>
      <Radio.Group size='small' onChange={(e) => setI18n(e.target.value)} value={i18n}>
        <Radio.Button value={enUS}>英文</Radio.Button>
        <Radio.Button value={zhCN}>中文</Radio.Button>
      </Radio.Group>
      <ConfigProvider locale={i18n}>
        <SmartTable
          tableKey="BasicUse"
          schema={tableColumns}
          dataSource={dataSource}
          onReload={() => { }}
        />
      </ConfigProvider>
    </div>
  )
}
`

const code6 =
  `import React, { useState, useCallback, useMemo } from 'react'
import { Button, message } from 'antd'
import { SmartTable, Input, InputNumber, DatePicker, InputUrl, LocationSelector, InputCellPhone, InputEmail, InputLanguage, InputMoney, EditStatus, SwitchStatus } from 'gantd'
//import { Input, InputNumber, DatePicker, InputUrl, LocationSelector, InputCellPhone, InputEmail, InputLanguage, InputMoney, EditStatus, SwitchStatus } from 'gantd'
//import { SmartTable } from 'smart-table-g';//与gantd中引入效果相同
const tableColumns = [
  {
    fieldName: 'name',
    title: '姓名',
    componentType: 'Input'
  },
  {
    fieldName: 'age',
    title: '年龄',
    componentType: 'InputNumber'
  },
  {
    fieldName: 'cellPhone',
    title: '手机号',
    componentType: 'InputCellPhone'
  },
  {
    fieldName: 'domain',
    title: '个人主页',
    componentType: 'InputUrl'
  },
  {
    fieldName: 'email',
    title: '邮箱',
    componentType: 'InputEmail'
  },
  {
    fieldName: 'bio',
    title: '简介',
    componentType: 'InputLanguage',
    props: {
      localeList: [
        { locale: 'zh-CN', label: '中文' },
        { locale: 'en-US', label: '英文' },
      ]
    }
  },
  {
    fieldName: 'price',
    title: '挂号费',
    componentType: 'InputMoney'
  },
  {
    fieldName: 'address',
    title: '地址',
    componentType: 'LocationSelector'
  },
  {
    fieldName: 'birth',
    title: '生日',
    componentType: 'DataPicker'
  }
]

const tableSchema = {
  supportColumnFields: tableColumns,
  systemViews: [
    {
      viewId: 'systemView',
      name: "系统视图",
      version: '2020-02-20 02:20:02',
      panelConfig: {
        wrap: false,
        columnFields: [
          {
            fieldName: 'name',
            width: 80
          },
          {
            fieldName: 'age',
            width: 70
          },
          {
            fieldName: 'cellPhone',
            width: 230
          },
          {
            fieldName: 'domain',
            width: 200
          },
          {
            fieldName: 'email',
            width: 170
          },
          {
            fieldName: 'bio',
            width: 375
          },
          {
            fieldName: 'price',
            width: 150
          },
          {
            fieldName: 'address',
            width: 195
          },
          {
            fieldName: 'birth',
            width: 160
          }
        ]
      }
    }
  ]
}

const data = [
  {
    name: '王医生',
    age: 55,
    cellPhone: { phone: "18010032938" },
    domain: 'https://www.baidu.com/',
    email: 'doc_wang@qq.com',
    bio: { locale: 'zh-CN', value: '华西口腔主任医师。' },
    price: { money: 29.9 },
    address: ["CHN", "510000", "510100"],
    birth: '1965-04-24',
  },
  {
    name: '张医生',
    age: 42,
    cellPhone: { phone: "13583384957" },
    domain: 'https://www.google.com/',
    email: 'doc_zhang@163.com',
    bio: { locale: 'zh-CN', value: '北京协和泌尿科主任医师。' },
    price: { money: 19.9 },
    address: ["CHN", "110000", "110101"],
    birth: '1977-01-04',
  },
  {
    name: '李医生',
    age: 35,
    cellPhone: { phone: "13777574848" },
    domain: 'https://www.souhu.com/',
    email: 'doc_li@souhu.com',
    bio: { locale: 'zh-CN', value: '上海第一人民医院妇产科主治医师。' },
    price: { money: 9.9 },
    address: ["CHN", "310000", "310104"],
    birth: '1986-02-14',
  }
]

function EditInlineUse() {

  const [stateData, setStateData] = useState(data)
  const [editing, setEditing] = useState(EditStatus.CANCEL);
  const getDifference = useCallback(
    (current, old) => {
      const result = []
      for (let i = 0, len = current.length; i < len; i++) {
        const { children = [], ...currentItem } = current[i]
        const { children: oldChildren = [], ...oldItem } = old[i]
        if (!_.isEqual(currentItem, oldItem)) {
          result.push(currentItem)
        }
        if (children.length && oldChildren.length && !_.isEqual(children, oldChildren)) {
          const diff = getDifference(children, oldChildren)
          result.push.apply(result, diff)
        }
      }
      return result
    },
    [],
  )
  const onSave = useCallback(
    (newStateData) => {
      const diff = getDifference(newStateData, stateData)
      setStateData(newStateData)
      console.log('差异数据：', diff)
    },
    [stateData],
  )
  const handleSave = useCallback(() => {
    setEditing(EditStatus.SAVE)
  }, [])
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="EditInlineUse"
        rowKey="id"
        title="行内编辑"
        schema={tableSchema}
        dataSource={stateData}
        editable={editing}
        bodyHeight={300}
        bodyWidth={1630}
        onSave={onSave}
        headerRight={<>
          <Button
            icon={editing === EditStatus.EDIT ? "roolback" : "edit"}
            size="small"
            onClick={() => { if (editing === EditStatus.CANCEL) { message.info('请单击单元格进行编辑') };setEditing(SwitchStatus) }}
          >
            {editing === EditStatus.EDIT ? "结束" : "进入"}编辑
          </Button>
          {editing === EditStatus.EDIT && <Button
            icon="save"
            size="small"
            type="primary"
            onClick={handleSave}
          >
            保存
          </Button>}
        </>}
      />
    </div>
  )
}

ReactDOM.render(
  <EditInlineUse />,
  mountNode,
)`

export default [codeGenerator(code1), codeGenerator(code2), codeGenerator(code3), codeGenerator(code4), codeGenerator(code5, true), codeGenerator(code6)];