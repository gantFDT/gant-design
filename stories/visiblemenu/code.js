const code_1 = `import { VisibleMenu } from 'gantd';

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

ReactDOM.render(
    <VisibleMenu
        data={column}
        handleCheckbox={(i, checked, hiddens) => { 
            console.log(i, checked, hiddens) 
        }}
    />,
    mountNode,
);
`;
const code_2 = `
import { VisibleMenu } from 'gantd';
                        
const column2 = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '姓名',
        dataIndex: 'age',
    },
    {
        title: '姓名',
        dataIndex: 'address',
    },
]
    ReactDOM.render(
        <VisibleMenu
            data={column2}
            disabled
        />,
        mountNode,
    );
`;
const code_3 = `
import { VisibleMenu } from 'gantd';

const column2 = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '姓名',
        dataIndex: 'age',
    },
    {
        title: '姓名',
        dataIndex: 'address',
    },
]
ReactDOM.render(
    <VisibleMenu
        data={column2}
        title='自定义列'
        labelName='title'
        keyName='dataIndex'
        handleCheckbox={(i, checked, hiddens) => {
            console.log(i, checked, hiddens)
        }}
    />,
    mountNode,
);
`;
const code_4 = `
import React, { useState } from 'react';
import { Table } from 'antd';
import { VisibleMenu } from 'gantd';

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

function HideUse() {
  const [rows, setHiddenRows] = useState([]);

  function filterColumns(columns, hiddens = []) {
      const _columns = [];
      columns.map((item) => {
          const _index = hiddens.indexOf(item.dataIndex);
          _index < 0 && _columns.push(item)
      });
      return _columns
  }

  return <div>
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
  </div>
}

ReactDOM.render(
    <HideUse/>,
    mountNode);
`;

const sortable = `
import React, { useState } from 'react';
import { VisibleMenu } from 'gantd';
const data = [
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
function Stortable(){
    const [column, setColumn] = useState(data)
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

ReactDOM.render(
  <Stortable/>,
  mountNode
);
`;


export default [code_1, code_2, sortable, code_3, code_4];
