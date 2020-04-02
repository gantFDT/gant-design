
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
            dataIndex: "name",
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
            dataIndex: "age",
            sortable: true,
            filter: Filter.Number,
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
                age: 123,
                children: [
                    {
                        name: "阿萨的脚后跟",
                        age: 1
                    }
                ]
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
    return (
        <Gird headerProps={header}
            rowkey="age"
            editActions={editActions}
            columns={columns} editable={editable} onEditableChange={seteditable} dataSource={dataSource} onReady={onReady} rowSelection />
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
