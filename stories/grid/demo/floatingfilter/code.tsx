export default ` 
import React, { useState, useLayoutEffect } from 'react';
import { Random, mock } from 'mockjs';
import { Grid } from 'gantd';

const columns = [
  {
    fieldName: 'name',
    title: '姓名',
    filter: 'agTextColumnFilter',
  },
  {
    fieldName: 'email',
    title: '邮箱号',
    filter: 'agTextColumnFilter',
  },
  {
    fieldName: 'age',
    title: '年龄',
    filter: 'agNumberColumnFilter',
  },
  {
    fieldName: 'date',
    title: '出生日期',
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue;
        if (dateAsString == null) return -1;
        var dateParts = dateAsString.split('-');
        var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
      },
    },
  },
  {
    fieldName: 'sex',
    title: '性别',
  },
];

const data = Array.from({ length: 10000 }).map((content, index) =>
  mock({
    name: Random.cname(),
    email: Random.email(),
    'age|1-100': 100,
    date: Random.date('yyyy-MM-dd'),
    sex: Random.boolean() ? '男' : '女',
    id: Random.guid(),
  }),
);

export default () => {
  const [dataSource, setdataSource] = useState([]);

  useLayoutEffect(() => {
    setdataSource(data);
  }, []);

  return (
    <Grid
      height={300}
      columns={columns}
      rowkey="id"
      dataSource={dataSource}
      defaultColDef={{
        flex: 1,
        floatingFilter: true,
        filter: true,
      }}
    />
  );
};
 
 `