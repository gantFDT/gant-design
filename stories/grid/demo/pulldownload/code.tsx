export default ` 
import Grid, { Fixed, GridApi, GridManager, GridReadyEvent } from 'gantd/lib/grid';
import {Header} from 'gantd';
import { Button, Checkbox, Tooltip } from 'antd';
import { Random } from 'mockjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollLoadSearch } from './search';

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

let mockData = Array(540)
  .fill('')
  .map(() => RandomCreate());
mockData = [...mockData];

const basicColumns = [
  {
    fieldName: 'name',
    title: '英文姓名',
    width: 100,
    filter: 'agNumberColumnFilter',
    fixed: Fixed.left,
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

const PullDownLoad = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const apiRef = useRef<GridApi>();
  const gridManagerRef = useRef<GridManager>();
  const onReady = useCallback((params: GridReadyEvent, manager: GridManager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);
  const [isThrowError, setIsThrowError] = useState(false);

  // 点击查询
  const { dataSource, onSearch, loading, scrollLoad, params, hasSearch } = useScrollLoadSearch(
    async (params, pageInfo) => {
      const { beginIndex, pageSize } = pageInfo;
      const data = mockData.slice(beginIndex, beginIndex + pageSize);

      if (isThrowError && beginIndex === 300) {
        throw new Error('模拟请求失败');
      }

      if (params.isEmpty) {
        return {
          content: [],
          totalCount: 0,
        };
      }

      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            content: data,
            totalCount: -1,
          });
        }, 1500);
      });
    },
    {
      namespace: 'abc',
      gridManagerRef: gridManagerRef,
      defaultParams: [],
      getTotalCount: async () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(mockData.length);
          }, 1000);
        });
      },
    },
  );

  const onSelect = useCallback((keys, rows) => {
    setSelectedRows(rows);
  }, []);

  return (
    <>
      <Header
        title="滚动加载"
        type="line"
        extra={
          <>
            <Button onClick={() => onSearch({})}>首次查询</Button>
            <Button onClick={() => onSearch({ isEmpty: true })}>无数据</Button>
            <Tooltip title="首次查询，滚动加载至第三页时，请求会报错">
              <Checkbox value={isThrowError} onChange={e => setIsThrowError(e.target.checked)}>
                模拟错误
              </Checkbox>
            </Tooltip>
          </>
        }
      />
      <Grid
        rowkey="ip"
        loading={loading}
        columns={basicColumns}
        dataSource={dataSource}
        serialNumber
        rowSelection={{
          selectedRows,
          onSelect: onSelect,
          type: 'multiple',
        }}
        gantThemeClass="gant-grid-theme"
        suppressRightClickSelected
        rowDragManaged
        animateRows
        rowBuffer={20}
        onReady={onReady}
        size="default"
        scrollLoad={scrollLoad}
      />
    </>
  );
};

export default PullDownLoad;
 
 `