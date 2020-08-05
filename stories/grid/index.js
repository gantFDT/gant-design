
import CodeDecorator from '../_util/CodeDecorator'
import codes from './code';
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef, Fragment } from 'react'
import { mock, Random } from 'mockjs'
import Grid from '@grid';
import { Button, message, Dropdown, Menu, Switch, Checkbox, Modal } from "antd"
import { Input, InputCellPhone, DatePicker, InputNumber, EditStatus } from "@data-cell"
import Header from '@header'
/*! Split !*/
const basicColumns = [{
    fieldName: "name",
    title: "姓名",
    cellRenderer: 'agGroupCellRenderer',
    toolTipRender: (params) => {
        const { data } = params;
        return data.age > 30 ? data.name : null
    },
    editConfig: {
        component: Input,
        editable: true,
        signable: true,
        rules: [
            {
                required: true,
                message: "姓名不能为空"
            },
            {
                min: 4,
                type: 'string',
                message: "姓名不能小于四个字符串"
            }
        ]
    }
},
{
    fieldName: "age",
    title: "年龄",
    render: (value) => value,
    editConfig: {
        component: InputNumber,
        signable: true,
        editable: (data) => {
            return data.age > 30
        },
        rules: {
            type: "number",
            min: 10,
            message: "年龄不能小于10岁"
        }
    }
},
{
    fieldName: "county",
    title: "国家",
    render: (value) => value + 222
},
{
    fieldName: "recored.address",
    title: "地址",
    editConfig: {
        component: Input,
        editable: true,
        signable: true,
        rules: [
            {
                required: true,
                message: "地址不能为空"
            },
            {
                min: 6,
                type: 'string',
                message: "地址不能小于个字符串"
            }
        ]
    }

},
]
const RandomCreate = () => ({
    ip: Random.ip(),
    name: Random.name(),
    age: Random.natural(10, 50),
    county: Random.county(true),
    leaf: [true, false][Random.natural(0, 1)],
    path: [Random.ip()],
    recored: {
        address: Random.county(true)
    }
})
const mockData = Array(100).fill().map((_, Idx) => RandomCreate())
const BaiscGrid = () => {
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const [gridChange, setGridChange] = useState(false);
    const [selectedKeys, setselectedKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const apiRef = useRef();
    const gridManagerRef = useRef();
    const onReady = useCallback((params, manager) => {
        apiRef.current = params.api;
        gridManagerRef.current = manager;
    })
    const onEditChangeCallback = useCallback((isChange) => {
        setGridChange(isChange)
    }, [])
    const queryData = useCallback((beginIndex = 0) => {
        var dataSource = mockData.slice(beginIndex, beginIndex + 20)
        setDataSource(dataSource)
    }, [])
    useEffect(() => {
        queryData();
    }, [])
    const onPageChange = useCallback(
        (beginIndex, pageSize, cur) => {
            if (cur === current) return;
            setCurrent(cur)
            queryData(beginIndex);
        },
        [current],
    )
    const onSelect = useCallback((keys, rows) => {
        setselectedKeys(keys)
        setSelectedRows(rows)
    }, [])
    // 取消编辑
    const onCancelEdit = useCallback(() => {
        if (gridChange) return Modal.confirm({
            title: "提示",
            content: "grid修改内容未保存,是否结束编辑？",
            onOk: () => {
                gridManagerRef.current.cancel();
                setEditable(false)
            }
        })
        setEditable(false)
    }, [gridChange])
    const onCreate = useCallback(() => {
        const createData = RandomCreate();
        gridManagerRef.current.create(createData, selectedKeys);
    }, [selectedKeys]);
    const onTagRemove = useCallback(() => {
        gridManagerRef.current.tagRemove(selectedKeys);
    }, [selectedKeys]);
    const onRemove = useCallback(() => {
        gridManagerRef.current.remove(selectedKeys);
    }, [selectedKeys])
    const onSave = useCallback(async () => {
        const { onDataAsyncEnd, validate, getPureData, diff } = gridManagerRef.current
        onDataAsyncEnd(async () => {
            const errors = await validate();
            if (errors) return
            gridManagerRef.current.save(() => {
                const dataSource = getPureData();
                setDataSource(dataSource);
                setEditable(false);
                return dataSource
            })
        })
    }, [])
    return (
        <Fragment>
            <Input edit='EDIT' />
            <Header extra={<Fragment>
                <Button size="small" onClick={() => {
                    console.log(gridManagerRef.current.diff)
                }} >
                    测试
            </Button>
                <Button size="small" onClick={() => setLoading(loading => !loading)} > toggle loading </Button>
                {!editable ? <Button size="small" icon='edit' onClick={() => setEditable(true)} /> : <Fragment>
                    <Button size="small" icon='poweroff' onClick={onCancelEdit} />
                    <Button size="small" onClick={() => {
                        const [key] = selectedKeys;
                        console.log(apiRef.current.getRowNode(key))
                    }} >

                    </Button>
                    <Button size="small" icon='plus' onClick={onCreate} />
                    <Button size="small" icon='minus' onClick={onTagRemove} />
                    <Button size="small" icon='delete' onClick={onRemove} />
                    <Button size="small" icon='undo' onClick={() => gridManagerRef.current.undo()} />
                    <Button size="small" icon='redo' onClick={() => gridManagerRef.current.redo()} />
                    <Button size="small" icon='save' onClick={onSave} />
                </Fragment>}
            </Fragment>
            }
                title="基本Grid"
                type="line"
            />
            <Grid
                tooltipShowDelay={10}
                rowkey='ip'
                loading={loading}
                columns={basicColumns}
                editable={editable}
                dataSource={dataSource}
                serialNumber
                // treeData
                boxColumnIndex={['name', 'county', 'age']}
                // isServerSideGroup={(data) => data.leaf}
                rowSelection={{
                    type: 'multiple',
                    selectedKeys,
                    selectedRows,
                    onSelect
                }}
                hideSelectedBox
                rowBuffer={1}
                groupSuppressAutoColumn
                editChangeCallback={onEditChangeCallback}
                onReady={onReady}
                openEditSign
                showCut
                getDataPath={(data) => data.path}
                // onCellEditingChange={async (record) => {
                //     await new Promise(resolve => setTimeout(() => {
                //         resolve(10)
                //     }, 2000))
                //     return { ...record, age: record.age + 1 }
                // }}
                // createConfig={{
                //     id: 'path',
                //     path: "path",
                //     toPath: (path, data) => {
                //         if (data) {
                //             const arrPath = path
                //             arrPath.push(data.id)
                //             return arrPath.join('/') + '/'
                //         }
                //         return path.join('/') + "/"
                //     },
                //     defaultParentPath: ["313"]
                // }}
                pagination={
                    {
                        pageSize: 20,
                        current: current,
                        total: 100,
                        onChange: onPageChange,
                    }
                }

            />
        </Fragment>
    )
}
/*! End !*/

/*! Split !*/
const treeDataSource = [{
    id: 1,
    filePath: ['Documents'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
},
{
    id: 2,
    filePath: ['Documents', 'txt'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
},
{
    id: 3,
    filePath: ['Documents', 'txt', 'notes.txt'],
    dateModified: 'May 21 2017 01:50:00 PM',
    size: 14.7,
},
{
    id: 4,
    filePath: ['Documents', 'pdf'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
},
{
    id: 5,
    filePath: ['Documents', 'pdf', 'book.pdf'],
    dateModified: 'May 20 2017 01:50:00 PM',
    size: 2.1,
},
{
    id: 6,
    filePath: ['Documents', 'pdf', 'cv.pdf'],
    dateModified: 'May 20 2016 11:50:00 PM',
    size: 2.4,
},
{
    id: 7,
    filePath: ['Documents', 'xls'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
},
{
    id: 8,
    filePath: ['Documents', 'xls', 'accounts.xls'],
    dateModified: 'Aug 12 2016 10:50:00 AM',
    size: 4.3,
},
{
    id: 9,
    filePath: ['Documents', 'stuff'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
},
{
    id: 10,
    filePath: ['Documents', 'stuff', 'xyz.txt'],
    dateModified: 'Jan 17 2016 08:03:00 PM',
    size: 1.1,
},

{
    id: 12,
    filePath: ['temp.txt'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
    size: 101,
},
{
    id: 11,
    filePath: ['Music'],
    dateModified: 'Sep 11 2016 08:03:00 PM',
    size: 14.3,
},
{
    id: 13,
    filePath: ['Music', 'mp3',],
    dateModified: 'Aug 12 2016 10:50:00 PM',
    size: 101,
},
{
    id: 14,
    filePath: ['Music', 'mp4', 'jazz'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
    size: 101,
},
]
const treeColumns = [{
    title: 'dateModified',
    fieldName: 'dateModified',
    minWidth: 250,
    cellRenderer: 'gantGroupCellRenderer',
    comparator: function (d1, d2) {
        return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
    },
},
{
    title: 'size',
    fieldName: 'size',
    aggFunc: 'sum',
    valueFormatter: function (params) {
        return params.value
            ? Math.round(params.value * 10) / 10 + ' MB'
            : '0 MB';
    },
}]
const TreeGrid = () => {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editable, setEditable] = useState(false)
    const apiRef = useRef(null)
    const gridManagerRef = useRef(null)
    const onReady = useCallback((params, manager) => {
        apiRef.current = params.api;
        gridManagerRef.current = manager;
    })
    const onSelect = useCallback((keys, rows) => {
        setSelectedKeys(keys);
        setSelectedRows(rows)
    }, [])
    const onTagRemove = useCallback(() => {
        gridManagerRef.current.tagRemove(selectedKeys);
    }, [selectedKeys])
    const onCancelEdit = useCallback(() => {
        setEditable(false);
        gridManagerRef.current.cancel()
    }, [])
    return <Fragment>
        <Header extra={<Fragment>
            <Button size="small" icon='poweroff' onClick={() => console.log(gridManagerRef.current.getPureData())} />
            {!editable ? <Button size="small" icon='edit' onClick={() => setEditable(true)} /> : <Fragment>
                <Button size="small" icon='poweroff' onClick={onCancelEdit} />
                <Button size="small" icon='minus' onClick={onTagRemove} />
                <Button size="small" icon='undo' onClick={() => gridManagerRef.current.undo()} />
                <Button size="small" icon='redo' onClick={() => gridManagerRef.current.redo()} />
            </Fragment>}
        </Fragment>
        }
            title="基本Grid"
            type="line"
        />
        <Grid
            rowkey='id'
            columns={treeColumns}
            dataSource={treeDataSource}
            serialNumber
            treeData
            boxColumnIndex={0}
            rowSelection
            rowSelection={{
                type: 'multiple',
                selectedKeys,
                selectedRows,
                onSelect
            }}
            rowBuffer={1}
            groupSuppressAutoColumn
            // editChangeCallback={onEditChangeCallback}
            onReady={onReady}
            openEditSign
            getDataPath={(data) => data.filePath}

        />
    </Fragment>

}
/*! End !*/
const config = {
    codes,
    useage: <div>
        <div>依赖于ag-grid的高性能表格</div>
        <div style={{ fontWeight: 'bold' }}>ag-grid-enterprise需商业授权，如需使用ag-grid-enterprise功能，请自行获得LicenseKey</div>
        <div><a href="https://www.ag-grid.com/" target="_blank">Ag-Grid官网</a></div>
        <div><a href="https://github.com/ag-grid/ag-grid/blob/master/LICENSE.txt" target="_blank">LICENSE</a></div>
    </div>,
    children: [
        {
            title: '基础Grid',
            describe: "基础Grid",
            cmp: BaiscGrid
        }
    ]
}

export default () => <CodeDecorator config={config} />
