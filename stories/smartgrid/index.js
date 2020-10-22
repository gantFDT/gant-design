import _ from 'lodash'
import '@packages/smart-grid-g/src/style'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'
import Mock from 'mockjs'
/*! Start !*/
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Divider, Tag, Radio, Button, message, ConfigProvider, Rate } from 'antd'
import { SmartGrid, EditStatus, SwitchStatus } from '@gantd'
const { Random } = Mock
/*! Split !*/
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
/*! Split !*/
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
            },
            {
              fieldName: 'address',
            },
            {
              fieldName: 'action',
            },
          ]
        }
      }
    ]
  }
  return (
    <div style={{ margin: 10 }}>
      <SmartGrid
        tableKey="ConfigViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}
/*! Split !*/
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
/*! Split !*/
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
        tableKey="MultiViewUse"
        schema={tableSchema}
        dataSource={dataSource}
      />
    </div>
  )
}
/*! Split !*/
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
/*! Split !*/
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
/*! Split !*/
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
/*! End !*/

const config = {
  codes: code,
  useage: `
    对于一组业务对象，不同用户在不同的时间期望看到不同的视图展现，我们需要一种机制把权利交给用户<br/>
    <b>🧮 支持动态配置列属性</b><br/>
    对于用户不同的显示要求，用户可以自由配置决定列的显示与否、列的排序、固定、对齐方式等<br/>
    <b>🎭 支持动态配置表格样式属性</b><br/>
    用户可以自由配置文字是否限制折行、是否显示斑马线、是否显示列边框、分页条位置、高度策略<br/>
    <b>🤹🏻‍♂️ 多视图动态切换</b><br/>
    你可以选择把视图信息保存在本地或者远程，用户可以迅速切换到自己期望的视图<br/>
`,
  // inline: true,
  children: [
    // {
    //   title: '基本用法',
    //   describe: '最简单的用法，鼠标悬浮表格可配置视图。<br/>简洁数据模型，数组格式，快速实现表格展示。列数据不应包含UI配置信息。',
    //   cmp: BasicUse
    // },
    // {
    //   title: '动态配置列属性用法',
    //   describe: '配置列属性，包括显示与否、列的排序、固定、对齐方式等。<br/>此处预设隐藏 <b>年龄</b> 字段, 并将 <b>标签</b> 列放置第一列。',
    //   cmp: ConfigColumnsUse
    // },
    // {
    //   title: '动态配置表格样式属性用法',
    //   describe: '配置表格样式，包括文字是否限制折行、是否显示斑马线、是否显示列边框、分页条位置、高度策略等。<br/>此处预设 不换行 、不显示斑马线、 不显示边框、 取消点击选中行、 分页条放右边、 表格高度适应内容。',
    //   cmp: ConfigDisplayUse
    // },
    {
      title: '多视图动态切换用法',
      describe: '配置多个视图配置，可以快速动态切换。',
      cmp: MultiViewUse
    },
    // {
    //   title: '初始视图配置用法',
    //   describe: '配置初始视图，可以记录上次视图的配置。',
    //   cmp: InitViewUse
    // },
    // {
    //   title: '国际化用法',
    //   describe: '可进行语言的切换，同时支持自定义（需要antd-ConfigProvider的上下文环境），默认中文',
    //   cmp: LocalUse
    // },
    // {
    //   title: '行内编辑用法',
    //   describe: '可进行编辑状态的切换，一键进入编辑模式',
    //   cmp: EditInlineUse
    // }
  ]
};

export default () => <CodeDecorator config={config} />