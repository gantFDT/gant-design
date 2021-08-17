import { useRef, useEffect, useCallback, useState } from 'react';
import { GridVariableRef } from './interface';
import { isEqual, uniq, map, get, isEmpty } from 'lodash';
import {
  ColDef,
  ColumnApi,
  GridApi,
  Column,
  ValueGetterParams,
  ValueFormatterParams,
  RowNode,
  FilterModifiedEvent,
} from '@ag-grid-enterprise/all-modules';
import moment from 'moment';
interface filterHooksParams {
  treeData?: boolean;
  treeDataForcedFilter?: boolean;
  handleFilterModified?: (event: FilterModifiedEvent) => void;
  getRowNodeId: (data: any) => any;
  dataSource?: any[];
  context: any;
}

export function filterDateComparator(filterLocalDateAtMidnight, cellValue) {
  if (!cellValue) return -1;
  const filterTime = moment(filterLocalDateAtMidnight).valueOf();
  const cellTime = moment(cellValue).valueOf();

  if (filterTime == cellTime) {
    return 0;
  }

  if (cellTime < filterTime) {
    return -1;
  }

  if (cellTime > filterTime) {
    return 1;
  }
  return 0;
}

export function filterHooks(params: filterHooksParams) {
  const filterDataRef = useRef({});
  const dataSourceRef = useRef([]);
  const debounceRef = useRef(null);
  const columnIdRef = useRef<any>();
  const filterModelRef = useRef<any>();
  const [forcedGridKey, setForcedGridKey] = useState(0);
  const {
    treeData,
    treeDataForcedFilter,
    handleFilterModified,
    getRowNodeId,
    dataSource,
    context,
  } = params;

  if (!treeData || !treeDataForcedFilter)
    return {
      onFilterModified: handleFilterModified,
      filterDataRef: filterDataRef,
      forcedGridKey,
      filterModelRef,
    };
  useEffect(() => {
    dataSourceRef.current = dataSource;
  }, [dataSource]);

  return {
    onFilterModified: useCallback((filterModifiedEvent: FilterModifiedEvent) => {
      handleFilterModified && handleFilterModified(filterModifiedEvent);
      if (!treeDataForcedFilter || !treeData) return;
      const { api, columnApi, column } = filterModifiedEvent;
      api.showLoadingOverlay();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        filterDataRef.current = {};
        const filterModel = api.getFilterModel();
        if (isEmpty(filterModelRef.current) != isEmpty(filterModel)) {
          filterModelRef.current = filterModel;
          columnIdRef.current = api.getHorizontalPixelRange().left;
          setForcedGridKey((key = 0) => key + 1);
        }
        filterModelRef.current = filterModel;
        api.hideOverlay();
        debounceRef.current = null;
      }, 500);
    }, []),
    filterDataRef,
    forcedGridKey,
    filterModelRef,
    columnIdRef,
  };
}

function applyTransactionAddAsync(api: GridApi, data: any = [], callback: () => void, num = 1000) {
  let nowData = data;
  let nextData = [];
  if (nowData.length > num) {
    nextData = nowData.slice(num);
    nowData = nowData.slice(0, num);
  }

  api.applyTransactionAsync({ update: nowData }, () => {
    if (nextData.length > 0) return applyTransactionAddAsync(api, nextData, callback, num);
    callback();
  });
}

function judgeFilter(filterIn: any, value: any) {
  let appliedModel = get(filterIn, 'appliedModel', {});
  appliedModel = appliedModel ? appliedModel : {};
  switch (appliedModel.filterType) {
    case 'set':
      const { appliedModelValues } = filterIn;
      if (typeof value !== 'boolean' && !value) return appliedModelValues['null'];
      return appliedModelValues[value];
    case 'text': {
      const { condition1, condition2, operator } = appliedModel;
      if (operator) {
        const isAdopt = getTextFilterIsAdopt(condition1, condition2, operator, value);
        return isAdopt;
      }
      const { type, filter } = appliedModel;
      return filterTextComparator(filter, value, type);
    }
    default:
      const { filterType } = appliedModel;
      if (filterType === 'date' || filterType === 'number') {
        const { condition1, condition2, operator } = appliedModel;
        if (operator) {
          const result1 = filterNumberAndDateComparator(condition1, value);
          const result2 = filterNumberAndDateComparator(condition2, value);
          if (operator === 'AND') return result1 && result2;
          return result1 || result2;
        }
        return filterNumberAndDateComparator(appliedModel, value);
      }
      return true;
  }
}

function getTextFilterIsAdopt(condition1, condition2, operator, itemValue) {
  const result1 = filterTextComparator(condition1.filter, itemValue, condition1.filterType);
  const result2 = filterTextComparator(condition2.filter, itemValue, condition2.filterType);
  if (operator === 'AND') return result1 && result2;
  return result1 || result2;
}

function filterTextComparator(filterText: string, value: string, filterType: string) {
  const filterTextLowerCase = filterText.toLowerCase();
  const valueLowerCase = value.toString().toLowerCase();
  switch (filterType) {
    case 'contains':
      return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
    case 'notContains':
      return valueLowerCase.indexOf(filterTextLowerCase) === -1;
    case 'equals':
      return valueLowerCase === filterTextLowerCase;
    case 'notEqual':
      return valueLowerCase != filterTextLowerCase;
    case 'startsWith':
      return valueLowerCase.indexOf(filterTextLowerCase) === 0;
    case 'endsWith':
      var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
      return index >= 0 && index === valueLowerCase.length - filterTextLowerCase.length;
    default:
      // should never happen
      console.warn('invalid filter type ' + filterType);
      return false;
  }
}
function filterNumberAndDateComparator(appliedModel: any, value: string) {
  const { dateFrom, dateTo, filter, filter2, type, filterType } = appliedModel;
  const startVal = filterType === 'date' ? moment(dateFrom).valueOf() : filter;
  const endVal = filterType === 'date' ? moment(dateTo).valueOf() : filter2;
  const _value = filterType === 'date' ? (value ? moment(value).valueOf() : 0) : value;
  switch (type) {
    case 'equals':
      return _value == startVal;
    case 'notEqual':
      return _value != startVal;
    case 'lessThan':
      return _value < startVal;
    case 'lessThanOrEqual':
      return _value <= startVal;
    case 'greaterThan':
      return _value > startVal;
    case 'greaterThanOrEqual':
      return _value >= startVal;
    case 'inRange':
      const maxVal = startVal > endVal ? startVal : endVal;
      const minVal = startVal > endVal ? endVal : startVal;
      return maxVal >= _value && value >= minVal;
    default:
      // should never happen
      console.warn('invalid filter type ' + filterType);
      return false;
  }
}
