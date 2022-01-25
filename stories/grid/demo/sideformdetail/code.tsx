export default `

import Grid from '@grid';
import SchemaForm from '@schema-form';
import Header from '@header';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import Faker from 'faker';
import moment from 'moment';
import { Button } from 'antd';
import { get, set, isArray } from 'lodash';

const columns: any = [
  {
    title: '零件信息',
    fieldName: 'part',
    children: [
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

//通过column转formSchema
const getFormSchema = columns => {
  const schema = {
    type: 'object',
    propertyType: {},
  };
  const setPropertyType = currentColumn => {
    if (!currentColumn || !get(currentColumn, 'fieldName')) {
      return;
    }
    if (isArray(currentColumn.children)) {
      currentColumn.children.forEach((c: any) => {
        setPropertyType(c);
      });
      return;
    }
    const { fieldName, title, props, componentType } = currentColumn;
    set(schema, "propertyType."+fieldName, {
      title,
      type: 'string',
      componentType,
      props,
    });
  };
  columns.forEach(column => {
    setPropertyType(column);
  });
  return schema;
};

const SideFormDetail = () => {
  const [data, setData] = useState(0);
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const formRef = useRef(null);

  const onRowDoubleClicked = () => {
    setVisibleDrawer(true);
  };

  const formSchema = useMemo(() => {
    return getFormSchema(columns);
  }, []);

  const customDrawerContent = useCallback(
    (params: any) => {
      const {
        clickedEvent: { data },
      } = params;
      return (
        <>
          <Header
            title="详情"
            type="line"
            bottomLine
            extra={
              <>
                <Button icon="close" size="small" onClick={() => setVisibleDrawer(false)} />
              </>
            }
            style={{ paddingLeft: 10 }}
          />
          <div style={{ height: 'calc(100% - 30px)', overflowY: 'auto' }}>
            <SchemaForm
              wrappedComponentRef={formRef}
              schema={formSchema}
              size="small"
              data={data}
            />
          </div>
        </>
      );
    },
    [formSchema],
  );

  return (
    <>
      <Header title="侧边栏表单详情" type="line" />
      <Grid
        rowkey="id"
        dataSource={dataSource}
        columns={columns}
        drawerMode
        defaultDrawerWidth={200}
        customDrawerContent={customDrawerContent}
        visibleDrawer={visibleDrawer}
        onRowDoubleClicked={onRowDoubleClicked}
      />
    </>
  );
};

export default SideFormDetail;


`;
