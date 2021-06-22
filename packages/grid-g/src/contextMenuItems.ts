import { GetContextMenuItemsParams, RowNode } from '@ag-grid-community/core';
import { DefaultJsonParams } from './interface';
import { get, max, min, isEmpty, remove } from 'lodash';
import FileSaver from 'file-saver';
interface ContextMenuItemsConfig {
  downShift?: boolean;
  locale: any;
  onRowsCut?: any;
  onRowsPaste?: any;
  getContextMenuItems?: any;
  getDefalutContextMenuItems?: () => any[];
  defaultJsonParams?: DefaultJsonParams;
  hideMenuItemExport?: boolean;
  hideMenuItemExpand?: boolean;
  hiddenMenuItemNames?: string[];
  suppressRightClickSelected?: boolean;
}

export const gantGetcontextMenuItems = function(
  params: GetContextMenuItemsParams,
  config: ContextMenuItemsConfig,
) {
  const {
    downShift,
    locale,
    onRowsCut,
    onRowsPaste,
    getContextMenuItems,
    defaultJsonParams = {},
    hideMenuItemExport,
    hideMenuItemExpand,
    hiddenMenuItemNames,
    suppressRightClickSelected,
  } = config;
  const {
    context: { globalEditable, treeData, createConfig, getRowNodeId, gridManager, showCut },
    node,
    api,
  } = params;
  const exportJson = !isEmpty(defaultJsonParams);
  const rowIndex = get(node, 'rowIndex', 0);
  let selectedRowNodes: RowNode[] = api.getSelectedNodes();
  if (node && !suppressRightClickSelected) {
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
  const gridSelectedKeys: string[] = [];
  const gridSelectedRows = selectedRowNodes.map(item => {
    gridSelectedKeys.push(getRowNodeId(get(item, 'data', {})));
    return item.data;
  }, []);
  const hasCut = selectedRowNodes.length <= 0 || (treeData && isEmpty(createConfig));
  const hasPaste =
    selectedRowNodes.length > 1 ||
    (treeData && isEmpty(createConfig)) ||
    isEmpty(gridManager.cutRows);
  const items = getContextMenuItems
    ? getContextMenuItems({
        selectedRows: gridSelectedRows,
        selectedKeys: gridSelectedKeys,
        selectedRowKeys: gridSelectedKeys,
        ...params,
      } as any)
    : [];

  if (hiddenMenuItemNames && hiddenMenuItemNames.length) {
    remove(items, (menuItem => hiddenMenuItemNames.some(menuName => menuName === menuItem.name)))
  }

  let defultMenu = [];
  if (treeData && !hideMenuItemExpand) {
    defultMenu = ['expandAll', 'contractAll'];
  }
  defultMenu = defultMenu.length > 0 ? [...defultMenu, 'separator', ...items] : [...items];

  if (!hideMenuItemExport) {
    defultMenu = defultMenu.length > 0 ? [...defultMenu, 'separator', 'export'] : ['export'];
  }

  defultMenu = exportJson
    ? [
        ...defultMenu,
        {
          name: locale.exportJson,
          action: () => {
            const { title = 'gantdGrid', onlySelected } = defaultJsonParams;
            let data = [];
            if (onlySelected) {
              data = api.getSelectedRows();
            } else {
              api.forEachNode(node => {
                if (node.data) data.push(node.data);
              });
            }
            const jsonBlob = new Blob([JSON.stringify(data)], {
              type: 'text/plain;charset=utf-8',
            });
            FileSaver.saveAs(jsonBlob, `${title}.json`);
          },
        },
      ]
    : defultMenu;

  if (!globalEditable) return defultMenu;

  defultMenu = exportJson
    ? [
        ...defultMenu,
        {
          name: locale.importJson,
          action: () => {
            const { coverData } = defaultJsonParams;
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (event: any) => {
              const [file] = event.target.files;
              const reader = new FileReader();
              reader.readAsText(file);
              reader.onload = function(event: any) {
                try {
                  const update = [],
                    add = [];
                  const json = JSON.parse(event.target.result);
                  if (coverData) {
                    api.setRowData(json);
                    gridManager.reset();
                    return;
                  }
                  json.map((itemData: any) => {
                    const rowNode = api.getRowNode(getRowNodeId(itemData));
                    if (rowNode && rowNode.data) {
                      update.push({ ...itemData, ...rowNode.data });
                    } else add.push(itemData);
                  });
                  api.applyTransactionAsync({ update }, () => {
                    gridManager.create(add);
                  });
                } catch (error) {}
              };
            };
            input.click();
          },
        },
      ]
    : defultMenu;
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
