export default `
import Grid from '@grid';
import Header from '@header';
import { Button, Icon } from 'antd';
import React, { Fragment, useCallback, useRef, useState } from 'react';

const treeDataSource = [
  {
    id: 1,
    filePath: ['Documents'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
  },
  {
    id: 2,
    filePath: ['Documents', 'txt'],
    dateModified: 'Aug 12 2016 10:50:00 PM',
  },
  {
    id: 3,
    filePath: ['Documents', 'txt', 'notes.txt'],
    dateModified: 'May 21 2017 01:50:00 PM',
    size: 14.7,
  },
];
const treeColumns = [
  {
    fieldName: 'id',
  },
  {
    title: 'dateModified',
    fieldName: 'dateModified',
    minWidth: 250,
    cellRenderer: 'gantGroupCellRenderer',
    cellRendererParams: {
      customIcon: <Icon type="down" />,
    },
    comparator: function(d1, d2) {
      return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
    },
  },
  {
    title: 'size',
    fieldName: 'size',
    aggFunc: 'sum',
    valueFormatter: function(params) {
      return params.value ? Math.round(params.value * 10) / 10 + ' MB' : '0 MB';
    },
  },
];
const TreeGrid = () => {
  const [selectedKeys, setSelectedKeys] = useState<any>([1, 2]);

  const [selectedRows, setSelectedRows] = useState<any>([
    {
      id: 1,
      filePath: ['Documents'],
      dateModified: 'Aug 12 2016 10:50:00 PM',
    },
    {
      id: 2,
      filePath: ['Documents', 'txt'],
      dateModified: 'Aug 12 2016 10:50:00 PM',
    },
  ]);
  const [editable, setEditable] = useState(false);
  const apiRef = useRef(null);
  const gridManagerRef = useRef(null);
  const onReady = useCallback((params, manager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);
  const onSelect = useCallback((keys, rows) => {
    setSelectedKeys(keys);
    setSelectedRows(rows);
  }, []);
  const onTagRemove = useCallback(() => {
    gridManagerRef.current.tagRemove(selectedKeys);
  }, [selectedKeys]);
  const onCancelEdit = useCallback(() => {
    setEditable(false);
    gridManagerRef.current.cancel();
  }, []);

  // const serverGroupExpend = useCallback(async (gridParams, cb) => {
  //   const { node } = gridParams;
  //   const { data } = node;
  //   const itemData = {
  //     filePath: [...data.filePath, Random.county()],
  //     id: Random.id(),
  //     dateModified: Random.datetime(),
  //     size: Random.integer(),
  //   };
  //   cb([itemData], 1);
  // }, []);

  return (
    <Fragment>
      <Header
        extra={
          <Fragment>
            <Button
              size="small"
              icon="poweroff"
              onClick={() => console.log(apiRef.current.getBestCostNodeSelection())}
            />
            {!editable ? (
              <Button size="small" icon="edit" onClick={() => setEditable(true)} />
            ) : (
              <Fragment>
                <Button size="small" icon="poweroff" onClick={onCancelEdit} />
                <Button size="small" icon="minus" onClick={onTagRemove} />
                <Button size="small" icon="undo" onClick={() => gridManagerRef.current.undo()} />
                <Button size="small" icon="redo" onClick={() => gridManagerRef.current.redo()} />
              </Fragment>
            )}
          </Fragment>
        }
        title="基本Grid"
        type="line"
      />
      <Grid
        rowkey="id"
        columns={treeColumns}
        dataSource={treeDataSource}
        serialNumber
        treeData
        boxColumnIndex={0}
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
        }}
        rowBuffer={1}
        groupSuppressAutoColumn
        // editChangeCallback={onEditChangeCallback}
        onReady={onReady}
        openEditSign
        getDataPath={data => data.filePath}
        isServerSideGroup={data => true}
        // serverGroupExpend={serverGroupExpend}
        groupSelectsChildren
      />
    </Fragment>
  );
};

export default TreeGrid;


`;
