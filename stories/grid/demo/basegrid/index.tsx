import Grid from '@grid';
import Header from '@header';
import { Button, Input, Modal } from 'antd';
import { Random } from 'mockjs';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const RandomCreate = () => {
  const ip = Random.ip();
  return {
    ip: ip,
  };
};

let mockData = Array(100)
  .fill('')
  .map(() => RandomCreate());
mockData = [...mockData];

const testTreeDataSource = [
  {
    ip: '1',
    name: '',
    test: {},
  },
];

function MedalCellRenderer(props) {
  const { value, rowIndex, render, data, valueFormatted, context } = props;
  const showValue = useMemo(() => {
    return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
  }, [valueFormatted, value]);
  // const renderContent = useMemo(() => {
  //   return typeof render == 'function' ? render(showValue, data, rowIndex, props) : showValue;
  // }, [showValue, data, rowIndex]);
  return <>{showValue}</>;
}

const basicColumns = [
  {
    fieldName: 'name',
    title: '姓名',
    cellRenderer: 'gantGroupCellRenderer',
    valueGetter: params => params.data?.name,
    // filterParams: {
    //   values: [''],
    // },
    // filter: 'agTextColumnFilter',
    initialSort: 'asc',
    sortIndex: 1,
    editConfig: {
      component: props => {
        return <Input {...props} onChange={e => props.onChange(e.target.value, 'test')} />;
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
    fieldName: 'test.name',
    title: '姓名2',
    sortIndex: 1,
    editConfig: {
      component: props => {
        return <Input {...props} onChange={e => props.onChange(e.target.value, 'test')} />;
      },
      editable: true,
      signable: true,
      rules: [
        {
          required: true,
          message: '姓名不能为空',
        },
      ],
    },
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
  const [columns, setColumns] = useState<any>(basicColumns);
  const [test, setTest] = useState('');
  const [drawerEditable, setDrawerEditable] = useState(false);
  const apiRef = useRef<any>();
  const gridManagerRef = useRef<any>();
  const onReady = useCallback((params, manager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);
  const onEditChangeCallback = useCallback(isChange => {
    setGridChange(isChange);
  }, []);
  useEffect(() => {
    setDataSource(testTreeDataSource);
  }, []);
  const onPageChange = useCallback(
    (beginIndex, pageSize, page, countLimit) => {
      if (page === current) return;
      setCurrent(page);
      // queryData(beginIndex);
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
    gridManagerRef.current.create(createData, selectedKeys.length > 0 ? selectedKeys : true);
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
        // setDataSource(dataSource);
        setEditable(false);
        return dataSource;
      });
    });
  }, []);

  //右键菜单
  const getContextMenuItems = useCallback(res => {
    const {
      context: { gridManagerRef, onCancelEdit, editable },
    } = res;
    if (!editable) {
      return [
        {
          name: '进入编辑',
          action: () => {
            setEditable(true);
          },
        },
      ];
    }
    return [
      {
        name: '结束编辑',
        action: onCancelEdit,
      },
      {
        name: '恢复',
        action: () => gridManagerRef.current.cancel(),
      },
      {
        name: '保存',
        action: () => {},
      },
    ];
  }, []);

  const onCellEditingChange = useCallback((record, fieldName, newValue, oldValue, params) => {
    return record;
  }, []);

  return (
    <Fragment>
      {test}
      <Header
        extra={
          <Fragment>
            <Button
              size="small"
              onClick={() => {
                setTest(te => te + 1);
              }}
            >
              切换模式
            </Button>
            <Button
              size="small"
              onClick={() => {
                setDrawerEditable(bl => !bl);
              }}
            >
              切换模式
            </Button>
            {drawerEditable ? (
              <>
                <Button size="small" icon="plus" onClick={onCreate} />
                <Button size="small" icon="minus" onClick={onTagRemove} />
                <Button size="small" icon="delete" onClick={onRemove} />
                <Button size="small" icon="undo" onClick={() => gridManagerRef.current.undo()} />
                <Button size="small" icon="redo" onClick={() => gridManagerRef.current.redo()} />
                <Button size="small" icon="save" onClick={onSave} />
              </>
            ) : !editable ? (
              <Button size="small" icon="edit" onClick={() => setEditable(true)} />
            ) : (
              <Fragment>
                <Button size="small" icon="poweroff" onClick={onCancelEdit} />
                <Button
                  size="small"
                  onClick={() => {
                    const [key] = selectedKeys;
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
        rowkey="ip"
        loading={loading}
        columns={columns}
        editable={editable}
        dataSource={dataSource}
        serialNumber
        boxColumnIndex={['name', 'county', 'age']}
        rowSelection={{
          selectedRows,
          onSelect: onSelect,
        }}
        // treeData
        onCellEditingChange={onCellEditingChange}
        excludeChildrenWhenTreeDataFiltering
        rowBuffer={1}
        groupSuppressAutoColumn
        editChangeCallback={onEditChangeCallback}
        getDataPath={data => data.path}
        onReady={onReady}
        openEditSign
        showCut
        showCutChild
        createConfig={{
          id: 'ip',
          path: 'path',
          toPath: (parentPath, data) => [...parentPath, data.ip],
        }}
        // gridOptions={{
        //   suppressQuotes: true,
        //   // excelStyles: [{ id: 'stringType', dataType: 'string' }],
        // }}
        groupDefaultExpanded={1}
        selectedBoxWidth={500}
        drawerMode={drawerEditable}
        defaultDrawerWidth={800}
        context={{
          gridManagerRef,
          onCancelEdit,
          editable,
        }}
        frameworkComponents={{
          medalCellRenderer: MedalCellRenderer,
        }}
        getContextMenuItems={getContextMenuItems}
        hiddenMenuItemNames={['进入编辑', '结束编辑']}
        // customDrawerContent={() => <div>自定义</div>}
        // defaultExportJsonParams={{
        //   title: '基本数据',
        // }}
      />
    </Fragment>
  );
};

export default BaiscGrid;
