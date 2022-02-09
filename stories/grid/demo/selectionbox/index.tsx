import React, { useState, useLayoutEffect, useCallback } from 'react';
import { Random, mock } from 'mockjs';
import { Grid, Header } from '@gantd';
import { Radio } from 'antd';

const columns = [
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
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [boxColumnIndex, setBoxColumnIndex] = useState<undefined | string[]>();

  const onSelect = useCallback((keys, rows) => {
    setSelectedKeys(keys);
    setSelectedRows(rows);
  }, []);

  const onRadioChange = e => {
    const value = e.target.value;
    if (value === 'custom') {
      setBoxColumnIndex(['name', 'email', 'age']);
      return;
    }
    setBoxColumnIndex(undefined);
  };

  useLayoutEffect(() => {
    setdataSource(data);
  }, []);

  return (
    <>
      <Header
        extra={
          <>
            <Radio.Group defaultValue="default" buttonStyle="solid" onChange={onRadioChange} size="small">
              <Radio.Button value="custom">自定义boxColumn列</Radio.Button>
              <Radio.Button value="default">默认boxColumn列</Radio.Button>
            </Radio.Group>
          </>
        }
        title="基础展示Grid"
        type="line"
      />
      <Grid
        height={300}
        columns={columns}
        rowkey="id"
        dataSource={dataSource}
        serialNumber
        boxColumnIndex={boxColumnIndex}
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
        }}
      />
    </>
  );
};
