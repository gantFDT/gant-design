export default [
`
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack } from 'grid';
import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { Button, message, Dropdown, Menu, Switch, Checkbox } from "antd"
import { Input, InputCellPhone, } from "data-cell"
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
        }, 0)
    }, [])

    const [columns, setcolumns] = useState([
        {
            title: '姓名',
            fieldName: "name",
            editConfig: {
                component: Input,
                // changeFormatter: (e: any) => e.target.value,
                editable: true,
                // onCellChange(value, data, list) {
                //     data.name = data.name.repeat(2)
                //     // list.forEach((item, index) => {
                //     //     item.age = index + item.age
                //     // })
                // }
            },
            enableRowGroup: true,
            cellRenderer: "gantGroupCellRenderer",
        },
        {
            title: '年龄',
            fieldName: "age",
            sortable: true,
            filter: Filter.Number,
            type: "numericColumn",
            enableRowGroup: true,
            editConfig: {
                component: Checkbox,
                editable: true
            }
        },
        {
            title: '地址',
            fieldName: "address",
            width: 400,
            editConfig: {
                component: Input,
                editable: () => true
            }
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
                address: "123"
            },
        ]
    )

    const apiRef = useRef()

    const edit = useCallback((e) => { seteditable(true) }, [])

    const [manager, setManager] = useState()
    const [isTree, setIsTree] = useState(true)

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
                    <a onClick={() => manager.create(
                        [
                            { idcard: Math.random().toString(16), name: "新增1" },
                            { idcard: Math.random().toString(16), name: "新增2" },
                        ]
                    )}>批量新增</a>
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

    const mapNodes = useCallback(
        (node, index) => {
            if (node.idcard === "3") {
                node.isDeleted = true
            }
            if (node.idcard === "4") {
                node.name = '修改节点'
            }
        },
        [],
    )
    const mapSelectedNodes = useCallback(
        (node) => {
            try {
                node.isDeleted = true
            }
            catch (e) {
                console.error(e)
            }
        },
        [],
    )
    const mapNodesIds = useCallback(
        (node) => {
            node.name = "mapNodesIds"
        },
        [],
    )
    return (
        <>
            <Switch onBulr={() => console.log("onBulr")} />
            <Header extra={!editable ? (
                <>
                    <Button size="small" onClick={edit}>进入编辑</Button>
                    {/* <Button onClick={() => setIsTree(false)}>切换</Button> */}
                </>

            ) : (
                    <>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button size="small">添加节点</Button>
                        </Dropdown>
                        <Button size="small" disabled={!(manager && selectedKeys.length)} onClick={() => manager.remove(deleteCb).then(e => message.success("删除成功"), e => { message.error("删除出错"); throw e })}>删除</Button>
                        <Button size="small" onClick={append}>添加子节点</Button>
                        <Button size="small" onClick={() => manager.mapNodes(mapNodes)}>遍历所有节点</Button>
                        <Button size="small" onClick={() => manager.mapNodesIds(['3'], mapNodesIds)}>遍历指定节点</Button>
                        <Button size="small" onClick={() => manager.mapSelectedNodes(mapSelectedNodes)}>遍历选中节点</Button>
                        <Button size="small" onClick={() => manager.undo()}>撤销</Button>
                        <Button size="small" onClick={() => manager.redo()}>重做</Button>
                        <Button size="small" onClick={() => {
                            manager.cancel()
                            seteditable(false)
                        }}>取消编辑</Button>
                        <Button size="small" onClick={() => {
                            const { list, diff } = manager.save()
                            const isChanged = manager.isChanged
                            setdataSource(list)
                            seteditable(false)
                            console.log(list)
                            console.log(diff)
                            console.log("changed", isChanged)
                        }}>保存</Button>
                    </>
                )
            }
                title="树形"
                type="line"
            />
            <Grid
                components={{
                    "simpleCellRenderer": getSimpleCellRenderer()
                }}
                rowkey="idcard"
                loading={loading}
                columns={columns}
                // treeData={isTree}
                // treeData
                editable={editable}
                dataSource={dataSource}
                onReady={onReady}
                serialNumber
                rowSelection={{
                    type: 'multiple',
                    selectedKeys,
                    onSelect
                }}
                // removeShowLine={false}
                isServerSideGroup={(data) => data.children}
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


ReactDOM.render(<TreeGrid />, mountNode)`,`
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack } from 'grid';
import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { Button, message, Dropdown, Menu, Switch, Checkbox } from "antd"
import { Input, InputCellPhone, } from "data-cell"
import Header from 'header'


const ComputeGrid = () => {
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
        }, 0)
    }, [])

    const [columns, setcolumns] = useState([
        {
            title: '姓名',
            fieldName: "name",
         
            editConfig: {
                component: Input,
                // changeFormatter: (e: any) => e.target.value,
                editable: true,
                // onCellChange(value, data, list) {
                //     data.name = data.name.repeat(2)
                //     // list.forEach((item, index) => {
                //     //     item.age = index + item.age
                //     // })
                // }
            },
           
            enableRowGroup: true,
            cellRenderer: "gantGroupCellRenderer",
        },
        {
            title: '年龄',
            fieldName: "age",
            sortable: true,
            // filter: Filter.Number,
            type: "numericColumn",
            // enableRowGroup: true,
            // valueFormatter:(params)=>2222,
            render:()=>222,
            editConfig: {
                component: Checkbox,
                editable: true
            }
        },
        {
            title: '地址',
            fieldName: "address",
            width: 400,
            editConfig: {
                component: Input,
                editable: () => true
            }
        },
    ])


    const [dataSource, setdataSource] = useState(
        [
            {
                name: "阿萨的脚后跟",
                age: 1,
                idcard: "11",
                path: ["1", "11"]
            },
            {
                name: "阿萨的脚后跟",
                age: 1,
                idcard: "111",
                path: ["1", "11",'111']
            },
            {
                name: "里斯",
                idcard: "1",
                // age: 123,
                path: ["1"],
                age: 222
                
            },
            {
                name: "山坡地覅还是大佛i",
               
                idcard: "12",
                path: ["1", "12"]
            },
            {
                name: "阿斯u",
                age: 544,
                idcard: "2",
                path: ["2"]
            },
            {
                name: "埃斯珀蒂就",
                age: 1,
                idcard: "3",
                path: ["3"]
            },
            {
                name: "撒旦",
                age: 45,
                idcard: "4",
                path: ["4"],
                address: "123"
            },
        ]
    )

    const apiRef = useRef()

    const edit = useCallback((e) => { seteditable(true) }, [])

    const [manager, setManager] = useState()
    const [isTree, setIsTree] = useState(true)

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
                    <a onClick={() => manager.create({ idcard: Math.random().toString(16), name: Math.random().toString(16), path: [Math.random().toString(16)] })}>同级-新增</a>
                </Menu.Item>
                <Menu.Item>
                     <a 
                     onClick={() => manager.create({ idcard: Math.random().toString(16), 
                        name: Math.random().toString(16),
                         path: [Math.random().toString(16)]
                        },selectedKeys[0])}>同级-批量新增选中位置</a>
                 </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {
                        const selected = apiRef.current.api.getSelectedNodes()
                        if (selected.length) {
                            const records=selectedKeys.map(()=>( { idcard: Math.random().toString(16), name: Math.random().toString(16), path: [Math.random().toString(16)] }))
                            manager.create(
                                records,
                                selectedKeys
                            )
                        }
                    }}>同级-新增到多个节点上</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => {
                        const selected = apiRef.current.api.getSelectedNodes()
                        if (selected.length) {
                            manager.create(
                                { idcard: Math.random().toString(16), 
                                    name: Math.random().toString(16),
                                     path: [selectedKeys[0], Math.random().toString(16)] },
                                selectedKeys[0],
                                false
                            )
                        }
                    }}>子级-新增子节点</a>
                </Menu.Item>
            </Menu>
        )
    }, [manager,selectedKeys])

    const mapNodes = useCallback(
        (node, index) => {
            if (node.idcard === "3") {
                node.isDeleted = true
            }
            if (node.idcard === "4") {
                node.name = '修改节点'
            }
        },
        [],
    )
    const mapSelectedNodes = useCallback(
        (node) => {
            try {
                node.isDeleted = true
            }
            catch (e) {
                console.error(e)
            }
        },
        [],
    )
    const mapNodesIds = useCallback(
        (node) => {
            node.isDeleted = true
        },
        [],
    )
    return (
        <>
            <Header extra={!editable ? (
                <>
                    <Button size="small" onClick={edit}>进入编辑</Button>
                    {/* <Button onClick={() => setIsTree(false)}>切换</Button> */}
                </>

            ) : (
                    <>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Button size="small">添加节点</Button>
                        </Dropdown>
                        <Button size="small" disabled={!(manager && selectedKeys.length)} onClick={() => manager.remove(selectedKeys)}>删除</Button>
                        <Button size="small"  disabled={!(manager && selectedKeys.length)}  onClick={()=>manager.removeTag(selectedKeys)}>删除标记</Button>
                        <Button size="small"  onClick={() => manager.undo()}>撤销</Button>
                        <Button size="small" onClick={() => manager.redo()}>重做</Button>
                        <Button size="small" onClick={() => {
                            manager.cancel()
                        }}>diff</Button>
                        <Button size="small" onClick={() => {
                             const isChanged = manager.isChanged;
                             console.log("changed", isChanged)
                            const { list, diff } = manager.save()
                           
                            // setdataSource(list)
                            // seteditable(false)
                            // console.log(list)
                            // console.log(diff)
                            // console.log("changed", isChanged)
                        }}>保存</Button>
                    </>
                )
            }
                title="树形"
                type="line"
            />
            <Grid
                components={{
                    "simpleCellRenderer": getSimpleCellRenderer()
                }}
                rowkey="idcard"
                loading={loading}
                columns={columns}
                // treeData={isTree}
                treeData
                editable={editable}
                dataSource={dataSource}
                onReady={onReady}
                serialNumber
                rowSelection={{
                    type: 'multiple',
                    selectedKeys,
                    onSelect
                }}
                removeShowLine={false}
                isServerSideGroup={(data) => data.children}
                groupSuppressAutoColumn
                isCompute={false}
                getDataPath={data => data.path}
            />
        </>
    )
}

ReactDOM.render(<ComputeGrid />, mountNode)`,]