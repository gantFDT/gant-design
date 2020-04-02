
import CodeDecorator from '../_util/CodeDecorator'
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Gird, { Columns, Filter, OnReady, GridApi, Fixed, Api } from '@grid'
import { Button } from "antd"
import { Input } from "@data-cell"

/*! Split !*/
const BasicUse = () => {

    const [editable, seteditable] = useState(false)

    const [columns, setcolumns] = useState<Columns<{ name: string, age: number }>[]>([
        {
            title: '姓名',
            dataIndex: "name",
            checkboxSelection: true,
            render: (text, rowIndex) => {
                return text + "----"
            },
            editConfig: {
                component: Input,
                changeFormatter: (e: any) => e.target.value,
                editable(data) {
                    return data.age < 100
                }
            },
        },
        {
            title: '年龄',
            dataIndex: "age",
            sortable: true,
            filter: Filter.Number,
            fixed: Fixed.left
        },
        {
            title: '余额',
            dataIndex: "p",
            width: 100,
            hide: true
        },
    ])


    const [dataSource, setdataSource] = useState(
        [
            {
                name: "里斯",
                age: 123
            },
            {
                name: "阿斯u",
                age: 544
            },
            {
                name: "埃斯珀蒂就",
                age: 1
            },
            {
                name: "撒旦",
                age: 45
            },
        ]
    )

    const apiRef = useRef<Api>()

    const edit = useCallback((e) => { seteditable(true) }, [])
    const onReady = useCallback<OnReady>((api) => {
        apiRef.current = api
    }, [])

    const header = useMemo(() => ({
        extra: !editable ? (
            <>
                <Button onClick={edit}>进入编辑</Button>
                <div onClick={() => {
                    apiRef.current.undoCellEditing()
                }} >ssss</div>
            </>
        ) : undefined
    }), [editable])

    const editActions = useCallback((api: Api) => {
        return (
            <>
                <Button onClick={api.undo}>undo</Button>
                {/* <Button onClick={edit}>redo</Button> */}
            </>
        )
    }, [])
    return (
        <Gird headerProps={header}
            rowkey="age"
            columns={columns} editable={editable} dataSource={dataSource} onReady={onReady} rowSelection />
    )
}
/*! End !*/
const config = {
    codes: [],
    useage: '',
    children: [
        {
            title: "基本使用",
            describe: "基本使用",
            cmp: BasicUse
        }
    ]
}

export default () => <CodeDecorator config={config} />
