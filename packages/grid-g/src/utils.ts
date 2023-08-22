import { ColDef, ColGroupDef, GridApi, IsColumnFunc, RowNode, _ } from 'ag-grid-community';
import { Schema } from '@schema-form';
import { RuleItem, Rules } from 'async-validator';
import classnames from 'classnames';
import { findIndex, get, isEmpty, set, has } from 'lodash';
import EditorCol from './GridEidtColumn';
import { isEqualObj } from './gridManager/utils';
import { ColumnEdiatble, Columns, DataActions, GantPaginationProps, Size } from './interface';

type Col = ColGroupDef | ColDef;

//大小
export const sizeNumber = {
  small: 24,
  default: 32,
  large: 40,
};

//大小配置
export const sizeDefinitions = {
  fontSize: {
    small: 12,
    default: 12,
    large: 14,
  },

  rowHeight: {
    small: sizeNumber.small,
    default: sizeNumber.default,
    large: sizeNumber.large,
  },
  headerHeight: {
    small: sizeNumber.small,
    default: sizeNumber.default,
    large: sizeNumber.large,
  },
  floatingFiltersHeight: {
    small: sizeNumber.small,
    default: sizeNumber.default,
    large: sizeNumber.large,
  },
  paginationHeight: {
    small: 30,
    default: 40,
    large: 50,
  },
};

function itemisgroup(item, children): item is ColGroupDef {
  return !!children;
}

function ColEditableFn(fn: ColumnEdiatble<any>): IsColumnFunc {
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
  filter: false,
  cellStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  showDisabledCheckboxes: true,
  suppressColumnsToolPanel: true,
  cellClass: 'gant-grid-default-checkbox-cell',
  headerClass: 'gant-grid-default-checkbox',
};

const serialNumberCol: ColDef = {
  width: 55,
  sortable: false,
  pinned: true,
  minWidth: 55,
  headerName: '',
  resizable: false,
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  field: 'g-index',
  filter: false,
  suppressColumnsToolPanel: true,
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
  valueGetter: (params: any) => {
    const {
      node: { rowIndex, data, rowPinned },
      context,
    } = params;
    if (rowPinned) return;
    const computedPagination = get(context, 'computedPagination', {});
    const {
      defaultPageSize = 20,
      pageSize = defaultPageSize,
      beginIndex = 0,
    }: any = computedPagination;
    const serial = rowIndex + 1 + beginIndex;
    return serial;
  },
};
export const selectedMapColumns = <T>(
  columns: Columns<T>[],
  index: number | string | string[] = 0,
) => {
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
    const { fieldName: field, title: headerName, valueGetter, valueFormatter } = colItem;
    if (colArray.indexOf(field) >= 0)
      selectedCol.push({ field, headerName, valueGetter, valueFormatter, flex: 1 });
  });
  return [
    { ...defaultCheckboxColSelectionCol, headerCheckboxSelection: 'multiple' },
    ...selectedCol,
  ];
};

export const toFormMap = <T>(columns: Columns<T>[], params: any) => {
  const customFields = [];
  const valueMap = {};
  const schema: Schema = {
    type: 'object',
    propertyType: {},
  };
  const translationName = [];
  if (!Array.isArray(columns)) return { customFields, schema, valueMap };
  columns.map(({ fieldName, title, type, editConfig = {}, valueGetter, valueFormatter }) => {
    const itemName = fieldName.replace(/\./g, '_');
    if (fieldName.indexOf('.') >= 0) translationName.push(itemName);
    if (valueGetter || valueFormatter) {
      valueMap[itemName] = function(itemName, params) {
        let initialValue = valueGetter
          ? typeof valueGetter === 'string'
            ? valueGetter
            : valueGetter(params)
          : get(params, `data.${itemName}`);
        initialValue = valueFormatter
          ? valueFormatter({ ...params, value: initialValue })
          : initialValue;
        return initialValue;
      };
    }
    if (isEmpty(editConfig)) {
      return set(schema, `propertyType.${itemName}`, {
        title,
        props: {
          allowEdit: false,
        },
      });
    }

    const {
      props,
      changeFormatter,
      initValueFormatter,
      valuePropName,
      rules,
      component,
      editable,
    } = editConfig;
    customFields.push({
      type: itemName,
      component,
    });
    let itemProps = props;

    if (typeof props === 'function') itemProps = props(params, params.rowIndex);

    if (valueGetter || valueFormatter || initValueFormatter) {
      valueMap[itemName] = function(itemName, params) {
        let initialValue = valueGetter
          ? typeof valueGetter === 'string'
            ? valueGetter
            : valueGetter(params)
          : get(params, `data.${itemName}`);
        initialValue = valueFormatter
          ? valueFormatter({ ...params, value: initialValue })
          : initialValue;
        initialValue = initValueFormatter
          ? initValueFormatter({ ...params, value: initialValue })
          : initialValue;
        return initialValue;
      };
    }

    set(schema, `propertyType.${itemName}`, {
      title,
      props: {
        ...itemProps,
        allowEdit: ColEditableFn(editable)(params),
      },
      options: {
        rules: rules ? (Array.isArray(rules) ? rules : [rules]) : undefined,
        getValueFromEvent: changeFormatter,
        valuePropName: valuePropName ? valuePropName : 'value',
      },
      componentType: itemName,
    });
  });
  return { customFields, schema, valueMap, translationName };
};

export const mapColumns = <T>(
  columns: Columns<T>[],
  getRowNodeId: any,
  defaultSelection: boolean,
  defaultSelectionCol: ColDef,
  rowSelection,
  serialNumber,
  size: Size,
): {
  columnDefs: Col[];
  validateFields: Rules;
  requireds: string[];
} => {
  // 移除所有已添加事件
  function getColumnDefs(columns: Columns<T>[], hide?: boolean) {
    let validateFields: Rules = {};
    let requireds = [];
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
          headerTooltip: headerName,
          cellClass: cellClass,
          cellClassRules: {
            'gant-grid-cell': () => true,
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
            'gant-grid-cell-edit': (params: any) => {
              const {
                context: { globalEditable },
                data,
              } = params;
              const editable = get(editConfig, 'editable', false);
              if (typeof editable == 'boolean') return editable;
              return editable(data, params);
            },
            ...cellClassRules,
          },
          cellRenderer: render ? 'gantRenderCol' : undefined,
          headerClass,
          ...item,
          hide: has(item, 'hide') ? item.hide : hide,
        } as Col;

        if (!itemisgroup(colDef, children)) {
          // 当前列允许编辑
          if (ColEditable) {
            const {
              props,
              changeFormatter,
              component,
              rules,
              signable = true,
              ...params
            } = editConfig;
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
                required = get(rules, 'required', false);
              }
            }
            required = !signable ? true : required;
            if (required) {
              requireds.push(field);
            }
            colDef.cellEditorParams = {
              props,
              changeFormatter,
              rowkey: getRowNodeId,
              required,
              valueGetter: item.valueGetter,
              ...params,
            };
            colDef.cellEditorFramework = EditorCol(component);
            colDef.editable = ColEditableFn(editConfig.editable);

            switch (typeof headerClass) {
              case 'string':
                colDef.headerClass = classnames(
                  headerClass,
                  required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
                );
                break;
              case 'object':
                if (Array.isArray(headerClass)) {
                  colDef.headerClass = [
                    ...headerClass,
                    required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
                  ];
                }
                break;
              case 'function':
                colDef.headerClass = (params: any) => {
                  const _class = headerClass(params);
                  if (typeof _class === 'string')
                    return classnames(
                      _class,
                      required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
                    );
                  return [
                    ..._class,
                    required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
                  ];
                };
              default:
                colDef.headerClass = classnames(
                  required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
                );
            }

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
            const groupChildren = getColumnDefs(children, get(item, 'hide', hide));
            colDef.children = groupChildren.columnDefs;
            colDef.marryChildren = true;
            validateFields = { ...validateFields, ...groupChildren.validateFields };
          }
        }
        return colDef;
      },
    );
    return { columnDefs, validateFields, requireds };
  }

  let { columnDefs, validateFields, requireds } = getColumnDefs(columns);
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
          width: sizeNumber[size],
          headerCheckboxSelection: rowSelection === 'multiple',
          ...defaultSelectionCol,
          cellClassRules: {
            'gant-grid-cell-checkbox-indeterminate': params => {
              const { node, context } = params;
              const { groupSelectsChildren, selectedRows, getRowNodeId } = context;

              const index = findIndex(selectedRows, item => getRowNodeId(item) === node.id);

              if (!groupSelectsChildren) return false;

              if (!node.isSelected() && index < 0) return false;
              const { allLeafChildren = [] } = node;

              for (let itemNode of allLeafChildren) {
                if (!itemNode.isSelected()) return true;
              }
              return false;
            },
            ...get(defaultSelectionCol, 'cellClassRules', {}),
          },
        },
        ...columnDefs,
      ]
    : columnDefs;
  return { columnDefs, validateFields, requireds };
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

export function isPagitation(p: GantPaginationProps): p is GantPaginationProps {
  return typeof p === 'object';
}

export function usePagination(
  pagitation: GantPaginationProps,
  size: string,
  defapagitation: GantPaginationProps,
): any {
  if (isPagitation(pagitation)) {
    const defaultPagetation: GantPaginationProps = {
      size,
      defaultPageSize: 50,
      defaultCurrent: 1,
      pageSizeOptions: ['50', '200', '500', '1000', '3000', '5000', '10000'],
      showSizeChanger: true,
      showQuickJumper: true,
      countLimit: 50000,
      showLessItems: true,
      align: 'left',
      ...defapagitation,
    };
    return {
      ...defaultPagetation,
      ...pagitation,
    };
  }
  return false;
}
// export function getSizeClassName(size: Size) {
//   switch (size) {
//     case 'small':
//       return 'sm';
//     default:
//       return '';
//   }
// }
export const AG_GRID_STOP_PROPAGATION = '__ag_Grid_Stop_Propagation';
export function stopPropagationForAgGrid(event) {
  event[AG_GRID_STOP_PROPAGATION] = true;
}

export function groupNodeSelectedToggle(node: RowNode, selected: boolean) {
  const { childrenAfterFilter = [] } = node;
  childrenAfterFilter.map(itemNode => {
    itemNode.setSelected(selected);
    groupNodeSelectedToggle(itemNode, selected);
  });
}

export function checkParentGroupSelectedStatus(node: RowNode, selected: boolean, api: GridApi) {
  const { parent } = node;
  if (parent.level < 0) return;
  if (selected) {
    parent.setSelected(selected);
    checkParentGroupSelectedStatus(parent, selected, api);
    api.refreshCells({
      columns: ['defalutSelection'],
      rowNodes: [parent],
      force: true,
    });
    return;
  }
  const { childrenAfterFilter = [] } = parent;
  for (let itemNode of childrenAfterFilter) {
    if (itemNode.isSelected()) {
      parent.setSelected(true);
      api.refreshCells({
        columns: ['defalutSelection'],
        rowNodes: [parent],
        force: true,
      });
      return;
    }
  }
  parent.setSelected(false);
  checkParentGroupSelectedStatus(parent, selected, api);
}

/**
 * 判断是否导出隐藏字段
 * @param col 当前列
 * @param exportHiddenFields 隐藏字段导出状态
 */
export function isExportHiddenFields(col: ColDef, exportHiddenFields: boolean) {
  if (!exportHiddenFields) {
    let hide = col.hide || false;
    return hide !== true;
  }
  return exportHiddenFields;
}

/**
 * 获取 column 信息
 * @param column
 */
export function getColumnInfo(column) {
  let fieldName = column.field;
  const children = column.children;
  if (column.hasOwnProperty('groupId')) {
    fieldName = column.groupId;
  } else if (column.hasOwnProperty('colId')) {
    fieldName = column.colId;
  }
  return { fieldName, children };
}
