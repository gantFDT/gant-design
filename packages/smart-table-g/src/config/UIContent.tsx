import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Switch, Radio } from 'antd'
import BlockHeader, { headerType } from '@header'
import { getType } from '@util'
import Sortable from '../sortable'
import formatSchema from '../formatschema'
import { useIntl } from 'react-intl'

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
    uiFields = ['wrap', 'isZebra', 'bordered', 'clickable', 'footerDirection', 'heightMode'],
    onChange
  } = props;

  const { formatMessage: f } = useIntl();

  useEffect(() => {
    if (schema && viewConfig && !viewConfig.columnFields) {
      const { columnConfigs: columnFields } = formatSchema(schema);
      onChange({
        ...viewConfig,
        columnFields,
      })
    }
  }, [schema]);

  const {
    wrap = true,
    isZebra = true,
    bordered = true,
    clickable = true,
    footerDirection = 'row',
    heightMode = 'full',
    columnFields
  } = viewConfig;

  const handlerChange = useCallback((key, value) => {
    onChange({
      ...viewConfig,
      [key]: getType(value) === 'Object' ? value.target.value : value
    });
  }, [viewConfig])
  
  // tabKey相关
  const [tabKey, setTabKey] = useState<'field' | 'ui'>('field');
  const handlerChangeTabKey = useCallback((e) => {
    setTabKey(e.target.value);
  },[])

  const handlerChangeColumnKeys = useCallback((records) => {
    onChange({
      ...viewConfig,
      columnFields:[...records]
    })
  },[viewConfig])

  const hasFixed = useMemo(() => {
    if(!viewConfig.columnFields) return false;
    return viewConfig.columnFields.some((V: any) => {
      if (V.lock && viewConfig.wrap) {
        onChange({
          ...viewConfig,
          wrap: false,
        })
      }

      return !!V.lock
    })
  }, [viewConfig])

  return (
    <>
      <Radio.Group value={tabKey} onChange={handlerChangeTabKey} style={{ marginBottom: 16, width: '100%', display:'flex' }} buttonStyle="solid">
        <Radio.Button style={{flex:1,textAlign:'center'}} value="field">{f({ id: 'fieldConfig' })}</Radio.Button>
        <Radio.Button style={{flex:1,textAlign:'center'}} value="ui">{f({ id: 'displayConfig' })}</Radio.Button>
      </Radio.Group>
      {
        tabKey === 'field'?(
          <Sortable
            dataSource={columnFields}
            onChange={handlerChangeColumnKeys}
          />
        ):(
          <>{
            uiFields.map((K: string, I: number) => {
              switch (K) {
                case 'wrap':
                  return <>
                    <BlockHeader type={headerType.num} num={I + 1} title={f({ id: 'isWrap' })} />
                    <Switch checked={wrap} disabled={hasFixed} onChange={handlerChange.bind(null, 'wrap')} checkedChildren={f({ id: 'wrap' })} unCheckedChildren={f({ id: 'noWrap' })} />
                  </>
                case 'isZebra':
                  return <>
                    <BlockHeader type={headerType.num} num={I + 1} title={f({ id: 'isZebra' })} />
                    <Switch checked={isZebra} onChange={handlerChange.bind(null, 'isZebra')} checkedChildren={f({ id: 'yes' })} unCheckedChildren={f({ id: 'no' })} />
                  </>
                case 'bordered':
                  return <>
                    <BlockHeader type={headerType.num} num={I + 1} title={f({ id: 'bordered' })} />
                    <Switch checked={bordered} onChange={handlerChange.bind(null, 'bordered')} checkedChildren={f({ id: 'yes' })} unCheckedChildren={f({ id: 'no' })} />
                  </>
                case 'clickable':
                  return <>
                    <BlockHeader type={headerType.num} num={I + 1} title={f({ id: 'clickable' })} />
                    <Switch checked={clickable} onChange={handlerChange.bind(null, 'clickable')} checkedChildren={f({ id: 'yes' })} unCheckedChildren={f({ id: 'no' })} />
                  </>
                case 'footerDirection':
                  return <>
                    <BlockHeader type={headerType.num} num={I + 1} title={f({ id: 'footerDirection' })} />
                    <Radio.Group
                      options={[
                        { label: f({ id: 'leftB' }), value: 'row-reverse' },
                        { label: f({ id: 'rightB' }), value: 'row' },
                      ]}
                      value={footerDirection}
                      onChange={handlerChange.bind(null, 'footerDirection')}
                    />
                  </>
                case 'heightMode':
                  return <>
                    <BlockHeader type={headerType.num} num={I + 1} title={f({ id: 'heightMode' })} />
                    <Radio.Group
                      options={[
                        { label: f({ id: 'heightAuto' }), value: 'auto' },
                        { label: f({ id: 'heightFull' }), value: 'full' },
                      ]}
                      value={heightMode}
                      onChange={handlerChange.bind(null, 'heightMode')}
                    />
                  </>
              }
            })
          }</>
        )
      }
    </>
  )
}

export default UIContent;