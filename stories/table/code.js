const BasicTable = `import Table from 'table-g';

const BasicTable = (props) =>{
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

ReactDOM.render(<BasicTable/>,mountNode)
`
const EditTable = `import { Table } from 'table-g';
import {Input, InputNumber, Selector } from 'data-cell-g'
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
        }
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
            <Selector defaultList={address} />
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
ReactDOM.render(<EditorTable/>,mountNode)
`


const VirtualScroll = `import { Table } from 'table-g';
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
ReactDOM.render(
	<VirtualScrollTable/>,
	mountNode
  )`


const NestTable = `import { Table } from 'table-g';

const NestTable = () => {

	const [columns, setcolumns] = useState([
		{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => text + 1,
		  width: 150,
		},
		{
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		  width: 200
		},
		{
		  title: '住址住址住址住址住址住址住址住址住址',
		  dataIndex: 'address',
		  key: 'address',
		  width: 200
		},
		{
		  title: '嵌套',
		  dataIndex: 'nest',
		  width: 600,
		  children: [
			{
			  title: '123123123123123123123',
			  dataIndex: 'age1',
			  key: 'age1',
			},
			{
			  title: 'Age',
			  dataIndex: 'age2',
			  key: 'age2',
			  children: [
				{
				  title: 'Age',
				  dataIndex: 'age3',
				  key: 'age3',
				},
				{
				  title: 'Age',
				  dataIndex: 'age4',
				  key: 'age4',
				},
			  ]
			},
			{
			  title: 'Age',
			  dataIndex: 'age5',
			  key: 'age5',
			},
		  ]
		}
	  ])
	
	 const dataSource = usememo(() => getList(15),[])
	
	  return <Table columns={columns} dataSource={dataSource} scroll={{ x: 1050 }} />
}

ReactDOM.render(
  <NestTable/>,
  mountNode
)`

const ScrollTable = `import { Table } from 'table-g';

function ScrollTable() {

	const [dataSource, setdataSource] = useState(() => getList(5))
  
	const onWheel = useCallback(
	  () => {
		setdataSource(list => ([
		  ...list,
		  ...getList(5),
		]))
	  },
	  [],
	)
  
	return (
	  <Table
		columns={columns}
		dataSource={dataSource}
		scroll={{ y: 300 }}
		wheel={onWheel}
	  />
	)
  }
ReactDOM.render(
  <ScrollTable/>,
  mountNode
)`


const DragTable = `import Table from 'table-g'
function DragTable(props) {
	const [dataSource, setdataSource] = useState(() => getList(20))
  
  
	return <Table
	  columns={columns}
	  dataSource={dataSource}
	  onDragEnd={setdataSource}
	  scroll={{ y: 300 }}
	/>
  }
  ReactDOM.render(
	<DragTable/>,
	mountNode
  )`

const TreeTable = `import Table from 'table-g';
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

const renderContent = (text, record) => {
		const obj = {
			children: text,
			props: {}
		}
		if (record.name === "合并单元格") {
			obj.props.colSpan = 0
		}
		return obj
	}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
	key: 'name',
	render: (text, record) => {
		if (text === "合并单元格") {
			return {
				children: text,
				props: {
					colSpan: 3
				}
			}
		}
		return text
	}
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
	width: '12%',
	render: renderContent
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
	key: 'address',
	render: renderContent
  },
];

const TreeTable = ()=>{

  const [keys, setKeys] = useState([]);
  
  return <Table
    columns={columns}
    dataSource={dataSource}
    hideVisibleMenu={true}
    isZebra={false}
    tail={list => '当前页有' + list.length + '条数据'}
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

ReactDOM.render(
  <TreeTable/>,
  mountNode
)`;

const PaginationTable = `import Table from 'table-g';

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
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
	  tail={list => \`当前页有\${list.length}条数据\`}
	  footerDirection='row-reverse'
	/>
  }

ReactDOM.render(
  <PaginationTable/>,
  mountNode
)`

const LightTable = `import Table from 'table-g';
import { Slider } from 'antd';
const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
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
			<Table light spacing={spacing} columns={columns} dataSource={dataSource} onDragEnd={setdataSource} pagination={false} flex />
		</>
	)
}

ReactDOM.render(
  <LightTable/>,
  mountNode
)`

const empty = `import Table from 'table-g';

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
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

const EmptyTable = () => {
  return <Table columns={columns} dataSource={[]} scroll={{ x: '100%', y: 350 }} pagination={false} emptyDescription='这个表格是空的' />
}

ReactDOM.render(
  <EmptyTable/>,
  mountNode
)`




export default [BasicTable, EditTable, VirtualScroll, NestTable, ScrollTable, DragTable, TreeTable, PaginationTable, LightTable, empty]