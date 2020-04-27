
import CodeDecorator from '../_util/CodeDecorator'
import codes from './code';
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack } from '@grid';
import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { Button, message, Dropdown, Menu, Switch, Checkbox } from "antd"
import { Input, InputCellPhone, } from "@data-cell"
import Header from '@header'
/*! Split !*/
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

/*! Split !*/
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
/*! End !*/

function ajax(updateData) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open(
        'GET',
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/javascript-grid-server-side-model-tree-data/purging-tree-data/data/data.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            updateData(JSON.parse(httpRequest.responseText));
        }
    };
}
const AsyncTreeData = () => {
    const [dataSource, setDataSource] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    const [editable, seteditable] = useState(false)
    const [size, setSize] = useState("defalut");
    const [treeData, setTreeData] = useState(false)
    const columns = [{
        fieldName: 'employeeId',
        enableRowGroup: true,
        cellRenderer: "gantGroupCellRenderer",
        editConfig: {
            component: InputCellPhone,
            // changeFormatter: (e: any) => e.target.value,

            editable: true
        },
        filter: true,
    },
    {
        fieldName: 'employeeName',
        render: (val) => <Input value={val} />
    },
    { fieldName: 'startDate' },
    { fieldName: 'employmentType' },
    ]
    useEffect(() => {
        ajax(setDataSource)
    }, [])
    const onSelect = (keys) => setSelectedKeys(keys)
    const onReady = useCallback((params, manager) => {
        // apiRef.current = params
        // setManager(manager)
    }, [])
    return <>
        <Header
            title="树形"
            type="line"
            extra={!editable ? (
                <Button onClick={() => {
                    seteditable(true);
                    setSize("small");
                }}>进入编辑</Button>
            ) : (
                    <>
                        <Button onClick={() => {
                            // const { list, diff } = manager.save()
                            // setdataSource(list)
                            seteditable(false)
                            setSize("defualt");
                        }}>保存</Button>
                    </>
                )
            } />
        <Grid
            rowkey="employeeId"
            columns={columns}
            dataSource={dataSource}
            treeData
            // isServer
            // isServerSideGroup={(data) => {
            //     console.log("isServerSideGroup",data)
            //     return Array.isArray(data.underlings)
            // }}
            treeDataChildrenName="underlings"
            rowSelection={{
                selectedKeys: selectedKeys,
                onSelect: (keys) => {
                    console.log(keys, 'selected')
                    onSelect(keys)
                }
            }}
            size={size}
            onReady={onReady}
            editable={editable}
            onRowGroupOpened={(data) => { console.log(data) }}
            groupSuppressAutoColumn
            sideBar={{
                toolPanels: [
                    {
                        id: 'filters',
                        labelKey: 'VPPS导航',
                        labelDefault: 'VPPS导航',
                        iconKey: 'filter',
                        toolPanel: 'agFiltersToolPanel',
                    }
                ],
                defaultToolPanel: 'filters',
                position: "left"
            }}
        />
    </>
}

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
            title: "树形数据单元格编辑",
            describe: "树形结构的单元格编辑，对节点的操作、撤销、重做等",
            cmp: TreeGrid
        },
        {
            title: "isCompute模式",
            describe: "isCompute模式下提供平行结构的原始数据，如果要转化成树状结构，需要注意添加treeData、getDataPath",
            cmp: ComputeGrid
        },
        // {
        //     title: "async tree",
        //     describe: "异步树形",
        //     cmp: AsyncTreeData
        // }
    ]
}

export default () => <CodeDecorator config={config} />
