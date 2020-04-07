
import CodeDecorator from '../_util/CodeDecorator'
import codes from './code';
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Grid, { Columns, Filter, OnReady, GridApi, Fixed, Api, OnEdit, RemoveCallBack } from '@grid';
import { GridReadyEvent } from 'ag-grid-community'
import { Button, message } from "antd"
import { Input, InputCellPhone } from "@data-cell"
import Header from '@header'
/*! Split !*/
const TreeGrid = () => {
    function getSimpleCellRenderer(): any {
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

    const [columns, setcolumns] = useState<Columns<{ name: string, age: number }>[]>([
        {
            title: '姓名',
            fieldName: "name",
            // checkboxSelection: true,
            // render: (text, rowIndex) => {
            //     return text + "----"
            // },
            editConfig: {
                component: InputCellPhone,
                // changeFormatter: (e: any) => e.target.value,
                editable: true
            },
            enableRowGroup: true,
            cellRenderer: "agGroupCellRenderer"
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
                id: "1",
                age: 123,
                children: [
                    {
                        name: "阿萨的脚后跟",
                        age: 1,
                        id: "11",
                    }
                ]
            },
            {
                name: "阿斯u",
                age: 544,
                id: "2",
            },
            {
                name: "埃斯珀蒂就",
                age: 1,
                id: "3",
            },
            {
                name: "撒旦",
                age: 45,
                id: "4",
            },
        ]
    )

    const apiRef = useRef<GridReadyEvent>()

    const edit = useCallback((e) => { seteditable(true) }, [])

    const [editApi, setEditApi] = useState<Api>()

    const onReady = useCallback<OnReady>((api) => {
        apiRef.current = api
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
    const deleteCb = useCallback<RemoveCallBack>((selected) => new Promise(res => {
        message.info("0.5s后删除")
        setTimeout(() => {
            res(true)
        }, 500)
    }), [])
    return (
        <>
            <Header extra={!editable ? (
                <Button onClick={edit}>进入编辑</Button>
            ) : (
                    <>
                        <Button onClick={() => editApi.add(0, { id: Math.random().toString(16), name: Math.random().toString(16) })}>新增</Button>
                        <Button disabled={!(editApi && editApi.deletable)} onClick={() => editApi.remove(false, deleteCb).then(e => message.success("删除成功"), e => { message.error("删除出错"); throw e })}>删除</Button>
                        <Button disabled={!(editApi && editApi.canUndo)} onClick={() => editApi.undo()}>撤销</Button>
                        <Button disabled={!(editApi && editApi.canRedo)} onClick={() => editApi.redo()}>重做</Button>
                        <Button onClick={() => editApi.cancel()}>取消编辑</Button>
                        <Button onClick={() => editApi.save()}>保存</Button>
                    </>
                )
            } />
            <Grid
                components={{
                    "simpleCellRenderer": getSimpleCellRenderer()
                }}
                rowkey="id"
                loading={loading}
                columns={columns}
                treeData
                editable={editable}
                onEditableChange={seteditable}
                dataSource={dataSource} onReady={onReady}
                rowSelection={{
                    selectedKeys,
                    onSelect
                }}
                onEdit={setEditApi}
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
    const columns = [{
        fieldName: 'employeeId',
        enableRowGroup: true,
        cellRenderer: "agGroupCellRenderer",
        editConfig: {
            component: InputCellPhone,
            // changeFormatter: (e: any) => e.target.value,
            editable: true
        },
    },
    {
        fieldName: 'employeeName',
        // render: () => 111
    },
    { fieldName: 'startDate' },
    { fieldName: 'employmentType' },
    ]
    useEffect(() => {
        ajax(setDataSource)
    }, [])
    return <Grid
        rowkey="employeeId"
        columns={columns}
        dataSource={dataSource}
        treeData
        // isServer
        // isServerSideGroup={(data) => {
        //     return Array.isArray(data.children)
        // }}
        treeDataChildrenName="underlings"
        rowSelection
        editable
        onRowGroupOpened={(data) => { console.log(data) }}
        groupSuppressAutoColumn
    />
}

const config = {
    codes,
    useage: '',
    children: [
        {
            title: "tree",
            describe: "树形结构",
            cmp: TreeGrid
        },
        // {
        //     title: "async tree",
        //     describe: "异步树形",
        //     cmp: AsyncTreeData
        // }
    ]
}

export default () => <CodeDecorator config={config} />
