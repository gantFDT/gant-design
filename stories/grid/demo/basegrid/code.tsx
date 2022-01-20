export default `
import Grid, { GridManager, GridReadyEvent, GridApi } from '@grid';
import Header from '@header';
import { Button, Input, Modal } from 'antd';
import { Random } from 'mockjs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const RandomCreate = () => {
  const ip = Random.ip();
  return {
    ip: ip,
    name: Random.first(),
    date: Random.date('yyyy-MM-dd'),
    cn: Random.cname(),
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
    fieldName: 'cn',
    title: '中文名称',
    width: 100,
  },
  {
    fieldName: 'date',
    title: '出生日期',
    width: 100,
  },
];

const BaiscGrid = () => {
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ beginIndex: 0, pageSize: 20 });
  const [dataSource, setDataSource] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelectionType, setRowSelectionType] = useState<'single' | 'multiple'>('multiple');
  const [boxColumnIndex, setBoxColumnIndex] = useState<undefined | string[]>();
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

  useEffect(() => {
    queryData(0, 20);
  }, []);

  return (
    <>
      <Header
        extra={
          <>
            {rowSelectionType === 'single' ? (
              <Button
                size="small"
                onClick={() => {
                  setRowSelectionType('multiple');
                  setSelectedRows([]);
                }}
              >
                多选
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => {
                  setRowSelectionType('single');
                  setSelectedRows([]);
                }}
              >
                单选
              </Button>
            )}
            {rowSelectionType === 'multiple' && (
              <>
                <Button size="small" onClick={() => setBoxColumnIndex(['name', 'cn', 'date'])}>
                  自定义boxColumn列
                </Button>
                <Button size="small" onClick={() => setBoxColumnIndex(undefined)}>
                  默认boxColumn列
                </Button>
              </>
            )}
          </>
        }
        title="基础展示Grid"
        type="line"
      />
      <Grid
        rowkey="ip"
        loading={loading}
        columns={basicColumns}
        dataSource={dataSource}
        serialNumber
        boxColumnIndex={boxColumnIndex}
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
        rowBuffer={20}
        onReady={onReady}
      />
    </>
  );
};

export default BaiscGrid;

`