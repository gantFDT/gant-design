import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Switch, Radio, Input } from 'antd';
import { cloneDeep, debounce } from 'lodash';
import BlockHeader from '@header';
import { getType } from '@util';
import Sortable from '../sortable';
import formatSchema from '../formatschema';
import Receiver from '../locale/Receiver';

interface UIContentProps {
  viewConfig: any;
  gridKey: string;
  schema?: any;
  height?: number;
  uiFields?: string[];
  showDisplayConfig?: boolean;
  onChange(viewConfig: any): void;
}

function UIContent(props: UIContentProps) {
  const {
    viewConfig = {},
    schema,
    gridKey,
    height,
    onChange,
  } = props;

  const { columnFields } = viewConfig;

  /** 首页widget兼容 */
  useEffect(() => {
    if (schema && viewConfig && !viewConfig.columnFields) {
      const { columnConfigs: columnFields } = formatSchema(schema, gridKey);
      onChange({
        ...viewConfig,
        columnFields,
      });
    }
  }, [schema, gridKey]);

  const handlerChangeColumnKeys = useCallback(records => {
    onChange({
      ...viewConfig,
      columnFields: [...records],
    });
  }, [viewConfig]);

  /** 筛选列 start */
  const [fieldName, setFieldName] = useState('')

  const sortDataSource = useMemo(() => columnFields.map(column => ({
    ...column,
    display: !fieldName || ~column.title.toLocaleLowerCase().indexOf(fieldName.toLocaleLowerCase()) ? 'block' : 'none'
  })), [fieldName, columnFields])

  const handleSearch = debounce((val) => setFieldName(val), 500)

  const handleChange = useCallback((e) => {
    handleSearch(e.target.value)
  },[])
  /** 筛选列 end */

  return (
    <Receiver>
      {(locale) => {
        return <>
          <Input.Search size="small" placeholder={locale.inputKeyword} onChange={handleChange} onSearch={handleSearch} style={{ marginBottom: 5 }} />
          <Sortable dataSource={sortDataSource} height={height} onChange={handlerChangeColumnKeys} />
        </>
      }}
    </Receiver>
  );
}

export default React.memo(UIContent);
