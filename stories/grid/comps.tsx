
import CodeDecorator from '../_util/CodeDecorator'
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState } from 'react'
import Gird, { Columns, Filter } from '@grid'
import { Button } from "antd"

/*! Split !*/
const BasicUse = () => {

    const [columns, setcolumns] = useState<Columns[]>([
        {
            title: '姓名',
            dataIndex: "name",
            checkboxSelection: true,
            width: 200,
        },
        {
            title: '年龄',
            dataIndex: "age",
            sortable: true,
            filter: Filter.Number,
            width: 100
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

    const get = useCallback((e) => {

    }, [])

    const header = useMemo(() => ({
        extra: (
            <>
                <Button onClick={get}>获取</Button>
            </>
        )
    }), [])
    return (
        <Gird headerProps={header} columns={columns} dataSource={dataSource} editable />
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