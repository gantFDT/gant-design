import { useRef, useEffect, useCallback, useMemo } from 'react';
import { GridVariableRef, GridManager } from './interface';
import { isEqual, uniq, map, get, set, cloneDeep, last, first } from 'lodash';
import { generateUuid } from '@util';
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

  const updateSelection = useCallback((selectedRows, dataSource) => {
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
    }, 300);
  }, []);

  useEffect(() => {
    if (!gridVariable.hasSelectedRows || !ready || !apiRef.current) return;
    updateSelection(selectedRows, dataSource);
  }, [dataSource, ready, selectedRows]);
  return {
    selectedChangeRef,
    updateSelection,
  };
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
}
export function useGridPaste(props: UseGridPasteProps) {
  const { columns, gridManager, suppressCreateWhenPaste, suppressManagerPaste } = props;
  if (suppressManagerPaste) return {};
  const pastePosRef = useRef<any>({});

  // 粘贴可编辑校验
  const colEditableMap = useMemo(() => {
    const result = {};
    if (!columns) return result;
    const inner = (colDef: any) => {
      if (colDef.children) {
        colDef.children.forEach(inner);
      } else {
        if (colDef.editConfig?.suppressManagerPaste) {
          result[colDef.fieldName] = false;
        } else {
          result[colDef.fieldName] = colDef.editConfig?.editable;
        }
      }
    }
    columns.forEach(inner);
    return result;
  }, [columns]);

  const onRangeSelectionChanged = useCallback(params => {
    if (params.finished) {
      const cellRanges = gridManager.agGridApi.getCellRanges();
      if (cellRanges) {
        const startColId = get(cellRanges, '0.columns.0.colId');
        const startRowIndex = get(cellRanges, '0.startRow.rowIndex');
        const endRowIndex = get(cellRanges, '0.endRow.rowIndex');
        const xLen = get(cellRanges, '0.columns.length');

        pastePosRef.current = {
          rowIdx: startRowIndex,
          colId: startColId,
          yLen: Math.abs(endRowIndex - startRowIndex) + 1,
          xLen
        };
      }
    }
  }, []);

  const processCellForClipboard = useCallback((params) => {
    if (params.node.rowPinned === 'top') {
      return '__delete';
    }
    return params.value;
  }, [])

  const processDataFromClipboard = useCallback(params => {
    // 固定顶部行总是被复制问题
    let copyData = params.data.filter(row => first(row) !== '__delete');
    // Excel复制来的总是多一行 [''] 数据
    if (copyData.length > 1 && last(copyData).length === 1 && first(last(copyData)) === '') {
      copyData = copyData.slice(0, -1);
    }

    const pastePos = pastePosRef.current;
    if (pastePos.rowIdx !== undefined) {
      const modifiedRows: any[] = [];
      const addedRows: any[] = [];
      let colIdx: number;
      const colIds: string[] = [];
      const colDefs: any[] = [];
      
      // 复制一个单元格数据，粘贴到多个单元格
      if (copyData.length === 1 && first(copyData).length === 1) {
        const copyValue = first(first(copyData));
        copyData = [];
        const { xLen, yLen } = pastePos;

        for (let yIdx = 0; yIdx < yLen; yIdx++) {
          const copyRow = [];
          for (let xIdx = 0; xIdx < xLen; xIdx++) {
            copyRow.push(copyValue);
          }
          copyData.push(copyRow);
        }
      }

      gridManager.agGridApi.getColumnDefs().forEach((colDef: any) => {
        if (colDef.children) {
          colDefs.push(...colDef.children);
        } else {
          colDefs.push(colDef);
        }
      });
      colDefs.forEach((colDef: any, idx) => {
        if (colDef.colId === pastePos.colId) {
          colIdx = idx;
        }
        if (idx >= colIdx && idx < colIdx + first(copyData).length) {
          colIds.push(colDef.colId as string);
        }
      });
      const dataList = gridManager.getPureData();
      // 复制多个单元格数据
      copyData.forEach((vals: string[], idx: number) => {
        let newRow: any = cloneDeep(dataList[pastePos.rowIdx + idx]);
        const genColIdForEachFn = row => (colId, idx) => {
          try {
            const editable =
              typeof colEditableMap[colId] === 'function'
                ? colEditableMap[colId](row, {
                    context: params.context,
                    node: gridManager.agGridApi.getRowNode(
                      row[(gridManager.rowkey as string) || 'id'],
                    ),
                    data: row,
                  })
                : colEditableMap[colId];
            if (editable) {
              set(row, colId, vals[idx]);
            }
          } catch (error) {
            console.warn('Editable兼容性错误，', colEditableMap[colId]);
          }
        };
        if (newRow) {
          colIds.forEach(genColIdForEachFn(newRow));
          modifiedRows.push(newRow);
        } else {
          newRow = {
            [(gridManager.rowkey as string) || 'id']: 'N_' + generateUuid(),
          };
          colIds.forEach(genColIdForEachFn(newRow));
          addedRows.push(newRow);
        }
      });
      gridManager.modify(modifiedRows);
      if (!suppressCreateWhenPaste) {
        gridManager.create(addedRows);
      }
    }
    return null;
  }, []);

  return {
    singleClickEdit: false, // 双击编辑，适配粘贴
    suppressClipboardPaste: false, // 启用粘贴板
    enableRangeSelection: true, // 开启区域选中
    enableCellTextSelection: false, // 禁用文本选择

    onRangeSelectionChanged,
    processDataFromClipboard,
    processCellForClipboard
  };
}
