import React, { useCallback } from 'react';
import { Grid } from '@gantd';
import { Tabs } from 'antd';

const columns = [
  {
    title: 'Name',
    fieldName: 'name',
    width: 200,
    // NOTE 可以添加下面两个配置让他基于该列可展开/收缩子节点
    enableRowGroup: true,
    cellRenderer: 'gantGroupCellRenderer',
  },
  {
    title: 'Age',
    fieldName: 'age',
    filter: 'agTextColumnFilter',
    width: 100,
  },
  {
    title: 'Address',
    fieldName: 'address',
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
    width: 200,
  },
];

// 适用于普通模式的数据格式
const dataSource = [
  {
    id: 1,
    name: 'John Brown sr.',
    age: '60',
    address: 'New York No. 1 Lake Park',
    path: [1],
  },
  {
    id: 11,
    name: 'John Brown',
    age: '42',
    address: 'New York No. 2 Lake Park',
    path: [1, 11],
  },
  {
    id: 12,
    name: 'John Brown jr.',
    age: '30',
    address: 'New York No. 3 Lake Park',
    path: [1, 12],
  },
  {
    id: 121,
    name: 'Jimmy Brown',
    age: '16',
    address: 'New York No. 3 Lake Park',
    path: [1, 12, 121],
  },
  {
    id: 13,
    name: 'Jim Green sr.',
    age: '72',
    address: 'London No. 1 Lake Park',
    path: [1, 13],
  },
  {
    id: 131,
    name: 'Jim Green',
    age: '42',
    address: 'London No. 2 Lake Park',
    path: [1, 13, 131],
  },
  {
    id: 1311,
    name: 'Jim Green jr.',
    age: '25',
    address: 'London No. 3 Lake Park',
    path: [1, 13, 131, 1311],
  },
  {
    id: 1312,
    name: 'Jimmy Green sr.',
    age: '18',
    address: 'London No. 4 Lake Park',
    path: [1, 13, 131, 1312],
  },
  {
    id: 2,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park',
    path: [2],
  },
];

export default ({data}) => {
  console.log('data',data)
  return (
    <div style={{ padding: 10 }}>
      <Grid
        rowkey="id"
        serialNumber
        columns={columns}
        height={180}
        
        dataSource={dataSource}
        // 以下是树形展示的特殊配置
        treeData // 启用树形展示
        getDataPath={(record) => record.path} // 根据平铺数据中的指定字段形成树形关系
        // 可选配置
        groupSuppressAutoColumn // 正常情况下会有一个分组列，可以根据需求将分组加到 grid 配置的某一个列上，开启改配置可隐藏多余的分组列
        groupDefaultExpanded={3} // 指定展开层级
        defaultColDef={{
          flex: 1
        }}
      />
    </div>
  );
};
