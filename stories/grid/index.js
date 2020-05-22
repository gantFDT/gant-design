
import CodeDecorator from '../_util/CodeDecorator'
import codes from './code';
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import ReactDom from 'react-dom'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack, GantGroupCellRenderer } from '@grid';
import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { Button, message, Dropdown, Menu, Switch, Checkbox } from "antd"
import { Input, InputCellPhone, } from "@data-cell"
import Header from '@header'
/*! Split !*/
const sourceDataList = {
    checked: null,
    createDate: null,
    createdBy: null,
    createdByName: '',
    deleteDate: null,
    deletedBy: null,
    expanded: false,
    id: 0,
    isDeleted: null,
    leaf: true,
    level: null,
    loaded: false,
    optCounter: null,
    parentId: null,
    path: '',
    productTypeExt: { id: null },
    typeCode: '',
    typeName: false,
    updateDate: null,
    updatedBy: null,
    updatedByName: '',
};

function MedalCellRenderer() {
}

// init method gets the details of the cell to be renderer
MedalCellRenderer.prototype.init = function (params) {
    console.log("MedalCellRenderer.init", params)
    this.eGui = document.createElement('span');
    ReactDom.render(<GantGroupCellRenderer {...params} />, this.eGui);
};
MedalCellRenderer.prototype.getGui = function () {
    return this.eGui;
};
const ComputeGrid = () => {


    const [editable, seteditable] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 0)
    }, [])

    const [columns, setcolumns] = useState([
        {
            fieldName: 'typeCode',
            title: "产品类型编码",
            width: 300,
            editConfig: {
                component: Input,
                editable: true,
                rules: [
                    {
                        required: true,
                        message: "产品类型编码必填"
                    },
                    {
                        max: 10,
                        min: 2,
                        message: "产品类型编码范围2-10"
                    },
                ]
            },
            cellRenderer: "gantGroupCellRenderer",
            cellRendererParams: {
                innerRenderer: (params) => {
                    return params.value
                }
            }
        },
        {
            fieldName: 'typeName',
            title: "产品类型名称",
            width: 300,
            valueFormatter: (params) => {
                return params.value
            },
            render: val => val,
            editConfig: {
                component: Input,
                editable: true,
            }
        }
    ])


    const [dataSource, setdataSource] = useState(
        [
            {
                "path": "313/",
                "id": 313,
                "typeCode": "313", "typeName": "false",
                "children": [{
                    "path": "313/314/", "id": 314,
                    "typeCode": "314", "typeName": "false",
                    children: [{ "path": "313/314/315/", "id": 315, "typeCode": "bbb", "typeName": "false", }]
                }, {
                    "path": "313/322/", "id": 322,
                    "typeCode": "322", "typeName": "false",
                },
                {
                    "path": "313/323/", "id": 323,
                    "typeCode": "323", "typeName": "false",
                }
                ],
            },
            {
                "path": "213/",
                "id": 213,
                "typeCode": "213", "typeName": "false",
                "children": [{
                    "path": "213/214/", "id": 214,
                    "typeCode": "214", "typeName": "false"
                }],
            }, {
                "path": "113/",
                "id": 113,
                "typeCode": "113", "typeName": "false",
            }
        ]
    )

    const apiRef = useRef()

    const edit = useCallback((e) => { seteditable(true) }, [])

    const [manager, setManager] = useState()

    const onReady = useCallback((params, manager) => {
        apiRef.current = params
        setManager(manager)
    }, [])

    const [beginIndex, setBeginIndex] = useState(20)

    const [selectedKeys, setselectedKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const onPageChange = useCallback(
        (beginIndex) => {
            setBeginIndex(beginIndex)
        },
        [],
    )

    const onSelect = useCallback((keys, rows) => {
        setselectedKeys(keys)
        setSelectedRows(rows)
    }, [])
    const createRoot = () => {
        let rowid = new Date().valueOf();
        manager.create({ ...sourceDataList, id: rowid, path: rowid + "/" });
    }
    const btachCreateBrother = () => {
        const createRecord = []
        new Array(2).fill("").map(item => {
            let rowid = new Date().valueOf();
            let path = getDataPath(selectedRows[0]);
            path.pop()
            path = path ? path : [];
            createRecord.push({ ...sourceDataList, id: rowid, path: path.join("/") ? path.join("/") + "/" + rowid + "/" : rowid + "/" })
        })
        manager.create(createRecord, selectedKeys[0]);
    }
    const getDataPath = (data) => {
        const path = data.path.split('/');
        path.pop()
        return [...path]
    }
    const createBrother = () => {
        const createRecord = [];
        selectedRows.map(item => {
            let rowid = new Date().valueOf();
            let path = getDataPath(item);
            path.pop()
            path = path ? path : [];
            createRecord.push({ ...sourceDataList, id: rowid, path: path.join("/") ? path.join("/") + "/" + rowid + "/" : rowid + "/" })
        })
        manager.create(createRecord, selectedKeys);
    }
    const createSub = () => {
        const createRecord = [];
        selectedRows.map(item => {
            let rowid = new Date().valueOf();
            let path = getDataPath(item);
            createRecord.push({ ...sourceDataList, id: rowid, path: path.join("/") ? path.join("/") + "/" + rowid + "/" : rowid + "/" })
        })
        manager.create(createRecord, selectedKeys, true);
    }
    const menu = (<Menu>
        <Menu.Item>
            <a onClick={createRoot}>创建跟节点</a>
        </Menu.Item>
        <Menu.Item>
            <a
                onClick={btachCreateBrother}>批量同级节点</a>
        </Menu.Item>
        <Menu.Item>
            <a
                onClick={createBrother}>创建同级节点</a>
        </Menu.Item>
        <Menu.Item>
            <a
                onClick={createSub}>创建子级节点</a>
        </Menu.Item>
    </Menu>)
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
                        <Button size="small" disabled={!(manager && selectedKeys.length)} onClick={() => manager.tagRemove(selectedKeys)}>删除标记</Button>
                        <Button size="small" onClick={() => manager.undo()}>撤销</Button>
                        <Button size="small" onClick={() => manager.redo()}>重做</Button>
                        <Button size="small" onClick={() => {
                            console.log(manager.diff)
                        }}>diff</Button>
                        <Button size="small" onClick={async () => {
                            const errs = await manager.validate();
                            console.log(errs)
                        }}>验证</Button>
                        <Button size="small" onClick={() => {
                            manager.cancel()
                            seteditable(false)
                        }}>取消</Button>
                        <Button size="small" onClick={() => {
                            const isChanged = manager.isChanged;
                            console.log("changed", isChanged)
                            manager.save()

                        }}>保存</Button>
                        <Button size="small" onClick={() => {
                            console.log(manager.getRowData())
                        }}>打印数据</Button>
                    </>
                )
            }
                title="树形"
                type="line"
            />
            <Grid
                rowkey='path'
                loading={loading}
                columns={columns}
                components={
                    { 'medalCellRenderer': MedalCellRenderer }
                }
                onCellEditingChange={(record) => [{ ...record, typeCode: record.typeCode + "test", typeName: "true" }]}
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
                openEditSign
                removeShowLine={false}
                // isServerSideGroup={(data) => data.children}
                groupSuppressAutoColumn
                getDataPath={getDataPath}
                onRow
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
        render: (val, record, index, params) => {
            const { context: { size } } = params;
            return <Input value={val} />
        }
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
            context={{
                size
            }}
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
        // {
        //     title: "树形数据单元格编辑",
        //     describe: "树形结构的单元格编辑，对节点的操作、撤销、重做等",
        //     cmp: TreeGrid
        // },
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
