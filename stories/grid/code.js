export default [
`
import React, { useMemo, useEffect, useCallback, useState, useRef, Fragment } from 'react'
import { mock, Random } from 'mockjs'
import Grid from 'grid';
import { Button, message, Dropdown, Menu, Switch, Checkbox, Modal } from "antd"
import { Input, InputCellPhone, DatePicker, InputNumber } from "data-cell"
import Header from 'header'


const basicColumns = [{
    fieldName: "name",
    title: "姓名",
    cellRenderer: 'agGroupCellRenderer',
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
        editable: (params) => {
            return params.data.age > 30
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
        gridManagerRef.current.create(createData);
    }, []);
    const onTagRemove = useCallback(() => {
        gridManagerRef.current.tagRemove(selectedKeys);
    }, [selectedKeys]);
    const onRemove = useCallback(() => {
        gridManagerRef.current.remove(selectedKeys);
    }, [selectedKeys])
    const onSave = useCallback(async () => {
        const errors = await gridManagerRef.current.validate();
        if (gridManagerRef.current.loading) {
            gridManagerRef.current.loadingCallback(() => {
                gridManagerRef.current.save(() => {
                    const dataSource = gridManagerRef.current.getPureData();
                    setDataSource(dataSource);
                    setEditable(false);
                    return dataSource
                })
            })
        }
        if (errors) return
        gridManagerRef.current.save(() => {
            const dataSource = gridManagerRef.current.getPureData();
            setDataSource(dataSource);
            setEditable(false);
            return dataSource
        })
    }, [])
    return (
        <Fragment>
            <Header extra={<Fragment>
                <Button size="small" onClick={() => setLoading(loading => !loading)} > toggle loading </Button>
                {!editable ? <Button size="small" icon='edit' onClick={() => setEditable(true)} /> : <Fragment>
                    <Button size="small" icon='poweroff' onClick={onCancelEdit} />
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
                treeData
                boxColumnIndex={2}
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
                getDataPath={(data) => data.path}
                // onCellEditingChange={(record) => {
                //     console.log('record', record)
                //     return record
                // }}
                createConfig={{
                    id: 'path',
                    path: "path",
                    toPath: (path, data) => {
                        if (data) {
                            const arrPath = path
                            arrPath.push(data.id)
                            return arrPath.join('/') + '/'
                        }
                        return path.join('/') + "/"
                    },
                    defaultParentPath: ["313"]
                }}
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

ReactDOM.render(<basicColumns />, mountNode)`,]