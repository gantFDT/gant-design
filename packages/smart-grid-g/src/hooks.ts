import { useMemo, useState, useEffect, useCallback } from 'react'
import { PaginationConfig } from '@table'
import { merge } from 'lodash';

// localStorage相关
export function useLocalStorage<T>(storageKey: string, initValue: T): [T, (params: T) => void] {
  const getLocaLStorageData = () => {
    let localDataString = localStorage.getItem(storageKey)
    return localDataString ? merge(JSON.parse(localDataString), initValue) : initValue
  }

  const [localData, setLocalData] = useState<T>(getLocaLStorageData())

  const setLocalStorage = useCallback((list: T) => {
    setLocalData(list)
    localStorage.setItem(storageKey, JSON.stringify(
      Array.isArray(list) ? list : Object.assign({}, localData, list)
    ))
  }, [])

  return [localData, setLocalStorage]
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
  const fakeColumns = useMemo(() => {
    if(columnFields.length !== columns.length) return [];
    return columnFields
    .filter((item: any) => item.checked)
    .map((ck: any) => {
      let columnItem = columns.find((oc: any) => oc.fieldName === ck.fieldName) || {};
      let finalWidth = columnItem.width || ck.width;
      return {
        ...columnItem,
        width: finalWidth || (ck.fixed ? 120 : undefined),
        fixed: ck.fixed
      }
    })
  }, [columnFields, columns])
  return [
    fakeColumns
  ]
}