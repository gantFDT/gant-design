export default [
`
import React, { useMemo, useEffect, useCallback, useState, useRef, Fragment } from 'react';
import { mock, Random } from 'mockjs';
import Grid from 'grid';
import { Button, message, Dropdown, Menu, Switch, Checkbox, Modal } from 'antd';
import { Input, InputCellPhone, DatePicker, InputNumber, EditStatus, Selector } from 'data-cell';
import Header from 'header';


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
const mockData = Array(10)
  .fill('')
  .map(() => RandomCreate());
const basicColumns = [
  {
    fieldName: 'name',
    title: '姓名',
    toolTipRender: params => {
      const { data } = params;
      return data.age > 30 ? <div>{data.name}</div> : null;
    },
    editConfig: {
      component: props => {
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
  },
  {
    fieldName: 'age',
    title: '年龄',
    pinnedRowCellRenderer: 'gantPinnedRowRenderer',
    pinnedRowCellRendererParams: {
      render: value => \`平均年龄：\${value}\`,
    },
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
  {
    fieldName: 'county',
    title: '国家',

    // cellRenderer: 'gantGroupCellRenderer',

    // render: value => value + 222,
  },
  // {
  //   groupId: 'group-level-1',
  //   title: 'group-level-1',
  //   children: [
  //     {
  //       groupId: 'roup-level-1-1',
  //       title: 'roup-level-1-1',
  //       children: [
  //         {
  //           fieldName: 'roup-level-1-1-2',
  //         },
  //       ],
  //     },
  //     {
  //       groupId: 'group-level-1-2',
  //       title: 'group-level-1-2',
  //       children: [
  //         {
  //           fieldName: 'group-level-1-2-1',
  //         },
  //         {
  //           fieldName: 'group-level-1-2-2',
  //         },
  //       ],
  //     },
  //   ],
  // },
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
                  return [...cols, { fieldName: \`test\${addIndex}\`, title: \`动态列\${addIndex}\` }];
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
        pinnedTopRowData={[{ age: 24 }]}
        suppressAnimationFrame
        pagination={{
          total: 400,
          onChange: onPageChange,
          current,
        }}
        defaultExportJsonParams={{
          title: '基本数据',
        }}
      />
    </Fragment>
  );
};

ReactDOM.render(<RandomCreate />, mountNode)`,]