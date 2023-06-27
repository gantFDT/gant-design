import Grid, {
  GridApi,
  GridReadyEvent,
  GridManager,
  ValueGetterParams,
  ValueFormatterParams,
  Columns,
} from '@grid';
import { Input, DatePicker, Selector, Header } from '@gantd';
import { Button, Modal } from 'antd';
import { Random } from 'mockjs';
import { cloneDeep, get } from 'lodash';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const RandomCreate = () => {
  const ip = Random.ip();
  return {
    ip: ip,
    user: { name: Random.first() },
    date: Random.date('yyyy-MM-dd'),
    cn: Random.cname(),
    nationality: Random.pick(['China', 'foreign', 'test']),
  };
};

let mockData = Array(100)
  .fill('')
  .map(() => RandomCreate());
mockData = [...mockData];

const columns: Columns[] = [
  {
    fieldName: 'user.name',
    title: '英文名称',
    cellRenderer: 'gantGroupCellRenderer',
    filter: 'agTextColumnFilter',
    valueGetter: params => {
      return params.data.user.name;
    },
    editConfig: {
      component: Input,
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
  {
    fieldName: 'cn',
    title: '中文名称',
    editConfig: {
      component: Input,
      editable: true,
      signable: true,
      rules: {
        max: 4,
        type: 'string',
        message: '中文名不能大于四个字符',
      },
    },
  },
  {
    fieldName: 'date',
    title: '出生日期',
    editConfig: {
      component: DatePicker,
      editable: true,
      signable: true,
    },
    filter: 'agDateColumnFilter',
  },
  {
    fieldName: 'nationality',
    title: '国籍',
    valueGetter: (params: ValueGetterParams) => {
      let value = params.data.nationality;
      return value;
    },
    editConfig: {
      component: Selector,
      editable: true,
      signable: true,
      initValueFormatter: (params: ValueFormatterParams) => {
        const value = get(params.data, 'nationality', '');
        if (typeof value === 'object') return value;
        return value.split(',');
      },
      props: {
        mode: 'multiple',
        dataSource: [
          {
            label: '中国',
            value: 'China',
          },
          {
            label: '外籍',
            value: 'foreign',
          },
        ],
      },
    },
  },
];

const BaiscEditGrid = () => {
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ beginIndex: 0, pageSize: 20 });
  const [dataSource, setDataSource] = useState([]);
  const [gridChange, setGridChange] = useState(false);
  const [selectedKeys, setselectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const apiRef = useRef<GridApi>();
  const gridManagerRef = useRef<GridManager>();

  const onReady = useCallback((params: GridReadyEvent, manager: GridManager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  //监听grid内部数据是否变化
  const onEditChangeCallback = useCallback(isChange => {
    setGridChange(isChange);
  }, []);

  const queryData = useCallback((beginIndex: number, pageSize: number) => {
    const data = mockData.slice(beginIndex, beginIndex + pageSize);
    setDataSource(data);
  }, []);

  const onPageChange = useCallback((beginIndex, pageSize, page, countLimit) => {
    setPageInfo({ beginIndex, pageSize });
    queryData(beginIndex, pageSize);
  }, []);

  const onSelect = useCallback((keys, rows) => {
    setselectedKeys(keys);
    setSelectedRows(rows);
  }, []);

  //进入编辑
  const onEnterEdit = useCallback(() => {
    setEditable(true);
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
    gridManagerRef.current.cancel();
    setEditable(false);
  }, [gridChange]);

  //新建数据
  const onCreate = useCallback(selectedKeys => {
    const createData = RandomCreate();
    createData.user = { name: '' };
    createData.nationality = '';
    gridManagerRef.current.create(createData, selectedKeys.length > 0 ? selectedKeys : true);
  }, []);

  //修改数据
  const onModify = useCallback(selectedKeys => {
    gridManagerRef.current.modify({ ip: selectedKeys[0], user: { name: '修改之后的名称' } });
  }, []);

  //标记删除数据
  const onTagRemove = useCallback(selectedKeys => {
    gridManagerRef.current.tagRemove(selectedKeys);
  }, []);

  //删除数据
  const onRemove = useCallback(selectedKeys => {
    gridManagerRef.current.remove(selectedKeys);
  }, []);

  const onSave = useCallback(async () => {
    const { onDataAsyncEnd, validate, getPureData, diff } = gridManagerRef.current;
    onDataAsyncEnd(async () => {
      const errors = await validate();
      if (errors) return;
      gridManagerRef.current.save(() => {
        const dataSource = getPureData();
        setEditable(false);
        return dataSource;
      });
    });
  }, []);

  //右键菜单
  const getContextMenuItems = useCallback(res => {
    const {
      context: { gridManager, globalEditable },
      selectedKeys,
    } = res;

    if (!globalEditable) {
      return [
        {
          name: '进入编辑',
          action: onEnterEdit,
        },
      ];
    }
    return [
      {
        name: '保存',
        action: onSave,
      },
      {
        name: '新增',
        action: () => onCreate(selectedKeys),
      },
      {
        name: '标记删除',
        action: () => onTagRemove(selectedKeys),
      },
      {
        name: '删除',
        action: () => onRemove(selectedKeys),
      },
      {
        name: '恢复',
        action: () => gridManager.cancel(),
      },
      {
        name: '结束编辑',
        action: onCancelEdit,
      },
    ];
  }, []);

  const onCellEditingChange = useCallback((record, fieldName, newValue, oldValue, params) => {
    if (fieldName === 'nationality') record['nationality'] = newValue.join(',');
    return record;
  }, []);

  useEffect(() => {
    queryData(0, 20);
  }, []);
  const processCellFromClipboard = useCallback(params => {
    const { column, node } = params;

    console.log('processCellFromClipboard----->', params, cloneDeep(params.node.data));

    return get(node, `data.${get(column, 'colId')}`);
  }, []);

  const processCellForClipboard = useCallback(params => {
    // console.log('processCellFromClipboard----->', params);
    return params.value;
  }, []);

  const processDataFromClipboard = params => {
    console.log('processDataFromClipboard----->', params);
    return [[]];
  };

  const onCellChanged = (params: any) => {
    console.log('onCellChanged---->', params);
  };

  return (
    <>
      <Header
        extra={
          <>
            {!editable ? (
              <Button size="small" icon="edit" onClick={onEnterEdit}>
                进入编辑
              </Button>
            ) : (
              <>
                <Button size="small" icon="poweroff" onClick={onCancelEdit}>
                  结束编辑
                </Button>
                <Button size="small" icon="plus" onClick={() => onCreate(selectedKeys)}>
                  创建
                </Button>
                <Button size="small" icon="font-colors" onClick={() => onModify(selectedKeys)}>
                  修改
                </Button>
                <Button size="small" icon="minus" onClick={() => onTagRemove(selectedKeys)}>
                  标记删除
                </Button>
                <Button
                  size="small"
                  icon="delete"
                  onClick={() => gridManagerRef.current?.redoTagRemove(selectedKeys)}
                >
                  取消标记删除
                </Button>
                <Button size="small" icon="delete" onClick={() => onRemove(selectedKeys)}>
                  删除
                </Button>
                <Button size="small" icon="undo" onClick={() => gridManagerRef.current.undo()}>
                  撤销
                </Button>
                <Button size="small" icon="redo" onClick={() => gridManagerRef.current.redo()}>
                  恢复
                </Button>
                <Button size="small" icon="save" onClick={onSave}>
                  保存
                </Button>
              </>
            )}
          </>
        }
        title="单元格编辑"
        type="line"
      />
      <Grid
        rowkey="ip"
        loading={loading}
        columns={columns}
        editable={editable}
        dataSource={dataSource}
        serialNumber
        rowSelection={{
          selectedRows,
          onSelect: onSelect,
        }}
        pagination={{
          total: mockData.length,
          beginIndex: pageInfo.beginIndex,
          pageSize: pageInfo.pageSize,
          onChange: onPageChange,
        }}
        suppressModelUpdateAfterUpdateTransaction
        // onCellEditChange={onCellEditingChange as any}
        rowBuffer={20}
        editChangeCallback={onEditChangeCallback}
        onReady={onReady}
        openEditSign
        getContextMenuItems={getContextMenuItems}
        size="default"
        gantThemeClass="gant-grid-theme"
        removeRowSelectable
      />
    </>
  );
};

export default BaiscEditGrid;
