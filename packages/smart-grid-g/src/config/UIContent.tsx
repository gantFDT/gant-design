import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Switch, Radio } from 'antd';
import BlockHeader from '@header';
import { getType } from '@util';
import Sortable from '../sortable';
import formatSchema from '../formatschema';
import Receiver from '../locale/Receiver';

interface UIContentProps {
  viewConfig: any;
  schema?: any;
  uiFields?: string[];
  onChange(viewConfig: any): void;
}

function UIContent(props: UIContentProps) {
  const {
    viewConfig = {},
    schema,
    uiFields = ['clickable', 'footerDirection'],
    onChange,
  } = props;

  useEffect(() => {
    if (schema && viewConfig && !viewConfig.columnFields) {
      const { columnConfigs: columnFields } = formatSchema(schema);
      onChange({
        ...viewConfig,
        columnFields,
      });
    }
  }, [schema]);

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

  const hasFixed = useMemo(() => {
    if (!viewConfig.columnFields) return false;
    return viewConfig.columnFields.some((V: any) => {
      if (V.lock && viewConfig.wrap) {
        onChange({
          ...viewConfig,
          wrap: false,
        });
      }

      return !!V.lock;
    });
  }, [viewConfig]);

  return (
    <Receiver>
      {(locale) => {
        return <>
          <Radio.Group
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
          {tabKey === 'field' ? (
            <Sortable dataSource={columnFields} onChange={handlerChangeColumnKeys} />
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
