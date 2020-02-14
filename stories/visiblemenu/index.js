import React, { useState } from 'react';
import { Table } from 'antd';
import VisibleMenu from '@gantd/visiblemenu';
import CodeDecorator from '../_util/CodeDecorator';
import code from './code.js';
const column = [
    {
        value: 'Name',
        key: 'name',
    },
    {
        value: 'Age',
        key: 'age',
    },
    {
        value: 'Address',
        key: 'address',
    },
];
const column2 = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

const dataSource = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];
function BasicUse() {
    return <VisibleMenu
        data={column}
        handleCheckbox={(i, checked, hiddens) => {
            console.log(i, checked, hiddens)
        }}
    />
}

function DisabledUse() {
    return <VisibleMenu
        data={column2}
        disabled
    />
}

function Sortable() {
    const [column, setColumn] = useState(column2)
    const [hiddenCol, setHiddenCol] = useState([])

    return <VisibleMenu
        data={column}
        labelName='title'
        keyName='dataIndex'
        hiddenRows={hiddenCol}
        handleCheckbox={
            (cols, checked, hiddens) => {
                setHiddenCol(hiddens)
            }
        }
        onSorted={
            (from, to) => {
                setColumn(([...cols]) => {
                    cols.splice(to < 0 ? cols.length + to : to, 0, cols.splice(from, 1)[0]);
                    console.log(cols)
                    return cols
                })
            }
        }
    />
}

function CustomUse() {
    return <VisibleMenu
        data={column2}
        title='自定义列'
        labelName='title'
        keyName='dataIndex'
        handleCheckbox={(i, checked, hiddens) => {
            console.log(i, checked, hiddens)
        }}
    />
}

function CombineUse() {
    const [rows, setHiddenRows] = useState([]);

    function filterColumns(columns, hiddens = []) {
        const _columns = [];
        columns.map((item) => {
            const _index = hiddens.indexOf(item.dataIndex);
            _index < 0 && _columns.push(item)
        });
        return _columns
    }
    return (
        <>
            <div style={{ textAlign: 'right', padding: 10 }}>
                <VisibleMenu
                    data={column2}
                    labelName='title'
                    keyName='dataIndex'
                    hiddenRows={rows}
                    handleCheckbox={(i, checked, hiddens) => {
                        console.log(i, checked, hiddens)
                        setHiddenRows(hiddens)
                    }}
                />
            </div>
            <Table columns={filterColumns(column2, rows)} dataSource={dataSource} />
        </>
    )
}
const config = {
    codes: code,
    inline: true,
    useage: '当需要对外部列表或其他图标进行显示上的过滤时，用此组件可以收纳操作元素，点击下拉菜单的内容进行对应显隐的控制。',
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法',
            cmp: BasicUse
        },
        {
            title: '不可用状态',
            describe: '添加 disabled 属性即可让组件处于不可用状态，同时按钮样式也会改变',
            cmp: DisabledUse
        },
        {
            title: '排序',
            describe: '通过onSorted实现排序',
            cmp: Sortable
        },
        {
            title: '自定义',
            describe: '自定义标题，自定义keyName和labelName',
            cmp: CustomUse
        },
        {
            title: '显示隐藏',
            describe: '控制外部列的显隐',
            cmp: CombineUse
        },
    ]
};
export default () => <CodeDecorator config={config} />

