export default ` 
import Grid, {
  GridApi,
  GridReadyEvent,
  GridManager,
  ValueGetterParams,
  ValueFormatterParams,
  Columns,
} from 'gantd/lib/grid';
import { Input, DatePicker, Selector, Header } from 'gantd';
import { Button, Modal, Radio } from 'antd';
import { Random } from 'mockjs';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const RandomCreate = () => {
  const ip = Random.ip();
  return {
    ip: ip,
    user: { name: Random.first() },
    date: Random.date('yyyy-MM-dd'),
    cn: Random.cname(),
    nationality: Random.pick(['China', 'foreign']),
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
    cellRenderer: 'gantGroupCellRender',
    flex:1,
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
    flex:1,
    renderer:()=>{

    },
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
    flex:1,
    editConfig: {
      component: DatePicker,
      editable: true,
      signable: true,
    },
  },
  {
    fieldName: 'nationality',
    title: '国籍',
    valueGetter: (params: ValueGetterParams) => {
      let value = params.data.nationality;
      switch (value) {
        case 'China':
          return '中国';
        case 'foreign':
          return '外籍';
        default:
          return '';
      }
    },
    editConfig: {
      component: Selector,
      editable: true,
      signable: true,
      initValueFormatter: (params: ValueFormatterParams) => {
        let value = params.data.nationality;
        return value;
      },
      props: {
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
  const [pageInfo, setPageInfo] = useState({ beginIndex: 0, pageSize: 10 });
  const [dataSource, setDataSource] = useState([]);
  const [gridChange, setGridChange] = useState(false);
  const [selectedKeys, setselectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [size, setSize] = useState<any>('default');
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
    setEditable(false);
  }, [gridChange]);

  //新建数据
  const onCreate = useCallback(selectedKeys => {
    const createData = RandomCreate();
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
    return record;
  }, []);

  const onRadioChange = e => {
    const value = e.target.value;
    setSize(value);
  };

  useEffect(() => {
    queryData(0, 10);
  }, []);

  return (
    <>
      <Header
        extra={
          <>
            <Radio.Group value={size} buttonStyle="solid" onChange={onRadioChange} size={size}>
              <Radio.Button value="small">small</Radio.Button>
              <Radio.Button value="default">default</Radio.Button>
              <Radio.Button value="large">large</Radio.Button>
            </Radio.Group>
            {!editable ? (
              <Button size={size} icon="edit" onClick={onEnterEdit}>
                进入编辑
              </Button>
            ) : (
              <>
                <Button size={size} icon="poweroff" onClick={onCancelEdit}>
                  结束编辑
                </Button>
                <Button size={size} icon="plus" onClick={() => onCreate(selectedKeys)}>
                  创建
                </Button>
                <Button size={size} icon="font-colors" onClick={() => onModify(selectedKeys)}>
                  修改
                </Button>
                <Button size={size} icon="minus" onClick={() => onTagRemove(selectedKeys)}>
                  标记删除
                </Button>
                <Button size={size} icon="delete" onClick={() => onRemove(selectedKeys)}>
                  删除
                </Button>
                <Button size={size} icon="undo" onClick={() => gridManagerRef.current.undo()}>
                  撤销
                </Button>
                <Button size={size} icon="redo" onClick={() => gridManagerRef.current.redo()}>
                  恢复
                </Button>
                <Button size={size} icon="save" onClick={onSave}>
                  保存
                </Button>
              </>
            )}
          </>
        }
        title="风格大小"
        type="line"
        size={size}
      />
      <Grid
        key={size}
        rowkey="ip"
        loading={loading}
        columns={columns}
        editable={editable}
        dataSource={dataSource}
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
        onCellEditingChange={onCellEditingChange}
        rowBuffer={20}
        groupSuppressAutoColumn //禁止自动分组列
        editChangeCallback={onEditChangeCallback}
        onReady={onReady}
        openEditSign
        context={{
          onCancelEdit,
          onEnterEdit,
          onCreate,
          onRemove,
          onTagRemove,
        }}
        getContextMenuItems={getContextMenuItems}
        enableCellTextSelection={false}
        //支持区域选中
        enableRangeSelection
        //约束直接跳转最大页码模式
        numberGoToMode
        //宽松风格
        size={size}
        autoHeight
        maxAutoHeight={1000}
        border={false}
        zebra={false}
        hideSelectedBox
      />
    </>
  );
};

export default BaiscEditGrid;
 
 `