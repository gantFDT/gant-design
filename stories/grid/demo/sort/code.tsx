export default ` 
import { Grid, Header, Input } from 'gantd';
import { Button, Icon, Tooltip, Dropdown, Menu } from 'antd';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { isEmpty, find, has, isArray, get } from 'lodash';
import Faker from 'faker';
import { notification } from 'antd';
import moment from 'moment';
import { useGridSort } from './hooks';
import './index.css';

const columns: any = [
  {
    title: '零件名',
    fieldName: 'partName',
    filter: 'agMultiColumnFilter',
    cellRenderer: 'gantGroupCellRenderer', //树形展示
    width: 150,
    rowDrag: true,
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '零件名不能为空',
        },
      ],
    },
  },
  {
    title: 'Path',
    fieldName: 'path',
    filter: 'agTextColumnFilter',
    width: 120,
  },
  {
    title: '零件号',
    fieldName: 'partNum',
    filter: 'agTextColumnFilter',
    width: 120,
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '零件号不能为空',
        },
      ],
    },
  },
  {
    title: '中文名',
    fieldName: 'zh',
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
    },
  },
  {
    title: '英文名',
    fieldName: 'en',
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
    },
  },
];

const _dataSource = [
  {
    id: '1',
    path: ['1'],
    parentId: 'root',
    partName: '发动机',
    partNum: '1',
    zh: '发动机',
    en: 'engine',
  },
  {
    id: '1-1',
    path: ['1', '1-1'],
    parentId: '1',
    partName: '机体',
    partNum: '1.1',
    zh: '机体',
    en: 'body',
  },
  {
    id: '1-2',
    path: ['1', '1-2'],
    parentId: '1',
    partName: '机体22',
    partNum: '1.2',
    zh: '机体',
    en: 'body',
  },
  {
    id: '2',
    path: ['2'],
    parentId: 'root',
    partName: '变速器',
    partNum: '2',
    zh: '变速器',
    en: 'transmission',
  },
];

const TreeGrid = () => {
  const [dataSource, setDataSource] = useState<any>(_dataSource);
  const [selectedKeys, setSelectedKeys] = useState<any>([1, 2]);
  const [selectedRows, setSelectedRows] = useState<any>();

  const [editable, setEditable] = useState(false);
  const gridApiRef = useRef(null);
  const gridManagerRef = useRef(null);

  const rowKey = 'id';
  const sortKey = 'path';
  const dragKey = 'dragKey';

  const { onRowDragMove, onRowDragEnd, ruleClassRules } = useGridSort({
    rowKey,
    sortKey,
    onBeforeMove() {
      setSelectedKeys([]);
      setSelectedRows([]);
    },
    onDragEnd(params) {
      const { fromPath, toPath, node, overNode } = params;
      console.log('toPath', toPath);
      console.log('fromPath', fromPath);
      alert('fromPath: ' + fromPath + '\n' + 'toPath: ' + toPath);
    },
  });

  const onReady = useCallback((params, manager) => {
    gridApiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  //选择
  const onSelect = useCallback((keys, rows) => {
    console.log('--->', keys);
    setSelectedKeys(keys);
    setSelectedRows(rows);
  }, []);

  return (
    <>
      <Header title="树形拖拽维护" type="line" />
      <Grid
        rowkey={rowKey}
        columns={columns}
        dataSource={dataSource}
        onReady={onReady}
        serialNumber
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
        }}
        isCompute
        editable={editable}
        openEditSign
        treeData //开启树形模式
        getDataPath={data => data.path} //树形分组依据
        groupSuppressAutoColumn //关闭默认分组
        groupSelectsChildren
        suppressGroupSelectParent
        animateRows={true}
        onRowDragEnd={onRowDragEnd}
        onRowDragMove={onRowDragMove}
        rowClassRules={{
          ...ruleClassRules,
        }}
      />
    </>
  );
};

export default TreeGrid;
 
 `