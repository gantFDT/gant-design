import Grid, { GridApi, GridManager, GridReadyEvent } from '@grid';
import Header from '@header';
import { Button, Radio } from 'antd';
import { Random } from 'mockjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const RandomCreate = () => {
  const ip = Random.ip();
  return {
    ip: ip,
    name: Random.first(),
    date: Random.date('yyyy-MM-dd'),
    cn: Random.cname(),
    address: Random.cname(),
  };
};

let mockData = Array(100)
  .fill('')
  .map(() => RandomCreate());
mockData = [...mockData];

const basicColumns = [
  {
    fieldName: 'name',
    title: '英文姓名',
    width: 100,
  },
  {
    fieldName: 'text',
    title: '分组',
    children: [
      {
        fieldName: 'cn',
        title: '中文名称',
        width: 100,
      },
      {
        fieldName: 'date',
        title: '出生日期',
        width: 100,
      },
    ],
  },
];

const BaiscGrid = () => {
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ beginIndex: 0, pageSize: 20 });
  const [columns, setColumns] = useState(basicColumns);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelectionType, setRowSelectionType] = useState<'single' | 'multiple'>('multiple');

  const apiRef = useRef<GridApi>();
  const gridManagerRef = useRef<GridManager>();
  const onReady = useCallback((params: GridReadyEvent, manager: GridManager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  const queryData = useCallback((beginIndex: number, pageSize) => {
    setLoading(true);
    setTimeout(() => {
      const data = mockData.slice(beginIndex, beginIndex + pageSize);
      setDataSource(data);
      setLoading(false);
    }, 300);
  }, []);

  const onPageChange = useCallback((beginIndex, pageSize) => {
    queryData(beginIndex, pageSize);
    setPageInfo({ beginIndex, pageSize });
  }, []);

  const onSelect = useCallback((keys, rows) => {
    setSelectedRows(rows);
  }, []);

  const onRadioChange = e => {
    const value = e.target.value;
    setRowSelectionType(value);
    setSelectedRows([]);
  };

  const onRadioChange2 = e => {
    const value = e.target.value;
    if (value === 'default') return setColumns(basicColumns);
    setColumns([
      ...basicColumns,
      {
        fieldName: 'ip',
        title: 'ip',
        width: 100,
      },
      {
        fieldName: 'address',
        title: '地址',
        width: 100,
      },
    ]);
  };

  useEffect(() => {
    queryData(0, 20);
  }, []);

  return (
    <>
      <Header
        extra={
          <>
            <Radio.Group
              defaultValue="single"
              buttonStyle="solid"
              onChange={onRadioChange}
              size="small"
            >
              <Radio.Button value="multiple">多选</Radio.Button>
              <Radio.Button value="single">单选</Radio.Button>
            </Radio.Group>
            <Radio.Group
              defaultValue="default"
              buttonStyle="solid"
              onChange={onRadioChange2}
              size="small"
            >
              <Radio.Button value="default">默认列</Radio.Button>
              <Radio.Button value="dynamic">动态列</Radio.Button>
            </Radio.Group>
          </>
        }
        title="基础展示"
        type="line"
      />
      <Grid
        rowkey="ip"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        serialNumber
        rowSelection={{
          selectedRows,
          onSelect: onSelect,
          type: rowSelectionType,
        }}
        pagination={{
          beginIndex: pageInfo.beginIndex,
          pageSize: pageInfo.pageSize,
          total: mockData.length,
          onChange: onPageChange,
        }}
        suppressRightClickSelected
        rowBuffer={20}
        onReady={onReady}
        size="default"
      />
    </>
  );
};

export default BaiscGrid;
