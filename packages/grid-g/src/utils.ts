import { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { ColGroupDef, ColDef, IsColumnFunc, IServerSideGetRowsParams } from 'ag-grid-community';
import { get, isEmpty } from 'lodash';
import { isEqualObj } from './gridManager/utils';
import { PaginationProps } from 'antd/lib/pagination';
import { Size, DataActions, Pagination, ColumnEdiatble, Columns } from './interface';
import EditorCol from './GridEidtColumn';
import { Rules, RuleItem } from 'async-validator';

type Col = ColGroupDef | ColDef;

function itemisgroup(item, children): item is ColGroupDef {
  return !!children;
}

function ColEditableFn(fn: ColumnEdiatble<any>): IsColumnFunc | boolean {
  return ({ data, context: { golbalEditable } }) => {
    if (typeof fn === 'function') return golbalEditable ? fn(data) : false;
    return golbalEditable ? fn : false;
  };
}

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
    const columnDefs = columns.map(
      (
        {
          title: headerName,
          fieldName: field,
          children,
          render,
          editConfig,
          fixed,
          headerClass,
          cellClassRules,
          cellClass,
          cellRendererParams,
          ...item
        },
        index,
      ) => {
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
                value,
              } = params;
              const _rowData = get(itemData, `_rowData`, itemData);
              const originValue = get(_rowData, field);
              return _rowType === DataActions.modify && !isEqualObj(value, originValue);
            },
            'gant-grid-cell-add': params => get(params, 'data._rowType') === DataActions.add,
            ...cellClassRules,
          },
          cellRenderer: render ? 'gantRenderCol' : undefined,
          headerClass,
          ...item,
        } as Col;

        if (!itemisgroup(colDef, children)) {
          // 当前列允许编辑
          if (ColEditable) {
            const { props, changeFormatter, component, rules, ...params } = editConfig;
            let required = false;
            if (Array.isArray(rules)) {
              const fieldsRules: RuleItem[] = rules.map(item => {
                const hasRequired = Reflect.has(item, 'required');
                required = hasRequired ? Reflect.get(item, 'required') : required;
                return { ...item };
              });
              validateFields[field] = fieldsRules;
            } else {
              if (!isEmpty(rules)) {
                validateFields[field] = { ...rules };
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
            colDef.headerClass = classnames(
              headerClass,
              required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
            );
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
      },
    );
    return { columnDefs, validateFields };
  }
  const defaultCheckboxColSelectionCol: ColDef = {
    width: 24,
    checkboxSelection: true,
    resizable: false,
    sortable: false,
    pinned: true,
    field: 'defalutSelection',
    headerCheckboxSelection: rowSelection === 'multiple',
    minWidth: 24,
    headerName: '',
    suppressMenu: true,
    lockPosition: true,
    lockVisible: true,
    cellStyle: {
      padding: '0px 3px',
    },
    headerClass: 'gant-padding-h-3',
    ...defaultSelectionCol,
  };
  const serialNumberCol: ColDef = {
    width: 50,
    sortable: false,
    pinned: true,
    minWidth: 50,
    headerName: '序号',
    suppressMenu: true,
    lockPosition: true,
    lockVisible: true,
    field: 'g-index',
    valueFormatter: (parmas: any) => {
      const {
        node: { rowIndex },
        context,
      } = parmas;
      const computedPagination = get(context, 'computedPagination', {});
      const { pageSize = 0, beginIndex = 0 }: any = computedPagination;

      return parseInt(rowIndex + 1 + parseInt(pageSize * beginIndex + '')) + '';
    },
  };
  let { columnDefs, validateFields } = getColumnDefs(columns);
  columnDefs = serialNumber ? [serialNumberCol, ...columnDefs] : columnDefs;
  columnDefs = defaultSelection ? [defaultCheckboxColSelectionCol, ...columnDefs] : columnDefs;
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
export function flattenTreeData(
  dataSoruce: any[],
  getRowNodeId,
  treeDataChildrenName = 'children',
  pathArray: string[] = [],
): any[] {
  let treeData: any[] = [];
  dataSoruce.map((item: any) => {
    const { [treeDataChildrenName]: children, ...itemData } = item;
    const treeDataPath = [...pathArray, getRowNodeId(itemData)];
    if (children && children.length) {
      treeData.push({ ...item, treeDataPath, parent: true });
      const childrenTreeData = flattenTreeData(
        children,
        getRowNodeId,
        treeDataChildrenName,
        treeDataPath,
      );
      Array.prototype.push.apply(treeData, childrenTreeData);
    } else {
      treeData.push({ ...item, treeDataPath });
    }
  });
  return treeData;
}

export function isPagitation(p: Pagination): p is Pagination {
  return typeof p === 'object';
}

export function usePagination(pagitation: Pagination): PaginationProps {
  if (isPagitation(pagitation)) {
    const { onChange, pageSize: size } = pagitation;
    const showTotal = useCallback(
      (total, range) => (total > 0 ? `第${range[0]} - ${range[1]}条，共${total}条` : ''),
      [],
    );

    const defaultPagetation: Pagination = {
      size: 'small',
      defaultPageSize: 20,
      defaultCurrent: 1,
      pageSizeOptions: ['20', '50', '100', '150', '200', '500'],
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal,
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
          onChange(beginIndex, pageSize, page);
        }
      },
      [onChange],
    );

    if (isnumber(pagitation.beginIndex)) {
      pagitation.current = pagitation.beginIndex / pageSize + 1;
    }
    return {
      ...defaultPagetation,
      ...pagitation,
      onChange: onPageChange,
      onShowSizeChange: onPageChange,
    };
  }
}
export function getSizeClassName(size: Size) {
  switch (size) {
    case 'small':
      return 'sm';
    default:
      return '';
  }
}
