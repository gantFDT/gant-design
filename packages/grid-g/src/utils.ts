import { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { ColGroupDef, ColDef, IsColumnFunc, IServerSideGetRowsParams } from '@ag-grid-community/core';
import { get, isEmpty } from 'lodash';
import { isEqualObj } from './gridManager/utils';
import { PaginationProps } from 'antd/lib/pagination';
import { Size, DataActions, GantPaginationProps, ColumnEdiatble, Columns } from './interface';
import EditorCol from './GridEidtColumn';
import { Rules, RuleItem } from 'async-validator';
import { paginationShowTotal } from './Pagination';

type Col = ColGroupDef | ColDef;

function itemisgroup(item, children): item is ColGroupDef {
  return !!children;
}

function ColEditableFn(fn: ColumnEdiatble<any>): IsColumnFunc | boolean {
  return (params: any) => {
    const {
      data,
      context: { globalEditable },
    } = params;
    if (typeof fn === 'function') return globalEditable ? fn(data, params) : false;
    return globalEditable ? fn : false;
  };
}
const defaultCheckboxColSelectionCol: ColDef = {
  width: 24,
  checkboxSelection: true,
  resizable: false,
  sortable: false,
  pinned: true,
  field: 'defalutSelection',
  minWidth: 24,
  headerName: '',
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  cellStyle: {
    padding: '0px 3px',
  },
  headerClass: 'gant-padding-h-3',
  suppressPaste: true,
};

const serialNumberCol: ColDef = {
  width: 55,
  sortable: false,
  pinned: true,
  minWidth: 55,
  headerName: '序号',
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  field: 'g-index',
  cellClassRules: {
    'gant-grid-cell-serial-add': params => {
      const {
        node: { rowIndex, data },
        context,
      } = params;
      return get(params, 'data._rowType') === DataActions.add;
    },
    'gant-cell-disable-sign': params => true,
  },
  valueFormatter: (params: any) => {
    const {
      node: { rowIndex, data },
      context,
    } = params;
    const computedPagination = get(context, 'computedPagination', {});

    const { defaultPageSize = 20, pageSize = defaultPageSize, current = 1 }: any = computedPagination;
    const serial = rowIndex + 1 + Math.floor(pageSize * (current - 1));
    return serial;
  },
};
export const selectedMapColumns = <T>(columns: Columns<T>[], index: number | string | string[] = 0) => {
  if (columns.length <= 0) return [];
  let colArray = [];
  if (typeof index !== 'number') {
    colArray = typeof index === 'string' ? [index] : index;
  } else {
    const columnItem = get(columns, `[${index}]`, columns[0]);
    const { fieldName: field } = columnItem;
    colArray = [field];
  }
  const selectedCol: any = [];
  columns.map(colItem => {
    const { fieldName: field, title: headerName } = colItem;
    if (colArray.indexOf(field) >= 0) selectedCol.push({ field, headerName, flex: true });
  });
  return [{ ...defaultCheckboxColSelectionCol, headerCheckboxSelection: 'multiple' }, ...selectedCol];
};
export const mapColumns = <T>(
  columns: Columns<T>[],
  getRowNodeId: any,
  defaultSelection: boolean,
  defaultSelectionCol: ColDef,
  rowSelection,
  serialNumber,
): {
  columnDefs: Col[];
  validateFields: Rules;
} => {
  // 移除所有已添加事件
  function getColumnDefs(columns: Columns<T>[]) {
    let validateFields: Rules = {};
    const columnDefs = columns.map(({ title: headerName, fieldName: field, children, render, editConfig, fixed, headerClass, cellClassRules, cellClass, cellRendererParams, ...item }, index) => {
      const ColEditable = typeof editConfig !== 'undefined';
      const colDef = {
        headerName,
        field,
        cellRendererParams: {
          render,
          ...cellRendererParams,
        },
        cellClass: classnames('gant-grid-cell', cellClass),
        cellClassRules: {
          'gant-grid-cell-modify': params => {
            const {
              data: { _rowType, ...itemData } = {} as any,
              colDef: { field },
            } = params;
            const value = get(itemData, field);
            const _rowData = get(itemData, `_rowData`, itemData);
            const originValue = get(_rowData, field);
            return _rowType === DataActions.modify && !isEqualObj(value, originValue);
          },
          'gant-grid-cell-add': params => get(params, 'data._rowType') === DataActions.add,
          'gant-cell-disable-sign': (params: any) => {
            const {
              context: { globalEditable },
              data,
            } = params;
            const editable = get(editConfig, 'editable', false);
            if (typeof editable == 'boolean') return !editable;
            return !editable(data, params);
          },
          ...cellClassRules,
        },
        cellRenderer: render ? 'gantRenderCol' : undefined,
        headerClass,
        ...item,
      } as Col;

      if (!itemisgroup(colDef, children)) {
        // 当前列允许编辑
        if (ColEditable) {
          const { props, changeFormatter, component, rules, signable, ...params } = editConfig;
          let required = false;
          const validateField = field.replace(/\./g, '-');
          if (Array.isArray(rules)) {
            const fieldsRules: RuleItem[] = rules.map(item => {
              const hasRequired = Reflect.has(item, 'required');
              required = hasRequired ? Reflect.get(item, 'required') : required;
              return { ...item };
            });
            validateFields[validateField] = fieldsRules;
          } else {
            if (!isEmpty(rules)) {
              validateFields[validateField] = { ...rules };
              required = rules['required'];
            }
          }
          colDef.cellEditorParams = {
            props,
            changeFormatter,
            rowkey: getRowNodeId,
            required,
            ...params,
          };
          colDef.cellEditorFramework = EditorCol(component);
          colDef.editable = ColEditableFn(editConfig.editable);
          colDef.headerClass = classnames(headerClass, required ? 'gant-header-cell-required' : 'gant-header-cell-edit');
          if (typeof signable === 'boolean' || typeof signable === 'function')
            colDef.cellClassRules = {
              'gant-cell-validate-sign': params => {
                const show = typeof signable === 'boolean' ? signable : signable(params);
                if (!show) return false;
                const {
                  data: { _rowError, ...itemData } = {} as any,
                  colDef: { field },
                } = params;
                return typeof get(_rowError, field, null) === 'string';
              },
              ...colDef.cellClassRules,
            };
        }
        if (fixed) colDef.pinned = fixed;
      } else if (itemisgroup(colDef, children)) {
        if (children && children.length) {
          const groupChildren = getColumnDefs(children);
          colDef.children = groupChildren.columnDefs;
          validateFields = { ...validateFields, ...groupChildren.validateFields };
        }
      }
      return colDef;
    });
    return { columnDefs, validateFields };
  }

  let { columnDefs, validateFields } = getColumnDefs(columns);
  columnDefs = serialNumber
    ? typeof serialNumber === 'boolean'
      ? [serialNumberCol, ...columnDefs]
      : [
          {
            ...serialNumberCol,
            ...serialNumber,
            cellClassRules: { ...serialNumberCol.cellClassRules, ...serialNumber.cellClassRules },
          },
          ...columnDefs,
        ]
    : columnDefs;
  columnDefs = defaultSelection
    ? [
        {
          ...defaultCheckboxColSelectionCol,
          headerCheckboxSelection: rowSelection === 'multiple',
          ...defaultSelectionCol,
        },
        ...columnDefs,
      ]
    : columnDefs;
  return { columnDefs, validateFields };
};

// 去除掉boolean类型
export type NonBool<T> = T extends boolean ? never : T;

// boolean类型
export function isbool(t: any): t is boolean {
  return typeof t === 'boolean';
}
// number
export function isnumber(t: any): t is number {
  return typeof t === 'number';
}
// string
export function isstring(t: any): t is string {
  return typeof t === 'string';
}
// array
export function isarray(t: any): t is Array<any> {
  return Array.isArray(t);
}
// promise
export function isfunc(t: any): t is Function {
  return t && typeof t === 'function';
}
// promise
export function ispromise(t: any): t is Promise<any> {
  return t && isfunc(t.then);
}
export function flattenTreeData(dataSoruce: any[], getRowNodeId, treeDataChildrenName = 'children', pathArray: string[] = []): any[] {
  let treeData: any[] = [];
  dataSoruce.map((item: any) => {
    const { [treeDataChildrenName]: children, ...itemData } = item;
    const treeDataPath = [...pathArray, getRowNodeId(itemData)];
    if (children && children.length) {
      treeData.push({ ...item, treeDataPath, parent: true });
      const childrenTreeData = flattenTreeData(children, getRowNodeId, treeDataChildrenName, treeDataPath);
      Array.prototype.push.apply(treeData, childrenTreeData);
    } else {
      treeData.push({ ...item, treeDataPath });
    }
  });
  return treeData;
}

export function isPagitation(p: GantPaginationProps): p is GantPaginationProps {
  return typeof p === 'object';
}

export function usePagination(pagitation: GantPaginationProps): any {
  if (isPagitation(pagitation)) {
    const { onChange, pageSize: size, countLimit, total, current = 1 } = pagitation;
    const limit = countLimit >= total && countLimit != 0;
    const defaultPagetation: GantPaginationProps = {
      size: 'small',
      defaultPageSize: 20,
      defaultCurrent: 1,
      pageSizeOptions: ['20', '50', '100', '150', '200', '500'],
      showSizeChanger: true,
      showQuickJumper: true,
      current,
    };
    const pageSize = useMemo(() => {
      if (isnumber(size)) {
        return size;
      }
      return defaultPagetation.defaultPageSize;
    }, [size]);
    const onPageChange = useCallback(
      (page, pageSize) => {
        const beginIndex = (page - 1) * pageSize;
        if (onChange) {
          limit ? onChange(beginIndex, pageSize, page, countLimit) : onChange(beginIndex, pageSize, page);
        }
      },
      [onChange, limit, countLimit],
    );
    const onMorePageChange = useCallback((page, pageSize) => {
      const beginIndex = (page - 1) * pageSize;
      if (onChange) {
        onChange(beginIndex, pageSize, page);
      }
    }, [onChange]);
    if (isnumber(pagitation.beginIndex)) {
      pagitation.current = pagitation.beginIndex / pageSize + 1;
    }
    const pageInfo = {
      ...defaultPagetation,
      ...pagitation,
      onChange: onPageChange,
      onShowSizeChange: onPageChange,
      total: limit ? countLimit : total,
      pageSize,
    };
    const showTotal = useCallback((total, range) => paginationShowTotal(total, range, limit, { pageSize: pageInfo.pageSize, beginIndex: pageInfo.beginIndex, current: pageInfo.current, onChange: onMorePageChange }), 
    [limit, onMorePageChange, pageInfo.pageSize, pageInfo.beginIndex, pageInfo.current]);
    return {
      ...pageInfo,
      showTotal,
    };
  }
  return false;
}
export function getSizeClassName(size: Size) {
  switch (size) {
    case 'small':
      return 'sm';
    default:
      return '';
  }
}
export const AG_GRID_STOP_PROPAGATION = '__ag_Grid_Stop_Propagation';
export function stopPropagationForAgGrid(event) {
  event[AG_GRID_STOP_PROPAGATION] = true;
}
