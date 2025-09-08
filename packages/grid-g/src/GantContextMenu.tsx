import React, { createElement, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { map, get, isEmpty } from 'lodash';
import { Menu } from 'antd';
import Receiver from './locale/Receiver';

export const useContextMenu = (
  wrapperRef: any,
  apiRef: any,
  getCustomContextMenuItems: any,
  onCellContextMenu: any,
  hideMenuItemExport: boolean = false,
  suppressContextMenu?: boolean,
  computedPagination?: any,
  onMenuItemClearFilter?: () => void,
  showMenuItemClearFilter?: boolean,
) => {
  const [contextMenuParams, setContextMenuParams] = useState<any>({});
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  //rowClicked
  const getCellContextMenu = useCallback(
    (params: any) => {
      if (params.event.which === 3 && !suppressContextMenu) {
        setContextMenuVisible(true);
        setContextMenuParams(params);
        params.event.preventDefault(); // 阻止默认上下文菜单
      }
      onCellContextMenu && onCellContextMenu(params);
    },
    [suppressContextMenu],
  );

  const onVisibleChange = useCallback((visible: any, ...ags) => {
    setContextMenuVisible(visible);
  }, []);

  //转数据兼容新老写法
  const transData = data => {
    return map(data, item => {
      const label = item?.label || item?.name;
      return item == 'separator'
        ? {
            type: 'divider',
          }
        : {
            ...item,
            key: item?.key || item?.name,
            label: item?.menuItem ? (
              createElement(item?.menuItem, item?.menuItemParams)
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '100%',
                  lineHeight: '30px',
                }}
              >
                <span>{label}</span>
                <span>{item?.shortcut}</span>
              </div>
            ),
            children: item?.subMenu ? transData(item?.subMenu) : null,
          };
    });
  };

  const hasPagination = computedPagination && computedPagination.total > 0;

  const itemsList = useMemo(() => {
    if (suppressContextMenu || !apiRef.current || !contextMenuVisible) return [];
    const gridOptions = get(contextMenuParams, 'api.gridOptionsWrapper.gridOptions');

    const selectedRows = apiRef.current?.getSelectedRows() || [];
    let data: any[] = [];
    // 清空过滤 按钮
    const filterModal = apiRef.current?.getFilterModel();

    if (showMenuItemClearFilter && !isEmpty(filterModal)) {
      data.push({
        key: 'clearFilter',
        label: <Receiver>{locale => locale?.clearFilter}</Receiver>,
        action: () => {
          apiRef.current.setFilterModel({});
          onMenuItemClearFilter?.();
        },
      });
    }
    if (isEmpty(contextMenuParams)) return data;
    const contextMenuItems = getCustomContextMenuItems
      ? getCustomContextMenuItems(contextMenuParams)
      : [];

    data =
      transData(contextMenuItems).length == 0
        ? data
        : [...data, ...transData(contextMenuItems), { type: 'divider' }];
    const exportList = hideMenuItemExport
      ? []
      : selectedRows.length > 0
      ? [
          {
            key: 'export',
            label: (
              <Receiver>
                {locale =>
                  hasPagination ? locale?.exportCurrentPageDataAsExcel : locale?.exportDataAsExcel
                }
              </Receiver>
            ),
            action: () => {
              apiRef.current.exportDataAsExcel();
            },
          },
          {
            key: 'selectexport',
            label: <Receiver>{locale => locale?.exportSelectedDataAsExcel}</Receiver>,
            action: () => {
              apiRef.current.exportDataAsExcel({
                onlySelected: true, // 只导出勾选的行
              });
            },
          },
        ]
      : [
          {
            key: 'export',
            label: (
              <Receiver>
                {locale =>
                  hasPagination ? locale?.exportCurrentPageDataAsExcel : locale?.exportDataAsExcel
                }
              </Receiver>
            ),
            action: () => {
              apiRef.current.exportDataAsExcel();
            },
          },
        ];
    const expandBtnList = gridOptions?.treeData
      ? [
          {
            key: 'expand',
            label: <Receiver>{locale => locale?.expandAll}</Receiver>,
            action: () => {
              apiRef.current.expandAll();
            },
          },
          {
            key: 'noexpand',
            label: <Receiver>{locale => locale?.collapseAll}</Receiver>,
            action: () => {
              apiRef.current.forEachNode(node => node.setExpanded(false));
            },
          },
        ]
      : [];
    const newExpandBtnList =
      exportList.length != 0 && gridOptions?.treeData
        ? [{ type: 'divider' }, ...expandBtnList]
        : expandBtnList;
    return [...data, ...exportList, ...newExpandBtnList];
  }, [
    apiRef,
    getCustomContextMenuItems,
    contextMenuParams,
    hideMenuItemExport,
    contextMenuVisible,
  ]);

  const menuOnClick = useCallback(action => {
    setContextMenuVisible(false);
    action && action();
  }, []);

  const getContextMenuListDom = useCallback(() => {
    return itemsList.length > 0 ? (
      <Menu className="menuClassName">
        {itemsList.map((item, index) =>
          item?.type === 'divider' ? (
            <Menu.Divider key={index} />
          ) : (
            <Menu.Item
              key={index}
              disabled={item?.disabled}
              onClick={() => menuOnClick(item?.action)}
            >
              {item?.label}
            </Menu.Item>
          ),
        )}
      </Menu>
    ) : (
      <></>
    );
  }, [itemsList]);

  useEffect(() => {
    // 右击其他地方不显示上下文菜单
    const timeoutId = setTimeout(() => {
      document.addEventListener('contextmenu', event => {
        const dom: any = event.target;
        if (!dom.classList.contains('ag-cell')) {
          setContextMenuParams({});
        }
        if (!wrapperRef.current.contains(dom)) {
          setContextMenuVisible(false);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    getCellContextMenu,
    contextMenuVisible: contextMenuVisible && itemsList.length > 0,
    onVisibleChange,
    contextMenuListDom: getContextMenuListDom(),
  };
};
