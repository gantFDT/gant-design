
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
    productTypeExt: {id: null},
    typeCode: '',
    typeName: '',
    updateDate: null,
    updatedBy: null,
    updatedByName: '',
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
              editable: (record)=>{
                return record.createDate?false:true
              }
            },
            cellRenderer: "gantGroupCellRenderer",
          },
          {
            fieldName: 'typeName',
            title: "产品类型名称",
            width: 300,
            editConfig: {
              component: Input,
              editable: (record)=>{
                return record.createDate?false:true
              }
            }
          }
    ])


    const [dataSource, setdataSource] = useState(
        [
            {"optCounter":1,"createdBy":1,"createDate":"2020-04-27 17:38:52","updatedBy":1,
            "updateDate":"2020-04-27 17:38:52","isDeleted":false,"path":"313/","expanded":true,
            "children":[{"optCounter":1,"createdBy":1,"createDate":"2020-04-28 14:23:11","updatedBy":1,
            "updateDate":"2020-04-28 14:23:11","isDeleted":false,"parentId":313,"path":"313/314/","expanded":true,"leaf":true,"id":314,"typeCode":"AAAA","typeName":"AAAAA","productTypeExt":{"id":314,"updatedBy":1}}],"leaf":false,"id":313,"typeCode":"222222","typeName":"22222","productTypeExt":{"id":313,"updatedBy":1}}]
    )

    const apiRef = useRef()

    const edit = useCallback((e) => { seteditable(true) }, [])

    const [manager, setManager] = useState()

    const onReady = useCallback((params, manager) => {
        apiRef.current = params
        setManager(manager)
    }, [])

    const [beginIndex, setBeginIndex] = useState(0)

    const [selectedKeys, setselectedKeys] = useState([]);
    const [selectedRows,setSelectedRows]=useState([])
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
    const createRoot=()=>{
        let rowid = new Date().valueOf();
        manager.create({...sourceDataList,id:rowid,path:rowid+"/"});
    }
    const getDataPath=(data) => {
        const path = data.path.split('/');
        path.pop()
        return [...path]
      }
      console.log("selectedRows",selectedRows)
    const createBrother=()=>{
        const createRecord=[];
        selectedRows.map(item=>{
            let rowid = new Date().valueOf();
          let path=getDataPath(item);
            path.pop()
            path=path?path:[];
            createRecord.push({...sourceDataList,id:rowid,path:path.join("/")?path.join("/")+"/"+rowid+"/":rowid+"/"})
        })
        manager.create(createRecord,selectedKeys);
    }
    const createSub=()=>{
        const createRecord=[];
        selectedRows.map(item=>{
            let rowid = new Date().valueOf();
          let path=getDataPath(item);
            createRecord.push({...sourceDataList,id:rowid,path:path.join("/")?path.join("/")+"/"+rowid+"/":rowid+"/"})
        })
        console.log("createSub",createRecord,selectedKeys)
        manager.create(createRecord,selectedKeys,true);
    }
    const menu = (<Menu>
        <Menu.Item>
            <a onClick={createRoot}>创建跟节点</a>
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
                        <Button size="small"  disabled={!(manager && selectedKeys.length)}  onClick={()=>manager.tagRemove(selectedKeys)}>删除标记</Button>
                        <Button size="small"  onClick={() => manager.undo()}>撤销</Button>
                        <Button size="small" onClick={() => manager.redo()}>重做</Button>
                        <Button size="small" onClick={() => {
                            console.log(manager.diff)
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
                rowkey={(data)=>data.id}
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
                getDataPath={getDataPath}
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
        render: (val,record,index,params) => {
            const {context:{size}}=params;
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
