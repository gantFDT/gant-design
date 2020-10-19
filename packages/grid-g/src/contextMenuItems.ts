import { GetContextMenuItemsParams, RowNode } from '@ag-grid-community/core';
import { get, max, min, isEmpty } from 'lodash';
interface ContextMenuItemsConfig {
  downShift?: boolean;
  locale: any;
  onRowsCut?: any;
  onRowsPaste?: any;
  getContextMenuItems?: any;
  getDefalutContextMenuItems?: () => any[];
}
export const gantGetcontextMenuItems = function(params: GetContextMenuItemsParams, config: ContextMenuItemsConfig) {
  const { downShift, locale, onRowsCut, onRowsPaste, getContextMenuItems } = config;
  const {
    context: { globalEditable, treeData, createConfig, getRowNodeId, gridManager, showCut },
    node,
    api,
  } = params;
  const rowIndex = get(node, 'rowIndex', 0);
  let selectedRowNodes: RowNode[] = [];
  if (node) {
    const rowNodes = api.getSelectedNodes();
    if (!downShift || rowNodes.length == 0) {
      node.setSelected(true, true);
      selectedRowNodes = [node];
    } else {
      const rowNodeIndexs = rowNodes.map(rowNode => rowNode.rowIndex);
      const maxIndex = max(rowNodeIndexs);
      const minIndex = min(rowNodeIndexs);
      if (rowIndex >= minIndex && rowIndex <= maxIndex) {
        node.setSelected(true, true);
        selectedRowNodes = [node];
      } else {
        const isMin = rowIndex < minIndex;
        const nodesCount = isMin ? minIndex - rowIndex : rowIndex - maxIndex;
        const startIndex = isMin ? rowIndex : maxIndex + 1;
        const extraNodes = Array(nodesCount)
          .fill('')
          .map((item, index) => {
            const startNode = api.getDisplayedRowAtIndex(index + startIndex);
            startNode.setSelected(true);
            return startNode;
          });
        selectedRowNodes = isMin ? [...extraNodes, ...rowNodes] : [...rowNodes, ...extraNodes];
      }
    }
  }
  const gridSelectedRows = selectedRowNodes.map(item => {
    return item.data;
  }, []);
  const gridSelectedKeys = gridSelectedRows.map(item => getRowNodeId(item), []);
  const hasCut = selectedRowNodes.length <= 0 || (treeData && isEmpty(createConfig));
  const hasPaste = selectedRowNodes.length > 1 || (treeData && isEmpty(createConfig)) || isEmpty(gridManager.cutRows);
  const items = getContextMenuItems
    ? getContextMenuItems({
        selectedRows: gridSelectedRows,
        selectedKeys: gridSelectedKeys,
        selectedRowKeys: gridSelectedKeys,
        ...params,
      } as any)
    : [];
  const defultMenu = treeData ? ['expandAll', 'contractAll', ...items, 'separator', 'export'] : [...items, 'export'];
  if (!globalEditable) return defultMenu;
  const showCutBtns = typeof showCut === 'function' ? showCut(params) : showCut;
  const editMenu = !showCutBtns
    ? [...defultMenu]
    : [
        ...defultMenu,
        'separator',
        {
          name: locale.cutRows,
          disabled: hasCut,
          action: params => {
            try {
              const canPut = onRowsCut ? onRowsCut(selectedRowNodes) : true;
              return canPut && gridManager.cut(selectedRowNodes);
            } catch (error) {}
          },
        },
        {
          name: locale.cancelCut,
          disabled: isEmpty(gridManager.cutRows),
          action: params => {
            try {
              gridManager.cancelCut();
            } catch (error) {}
          },
        },
        {
          name: locale.pasteTop,
          disabled: hasPaste,
          action: params => {
            const [rowNode] = selectedRowNodes;
            const canPaste = onRowsPaste ? onRowsPaste(gridManager.cutRows, rowNode) : true;
            canPaste && gridManager.paste(rowNode);
          },
        },
        {
          name: locale.pasteBottom,
          disabled: hasPaste,
          action: params => {
            const [rowNode] = selectedRowNodes;
            const canPaste = onRowsPaste ? onRowsPaste(gridManager.cutRows, rowNode) : true;
            canPaste && gridManager.paste(rowNode, false);
          },
        },
      ];
  return editMenu;
};
