import Grid from '@grid';
import SchemaForm from '@schema-form';
import Header from '@header';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import Faker from 'faker';
import moment from 'moment';
import { Button } from 'antd';
import { get, set, isArray } from 'lodash';
import CombEditComponent from './CombEditComponent';
import { Input, Selector } from '@gantd';
// import {Input} from 'antd';
import GridDetail from './GridDetail';

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
          props:{
            someThing:1
          }
        },
        valueGetter: function(params: any) {
          const { data } = params;
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
        },
      },
      {
        title: '号码',
        fieldName: 'tel',
        filter: 'agTextColumnFilter',
        width: 120,
        valueFormatter: function(params) {
          const { value } = params;
          return value + '-valueFormatter';
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
  tel: Faker.phone.phoneNumber(),
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

const CopyDemo = () => {
  const [editable, setEditable] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const onRowDoubleClicked = () => {
    setVisibleDrawer(true);
  };

  return (
    <>
      <Header
        title="侧边栏表格详情"
        type="line"
        extra={
          <>
            {editable && <Button icon="poweroff" size="small" onClick={() => setEditable(false)} />}
            {!editable && <Button icon="edit" size="small" onClick={() => setEditable(true)} />}
          </>
        }
      />
      <Grid
        rowkey="id"
        dataSource={dataSource}
        columns={columns}
        editable={editable}
        height={400}
        drawerMode
        defaultDrawerWidth={400}
        customDrawerContent={(params: any) => (
          <GridDetail setVisibleDrawer={setVisibleDrawer} editable={editable} {...params} />
        )}
        visibleDrawer={visibleDrawer}
        onRowDoubleClicked={onRowDoubleClicked}
      />
    </>
  );
};

export default CopyDemo;
