import { useState, useEffect } from 'react'
import { merge } from 'lodash';

// localStorage相关
export function useLocalStorage<T>(storageKey: string, initValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const getLocaLStorageData = () => {
    let localDataString = localStorage.getItem(storageKey)

    if(!localDataString) return initValue

    return localDataString[0] === '{' || localDataString[0] === '[' ? merge(JSON.parse(localDataString), initValue) : localDataString
  }

  const [localData, setLocalData] = useState<T>(getLocaLStorageData())

  useEffect(() => {
    localData && localStorage.setItem(storageKey, 
      typeof localData !== 'object' ? localData.toString() :
      JSON.stringify(
        Array.isArray(localData) ? localData : Object.assign({}, localData, localData)
      )
    )
  }, [localData])

  return [localData, setLocalData]
}

// 表格配置相关
interface useTableConfigProps {
  tableConfig: any,
  columns: any[],
  tableKey?: string,
}


export const useTableConfig = (props: useTableConfigProps) => {
  const {
    tableConfig,
    columns
  } = props;
  // 行选中开关
  const {
    columnFields = []
  } = tableConfig;
  // 列渲染

  const fakeColumns = [];
  for (const _columnField of columnFields) {
    const _columnItem = columns.find(_column => _column.fieldName === _columnField.fieldName);
    if(_columnItem) {
      fakeColumns.push(Object.assign({}, _columnItem, {
        width: _columnField.width || _columnItem.width ||  120,
        fixed: _columnField.fixed,
        sort: _columnField.sort,
        sortIndex: _columnField.sortIndex,
        hide: _columnField.hide
      }))
    }
  }

  return [
    fakeColumns
  ]
}