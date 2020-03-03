const code1 = `import Table from 'table-g';

const BasicTable = (props) =>{
	const dataSource = useMemo(() => getList(), [])
  const [resizable, setresizable] = useState(true)

  const toggleResizable = useCallback(
    () => {
    setresizable(!resizable)
    },
    [resizable],
  )

  const headerRight = useMemo(() => {
    return (
    <>
      <Button onClick={toggleResizable} >切换可缩放列</Button>
    </>
    )
  }, [toggleResizable])

  return <Table
    columns={columns}
    dataSource={dataSource}
    resizable={resizable}
    headerRight={headerRight}
  />
}

ReactDOM.render(<BasicTable/>,mountNode)
`

const WidthTable = `import { Table } from 'gantd';

const WidthTable = () => {

  const [columns, setcolumns] = useState([
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => text + 1,
      width: 150
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
  ])

  let dataArray = new Array(10), dataSource = [];
  dataArray = dataArray.fill()
  dataArray.map((item, index) => {
    dataSource.push({
      name: "namenamenamenamenamenamename",
      age: index,
      address: "table的宽度需要是各列宽度的总和，如果没有设置列宽，将平分table的宽度,table默认600px，如果不太清楚table的布局策略，最好table宽度和所有列都加上宽度",
      key: index,
    })
  })

  return <Table columns={columns} dataSource={dataSource} />;
}

ReactDOM.render(
  <WidthTable/>,
  mountNode
)`

const code2 = `import {Table} from 'gantd';
import { Button } from 'antd';
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

function DisabledResizeTable(props) {
	const [column, setcolumn] = useState(columns)
	let dataArray = new Array(10), dataSource = [];
	dataArray = dataArray.fill()
	dataArray.map((item, index) => {
		dataSource.push({
			name: "namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename" + index,
			age: '',
			address: "住址住址住址住址",
			key: index
		})
	})

	const onSorted = useCallback(
		(from, to) => {
			setcolumn(([...cols]) => {
				cols.splice(to < 0 ? cols.length + to : to, 0, cols.splice(from, 1)[0])
				return cols
			})
		}
	)

	return <Table
		columns={column}
		headerLeft={<Button>left</Button>}
		headerRight={<Button>right</Button>}
		dataSource={dataSource}
		resizeCell={false}
		onSorted={onSorted}
	/>
}
ReactDOM.render(<DisabledResizeTable/>,mountNode)`

const EditTable = `import { Table, Generator, EditStatus, SwitchStatus } from 'gantd';
import { Input, TextArea, Button } from 'antd';
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

const wideTable = `import { Input, TextArea, Table } from 'gantd';
function WideTable() {
	const [editingKey, setEditingKey] = useState(null);
	let dataArray = new Array(10), dataSource = [];
	dataArray = dataArray.fill()
	dataArray.map((item, index) => {
		dataSource.push({
			name: "namenamenamenamenamenamenamename" + index,
			age: index,
			address: "123",
			key: index
		})
	})
	const editorColumns = [
		{
			title: '姓名姓名姓名',
			dataIndex: 'name',
			key: 'name',
			fixed: true,
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
	]
	return <Table
		wrap
		columns={editorColumns}
		dataSource={dataSource}
		hideVisibleMenu
		scroll={{ x: 2000, y: 300 }}
	/>
}

ReactDOM.render(
  <WideTable/>,
  mountNode
)`;

const TreeTable = `import { Table } from 'gantd';
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

const code6 = `import { Table } from 'gantd';

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

	const [dataSource, setdataSource] = useState(() => {
		const dataSource = new Array(78).fill().map((item, index) => {
			return {
				name: "name",
				age: index,
				address: "123",
				key: index,
				isDeleted: true
			}
		})
		return dataSource
	})

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

	useEffect(() => {
		setTimeout(() => {
			setscrollKey('30')
			setTimeout(() => {
				setscrollKey('3')
			}, 5000)
		}, 5000)
	}, [])

  return <Table
	columns={[
		{
			dataIndex: "index",
			title: "序号",
			render: (t, r, index) => index + 1
		},
		...columns
	]}
	dataSource={list}
	scrollKey={scrollKey}
    scroll={{ x: '100%', y: 350 }}
    pagination={{ total: 78, current: pagenumber, pageSize: size, onChange }}
    tail={list => '当前页有' + list.length + '条数据'}
    footerDirection='row-reverse'
  />
}

ReactDOM.render(
  <PaginationTable/>,
  mountNode
)`

const code7 = `import { Table } from 'gantd';
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

const empty = `import { Table } from 'gantd';

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
  return <Table columns={columns} dataSource={[]} scroll={{ x: '100%', y: 350 }} pagination={false} flex emptyDescription='这个表格是空的' />
}

ReactDOM.render(
  <EmptyTable/>,
  mountNode
)`




export default [code1, EditTable, WidthTable, code2, wideTable, TreeTable, code6, code7, empty]