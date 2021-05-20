import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Switch, Radio, Input } from 'antd';
import BlockHeader from '@header';
import { getType } from '@util';
import Sortable from '../sortable';
import formatSchema from '../formatschema';
import Receiver from '../locale/Receiver';

interface UIContentProps {
  viewConfig: any;
  gridKey: string;
  schema?: any;
  uiFields?: string[];
  showDisplayConfig?: boolean;
  onChange(viewConfig: any): void;
}

function UIContent(props: UIContentProps) {
  const {
    viewConfig = {},
    schema,
    gridKey,
    showDisplayConfig,
    uiFields = ['clickable', 'footerDirection'],
    onChange,
  } = props;

  useEffect(() => {
    if (schema && viewConfig && !viewConfig.columnFields) {
      const { columnConfigs: columnFields } = formatSchema(schema, gridKey);
      onChange({
        ...viewConfig,
        columnFields,
      });
    }
  }, [schema, gridKey]);

  const {
    clickable = true,
    footerDirection = 'row',
    columnFields,
  } = viewConfig;

  const handlerChange = useCallback(
    (key, value) => {
      onChange({
        ...viewConfig,
        [key]: getType(value) === 'Object' ? value.target.value : value,
      });
    },
    [viewConfig],
  );

  // tabKey相关
  const [tabKey, setTabKey] = useState<'field' | 'ui'>('field');
  const handlerChangeTabKey = useCallback(e => {
    setTabKey(e.target.value);
  }, []);

  const handlerChangeColumnKeys = useCallback(
    records => {
      onChange({
        ...viewConfig,
        columnFields: [...records],
      });
    },
    [viewConfig],
  );

  /** 筛选列 start */
  const [fieldName, setFieldName] = useState('')

  const sortDataSource = useMemo(() => columnFields.map(column => ({
    ...column,
    display: !fieldName || ~column.title.indexOf(fieldName) ? 'block' : 'none'
  })), [fieldName, columnFields])

  const handleInput = useCallback((value) => {
    setFieldName(value)
  },[])
  /** 筛选列 end */

  return (
    <Receiver>
      {(locale) => {
        return <>
          {
            showDisplayConfig && <Radio.Group
              value={tabKey}
              onChange={handlerChangeTabKey}
              style={{ marginBottom: 10, width: '100%', display: 'flex' }}
              buttonStyle="solid"
              size="small"
            >
              <Radio.Button style={{ flex: 1, textAlign: 'center' }} value="field">
                {locale.fieldConfig}
              </Radio.Button>
              <Radio.Button style={{ flex: 1, textAlign: 'center' }} value="ui">
                {locale.displayConfig}
              </Radio.Button>
            </Radio.Group>
          }
          <Input.Search size="small" placeholder="请输入关键词" onSearch={handleInput} style={{ marginBottom: 5 }} />
          {tabKey === 'field' ? (
            <Sortable dataSource={sortDataSource} onChange={handlerChangeColumnKeys} />
          ) : (
              <>
                {uiFields.map((K: string, I: number) => {
                  switch (K) {
                    case 'clickable':
                      return (
                        <div key={K}>
                          <BlockHeader type={'num'} num={I + 1} title={locale.clickable} />
                          <Switch
                            checked={clickable}
                            onChange={handlerChange.bind(null, 'clickable')}
                            checkedChildren={locale.yes}
                            unCheckedChildren={locale.no}
                          />
                        </div>
                      );
                    case 'footerDirection':
                      return (
                        <div key={K}>
                          <BlockHeader
                            type={'num'}
                            num={I + 1}
                            title={locale.footerDirection}
                          />
                          <Radio.Group
                            options={[
                              { label: locale.leftB, value: 'row-reverse' },
                              { label: locale.rightB, value: 'row' },
                            ]}
                            value={footerDirection}
                            onChange={handlerChange.bind(null, 'footerDirection')}
                          />
                        </div>
                      );
                  }
                })}
              </>
            )}
        </>
      }}
    </Receiver>
  );
}

export default UIContent;
