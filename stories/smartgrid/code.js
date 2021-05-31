export default [
`
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


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
      <SmartGrid
        tableKey="BasicUse"
        schema={tableColumns}
        dataSource={dataSource}
        withoutAnimation
      />
    </div>
  )
}

ReactDOM.render(<BasicUse />, mountNode)`,`
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


var dataSource1 = Array(10).fill().map((_, Idx) => ({
  key: Idx,
  name: Random.cname(),
  age: Random.natural(10, 80),
  height: Random.natural(160, 190) + 'cm',
  sex: [ '♂', '♀' ][Random.natural(0, 1)],
  address: Random.county(true),
  tags: [[ '宅', '程序猿', '高富帅', '矮矬穷', '教师' ][Random.natural(0, 4)]]
}))

var tableColumns1 = [
  {
    title: '姓名',
    fieldName: 'name',
    render: text => <a>{text}</a>,
    hide: true
  },
  {
    title: '年龄',
    fieldName: 'age',
  },
  {
    title: '住址',
    fieldName: 'address',
    width: 200
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
  const [dynamicColumns, setDynamicColumns] = useState([])
  const [editing, setEditing] = useState(false)

  const [customViews, setCustomViews] = useState([])
  const [laskViewKey, setLaskViewKey] = useState('')

  const finalSchema = useMemo(() => [
    ...tableColumns1.slice(0, 3),
    ...Array.from({length: 90}, (_, idx) => ({
      title: '字段' + idx,
      fieldName: 'field' + idx,
    })),
    ...dynamicColumns,
    ...tableColumns1.slice(3)
  ],[tableColumns1, dynamicColumns])

  useEffect(() => {
    setTimeout(() => {
      setDynamicColumns([
        {
          title: '性别',
          fieldName: 'sex',
          dynamic: true
        },
        {
          title: '身高',
          fieldName: 'height',
          dynamic: true
        }
      ])

      setLaskViewKey('971300163669')

      setCustomViews([{"viewId":"971300163669","name":"222","version":"2021-05-08 11:27:4520","panelConfig":{"clickable":true,"footerDirection":"row","pageSize":50,"columnFields":[{"title":"姓名","fieldName":"name","checked":true},{"title":"年龄","fieldName":"age","checked":true},{"title":"住址","fieldName":"address","width":200,"checked":false},{"title":"性别","fieldName":"sex","dynamic":true,"checked":true},{"title":"身高","fieldName":"height","dynamic":true,"checked":true},{"title":"标签","fieldName":"tags","checked":false},{"title":"操作","fieldName":"action","checked":false}]}}])
    }, 250)
  }, [])

  const handlerToggleColumn = useCallback((type) => {
    setDynamicColumns(
      type === 'height' ? [
        {
          title: '身高',
          fieldName: 'height',
          dynamic: true
        }
      ]:
      type === 'all' ? [
        {
          title: '性别',
          fieldName: 'sex',
          dynamic: true
        },
        {
          title: '身高',
          fieldName: 'height',
          dynamic: true
        }
      ]: [
        {
          title: '性别',
          fieldName: 'sex',
          dynamic: true
        }
      ])
  },[])

  return (
    <div style={{ margin: 10 }}>
      <Button style={{ margin: 10 }} onClick={handlerToggleColumn.bind(null, 'height')}>只添加身高列</Button>
      <Button style={{ margin: 10 }} onClick={handlerToggleColumn.bind(null, 'sex')}>只添加性别列</Button>
      <Button style={{ margin: 10 }} onClick={handlerToggleColumn.bind(null, 'all')}>添加身高/性别列</Button>
      <span>{finalSchema.map(schema => schema.title).join(' , ')}</span>
      <SmartGrid
        gridKey="ConfigColumnsUse"
        schema={finalSchema}
        dataSource={dataSource1}
        editable={editing}

        // customViews={customViews}
        // lastViewKey={laskViewKey}
        // onCustomViewsChange={(views) => {setCustomViews(views)}}
        // onViewChange={(view) => { setLaskViewKey(view.viewId) }}

        headerRight={
          <>
            <Button
              icon={editing ? "roolback" : "edit"}
              size="small"
              onClick={() => { if (!editing) { message.info('请单击单元格进行编辑') }; setEditing(!editing) }}
            >
              {editing ? "结束" : "进入"}编辑
            </Button>
          </>
        }
      />
    </div>
  )
}

ReactDOM.render(<ConfigColumnsUse />, mountNode)`,`
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


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
          clickable: false,
          footerDirection: 'row-reverse',
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
      <SmartGrid
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
        onPageChange={(page,pageSize)=>{setPage(page);setPageSize(pageSize)}}
        totalCount={10}
        pageSizeOptions={['5', '10', '15', '20']}
      />
    </div>
  )
}

ReactDOM.render(<ConfigDisplayUse />, mountNode)`,`
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


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
const tableSchema = {
  supportColumnFields: tableColumns,
  systemViews: [
    {
      viewId: 'systemView-MultiViewUse-1',
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
          },
          {
            fieldName: 'address',
          },
          {
            fieldName: 'action',
          },
        ]
      }
    },
    {
      viewId: 'systemView-MultiViewUse-2',
      name: "禁止操作",
      version: '2020-02-10 09:45:37',
      panelConfig: {
        columnFields: [
          {
            fieldName: 'name',
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
function MultiViewUse() {
  return (
    <div style={{ margin: 10 }}>
      <SmartGrid
        gridKey="MultiViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}

ReactDOM.render(<tableSchema />, mountNode)`,`
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


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

function InitViewUse() {
  const tableSchema = useMemo(() => ({
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
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'action',
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
  }),[tableColumns])
  const [lastView, setLastView] = useState(localStorage.getItem('MultiViewUse:view') ? JSON.parse(localStorage.getItem('MultiViewUse:view')) : null)
  const handlerViewChange = useCallback((view) => {
    setLastView(view)
    localStorage.setItem('MultiViewUse:view', JSON.stringify(view));
  },[])
  
  return (
    <div style={{ margin: 10 }}>
      <SmartGrid
        tableKey="MultiViewUse"
        schema={tableSchema}
        onViewChange={handlerViewChange}
        initView={lastView}
        dataSource={dataSource}
      />
    </div>
  )
}

ReactDOM.render(<InitViewUse />, mountNode)`,`
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


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
        <SmartGrid
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
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from 'gantd'
const { Random } = Mock


SmartGrid.setFields({ // 拓展componentType字段类型
  'Rate': Rate
})
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
  },{
    fieldName: 'star',
    title: '星级',
    componentType: 'Rate'
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
          },
          {
            fieldName: 'star',
            width: 160
          }
        ]
      }
    }
  ]
}
var editTableData = Array(15).fill().map((_, idx) => ({
  id: 'id-' + idx,
  name: Random.cname(),
  age: Random.natural(20, 70),
  domain: Random.url(),
  email: Random.email(),
  birth: Random.datetime('yyyy-MM-dd'),
  cellPhone: { value: Random.string('number', 11) },
  bio: [{ value: Random.cparagraph(1, 3) }],
  price: { value: Random.float(9, 50, 2, 2) },
  address: ["CHN", "510000", "510100"],
  star: Random.natural(0, 5),
}))
function EditInlineUse() {
  const [stateData, setStateData] = useState(editTableData)
  const [editing, setEditing] = useState(false);
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
      // console.log('差异数据：', diff)
    },
    [stateData],
  )
  const handleSave = useCallback(() => {
    setEditing(false)
  }, [])

  return (
    <div style={{ margin: 10 }}>
      <SmartGrid
        tableKey="EditInlineUse"
        rowKey="id"
        title="行内编辑"
        schema={editTableSchema}
        dataSource={stateData}
        editable={editing}
        // bodyHeight={300}
        // bodyWidth={1630}
        onSave={onSave}
        headerRight={
          <>
            <Button
              icon={editing ? "roolback" : "edit"}
              size="small"
              onClick={() => { if (!editing) { message.info('请单击单元格进行编辑') }; setEditing(!editing) }}
            >
              {editing ? "结束" : "进入"}编辑
            </Button>
            {editing && <Button
              icon="save"
              size="small"
              type="primary"
              onClick={handleSave}
            >
              保存
            </Button>}
          </>
        }
        height={'calc(300px - 30px)'}
      />
    </div>
  )
}

ReactDOM.render(<EditInlineUse />, mountNode)`,]