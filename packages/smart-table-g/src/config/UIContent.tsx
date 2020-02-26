import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Switch, Radio } from 'antd'
import BlockHeader, { headerType } from '@header'
import { getType } from '@util'
import Sortable from '../sortable'
import formatSchema from '../formatschema'

interface UIContentProps {
  locale: any;
  viewConfig: any;
  schema?: any;
  uiFields?: string[];
  onChange(viewConfig: any): void;
}

function UIContent(props: UIContentProps) {
  const {
    viewConfig = {},
    schema,
    locale,
    uiFields = ['wrap', 'isZebra', 'bordered', 'clickable', 'footerDirection', 'heightMode'],
    onChange
  } = props;

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
        <Radio.Button style={{flex:1,textAlign:'center'}} value="field">{locale.fieldConfig}</Radio.Button>
        <Radio.Button style={{flex:1,textAlign:'center'}} value="ui">{locale.displayConfig}</Radio.Button>
      </Radio.Group>
      {
        tabKey === 'field'?(
          <Sortable
            locale={locale}
            dataSource={columnFields}
            onChange={handlerChangeColumnKeys}
          />
        ):(
          <>{
            uiFields.map((K: string, I: number) => {
              switch (K) {
                case 'wrap':
                  return <div key={K}>
                    <BlockHeader type={headerType.num} num={I + 1} title={locale.isWrap} />
                    <Switch checked={wrap} disabled={hasFixed} onChange={handlerChange.bind(null, 'wrap')} checkedChildren={locale.wrap} unCheckedChildren={locale.noWrap} />
                  </div>
                case 'isZebra':
                  return <div key={K}>
                    <BlockHeader type={headerType.num} num={I + 1} title={locale.isZebra} />
                    <Switch checked={isZebra} onChange={handlerChange.bind(null, 'isZebra')} checkedChildren={locale.yes} unCheckedChildren={locale.no} />
                  </div>
                case 'bordered':
                  return <div key={K}>
                    <BlockHeader type={headerType.num} num={I + 1} title={locale.bordered} />
                    <Switch checked={bordered} onChange={handlerChange.bind(null, 'bordered')} checkedChildren={locale.yes} unCheckedChildren={locale.no} />
                  </div>
                case 'clickable':
                  return <div key={K}>
                    <BlockHeader type={headerType.num} num={I + 1} title={locale.clickable} />
                    <Switch checked={clickable} onChange={handlerChange.bind(null, 'clickable')} checkedChildren={locale.yes} unCheckedChildren={locale.no} />
                  </div>
                case 'footerDirection':
                  return <div key={K}>
                    <BlockHeader type={headerType.num} num={I + 1} title={locale.footerDirection} />
                    <Radio.Group
                      options={[
                        { label: locale.leftB, value: 'row-reverse' },
                        { label: locale.rightB, value: 'row' },
                      ]}
                      value={footerDirection}
                      onChange={handlerChange.bind(null, 'footerDirection')}
                    />
                  </div>
                case 'heightMode':
                  return <div key={K}>
                    <BlockHeader type={headerType.num} num={I + 1} title={locale.heightMode} />
                    <Radio.Group
                      options={[
                        { label: locale.heightAuto, value: 'auto' },
                        { label: locale.heightFull, value: 'full' },
                      ]}
                      value={heightMode}
                      onChange={handlerChange.bind(null, 'heightMode')}
                    />
                  </div>
              }
            })
          }</>
        )
      }
    </>
  )
}

export default UIContent;