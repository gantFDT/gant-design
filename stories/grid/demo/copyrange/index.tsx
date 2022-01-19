import Grid from '@grid';
import Header from '@header';
import React from 'react';
import Faker from 'faker';
import moment from 'moment';

const columns: any = [
  {
    title: '零件名',
    fieldName: 'partName',
    filter: 'agMultiColumnFilter',
    width: 150,
  },
  {
    title: '零件号',
    fieldName: 'partNum',
    filter: 'agTextColumnFilter',
    width: 120,
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
];

const dataSource = new Array(100).fill({}).map(() => ({
  id: Faker.datatype.uuid(),
  partName: Faker.name.firstName(),
  partNum: Faker.phone.phoneNumber(),
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
  return (
    <>
      <Header title="拷贝单元格" type="line" />
      <Grid
        rowkey="id"
        dataSource={dataSource}
        columns={columns}
        enableCellTextSelection={false}
        //支持区域选中
        enableRangeSelection
      />
    </>
  );
};

export default CopyDemo;
