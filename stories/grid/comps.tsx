
import CodeDecorator from '../_util/CodeDecorator'
/*! Start !*/
<<<<<<< HEAD
import Gird from '@grid'
import React from 'react'


/*! Split !*/
const BasicUse = () => {
    return (
        <Gird />
=======
import React, { useMemo, useEffect, useCallback, useState, useRef } from 'react'
import Gird, { Columns, Filter, OnReady, GridApi } from '@grid'
import { Button } from "antd"

/*! Split !*/
const BasicUse = () => {

    const [columns, setcolumns] = useState<Columns[]>([
        {
            title: '姓名',
            dataIndex: "name",
            checkboxSelection: true,
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

    const apiRef = useRef<GridApi>()

    const get = useCallback((e) => {
        const nodes = apiRef.current.getSelectedNodes()
        console.log(nodes)
    }, [])
    const onReady = useCallback<OnReady>((api) => {
        apiRef.current = api
    }, [])

    const header = useMemo(() => ({
        extra: (
            <>
                <Button onClick={get}>获取</Button>
            </>
        )
    }), [])
    return (
        <Gird headerProps={header} columns={columns} dataSource={dataSource} onReady={onReady} rowSelection />
>>>>>>> 697de109e1ff10147ecb3ddd6c88e390d588b785
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