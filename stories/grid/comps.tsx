
import CodeDecorator from '../_util/CodeDecorator'
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Gird, { Columns, Filter, OnReady, GridApi, Fixed, Api, OnEdit } from '@grid';
import { GridReadyEvent } from 'ag-grid-community'
import { Button } from "antd"
import { Input } from "@data-cell"
import Header from '@header'

/*! Split !*/
const TreeGrid = () => {

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
            checkboxSelection: true,
            render: (text, rowIndex) => {
                return text + "----"
            },
            editConfig: {
                component: Input,
                // changeFormatter: (e: any) => e.target.value,
                editable(data) {
                    return data.age < 100
                }
            },
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

    const editApi = useRef<Api>()

    const onReady = useCallback<OnReady>((api) => {
        apiRef.current = api
    }, [])

    const [beginIndex, setBeginIndex] = useState(0)

    const onPageChange = useCallback(
        (beginIndex) => {
            setBeginIndex(beginIndex)
        },
        [],
    )

    const onEdit = useCallback<OnEdit>((api) => editApi.current = api, [])

    const deleteCb = useCallback((selected) => {
        return selected.filter(({ data }) => data.age > 120)
    }, [])
    return (
        <>
            <Header extra={!editable ? (
                <Button onClick={edit}>进入编辑</Button>
            ) : (
                    <>
                        <Button onClick={() => editApi.current.deleteRow(deleteCb)}>删除</Button>
                        <Button onClick={editApi.current.undo}>撤销</Button>
                        <Button onClick={editApi.current.redo}>重做</Button>
                        <Button onClick={editApi.current.getModel}>getModel</Button>
                        <Button onClick={editApi.current.cancel}>取消编辑</Button>
                        <Button onClick={editApi.current.save}>保存</Button>
                    </>
                )
            } />
            <Gird
                // headerProps={header}
                rowkey="id"
                // editActions={editActions}
                loading={loading}
                columns={columns}
                treeData
                editable={editable}
                onEditableChange={seteditable}
                dataSource={dataSource} onReady={onReady}
                rowSelection
                onEdit={onEdit}
                pagination={{
                    pageSize: 2,
                    beginIndex,
                    total: 5,
                    onChange: onPageChange
                }}
            />
        </>
    )
}
/*! End !*/
const config = {
    codes: [],
    useage: '',
    children: [
        {
            title: "tree",
            describe: "树形结构",
            cmp: TreeGrid
        }
    ]
}

export default () => <CodeDecorator config={config} />
