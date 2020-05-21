export default [
`
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import ReactDom from 'react-dom'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack, GantGroupCellRenderer } from 'grid';
import { GridReadyEvent, ColDef } from 'ag-grid-community'
import { Button, message, Dropdown, Menu, Switch, Checkbox } from "antd"
import { Input, InputCellPhone, } from "data-cell"
import Header from 'header'


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
                component: InputCellPhone,
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
                onCellEditChange={(record) => [{ ...record, typeCode: record.typeCode + "test", typeName: "true" }]}
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
                createConfig={{
                    id: 'path',
                    path: "path",
                    toPath: (path) => path.join('/') + '/',
                    defaultParentPath: ["313"]
                }}
            />
        </>
    )
}

ReactDOM.render(<sourceDataList />, mountNode)`,]