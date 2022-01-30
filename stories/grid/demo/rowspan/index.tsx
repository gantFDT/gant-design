import React from 'react';
import { Tag } from 'antd';
import { Grid } from '@gantd';

export default () => {
  const columns = [
    {
      title: 'Name',
      fieldName: 'name',
      render: text => <a>{text}</a>,
      rowSpan: (params: any) => {
        const { node, data } = params;
        if (data.name.indexOf('A') >= 0) return 2;
        return 1;
      },
      cellClassRules: {
        'gant-cell-span': params => params.value.indexOf('A') >= 0,
      },
    },
    {
      title: 'Age',
      fieldName: 'age',
    },
    {
      title: 'Address',
      fieldName: 'address',
    },
    {
      title: 'Tags',
      fieldName: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      fieldName: 'action',
      render: (text, record) => (
        <>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </>
      ),
    },
  ];

  const dataSource = [
    {
      id: 'uuid-1',
      name: 'Aohn Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      id: 'uuid-2',
      name: 'Bim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      id: 'uuid-3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <Grid
        rowkey="id"
        height={300}
        columns={columns}
        dataSource={dataSource}
        suppressRowTransform={true}
      />
    </>
  );
};
