import Grid, {
  GridApi,
  GridReadyEvent,
  GridManager,
} from '@grid';
import { Header,SchemaForm } from '@gantd';
import { Random } from 'mockjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {formSchema,uiSchema,customFields,columns} from './schema'
import { Button } from 'antd';
import { isEmpty } from 'lodash'


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

function getMockData(length:number){
  return Array(length)
  .fill('')
  .map(() => RandomCreate());
}

export default function CountLimit () {
  const formRef = useRef(null)
  const [formData,setFormData] = useState({
    mode:'limit' as 'limit'|'default',
    countLimit:10000,
    totalCount: 10000,
  })
  const [loading,setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ beginIndex: 0, pageSize: 20 });
  const mockDataRef = useRef(getMockData(formData.totalCount))
  const [dataSource, setDataSource] = useState([]);
  const apiRef = useRef<GridApi>();
  const gridManagerRef = useRef<GridManager>();

  const onReady = useCallback((params: GridReadyEvent, manager: GridManager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  }, []);

  const queryData = useCallback((beginIndex: number, pageSize: number,page:number,countLimit:number) => {
    setLoading(true)
    console.info('query',{
      beginIndex,
      pageSize,
      page,
      countLimit,
      mockData: mockDataRef.current
    })
    setTimeout(()=>{
      const data = mockDataRef.current.slice(beginIndex, beginIndex + pageSize);
      setDataSource(data);
      setLoading(false)
    })
  }, []);

  const onPageChange = useCallback((beginIndex, pageSize,page,countLimit) => {
    setPageInfo({ beginIndex, pageSize });
    queryData(beginIndex, pageSize,page,countLimit);
  }, []);

  const onApply = async () => {
    if(!formRef.current) return 
    const {values,errors} = await formRef.current?.validateForm()
    if(!isEmpty(errors)) return 
    setFormData(values)
    mockDataRef.current = getMockData(values.totalCount)
    queryData(0, 20,1,values.countLimit);
  }

  useEffect(() => {
    queryData(0, 20,1,formData.countLimit);
  }, []);
  
  return (
    <>
      <Header
        title="模糊分页查询"
        type="line"
      />
      <SchemaForm
        ref={formRef}
        schema={formSchema}
        uiSchema = {uiSchema}
        customFields={customFields}
        data={formData}
      />
      <Header
        extra={(
          <Button type='primary' onClick={onApply}>应用上述配置</Button>
        )}
      />
      <Grid
        rowkey="ip"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        serialNumber
        pagination={{
          total:formData.totalCount,
          beginIndex: pageInfo.beginIndex,
          pageSize: pageInfo.pageSize,
          onChange: onPageChange,
          mode: formData.mode,
          countLimit: formData.countLimit,
          countLimitStyle:{
            color: '#1890ff',
          }
        }}
        suppressModelUpdateAfterUpdateTransaction
        // onCellEditChange={onCellEditingChange as any}
        rowBuffer={20}
        onReady={onReady}
        size="default"
        gantThemeClass="gant-grid-theme"
        removeRowSelectable
      />
    </>
  );
};
