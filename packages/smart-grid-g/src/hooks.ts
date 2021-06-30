import { useMemo, useState, useEffect, useCallback } from 'react'
import { PaginationConfig } from '@table'
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

//  分页相关
const getPageFromIndex = (pageIndex: number, pageSize: number): number => {
  if (!pageIndex) return 1;
  return (pageIndex / pageSize) + 1;
}
interface usePaginationProps {
  pagination?: PaginationConfig;
  pageIndex?: number;
  pageSize?: number;
  isGantPageMode?: boolean;
  onPageChange?: (pageIndex: number, pageSize?: number) => void;
  totalCount?: number;
  pageSizeOptions?: string[];
}

export const usePagination = (props: usePaginationProps): PaginationConfig | undefined | boolean => {
  const {
    pagination,
    pageIndex = 1,
    pageSize = 50,
    onPageChange,
    isGantPageMode,
    totalCount = 0,
    pageSizeOptions = ['50', '100', '150', '200'],
  } = props;
  const handlerPageChange = useCallback((page: number = 1, pageSize: number = 50): void => {
    if (pagination !== undefined || !onPageChange) return;

    let fakePageIndex = isGantPageMode ? (page - 1) * pageSize : page;
    onPageChange(fakePageIndex, pageSize)
  }, [onPageChange, isGantPageMode])
  return useMemo(() => {
    if (pagination !== undefined) return pagination;
    if (!onPageChange) return undefined;
    return {
      total: totalCount,
      current: isGantPageMode ? getPageFromIndex(pageIndex, pageSize) : pageIndex,
      pageSize: pageSize,
      onChange: handlerPageChange,
      onShowSizeChange: handlerPageChange,
      pageSizeOptions
    }
  }, [pagination, pageIndex, pageSize, onPageChange, isGantPageMode, totalCount])
}

// 表格配置相关
interface useTableConfigProps extends usePaginationProps {
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
    if(_columnField.checked) {
      const _columnItem = columns.find(_column => _column.fieldName === _columnField.fieldName);
      if(_columnItem) {
        fakeColumns.push(Object.assign({}, _columnItem, {
          width: _columnField.width || _columnItem.width ||  120,
          fixed: _columnField.fixed || _columnItem.fixed,
          sort: _columnField.sort || _columnItem.sort,
        }))
      }
    }
  }

  return [
    fakeColumns
  ]
}