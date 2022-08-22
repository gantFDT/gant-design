import { useRef, useEffect, useCallback, useMemo } from 'react';
import { GridVariableRef, GridManager } from './interface';
import { isEqual, uniq, map, get, set, cloneDeep } from 'lodash';
import { generateUuid } from '@util';
import {
  ColDef,
  ColumnApi,
  GridApi,
  Column,
  ValueGetterParams,
  ValueFormatterParams,
  RowNode,
} from 'ag-grid-community';
interface selectedHooksParams {
  dataSource?: any[];
  selectedRows?: any[];
  gridVariable: GridVariableRef;
  getRowNodeId: (data: any) => any;
  apiRef: any;
  ready: boolean;
  isSingle: boolean;
}

const garidShowSelectedRows = (selectedRows, apiRef: any, getRowNodeId, isSingle: boolean) => {
  const gridSelectedRows = apiRef.current.getSelectedRows();
  const gridSelcetedKeys = gridSelectedRows.map((item = {}) => getRowNodeId(item));
  const selectedKeys: string[] = selectedRows.map((item = {}) => getRowNodeId(item));
  if (selectedKeys.length === 0) apiRef.current.deselectAll();
  const allKeys = uniq([...gridSelcetedKeys, ...selectedKeys]);
  if (isSingle) {
    const [key] = selectedKeys;
    const singleNode = apiRef.current.getRowNode(key);
    singleNode && singleNode.setSelected(true, true);
    return;
  }
  allKeys.map(id => {
    const nodeItem = apiRef.current.getRowNode(id);
    if (!nodeItem) return;
    if (selectedKeys.indexOf(id) >= 0) nodeItem.setSelected(true);
    else nodeItem.setSelected(false);
  });
};
export function selectedHooks(params: selectedHooksParams) {
  const {
    dataSource = [],
    ready,
    apiRef,
    gridVariable,
    selectedRows,
    getRowNodeId,
    isSingle,
  } = params;
  const selectedChangeRef = useRef(false);

  useEffect(() => {
    if (!gridVariable.hasSelectedRows || !ready || !apiRef.current) return;
    selectedChangeRef.current = true;
    gridVariable.selectedRows = selectedRows;
    const selectedKeys = map(selectedRows, (item: any) => getRowNodeId(item));
    const gridKeys = map(apiRef.current?.getSelectedRows(), (item: any) => getRowNodeId(item));
    if (isEqual(gridKeys, selectedKeys) || dataSource.length <= 0) {
      selectedChangeRef.current = false;
      return;
    }
    garidShowSelectedRows(selectedRows, apiRef, getRowNodeId, isSingle);
    setTimeout(() => {
      selectedChangeRef.current = false;
    }, 100);
  }, [dataSource, ready, selectedRows]);
  return {
    selectedChangeRef
  }
}

export function contextHooks(
  context: any,
  apiRef: any,
  onContextChangeRender?: (
    context: any,
    diffKeys: string[],
  ) =>
    | false
    | {
        columns?: string[];
        nodeIds?: string[];
      },
) {
  const contextRef = useRef(context);
  useEffect(() => {
    const cancheContext = contextRef.current;
    const newContext = { ...cancheContext, ...context };
    const diffKeys: string[] = [];
    Object.keys(newContext).map(key => {
      if (!isEqual(cancheContext[key], context[key])) diffKeys.push(key);
    });
    if (diffKeys.length === 0) return;
    const params = onContextChangeRender && onContextChangeRender(context, diffKeys);
    if (!params) return;
    const { columns, nodeIds = [] } = params;
    let rowNodes = null;
    if (nodeIds && nodeIds.length > 0)
      rowNodes = nodeIds.map(id => {
        return apiRef.current?.getRowNode(id);
      });
    apiRef.current?.refreshCells({
      columns,
      rowNodes,
      force: true,
    });
  }, [context]);
}


export function usePrev<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Grid 复制粘贴 联动 Manager
export interface UseGridPasteProps {
  suppressManagerPaste: boolean; // 是否关闭粘贴功能
  columns?: any[]; // 粘贴可编辑校验必填
  suppressCreateWhenPaste?: boolean; // 是否不允许新增数据
  gridManager: GridManager;
  context: any;
}
export function useGridPaste(props: UseGridPasteProps) {
  const { columns, gridManager, suppressCreateWhenPaste, suppressManagerPaste, context } = props;
  if (suppressManagerPaste) return {}
  const pastePosRef = useRef<any>({})

  // 粘贴可编辑校验
  const colEditableMap = useMemo(() => {
    const result = {};
    if (!columns) return result;
    columns.forEach((colDef: any) => {
      if (colDef.children) {
        colDef.children.forEach((col: any) => {
          result[col.fieldName] = col.editConfig?.editable;
        })
      } else {
        result[colDef.fieldName] = colDef.editConfig?.editable;
      }
    });
    return result;
  }, [columns])
  
  const onRangeSelectionChanged = useCallback((params) => {
    if (params.finished) {
      const cellRanges = gridManager.agGridApi.getCellRanges();
      if (cellRanges) {
        const startColId = get(cellRanges, '0.columns.0.colId');
        const startRowIndex = get(cellRanges, '0.startRow.rowIndex');

        pastePosRef.current = {
          rowIdx: startRowIndex,
          colId: startColId
        }
      }
    }
  }, [])

  const processDataFromClipboard = useCallback((params) => {
    const pastePos = pastePosRef.current;
    if (pastePos.rowIdx !== undefined) {
      const modifiedRows: any[] = [];
      const addedRows: any[] = [];
      let colIdx: number;
      const colIds: string[] = [];
      const colDefs: any[] = [];
      gridManager.agGridApi.getColumnDefs().forEach((colDef: any) => {
        if (colDef.children) {
          colDefs.push(...colDef.children)
        } else {
          colDefs.push(colDef)
        }
      });
      colDefs.forEach((colDef: any, idx) => {
        if (colDef.colId === pastePos.colId) {
          colIdx = idx;
        }
        if (idx >= colIdx && idx < colIdx + params.data[0].length) {
          colIds.push(colDef.colId as string)
        }
      })
      const dataList = gridManager.getPureData();
      params.data.forEach((vals: string[], idx: number) => {
        // excel 粘贴总会多一行问题
        if (vals.length === 1 && vals[0] === '') {
          return;
        }
        let newRow: any = cloneDeep(dataList[pastePos.rowIdx + idx]);
        const genColIdForEachFn = (row) => (colId, idx) => {
          try {
            const editable = typeof colEditableMap[colId] === 'function'
              ? colEditableMap[colId](row, {
                  context,
                  node: gridManager.agGridApi.getRowNode(row[gridManager.rowkey as string || 'id']),
                  data: row
                })
              : colEditableMap[colId];
            if (editable) {
              set(row, colId, vals[idx]);
            }
          } catch (error) {
            console.warn('Editable兼容性错误，', colEditableMap[colId])
          }
        }
        if (newRow) {
          colIds.forEach(genColIdForEachFn(newRow))
          modifiedRows.push(newRow);
        } else {
          newRow = {
            [gridManager.rowkey as string || 'id']: 'N_' + generateUuid()
          }
          colIds.forEach(genColIdForEachFn(newRow))
          addedRows.push(newRow)
        }
      })
      gridManager.modify(modifiedRows);
      if (!suppressCreateWhenPaste) {
        gridManager.create(addedRows);
      }
    }
    return null;
  }, [])

  return {
    singleClickEdit: false, // 双击编辑，适配粘贴
    suppressClipboardPaste: false,
    onRangeSelectionChanged,
    processDataFromClipboard
  }
}