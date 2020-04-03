
import CodeDecorator from '../_util/CodeDecorator'
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Gird, { Columns, Filter, OnReady, GridApi, Fixed, Api } from '@grid';
import { GridReadyEvent } from 'ag-grid-community'
import { Button } from "antd"
import { Input } from "@data-cell"

/*! Split !*/
const BasicUse = () => {

    const [editable, seteditable] = useState(false)

    const [columns, setcolumns] = useState<Columns<{ name: string, age: number }>[]>([
        {
            title: '姓名',
            fieldName: "name",
            checkboxSelection: true,
            width: 150,
            editConfig: {
                component: Input,
                // changeFormatter: (e: any) => e.target.value,
                editable(data) {
                    return !data.age || data.age < 100
                }
            },
        },
        {
            title: '年龄',
            fieldName: "age",
            sortable: true,
            filter: Filter.Number,
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
                age: 123,
            },
            {
                name: "阿萨的脚后跟",
                age: 1,
            },
            {
                name: "阿斯u",
                age: 544
            },
            {
                name: "埃斯珀蒂就",
                age: 12
            },
            {
                name: "撒旦",
                age: 45
            },
        ]
    )

    const apiRef = useRef<GridReadyEvent>()

    const edit = useCallback((e) => { seteditable(true) }, [])
    const onReady = useCallback<OnReady>((api) => {
        apiRef.current = api
    }, [])

    const header = useMemo(() => ({
        extra: !editable ? (
            <>
                <Button onClick={edit}>进入编辑</Button>

            </>
        ) : undefined
    }), [editable])

    const deleteRow = useCallback((rows) => {
        return rows.filter((row) => {
            return row.age > 10
        })
    }, [])

    const editActions = useCallback((api: Api) => {
        return (
            <>
                <Button onClick={() => api.add()}>添加</Button>
                <Button onClick={() => api.deleteRow(deleteRow)}>删除</Button>
                {/* <Button onClick={api.undo}>撤销</Button>
                <Button onClick={api.redo}>重做</Button> */}
                <Button onClick={api.map}>getModel</Button>
                <Button onClick={api.cancel}>取消编辑</Button>
                <Button onClick={api.save}>保存</Button>
            </>
        )
    }, [deleteRow])
    return (
        <Gird
            // headerProps={header}
            rowkey="age"
            // editActions={editActions}
            columns={columns} editable={editable} onEditableChange={seteditable} dataSource={dataSource} onReady={onReady} rowSelection
        />
    )
}
/*! End !*/

/*! Split !*/
const TreeGrid = () => {

    const [editable, seteditable] = useState(false)

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
    const onReady = useCallback<OnReady>((api) => {
        apiRef.current = api
    }, [])

    const header = useMemo(() => ({
        extra: !editable ? (
            <>
                <Button onClick={edit}>进入编辑</Button>

            </>
        ) : undefined
    }), [editable])

    const editActions = useCallback((api: Api) => {
        return (
            <>
                <Button onClick={api.delete}>删除</Button>
                <Button onClick={api.undo}>撤销</Button>
                <Button onClick={api.redo}>重做</Button>
                <Button onClick={api.getModel}>getModel</Button>
                <Button onClick={api.cancel}>取消编辑</Button>
                <Button onClick={api.save}>保存</Button>
            </>
        )
    }, [])

    const [current, setcurrent] = useState(1)

    const onPageChange = useCallback(
        (page) => {
            setcurrent(page)
        },
        [],
    )
    return (
        <Gird
            // headerProps={header}
            rowkey="id"
            // editActions={editActions}
            columns={columns}
            treeData
            editable={editable}
            onEditableChange={seteditable}
            dataSource={dataSource} onReady={onReady}
            pagination={{
                pageSize: 20,
                current,
                total: 5,
                onChange: onPageChange,
                onShowSizeChange: onPageChange
            }}
        />
    )
}
/*! End !*/
const config = {
    codes: [],
    useage: '',
    children: [
        // {
        //     title: "基本使用",
        //     describe: "基本使用",
        //     cmp: BasicUse
        // },
        {
            title: "tree",
            describe: "树形结构",
            cmp: TreeGrid
        }
    ]
}

export default () => <CodeDecorator config={config} />
