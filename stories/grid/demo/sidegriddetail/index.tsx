import { Input, Selector } from '@gantd';
import Grid, { GridApi, GridManager, GridReadyEvent } from '@grid';
import Header from '@header';
import { Button, Modal } from 'antd';
import Faker from 'faker';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import { SideGridDetail } from '@grid';

const columns: any = [
  {
    title: '基本信息',
    fieldName: 'part',
    children: [
      {
        title: '姓名',
        fieldName: 'name',
        filter: 'agMultiColumnFilter',
        width: 150,
        editConfig: {
          component: Input,
          editable: true,
          signable: true,
          rules: [
            {
              required: true,
              whitespace: true,
              message: '名称必填',
            },
            {
              validator: (rules: any, value: any, cb: any, data: any) => {
                if (value === '123') {
                  cb();
                  return;
                }
                cb('name错误');
              },
            },
          ],
        },
        valueGetter: function(params: any) {
          const { data } = params;
          if (!data['name']) {
            return '';
          }
          return data['name'] + '-valueGetter';
        },
      },
      {
        title: '性别',
        fieldName: 'gender',
        filter: 'agTextColumnFilter',
        width: 120,
        editConfig: {
          component: (params: any) => <Selector {...params} />,
          props: {
            dataSource: [
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ],
          },
          editable: function(record, params) {
            return true;
          },
          signable: true,
          rules: [
            {
              required: true,
              whitespace: true,
              message: '性别必填',
            },
            {
              pattern: /男/,
              message: '性别错误',
            },
          ],
        },
      },
      {
        title: '号码',
        fieldName: 'tel.number',
        filter: 'agTextColumnFilter',
        width: 120,
        valueFormatter: function(params) {
          const { value } = params;
          if (!value) {
            return '';
          }
          return value + '-valueFormatter';
        },
        editConfig: {
          component: Input,
          editable: true,
          signable: true,
        },
      },
      {
        title: '头像',
        fieldName: 'avatar',
        render: (text: string, record: any, rowIndex: number) => {
          return (
            <>
              <img src={text} style={{ width: 20, height: 20 }} />
            </>
          );
        },
      },
      {
        title: '中文名',
        fieldName: 'zh',
        filter: 'agNumberColumnFilter',
      },
      {
        title: '英文名',
        fieldName: 'en',
        filter: 'agNumberColumnFilter',
      },
    ],
  },
  {
    title: '其他信息',
    fieldName: 'other',
    children: [
      {
        title: '创建人',
        fieldName: 'createBy',
        filter: 'agTextColumnFilter',
        width: 120,
      },
      {
        title: '更新人',
        fieldName: 'updateBy',
        filter: 'agTextColumnFilter',
        width: 120,
      },
      {
        title: '创建时间',
        fieldName: 'createDate',
        filter: 'agDateColumnFilter',
      },
      {
        title: '更新时间',
        fieldName: 'updateDate',
        filter: 'agDateColumnFilter',
      },
    ],
  },
];

const dataSource = new Array(100).fill({}).map((item, index) => ({
  id: Faker.datatype.uuid(),
  name: Faker.name.firstName(),
  tel: { number: Faker.phone.phoneNumber() },
  gender: index % 2 === 0 ? '男' : '女',
  avatar: Faker.image.image(20, 20),
  usage: Faker.datatype.number(),
  createDate: moment(Faker.datatype.datetime()).format('YYYY-MM-DD'),
  updateDate: moment(Faker.datatype.datetime()).format('YYYY-MM-DD'),
  createBy: Faker.name.firstName(),
  updateBy: Faker.name.firstName(),
  zh: Faker.name.lastName(),
  en: Faker.name.lastName(),
  de: Faker.name.lastName(),
}));

const SideGridDetailDemo = () => {
  const [editable, setEditable] = useState(false);
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

  //选择
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

  //新建数据
  const onCreate = useCallback(selectedKeys => {
    const createData = {
      id: Faker.datatype.uuid(),
    };
    gridManagerRef.current.create(createData, selectedKeys.length > 0 ? selectedKeys : true);
  }, []);

  //标记删除数据
  const onTagRemove = useCallback(selectedKeys => {
    gridManagerRef.current.tagRemove(selectedKeys);
  }, []);

  //保存
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

  //单元格值改变
  const onCellEditingChange = (
    record: any,
    fieldName: string,
    newValue: any,
    oldValue: any,
    params: any,
  ) => {
    console.log({ record, fieldName, newValue, oldValue, params });
    return record;
  };

  return (
    <>
      <Header
        title="侧边栏表格详情"
        type="line"
        extra={
          <>
            {editable && (
              <Button icon="poweroff" type="danger" size="small" onClick={() => onCancelEdit()} />
            )}
            {editable && <Button icon="plus" size="small" onClick={() => onCreate(selectedKeys)} />}
            {editable && (
              <Button icon="minus" size="small" onClick={() => onTagRemove(selectedKeys)} />
            )}
            {editable && (
              <Button icon="undo" size="small" onClick={() => gridManagerRef.current.undo()} />
            )}
            {editable && (
              <Button icon="redo" size="small" onClick={() => gridManagerRef.current.redo()} />
            )}
            {editable && (
              <Button icon="save" size="small" type="primary" onClick={() => onSave()} />
            )}
            {!editable && (
              <Button icon="edit" size="small" type="primary" onClick={() => setEditable(true)} />
            )}
          </>
        }
      />
      <Grid
        rowkey="id"
        onReady={onReady}
        dataSource={dataSource}
        columns={columns}
        editable={editable}
        height={400}
        rowSelection={{
          selectedRows,
          onSelect: onSelect,
        }}
        serialNumber
        openEditSign
        editChangeCallback={onEditChangeCallback}
        onCellEditingChange={onCellEditingChange}
        //侧边栏详情所需属性如下
        drawerMode
        defaultDrawerWidth={300}
        customDrawerContent={(params: any) => <SideGridDetail {...params} />}
      />
    </>
  );
};

export default SideGridDetailDemo;
