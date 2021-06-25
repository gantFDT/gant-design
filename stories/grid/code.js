export default [
`
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import CodeDecorator from '../_util/CodeDecorator';
import codes from './code';
import moment from 'moment';


const RandomCreate = () => {
  const ip = Random.ip();
  return {
    ip: ip,
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['1', ip],
  };
};
// function Test() {
//   const context = useContext(GridContext);
//   console.log('=====>', context);
//   return <div>1111</div>;
// }
let mockData = Array(10000)
  .fill('')
  .map(() => RandomCreate());
mockData = [
  ...mockData,
];

const testTreeDataSource = [
  {
    ip: '1',
    name: '',
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['1'],
  },
  {
    ip: '1-1',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['1', '1-1'],
    parentId: '1',
  },
  {
    ip: '1-2',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['1', '1-2'],
    parentId: '1',
  },
  {
    ip: '2',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['2'],
  },
  {
    ip: '2-1',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['2', '2-1'],
    parentId: '2',
  },
  {
    ip: '2-1-1',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['2', '2-1', '2-1-1'],
    parentId: '2-1',
  },
  {
    ip: '2-1-2',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['2', '2-1', '2-1-2'],
    parentId: '2-1',
  },
  {
    ip: '2-2',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['2', '2-2'],
    parentId: '2',
  },
  {
    ip: '2-3',
    name: Random.name(),
    age: Random.natural(2, 40),
    county: Random.county(true),
    date: Random.date('yyyy-MM-dd'),
    path: ['2', '2-3'],
    parentId: '2',
  },
  ...mockData
];

const basicColumns = [
  {
    fieldName: 'name',
    title: '姓名',
    cellRenderer: 'gantGroupCellRenderer',
    valueGett: params => params.data?.name,
    // filterParams: {
    //   values: [''],
    // },
    // filter: 'agTextColumnFilter',
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
    filter: 'agNumberColumnFilter',
  },
  {
    fieldName: 'date',
    title: '时间',
    filter: 'agDateColumnFilter',
    // filterParams: {
    //   comparator: function filterDateComparator(filterLocalDateAtMidnight, cellValue) {
    //     console.log('filterDateComparator----->', filterLocalDateAtMidnight,cellValue);
    //     if (!cellValue) return -1;
    //     const filterTime = moment(filterLocalDateAtMidnight).valueOf();
    //     const cellTime = moment(cellValue).valueOf();

    //     if (filterTime == cellTime) {
    //       return 0;
    //     }

    //     if (cellTime < filterTime) {
    //       return -1;
    //     }

    //     if (cellTime > filterTime) {
    //       return 1;
    //     }
    //     return 0;
    //   },
    //   // comparator: (filterLocalDateAtMidnight, cellValue) => {
    //   //   const dateAsString = cellValue;

    //   //   if (dateAsString == null) {
    //   //     return 0;
    //   //   }

    //   //   // In the example application, dates are stored as dd/mm/yyyy
    //   //   // We create a Date object for comparison against the filter date
    //   //   const dateParts = dateAsString.split('/');
    //   //   const day = Number(dateParts[2]);
    //   //   const month = Number(dateParts[1]) - 1;
    //   //   const year = Number(dateParts[0]);
    //   //   const cellDate = new Date(year, month, day);

    //   //   // Now that both parameters are Date objects, we can compare
    //   //   if (cellDate < filterLocalDateAtMidnight) {
    //   //     return -1;
    //   //   } else if (cellDate > filterLocalDateAtMidnight) {
    //   //     return 1;
    //   //   }
    //   //   return 0;
    //   // },
    // },
  },
  {
    fieldName: 'county',
    title: '国家',
    filter: 'agTextColumnFilter',
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
  const [drawerEditable, setDrawerEditable] = useState(false);
  const apiRef = useRef();
  const gridManagerRef = useRef();
  const onReady = useCallback((params, manager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  });
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

  return (
    <Fragment>
      <Header
        extra={
          <Fragment>
            <Button
              size="small"
              onClick={() => {
                setSelectedRows([...mockData.slice(0, 10)]);
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
        title="基本Grid1"
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
          // selectedRows,
          onSelect: (keys, rows) => {
            setSelectedRows(rows);
            console.log('--->', rows);
          },
        }}
        treeData
        treeDataForcedFilter
        treeDataParentName="parentId"
        gridKey="grid-test-2"
        hideSelectedBox
        rowBuffer={1}
        groupSuppressAutoColumn
        editChangeCallback={onEditChangeCallback}
        getDataPath={data => data.path}
        onReady={onReady}
        openEditSign
        showCut
        getDataPath={data => {
          // console.log('---->', data.path);
          return data.path;
        }}
        gridOptions={{
          suppressQuotes: true,
          // excelStyles: [{ id: 'stringType', dataType: 'string' }],
        }}
        groupDefaultExpanded={-1}
        selectedBoxWidth={500}
        drawerMode={drawerEditable}
        defaultDrawerWidth={800}
        context={{
          gridManagerRef,
          onCancelEdit,
          editable,
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

ReactDOM.render(<RandomCreate />, mountNode)`,]