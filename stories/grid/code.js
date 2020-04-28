export default [
`
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, DataManage, RemoveCallBack } from 'grid';
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

ReactDOM.render(<sourceDataList />, mountNode)`,]