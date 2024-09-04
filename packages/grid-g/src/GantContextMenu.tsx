import React, { createElement, useCallback, useEffect, useMemo, useState } from 'react';
import { map, isString } from 'lodash';
import { Menu } from 'antd';

export const useContextMenu = (apiRef: any, getCustomContextMenuItems: any, onCellContextMenu: any, suppressContextMenu?: boolean) => {
    const [contextMenuParams, setContextMenuParams] = useState([]);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);

    //rowClicked
    const getCellContextMenu = useCallback((params: any) => {
        if (params.event.which === 3 && !suppressContextMenu) {
            setContextMenuParams(params);
            setContextMenuVisible(true);
            params.event.preventDefault(); // 阻止默认上下文菜单
        }
        onCellContextMenu && onCellContextMenu(params);
    }, [suppressContextMenu]);

    const onVisibleChange = useCallback((visible: any) => {
        setContextMenuVisible(visible);
    }, [])


    //转数据兼容新老写法
    const transData = (data) => {
        return map(data, (item) => {
            const label = item?.label || item?.name;
            return item == 'separator'
                ? {
                    type: 'divider',
                }
                : {
                    ...item,
                    key: item?.key || item?.name,
                    label: (
                        item?.menuItem ?
                            createElement(item?.menuItem, item?.menuItemParams)
                            :
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

    const itemsList = useMemo(() => {
        if (contextMenuParams.length === 0) return [];
        const contextMenuItems = getCustomContextMenuItems ? getCustomContextMenuItems(contextMenuParams) : [];
        const data = transData(contextMenuItems).length == 0 ? [] : [...transData(contextMenuItems), { type: 'divider' }];
        const list = [
            {
                key: 'export',
                label: '全部导出',
                action: () => {
                    apiRef.current.exportDataAsExcel();
                },
            },
            {
                key: 'selectexport',
                label: '选中导出',
                action: () => {
                    apiRef.current.exportDataAsExcel({
                        onlySelected: true, // 只导出勾选的行
                    });
                },
            },
            {
                type: 'divider',
            },
            {
                key: 'expand',
                label: '展开所有',
                action: () => {
                    apiRef.current.expandAll();
                },
            },
            {
                key: 'noexpand',
                label: '收起所有',
                action: () => {
                    apiRef.current.forEachNode((node) => node.setExpanded(false));
                },
            },
        ];
        return [...data, ...list];
    }, [apiRef, getCustomContextMenuItems, contextMenuParams]);

    const menuOnClick = useCallback((action) => {
        setContextMenuVisible(false);
        action && action();
    }, [])

    const getContextMenuListDom = useCallback(() => {
        return (itemsList.length > 0 ? <Menu
            className='menuClassName'
        >
            {itemsList.map((item, index) => (
                item?.type === 'divider'
                    ?
                    <Menu.Divider key={index} />
                    :
                    <Menu.Item key={index} disabled={item?.disabled} onClick={() => menuOnClick(item?.action)}>
                        {item?.label}
                    </Menu.Item>
            ))}
        </Menu> : <></>)
    }, [itemsList])

    useEffect(() => {
        // 右击其他地方不显示上下文菜单
        const timeoutId = setTimeout(() => {
            document.addEventListener('contextmenu', (event) => {
                const dom: any = event.target;
                if (!dom.classList.contains("ag-cell")) {
                    setContextMenuParams([]);
                    setContextMenuVisible(false);
                }
            });
        }, 300);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [])

    return {
        getCellContextMenu,
        contextMenuVisible,
        onVisibleChange,
        contextMenuListDom: getContextMenuListDom(),
    };
};