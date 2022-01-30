import React, { useState, useLayoutEffect } from 'react';
import { Random, mock } from 'mockjs';
import { Grid } from '@gantd';

const columns = [
  {
    fieldName: 'basic',
    title: '基本信息',
    children: [
      {
        fieldName: 'name',
        title: '姓名',
        filter: 'agTextColumnFilter',
      },
      {
        fieldName: 'email',
        title: '邮箱号',
        filter: 'agTextColumnFilter',
      },
    ],
  },
  {
    fieldName: 'other',
    title: '额外信息',
    children: [
      {
        fieldName: 'age',
        title: '年龄',
        filter: 'agNumberColumnFilter',
      },
      {
        fieldName: 'date',
        title: '出生日期',
        filter: 'agDateColumnFilter',
      },
      {
        fieldName: 'sex',
        title: '性别',
      },
    ],
  },
];

const data = Array.from({ length: 1000 }).map((content, index) =>
  mock({
    name: Random.cname(),
    email: Random.email(),
    'age|1-100': 100,
    date: Random.date('yyyy-MM-dd'),
    sex: Random.boolean() ? '男' : '女',
    id: Random.guid(),
  }),
);

export default () => {
  const [dataSource, setdataSource] = useState([]);

  useLayoutEffect(() => {
    setdataSource(data);
  }, []);

  return <Grid height={300} columns={columns} rowkey="id" dataSource={dataSource} />;
};
