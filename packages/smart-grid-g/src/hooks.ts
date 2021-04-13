import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { merge, cloneDeep, isEmpty, get } from 'lodash';
import { ComponentsMap } from './fieldmapper';

// localStorage hook
export function useLocalStorage<T>(storageKey: string, initValue: T): [T, (params: T) => void] {
  const getLocaLStorageData = () => {
    let localDataString = localStorage.getItem(storageKey)

    if(!localDataString) return initValue

    return localDataString[0] === '{' || localDataString[0] === '[' ? merge(JSON.parse(localDataString), initValue) : localDataString
  }

  const [localData, setLocalData] = useState<T>(getLocaLStorageData())

  useEffect(() => {
    if(!localData) return;
    localStorage.setItem(storageKey, 
      typeof localData !== 'object' ? localData.toString() :
      JSON.stringify(
        Array.isArray(localData)
          ? localData
          : Object.assign({}, localData, localData)
      )
    )
  }, [localData])

  return [localData, setLocalData]
}

// gridSchema hook
export const useGridSchema = (gridKey: string, gridSchema: any) => {
  const [columnFields, setColumnFields] = useState([])
  const [originColumns, setOriginColumns] = useState([])
  const [columnMaps, setColumnMaps] = useState({})
  const [systemViews, setSystemViews] = useState<any>([]);
  const [currentView, setCurrentView] = useLocalStorage<any>(`grid-current-view:${gridKey}`, {});
  const [customViews, setCustomViews] = useLocalStorage<any>(`grid-custom-views:${gridKey}`, []);

  const formatColumn = useCallback((schemaItem) => {
    const fakeColumn = cloneDeep(schemaItem);
    if (!schemaItem.render && schemaItem.componentType) {
      if (typeof schemaItem.componentType !== 'string') {
        fakeColumn.render = () => schemaItem.componentType as React.ReactElement;
      } else {
        const Cmp = ComponentsMap[schemaItem.componentType];
        if (Cmp) {
          fakeColumn.render = (value) => React.createElement(Cmp, {
            ...schemaItem.props || {},
            value,
            allowEdit: false,
            style: merge(get(schemaItem.props, 'style'), { display: 'inline-block' })
          })
          Object.assign(fakeColumn.editConfig, {component: Cmp, editable: true})
        } else {
          try {
            fakeColumn.render = value => React.createElement('span', {}, JSON.stringify(value))
          } catch{
            throw `字段（${schemaItem.fieldName}）的值解析出错。`
          }
        }
      }
      delete fakeColumn.componentType;
    }
    if (fakeColumn.children && !isEmpty(fakeColumn.children)) {
      fakeColumn.children = fakeColumn.children.map(formatColumn);
    }
    setColumnMaps((_oldMaps) => Object.assign({}, _oldMaps, {[schemaItem.fieldName]: schemaItem}))
    return fakeColumn;
  },[ComponentsMap])

  const formatView = useCallback((_view) => {
    const cloneView = isEmpty(_view) ? {panelConfig:{columnFields:[]}} : cloneDeep(_view);
    let { columnFields: _columnConfigs = [] } = cloneView.panelConfig;

    for (const _columnSet of _columnConfigs) {
      Object.assign(_columnSet, columnMaps[_columnSet.fieldName] || {}, _columnSet || {}, { checked: true })
    }

    // 隐藏列
    const hiddenColumns = [];
    for (const _columnField of columnFields) {
      if(!_columnConfigs.find(__columnConfig => __columnConfig.fieldName === _columnField.fieldName)) {
        hiddenColumns.push(Object.assign({}, _columnField, { checked: false }))
      }
    }
    
    _columnConfigs = [..._columnConfigs, ...hiddenColumns];

    Object.assign(cloneView.panelConfig, { columnFields: _columnConfigs })

    return cloneView;
  },[columnFields])
  
  useEffect(() => {
    let fakeSchema = cloneDeep(gridSchema);

    /** 简单模式 */
    if (Array.isArray(gridSchema)) {
      fakeSchema = {
        supportColumnFields: gridSchema,
        systemViews: [
          {
            viewId: gridKey ? `systemView:${gridKey}` : 'systemView',
            name: '全字段',
            version: 'default',
            panelConfig: { columnFields: [ ...gridSchema ] },
          },
        ],
      };
    }
  
    const { supportColumnFields, systemViews } = fakeSchema;

    setColumnFields(supportColumnFields)
    setOriginColumns(supportColumnFields.map(formatColumn))
    setSystemViews(systemViews.map(formatView))
    setCurrentView(currentView => formatView(currentView));
    setCustomViews(customViews => customViews.map(formatView));
  }, [gridSchema, formatView, formatColumn])

  const gridColumns = useMemo(() => {
    if(!currentView || !currentView.panelConfig || !currentView.panelConfig.columnFields) return [];
    return currentView.panelConfig.columnFields.filter(_field => _field.checked !== false);
  }, [currentView])
  
  return {
    gridColumns,
    originColumns,
    currentView: currentView || {},
    setCurrentView,
    systemViews,
    customViews,
    setCustomViews
  };
}