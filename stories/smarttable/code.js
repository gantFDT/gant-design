export default [
`
import React, { useState, useCallback } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider } from 'antd'
import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
const { mock, Random } = Mock


var dataSource = Array(10).fill().map((_, Idx) => ({
  key: Idx,
  name: Random.cname(),
  age: Random.natural(20, 70),
  address: Random.county(true),
  tags: [[ '宅', '程序猿', '高富帅', '矮矬穷', '教师' ][Random.natural(0, 4)]]
}))

var tableColumns = [
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
function BasicUse() {
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="BasicUse"
        schema={tableColumns}
        dataSource={dataSource}
      />
    </div>
  )
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState, useCallback } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider } from 'antd'
import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
const { mock, Random } = Mock


var dataSource = Array(10).fill().map((_, Idx) => ({
  key: Idx,
  name: Random.cname(),
  age: Random.natural(20, 70),
  address: Random.county(true),
  tags: [[ '宅', '程序猿', '高富帅', '矮矬穷', '教师' ][Random.natural(0, 4)]]
}))

var tableColumns = [
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
function ConfigColumnsUse() {
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
        tableKey="ConfigViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}

ReactDOM.render(<ConfigColumnsUse />, mountNode)`,`
import React, { useState, useCallback } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider } from 'antd'
import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
const { mock, Random } = Mock


var dataSource = Array(10).fill().map((_, Idx) => ({
  key: Idx,
  name: Random.cname(),
  age: Random.natural(20, 70),
  address: Random.county(true),
  tags: [[ '宅', '程序猿', '高富帅', '矮矬穷', '教师' ][Random.natural(0, 4)]]
}))

var tableColumns = [
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
function ConfigDisplayUse() {
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
  const [rowKeys, setRowKeys] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  return (
    <div style={{ margin: 10 }}>
      <SmartTable
        tableKey="ConfigDisplayUse"
        schema={tableSchema}
        dataSource={dataSource}
        rowSelection={
          {
            selectedRowKeys: rowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setRowKeys(selectedRowKeys)
            }
          }
        }
        pageIndex={page}
        pageSize={pageSize}
        onPageChange={(page,pageSize)=>{console.log(page, pageSize);setPage(page);setPageSize(pageSize)}}
        totalCount={10}
        // pageSizeOptions={['5', '10', '15', '20']}
      />
    </div>
  )
}

ReactDOM.render(<ConfigDisplayUse />, mountNode)`,`
import React, { useState, useCallback } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider } from 'antd'
import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
const { mock, Random } = Mock


var dataSource = Array(10).fill().map((_, Idx) => ({
  key: Idx,
  name: Random.cname(),
  age: Random.natural(20, 70),
  address: Random.county(true),
  tags: [[ '宅', '程序猿', '高富帅', '矮矬穷', '教师' ][Random.natural(0, 4)]]
}))

var tableColumns = [
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
function MultiViewUse() {
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
        tableKey="MultiViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}

ReactDOM.render(<MultiViewUse />, mountNode)`,`
import React, { useState, useCallback } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider } from 'antd'
import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
const { mock, Random } = Mock


// import zhCN from 'antd/es/locale/zh_CN' // 按模块导入
// import enUS from 'antd/es/locale/en_US' // 按模块导入
var zhCN = { locale: "zh-cn" };
var enUS = { locale: "en" };
var dataSource = Array(10).fill().map((_, Idx) => ({
  key: Idx,
  name: Random.cname(),
  age: Random.natural(20, 70),
  address: Random.county(true),
  tags: [[ '宅', '程序猿', '高富帅', '矮矬穷', '教师' ][Random.natural(0, 4)]]
}))

var tableColumns = [
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
function LocalUse() {
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

ReactDOM.render(<LocalUse />, mountNode)`,`
import React, { useState, useCallback } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider } from 'antd'
import { SmartTable, EditStatus, SwitchStatus } from 'gantd'
const { mock, Random } = Mock


var editTableColumns = [
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
    componentType: 'DatePicker'
  }
]
var editTableSchema = {
  supportColumnFields: editTableColumns,
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
var editTableData = Array(15).fill().map(() => ({
  name: Random.cname(),
  age: Random.natural(20, 70),
  domain: Random.url(),
  email: Random.email(),
  birth: Random.datetime('yyyy-MM-dd'),
  cellPhone: { value: Random.string('number', 11) },
  bio: [{ value: Random.cparagraph(1, 3) }],
  price: { value: Random.float(9, 50, 2, 2) },
  address: ["CHN", "510000", "510100"],
}))
function EditInlineUse() {
  const [stateData, setStateData] = useState(editTableData)
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
        schema={editTableSchema}
        dataSource={stateData}
        editable={editing}
        bodyHeight={300}
        bodyWidth={1630}
        onSave={onSave}
        headerRight={
          <>
            <Button
              icon={editing === EditStatus.EDIT ? "roolback" : "edit"}
              size="small"
              onClick={() => { if (editing === EditStatus.CANCEL) { message.info('请单击单元格进行编辑') }; setEditing(SwitchStatus) }}
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
          </>
        }
      />
    </div>
  )
}

ReactDOM.render(<EditInlineUse />, mountNode)`,]