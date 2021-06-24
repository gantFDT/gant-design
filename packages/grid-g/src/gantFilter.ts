import { useRef, useEffect, useCallback } from 'react';
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
  const optCounterRef = useRef(0);
  const dataSourceRef = useRef([]);
  const debounceRef = useRef(null);
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
    };
  useEffect(() => {
    dataSourceRef.current = dataSource;
  }, [dataSource]);

  return {
    onFilterModified: useCallback((filterModifiedEvent: FilterModifiedEvent) => {
      handleFilterModified && handleFilterModified(filterModifiedEvent);
      const { api, columnApi, column } = filterModifiedEvent;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const columns = columnApi.getAllColumns();
        filterDataRef.current = {};
        const filterInstance = api.getFilterInstance(column.getColId());
        api.forEachNodeAfterFilter(node => {
          const getNodeCellValue = toParamsValue(api, columnApi, column, context);
          const { appliedModel } = filterInstance as any;
          const itemValue = getNodeCellValue(node, get(node, 'data', {}));
          const isAdopt = judgeFilter(filterInstance, itemValue);
          if (isAdopt) {
            filterDataRef.current[node.id] = true;
          }
        });
        api.refreshCells({
          force: true,
        });
        const testData = dataSourceRef.current.map((itemData, index) => ({
          ...itemData,
          _optCounter: optCounterRef.current + index,
        }));
        dataSourceRef.current = testData;
        optCounterRef.current = optCounterRef.current + 1;
        api.setRowData(testData);

        debounceRef.current = null;
      }, 500);
    }, []),
    filterDataRef,
  };
}

function toParamsValue(api: GridApi, columnApi: ColumnApi, column: Column, context: any) {
  const colDef = get(column, 'colDef');
  const userProvidedColDef = get(column, 'userProvidedColDef');
  const { field } = colDef;
  return (node: RowNode, data: any) => {
    let value = get(data, field);
    if (!userProvidedColDef.valueGetter && !userProvidedColDef.valueFormatter) return value;
    if (userProvidedColDef.valueGetter && typeof userProvidedColDef.valueGetter == 'function') {
      const valueGetterParams: ValueGetterParams = {
        api,
        columnApi,
        column,
        colDef,
        context,
        node,
        data,
        getValue: (field: string) => node.data,
      };
      value = userProvidedColDef.valueGetter(valueGetterParams);
    }
    if (
      userProvidedColDef.valueFormatter &&
      typeof userProvidedColDef.valueFormatter === 'function'
    ) {
      const valueFormatterParams: ValueFormatterParams = {
        api,
        columnApi,
        column,
        colDef,
        context,
        node,
        data,
        value,
      };
      value = userProvidedColDef.valueFormatter(valueFormatterParams);
    }
    return value;
  };
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
