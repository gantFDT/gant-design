import CodeDecorator from '../_util/CodeDecorator';
import codes from './code';
/*! Start !*/
import React, { useMemo, useEffect, useCallback, useState, useRef, Fragment } from 'react';
import { mock, Random } from 'mockjs';
import Grid from '@grid';
import { Button, message, Dropdown, Menu, Switch, Checkbox, Modal } from 'antd';
import { Input, InputCellPhone, DatePicker, InputNumber, EditStatus, Selector } from '@data-cell';
import Header from '@header';
const RandomCreate = () => ({
  ip: Random.ip(),
  name: Random.name(),
  age: Random.natural(10, 50),
  county: Random.county(true),
  leaf: [true, false][Random.natural(0, 1)],
  path: [Random.ip()],
  recored: {
    address: Random.county(true),
  },
});
/*! Split !*/
const basicColumns = [
  {
    fieldName: 'name',
    title: '姓名',
    cellRenderer: 'gantGroupCellRenderer',
    toolTipRender: params => {
      const { data } = params;
      return data.age > 30 ? <div>{data.name}</div> : null;
    },
    editConfig: {
      component: props => {
        console.log('component', props);
        return <Input {...props} />;
      },
      props: record => {
        return { record };
      },
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '姓名不能为空',
        },
        {
          min: 4,
          type: 'string',
          message: '姓名不能小于四个字符串',
        },
      ],
    },
    render: value => value,
  },
  {
    fieldName: 'age',
    title: '年龄',
    // render: value => value,
    editConfig: {
      component: InputNumber,
      signable: true,
      editable: data => {
        return data.age > 30;
      },
      rules: {
        type: 'number',
        min: 10,
        message: '年龄不能小于10岁',
      },
    },
  },
  // {
  //   groupId: 'group-level-1',
  //   title: 'group-level-1',
  //   children: [
  //     {
  //       groupId: 'group-level-1-1',
  //       title: 'group-level-1-1',
  //       children: [
  //         {
  //           fieldName: 'group-level-1-1-1',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    fieldName: 'county',
    title: '国家',
   
    // render: value => value + 222,
  },
  {
    groupId:"group-level-1",
    title:"group-level-1",
    children:[
      {
        groupId: 'roup-level-1-1',
        title:"roup-level-1-1",
        children: [
          {
            fieldName:'roup-level-1-1-2',
          }
        ],
      },
      {
        groupId: 'group-level-1-2',
        title:"group-level-1-2",
        children: [
          {
            fieldName: 'group-level-1-2-1',
          },
          {
            fieldName:'group-level-1-2-2',
          }
        ],
      }
    ]
  },
];
const BaiscGrid = () => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [gridChange, setGridChange] = useState(false);
  const [selectedKeys, setselectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState(basicColumns);
  const apiRef = useRef();
  const gridManagerRef = useRef();
  const onReady = useCallback((params, manager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  });
  const onEditChangeCallback = useCallback(isChange => {
    setGridChange(isChange);
  }, []);
  const queryData = useCallback((beginIndex = 0) => {
    var dataSource = mockData.slice(beginIndex, beginIndex + 20);
    setDataSource(dataSource);
  }, []);
  useEffect(() => {
    setDataSource(mockData);
  }, []);
  const onPageChange = useCallback(
    (beginIndex, pageSize, page, countLimit) => {
      console.log('--->', beginIndex, pageSize, page, countLimit);
      if (page === current) return;
      setCurrent(page);
      queryData(beginIndex);
    },
    [current],
  );
  const onSelect = useCallback((keys, rows) => {
    setselectedKeys(keys);
    setSelectedRows(rows);
  }, []);
  // 取消编辑
  const onCancelEdit = useCallback(() => {
    if (gridChange)
      return Modal.confirm({
        title: '提示',
        content: 'grid修改内容未保存,是否结束编辑？',
        onOk: () => {
          gridManagerRef.current.cancel();
          setEditable(false);
        },
      });
    setEditable(false);
  }, [gridChange]);
  const onCreate = useCallback(() => {
    const createData = RandomCreate();
    gridManagerRef.current.create(createData, selectedKeys);
  }, [selectedKeys]);
  const onTagRemove = useCallback(() => {
    gridManagerRef.current.tagRemove(selectedKeys);
  }, [selectedKeys]);
  const onRemove = useCallback(() => {
    gridManagerRef.current.remove(selectedKeys);
  }, [selectedKeys]);
  const onSave = useCallback(async () => {
    const { onDataAsyncEnd, validate, getPureData, diff } = gridManagerRef.current;
    onDataAsyncEnd(async () => {
      const errors = await validate();
      if (errors) return;
      gridManagerRef.current.save(() => {
        const dataSource = getPureData();
        setDataSource(dataSource);
        setEditable(false);
        return dataSource;
      });
    });
  }, []);
  return (
    <Fragment>
      <Header
        extra={
          <Fragment>
            <Button
              size="small"
              onClick={() => {
                setColumns(cols => {
                  const addIndex = cols.length - basicColumns.length + 1;
                  return [...cols, { fieldName: `test${addIndex}`, title: `动态列${addIndex}` }];
                });
              }}
            >
              添加列
            </Button>
            <Button size="small" onClick={() => gridManagerRef.current.clearLocalStorageColumns()}>
              reset columns
            </Button>
            {!editable ? (
              <Button size="small" icon="edit" onClick={() => setEditable(true)} />
            ) : (
              <Fragment>
                <Button size="small" icon="poweroff" onClick={onCancelEdit} />
                <Button
                  size="small"
                  onClick={() => {
                    const [key] = selectedKeys;
                    console.log(apiRef.current.getRowNode(key));
                  }}
                ></Button>
                <Button size="small" icon="plus" onClick={onCreate} />
                <Button size="small" icon="minus" onClick={onTagRemove} />
                <Button size="small" icon="delete" onClick={onRemove} />
                <Button size="small" icon="undo" onClick={() => gridManagerRef.current.undo()} />
                <Button size="small" icon="redo" onClick={() => gridManagerRef.current.redo()} />
                <Button size="small" icon="save" onClick={onSave} />
              </Fragment>
            )}
          </Fragment>
        }
        title="基本Grid"
        type="line"
      />
      <Grid
        tooltipShowDelay={10}
        rowkey="ip"
        loading={loading}
        columns={columns}
        editable={editable}
        dataSource={dataSource}
        serialNumber
        boxColumnIndex={['name', 'county', 'age']}
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
          onSelectedChanged: (keys, rows) => {
            // console.log('----->onSelectedChanged', keys, rows);
          },
        }}
        gridKey="grid-test-2"
        hideSelectedBox
        rowBuffer={1}
        groupSuppressAutoColumn
        editChangeCallback={onEditChangeCallback}
        onReady={onReady}
        openEditSign
        showCut
        getDataPath={data => data.path}
        // debounceVerticalScrollbar
        suppressAnimationFrame
        pagination={{
          total: 400,
          onChange: onPageChange,
          current,
        }}
      />
    </Fragment>
  );
};
/*! End !*/
/*! Split !*/
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
  // {
  //   id: 4,
  //   filePath: ['Documents', 'pdf'],
  //   dateModified: 'Aug 12 2016 10:50:00 PM',
  // },
  // {
  //   id: 5,
  //   filePath: ['Documents', 'pdf', 'book.pdf'],
  //   dateModified: 'May 20 2017 01:50:00 PM',
  //   size: 2.1,
  // },
  // {
  //   id: 6,
  //   filePath: ['Documents', 'pdf', 'cv.pdf'],
  //   dateModified: 'May 20 2016 11:50:00 PM',
  //   size: 2.4,
  // },
  // {
  //   id: 7,
  //   filePath: ['Documents', 'xls'],
  //   dateModified: 'Aug 12 2016 10:50:00 PM',
  // },
  // {
  //   id: 8,
  //   filePath: ['Documents', 'xls', 'accounts.xls'],
  //   dateModified: 'Aug 12 2016 10:50:00 AM',
  //   size: 4.3,
  // },
  // {
  //   id: 9,
  //   filePath: ['Documents', 'stuff'],
  //   dateModified: 'Aug 12 2016 10:50:00 PM',
  // },
  // {
  //   id: 10,
  //   filePath: ['Documents', 'stuff', 'xyz.txt'],
  //   dateModified: 'Jan 17 2016 08:03:00 PM',
  //   size: 1.1,
  // },

  // {
  //   id: 12,
  //   filePath: ['temp.txt'],
  //   dateModified: 'Aug 12 2016 10:50:00 PM',
  //   size: 101,
  // },
  // {
  //   id: 11,
  //   filePath: ['Music'],
  //   dateModified: 'Sep 11 2016 08:03:00 PM',
  //   size: 14.3,
  // },
  // {
  //   id: 13,
  //   filePath: ['Music', 'mp3'],
  //   dateModified: 'Aug 12 2016 10:50:00 PM',
  //   size: 101,
  // },
  // {
  //   id: 14,
  //   filePath: ['Music', 'mp3', 'jazz'],
  //   dateModified: 'Aug 12 2016 10:50:00 PM',
  //   size: 101,
  // },
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
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editable, setEditable] = useState(false);
  const apiRef = useRef(null);
  const gridManagerRef = useRef(null);
  const onReady = useCallback((params, manager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  });
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

  const serverGroupExpend = useCallback(async (gridParams, cb) => {
    const { node } = gridParams;
    const { data } = node;
    const itemData = {
      filePath: [...data.filePath, Random.county()],
      id: Random.id(),
      dateModified: Random.datetime(),
      size: Random.integer(),
    };
    cb([itemData], 1);
  }, []);
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
        rowSelection
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
        serverGroupExpend={serverGroupExpend}
        groupSelectsChildren
      />
    </Fragment>
  );
};
/*! End !*/
const config = {
  codes,
  useage: (
    <div>
      <div>依赖于ag-grid的高性能表格</div>
      <div style={{ fontWeight: 'bold' }}>
        ag-grid-enterprise需商业授权，如需使用ag-grid-enterprise功能，请自行获得LicenseKey
      </div>
      <div>
        <a href="https://www.ag-grid.com/" target="_blank">
          Ag-Grid官网
        </a>
      </div>
      <div>
        <a href="https://github.com/ag-grid/ag-grid/blob/master/LICENSE.txt" target="_blank">
          LICENSE
        </a>
      </div>
    </div>
  ),
  children: [
    // {
    //   title: '基础Grid',
    //   describe: '基础Grid',
    //   cmp: BaiscGrid,
    // },
    {
      title: '树形Grid',
      describe: 'tree',
      cmp: TreeGrid,
    },
  ],
};

export default () => <CodeDecorator config={config} />;
