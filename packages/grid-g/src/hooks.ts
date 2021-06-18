import { useRef, useEffect } from 'react';
import { GridVariableRef } from './interface';
import { isEqual, uniq } from 'lodash';
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
  useEffect(() => {
    if (
      !gridVariable.hasSelectedRows ||
      !ready ||
      isEqual(selectedRows, gridVariable.selectedRows) ||
      dataSource.length <= 0
    )
      return;
    gridVariable.selectedRows = selectedRows;
    garidShowSelectedRows(selectedRows, apiRef, getRowNodeId, isSingle);
  }, [dataSource, ready, selectedRows]);
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
