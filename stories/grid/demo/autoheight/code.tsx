export default ` 
import { Grid, Header } from 'gantd';
import { InputNumber } from 'antd';
import Faker from 'faker';
import React, { useEffect, useState } from 'react';

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
];

const getDataSource = (size: number) =>
  new Array(size).fill({}).map(item => ({
    id: Faker.random.uuid(),
    partName: Faker.name.firstName(),
    partNum: Faker.phone.phoneNumber(),
    zh: Faker.name.lastName(),
  }));

const initialRowCount = 10;

const AutoHeight = () => {
  const [dataSource, setDataSource] = useState<any>(getDataSource(initialRowCount));
  const [rowCount, setRowCount] = useState<number>(initialRowCount);

  useEffect(() => {
    const data = getDataSource(rowCount);
    setDataSource(data);
  }, [rowCount]);

  return (
    <>
      <Header
        title="拷贝单元格"
        type="line"
        extra={
          <InputNumber
            size="small"
            placeholder="改变行数"
            value={rowCount}
            onChange={v => setRowCount(v)}
          />
        }
      />
      <Grid
        rowkey="id"
        dataSource={dataSource}
        columns={columns}
        autoHeight
        minAutoHeight={100}
        maxAutoHeight={500}
        pagination={{
          total: 500,
          beginIndex: 0,
          pageSize: 25,
        }}
      />
    </>
  );
};

export default AutoHeight;
 
 `