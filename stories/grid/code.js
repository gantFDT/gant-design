export default [
`
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack } from 'grid';
import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { Button, message, Dropdown, Menu } from "antd"
import { Input, InputCellPhone } from "data-cell"
import Header from 'header'


const TreeGrid = () => {
    function getSimpleCellRenderer() {
        function SimpleCellRenderer() { }
        SimpleCellRenderer.prototype.init = function (params) {
            console.log(params)
            var tempDiv = document.createElement('div');
            if (params.node.group) {
                tempDiv.innerHTML =
                    '<span style="border-bottom: 1px solid grey; border-left: 1px solid grey; padding: 2px;">' +
                    params.value +
                    '</span>';
            } else {
                tempDiv.innerHTML =
                    '<span><img src="https://flags.fmcdn.net/data/flags/mini/ie.png" style="width: 20px; padding-right: 4px;"/>' +
                    params.value +
                    '</span>';
            }
            this.eGui = tempDiv.firstChild;
        };
        SimpleCellRenderer.prototype.getGui = function () {
            return this.eGui;
        };
        return SimpleCellRenderer;
    }

    const [editable, seteditable] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    const [columns, setcolumns] = useState([
        {
            title: '姓名',
            fieldName: "name",
            editConfig: {
                component: Input,
                // changeFormatter: (e: any) => e.target.value,
                editable: true,
            },
            enableRowGroup: true,
            cellRenderer: "agGroupCellRenderer",
        },
        {
            title: '年龄',
            fieldName: "age",
            sortable: true,
            filter: Filter.Number,
            type: "numericColumn"
        },
        {
            title: '余额',
            fieldName: "p",
            width: 100,
            hide: true
        },
    ])


    const [dataSource, setdataSource] = useState(
        [
            {
                name: "里斯",
                idcard: "1",
                age: 123,
                children: [
                    {
                        name: "阿萨的脚后跟",
                        age: 1,
                        idcard: "11",
                    }
                ]
            },
            {
                name: "阿斯u",
                age: 544,
                idcard: "2",
            },
            {
                name: "埃斯珀蒂就",
                age: 1,
                idcard: "3",
            },
            {
                name: "撒旦",
                age: 45,
                idcard: "4",
            },
        ]
    )

    const apiRef = useRef()

    const edit = useCallback((e) => { seteditable(true) }, [])

    const [manager, setManager] = useState()

    const onReady = useCallback((params, manager) => {
        apiRef.current = params
        setManager(manager)
    }, [])

    const [beginIndex, setBeginIndex] = useState(0)

    const [selectedKeys, setselectedKeys] = useState([])

    const onPageChange = useCallback(
        (beginIndex) => {
            setBeginIndex(beginIndex)
        },
        [],
    )

    const onSelect = useCallback((keys, rows) => {
        setselectedKeys(keys)
    }, [])

    /**删除年龄大于120的 */
    const deleteCb = useCallback((selected) => new Promise(res => {
        message.info("0.5s后删除")
        setTimeout(() => {
            res(true)
        }, 500)
    }), [])

    const append = useCallback(
        () => {
            manager.appendChild(["2"], [{ name: "child", age: 11, idcard: '111' }, { name: "child2", age: 12, idcard: '112' }])
        },
        [manager],
    )

    const menu = useMemo(() => {
        return (
            <Menu>
                <Menu.Item>
                    <a onClick={() => manager.create({ idcard: Math.random().toString(16), name: Math.random().toString(16) })}>新增</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {
                        const selected = apiRef.current.api.getSelectedNodes()
                        if (selected.length) {
                            manager.create(
                                { idcard: Math.random().toString(16), name: Math.random().toString(16) },
                                selected[0]
                            )
                        }
                    }}>新增子节点</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {
                        const selected = apiRef.current.api.getSelectedNodes()
                        if (selected.length) {
                            manager.create(
                                { idcard: Math.random().toString(16), name: Math.random().toString(16) },
                                selected[0],
                                false
                            )
                        }
                    }}>新增同级节点</a>
                </Menu.Item>
            </Menu>
        )
    }, [manager])

    return (
        <>
            <Header extra={!editable ? (
                <Button onClick={edit}>进入编辑</Button>
            ) : (
                    <>

                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button>添加节点</Button>
                        </Dropdown>
                        <Button disabled={!(manager && selectedKeys.length)} onClick={() => manager.remove(deleteCb).then(e => message.success("删除成功"), e => { message.error("删除出错"); throw e })}>删除</Button>
                        <Button onClick={append}>添加子节点</Button>
                        <Button onClick={() => manager.undo()}>撤销</Button>
                        <Button onClick={() => manager.redo()}>重做</Button>
                        <Button onClick={() => {
                            manager.cancel()
                            seteditable(false)
                        }}>取消编辑</Button>
                        <Button onClick={() => {
                            const { list, diff } = manager.save()
                            setdataSource(list)
                            seteditable(false)
                        }}>保存</Button>
                    </>
                )
            } />
            <Grid
                components={{
                    "simpleCellRenderer": getSimpleCellRenderer()
                }}
                rowkey="idcard"
                loading={loading}
                columns={columns}
                treeData
                editable={editable}
                dataSource={dataSource}
                onReady={onReady}
                rowSelection={{
                    selectedKeys,
                    onSelect
                }}
                pagination={{
                    pageSize: 2,
                    beginIndex,
                    total: 5,
                    onChange: onPageChange,
                }}
                groupSuppressAutoColumn
            />
        </>
    )
}

ReactDOM.render(<TreeGrid />, mountNode)`,]