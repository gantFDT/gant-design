
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import CodeDecorator from '../_util/CodeDecorator';
import code from './code'
import Table from '@table'
import '@table/style'
import { EditStatus, SwitchStatus, Input, InputNumber, Selector, InputCellPhone, InputUrl, InputEmail, InputMoney, DatePicker, ColorPicker, LocationSelector, Icon, InputTelePhone, InputLanguage } from '@data-cell'

import { Button, Slider } from 'antd'

import { getList, getEditList, getNestList } from './mock'
const { RangePicker } = DatePicker

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    showTip: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

function BasicTable(props) {

  const dataSource = useMemo(() => getList(), [])
  const [resizable, setresizable] = useState(false)

  const toggleResizable = useCallback(
    () => {
      setresizable(r => !r)
    },
    [],
  )

  const headerRight = useMemo(() => {
    return (
      <Button onClick={toggleResizable} key='1' >{resizable ? "禁止缩放" : "允许缩放"}</Button>
    )
  }, [resizable])

  const headerLeft = useMemo(() => {
    return <>{resizable ? '当前可缩放' : '当前不可缩放'}</>
  }, [resizable])

  return <Table
    columns={columns}
    dataSource={dataSource}
    resizable={resizable}
    headerRight={headerRight}
    headerLeft={headerLeft}
  />
}

// 可编辑表格
function EditorTable() {

  const [editing, setEditing] = useState(EditStatus.CANCEL);
  const [address] = useState([{ value: '1', label: '地址1' }, { value: '2', label: '地址2' }])
  const getKey = useCallback(() => Math.random().toString('16').slice(2), [])

  const [dataSource, setDataSource] = useState(() => getEditList(10))
  const editorColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      editConfig: {
        render: (text, record, index) => {
          return <Input />
        },
      },
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      editConfig: {
        render: (text, record, index) => {
          return <InputNumber min={0} />
        },
        // editValue: () => ({})
      }
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      render: (a, record, index) => {
        if (!a) return null
        const item = address.find(item => item.value === a)
        const text = item ? item.label : '未知地址'
        return text
      },
      editConfig: {
        render: (value, record, index) => {
          return (
            <Selector useStorage={false} dataSource={address} />
          )
        }
      },
    }
  ]

  const actions = ([editDataList, setEditDataList], selectedRowKeys) => {
    return (
      <>
        <Button onClick={() => { setEditDataList((list) => [{ key: getKey() }, ...list]) }}>添加到第一行</Button>
        <Button onClick={() => { setEditDataList(([first, ...list]) => list) }}>删除第一行</Button>
      </>
    )
  }
  return <Table
    columns={editorColumns}
    dataSource={dataSource}
    headerRight={
      <>
        <Button onClick={() => { setEditing(SwitchStatus) }}>{editing === EditStatus.EDIT ? "退出" : "进入"}编辑</Button>
        <Button onClick={() => { setEditing(EditStatus.SAVE) }}>保存</Button>
      </>
    }
    editable={editing}
    editActions={actions}
    onSave={setDataSource}
    scroll={{ y: 400 }}
  />
}


// 虚拟滚动
function VirtualScrollTable() {

  const dataSource = useMemo(() => getList(100), [])

  return (
    <Table
      withIndex={0}
      columns={columns}
      dataSource={dataSource}
      virtualScroll
      // 或者
      // virtualScroll={{
      //   threshold: 15,
      //   rowHeight: 30,
      // }}
      scroll={{ y: 300 }}
    />
  )
}


function NestTable(props) {

  const [columns, setcolumns] = useState([
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 200
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 200
    },
    {
      title: '公司',
      dataIndex: 'nest',
      children: [
        {
          title: '公司名称',
          dataIndex: 'cName',
          key: 'cName',
          width: 160
        },
        {
          title: '创始人',
          dataIndex: 'boss',
          key: 'boss',
          width: 120
        },
        {
          title: '成立时间',
          dataIndex: 'createDate',
          key: 'createDate',
          width: 120
        },
        {
          title: '公司地址',
          dataIndex: 'cAddress',
          key: 'cAddress',
          width: 320,
          children: [
            {
              title: "街道",
              dataIndex: 'street',
              width: 200
            },
            {
              title: "邮编",
              dataIndex: 'email',
              width: 80
            }
          ]
        },
      ]
    }
  ])

  const dataSource = useMemo(() => getNestList(), [])

  return <Table columns={columns} dataSource={dataSource} scroll={{ x: 1050 }} />
}


function ScrollTable() {

  const [dataSource, setdataSource] = useState(() => getList(5))
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(false)
  }, [dataSource])

  const onWheel = useCallback(
    () => {
      setloading(true)
      setTimeout(() => {
        setdataSource(list => ([
          ...list,
          ...getList(5),
        ]))
      }, 1000)
    },
    [],
  )

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: 300 }}
      onScroll={onWheel}
      loading={loading}
    />
  )
}

// 拖动排序
function DragTable(props) {
  const [dataSource, setdataSource] = useState(() => getList(20))


  return <Table
    columns={columns}
    dataSource={dataSource}
    onDragEnd={setdataSource}
    scroll={{ y: 300 }}
  />
}


function WideTable() {

  let dataArray = new Array(10), dataSource = [];
  dataArray = dataArray.fill()
  dataArray.map((item, index) => {
    dataSource.push({
      name: "namenamenamenamenamenamenamename" + index,
      age: index,
      address: "123",
      key: index,
      address2: 'address' + index
    })
  })

  const [data, setdata] = useState(dataSource)


  const [columns, setcolumns] = useState([
    {
      title: '姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名',
      dataIndex: 'name',

      key: 'name',
      width: 150,
    },
    {
      title: '年龄年龄年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址住址住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '姓名姓名姓名',
      dataIndex: 'name1',
      editConfig: {
        fieldType: "input",
      },
      key: 'name1',
    },
    {
      title: '年龄年龄年龄',
      dataIndex: 'age1',
      key: 'age1',
    },
    {
      title: '住址住址住址',
      dataIndex: 'address1',
      editConfig: {
        fieldType: "textarea",
      },
      key: 'address1',
    },
    {
      title: '姓名姓名姓名',
      dataIndex: 'name2',
      editConfig: {
        fieldType: "input",
      },
      key: 'name2',
    },
    {
      title: '年龄年龄年龄',
      dataIndex: 'age2',
      key: 'age2',
      width: 200,
      fixed: 'right'
    },
    {
      title: '住址住址住址',
      dataIndex: 'address2',
      editConfig: {
        fieldType: "textarea",
      },
      key: 'address2',
      width: 200,
      fixed: 'right'
    },
  ])
  const tollgleFixed = useCallback(
    () => {
      setcolumns(cols => {
        const { fixed } = cols[0]
        cols[0].fixed = fixed === 'left' ? undefined : 'left'
        return cols.slice(0)
      })
    },
    [],
  )
  return <Table
    wrap
    columns={columns}
    dataSource={data}
    hideVisibleMenu
    onDragEnd={setdata}
    headerRight={(
      <>
        <Button onClick={tollgleFixed}>切换固定列</Button>
      </>
    )}
    scroll={{ x: 2000, y: 400 }}
  />
}

const TreeTable = () => {
  const [keys, setKeys] = useState();
  const dataSource = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: 3,
      name: '合并单元格',
      children: [
        {
          key: 31,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park',
        },
      ]
    },
  ];

  const renderContent = useCallback(
    (text, record) => {
      const obj = {
        children: text,
        props: {},
      }
      if (record.children) {
        obj.props.colSpan = 0
      }
      return obj
    },
    [],
  )
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      expandColumn: true,
      render: (text, record) => {
        if (record.children) {
          return {
            children: text,
            props: {
              colSpan: 5
            }
          }
        }
        return text
      }
    },
    {
      title: '序号',
      dataIndex: 'g-index',
      render: renderContent
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 120,
      render: renderContent
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
      render: renderContent
    },
    {
      title: 'Address2',
      dataIndex: 'address2',
      width: '30%',
      key: 'address2',
      render: renderContent
    },
  ];
  return <Table
    columns={columns}
    dataSource={dataSource}
    isZebra={false}
    tail={list => keys && keys.length ? `已选中${keys.length}条数据` : "没有选中数据"}
    rowSelection={{
      type: 'checkbox',
      selectedRowKeys: keys,
      clickable: false,
      onChange: (keys, rows) => {
        setKeys(keys)
      },
    }}
  />
}


function PaginationTable(props) {

  const [pagenumber, setpagenumber] = useState(1)
  const [size, setsize] = useState(50)
  const dataSource = useMemo(() => getList(120), [])

  const list = useMemo(() => {
    return dataSource.slice((pagenumber - 1) * size, pagenumber * size)
  }, [pagenumber, size])

  const onChange = useCallback(
    (page, size) => {
      setpagenumber(page)
      setsize(size)
    },
    [],
  )

  const [scrollKey, setscrollKey] = useState(null)

  return <Table
    columns={columns}
    withIndex={0}
    dataSource={list}
    scrollKey={scrollKey}
    scroll={{ x: '100%', y: 350 }}
    pagination={{ total: 78, current: pagenumber, pageSize: size, onChange }}
    tail={list => `当前页有${list.length}条数据`}
    footerDirection='row-reverse'
  />
}


function LightTable(props) {
  const getlist = useCallback(
    (length) => {
      const dataSource = new Array(length).fill().map((item, index) => {
        return {
          name: "namenamenamenamenamenamename" + index,
          age: index,
          address: "123",
        }
      })
      return dataSource
    },
    [],
  )
  const [dataSource, setdataSource] = useState(getlist(5))

  const [spacing, setspacing] = useState(10)

  return (
    <>
      <div style={{ width: 200 }}>
        <Slider
          min={4}
          max={20}
          onChange={setspacing}
          value={spacing}
        />
      </div>
      <Table light spacing={spacing} cellPadding='8px 4px' columns={columns} dataSource={dataSource} onDragEnd={setdataSource} pagination={false} />
    </>
  )
}

function EmptyTable(props) {

  return <Table columns={columns} dataSource={[]} scroll={{ x: '100%', y: 350 }} pagination={false} emptyDescription='这个表格是空的' />
}

const config = {
  codes: code.map(V => `import React, { useState, useCallback, useEffect, useMemo } from 'react';\n${V}`),
  useage: (
    `在已有的表格基本功能以后，还有其他以下功能以增强表格在不同场景下的应用
		<h2>主要特性</h2>
		<b>1、可缩放的列(某些情况下，当缩小宽度时不会出现省略号)</b><br/>
		<b>2、单元格编辑</b><br/>
		<b>3、优化大数据下的滚动(虚拟滚动)</b><br/>

		<h2>其他特性</h2>
		<b>1、滚动加载</b><br/>
		<b>2、拖动排序</b><br/>
		<b>3、级联选择</b><br/>`
  ),
  children: [
    {
      title: '可缩放列',
      describe: '通过columns指定显示的列，通过dataSource显示数据，缩放列的功能默认开启，通过设置resizable来修改配置',
      cmp: BasicTable
    },
    {
      title: '可编辑表格',
      describe: `单元格编辑功能，
      通过editable属性，控制表格可否编辑.
      editActions用于渲染在编辑状态下的额外组件。
      在column数据上添加editConfig表示开启该列的可编辑状态。
      onSave会返回当editable状态修改为EditStatus.SAVE状态时的整个表格数据。
      除了data-cell-g中的组件，如何实现自定义的用于表格编辑的组件请参看NOTES`,
      cmp: EditorTable
    },
    {
      title: '虚拟滚动',
      describe: '虚拟滚动模式下，并不会直接渲染所有数据。通过virtualScroll开启，必须指定scroll.y控制高度。也可以仅设置virtualScroll为true，使用内置的参数。一般情况下也不需要修改',
      cmp: VirtualScrollTable
    },
    {
      title: '嵌套表头',
      describe: '',
      cmp: NestTable
    },
    {
      title: '滚动加载',
      describe: 'wheel指定滚动回调',
      cmp: ScrollTable
    },
    {
      title: '拖动排序',
      describe: '',
      cmp: DragTable
    },
    // {
    //   title: '宽表格',
    //   describe: '在小屏幕上出现滚动条,设置fixed的列必须设置宽度，试试缩小屏幕。同时，因为有固定列，所以wrap使文本折行的属性不能生效',
    //   cmp: WideTable
    // },
    {
      title: '树形表格、级联选择',
      describe: '树形表格,级联选择, 与antd组件相比，多选情况下onSelect第一个参数修改为了数组。datasource中有children属性自动开启树形结构, rowSelection为对象开启选择，增强选择的时候判断是否有子节点并一起选中,clickable: false用于关闭行选功能',
      cmp: TreeTable
    },
    {
      title: '带分页组件的table',
      describe: 'footerDirection=row-reverse控制分页和tail的顺序',
      cmp: PaginationTable
    },
    {
      title: 'table明亮模式',
      describe: '设置light,spacing设置行间距,cellPadding设置单元格内边距',
      cmp: () => (
        <div style={{ padding: 10, backgroundColor: 'rgba(230,230,230,.5)' }}>
          <LightTable></LightTable>
        </div>
      )
    },
    {
      title: '无数据Table',
      describe: 'emptyDescription可自定义无数据时的文案',
      cmp: EmptyTable
    },
  ]
};
export default () => <CodeDecorator config={config} />