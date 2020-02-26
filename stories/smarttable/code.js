const codeGenerator = (code) =>
  `import React, { useState } from 'react'
import { Button, Tag, Divider } from 'antd'
import SmartTable from 'smart-table-g'

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
  const initalLocale = {
    sysView: '自定义-System view',
    companyView: '自定义-Company view',
    customView: '自定义-Custom view',
  }
  const [i18n, setI18n] = useState('en-US')
  const [customLocale, setCustomLocale] = useState(false)
  return (
    <div style={{ margin: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <p><span>自定义local：</span><Switch checked={customLocale} onChange={(checked) => { setCustomLocale(checked) }} /></p>
        <Radio.Group size='small' onChange={(e) => setI18n(e.target.value)} value={i18n}>
          <Radio.Button value={'en-US'}>英文</Radio.Button>
          <Radio.Button value={'zh-CN'}>中文</Radio.Button>
        </Radio.Group>
      </div>
      <SmartTable
        i18n={i18n}
        locale={customLocale ? initalLocale : null}
        onReload={() => { }}
        tableKey="BasicUse"
        schema={tableColumns}
        dataSource={dataSource}
      />
    </div>
  )
}
`

export default [codeGenerator(code1), codeGenerator(code2), codeGenerator(code3), codeGenerator(code4), codeGenerator(code5)];