export default [
`
import React, {
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef,
  Fragment,
  useContext,
} from 'react';
import { mock, Random } from 'mockjs';
import Grid, { GridContext } from 'grid';
import { Button, message, Dropdown, Menu, Switch, Checkbox, Modal } from 'antd';
import { Input, InputCellPhone, DatePicker, InputNumber, EditStatus, Selector } from 'data-cell';
import Header from 'header';


const RandomCreate = () => ({
  ip: Random.ip(),
  name: Random.name(),
  age: '00000',
  county: Random.county(true),
  leaf: [true, false][Random.natural(0, 1)],
  path: [Random.ip()],
  recored: {
    address: Random.county(true),
  },
});
// function Test() {
//   const context = useContext(GridContext);
//   console.log('=====>', context);
//   return <div>1111</div>;
// }
const mockData = Array(100000)
  .fill('')
  .map(() => RandomCreate());
const basicColumns = [
  {
    fieldName: 'name',
    title: '姓名',
    cellRenderer: 'gantGroupCellRenderer',
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
    cellClass: 'stringType',
  },
  {
    fieldName: 'recored.address',
    title: '地址',
  },
  {
    fieldName: 'county',
    title: '国家',
  },
  {
    fieldName: 'county3',
    title: '国家',
  },
  {
    fieldName: 'county4',
    title: '国家',
  },
  {
    fieldName: 'county5',
    title: '国家',
  },
  {
    fieldName: 'county6',
    title: '国家',
  },
  {
    fieldName: 'county7',
    title: '国家',
  },
  {
    fieldName: 'county8',
    title: '国家',
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
  const [drawerEditable, setDrawerEditable] = useState(true);
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
    setDataSource(mockData.slice(20));
  }, []);
  const onPageChange = useCallback(
    (beginIndex, pageSize, page, countLimit) => {
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
        suppressAnimationFrame
        pagination={{
          total: 400,
          onChange: onPageChange,
          current,
        }}
        gridOptions={{
          suppressQuotes: true,
          excelStyles: [{ id: 'stringType', dataType: 'string' }],
        }}
        drawerMode={drawerEditable}
        // defaultExportJsonParams={{
        //   title: '基本数据',
        // }}
      />
    </Fragment>
  );
};

ReactDOM.render(<RandomCreate />, mountNode)`,]