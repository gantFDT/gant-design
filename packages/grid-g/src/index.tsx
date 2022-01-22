import {
  CellEditingStoppedEvent,
  ColDef,
  ColGroupDef,
  ColumnApi,
  ColumnMovedEvent,
  ColumnResizedEvent,
  ColumnVisibleEvent,
  GetContextMenuItemsParams,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
  RowDataUpdatedEvent,
  RowDoubleClickedEvent,
  RowNode,
  RowSelectedEvent,
  SelectionChangedEvent,
  SuppressKeyboardEventParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllModules, LicenseManager } from '@ag-grid-enterprise/all-modules';
import { Spin } from 'antd';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import classnames from 'classnames';
import { findIndex, get, isEmpty, isEqual, isObject } from 'lodash';
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gantGetcontextMenuItems } from './contextMenuItems';
import CustomHeader from './CustomHeader';
import { filterHooks } from './gantFilter';
import GantGridFormToolPanelRenderer from './GantGridFormToolPanelRenderer';
import GridManager from './gridManager';
import { contextHooks, selectedHooks } from './hooks';
import { DataActions, GridPropsPartial, GridVariableRef, RowSelection, Size } from './interface';
import key from './license';
import en from './locale/en-US';
import zh from './locale/zh-CN';
import { getAllComponentsMaps, getGridConfig } from './maps';
import GantPagination from './Pagination';
import SelectedGrid from './SelectedGrid';
import GantDateComponent from './GantDateComponent';
import './style';
import {
  checkParentGroupSelectedStatus,
  flattenTreeData,
  getSizeClassName,
  groupNodeSelectedToggle,
  mapColumns,
  selectedMapColumns,
  usePagination,
} from './utils';
export { default as GantGroupCellRenderer } from './GantGroupCellRenderer';
export { default as GantPromiseCellRender } from './GantPromiseCellRender';
export * from './interface';
export { default as GantDateComponent } from './GantDateComponent';
export { setComponentsMaps, setFrameworkComponentsMaps, setGridConfig } from './maps';
LicenseManager.setLicenseKey(key);
const langs = {
  en: en,
  'zh-cn': zh,
};

export const GridContext = createContext<any>({});
export const defaultProps = {
  /**加载状态 */
  loading: false,
  resizable: true,
  /**是否处于编辑状态 */
  editable: false,
  /**单列的过滤器 */
  filter: true,
  /**禁止调整列顺序 */
  // lockPosition: false,
  /**直接在列头下面显示过滤器 */
  floatingFilter: false,
  /**编辑状态下的尺寸 */
  size: Size.small,
  /**rowkey */
  rowkey: 'key',
  width: '100%',
  sortable: true,
  treeDataChildrenName: 'children',
  /** 默认的删除行为 */
  /**是否执行treeDataPath计算 */
  isCompute: false,
  //默认开启编辑校验
  openEditSign: true,
  //默认使用gant自定义列头
  gantCustomHeader: true,
};

export const defaultRowSelection: RowSelection = {
  type: 'multiple',
  // checkboxIndex: 0,
  showDefalutCheckbox: true,
  // rowMultiSelectWithClick: true,
  rowDeselection: true,
};

const Grid = function Grid<T extends any>(gridProps: GridPropsPartial<T>) {
  const globalConfig = useMemo(() => {
    return getGridConfig();
  }, []);
  const props = { ...globalConfig, ...gridProps };
  const {
    dataSource: initDataSource,
    onReady,
    columns,
    editable,
    rowSelection: rowSel,
    size,
    rowkey,
    gridKey,
    resizable,
    filter,
    sortable,
    width,
    height,
    treeData,
    pagination,
    loading,
    isServerSideGroup,
    getServerSideGroupKey,
    frameworkComponents = {},
    treeDataChildrenName,
    locale: customLocale,
    serverGroupExpend,
    groupDefaultExpanded = 0,
    defaultColDef,
    context: propsContext,
    components,
    serialNumber,
    rowClassRules,
    isCompute,
    getDataPath: orignGetDataPath,
    onCellEditChange,
    onCellEditingChange,
    onCellChanged,
    openEditSign = true,
    getContextMenuItems,
    createConfig,
    onRowsCut,
    onRowsPaste,
    onRowsPasteEnd,
    showCut = false,
    onContextChangeRender,
    defaultExportParams,
    defaultJsonParams,
    editChangeCallback,
    isRowSelectable,
    boxColumnIndex,
    hideSelectedBox,
    hideSelcetedBox,
    suppressKeyboardEvent,
    onSelectionChanged: propsOnSelectionChanged,
    onRowSelected: propsOnRowSelected,
    onRowDataUpdated: propOnRowDataUpdated,
    onRowDataChanged: propOnRowDataChanged,
    groupSelectsChildren,
    onColumnMoved,
    onColumnResized,
    onColumnVisible,
    onRowClicked,
    drawerMode,
    multiLineVerify,
    defaultDrawerWidth,
    selectedBoxHeight,
    selectedBoxWidth = 240,
    onRowDoubleClicked,
    onFilterModified: handleFilterModified,
    doubleClickedExpanded,
    customDrawerContent,
    visibleDrawer: propVisibleDrawer,
    hideMenuItemExport,
    hideMenuItemExpand,
    hiddenMenuItemNames,
    excelStyles = [],
    suppressRightClickSelected,
    treeDataForcedFilter,
    themeClass = 'ag-theme-balham',
    gantDateComponent,
    autoHeight,
    maxAutoHeight,
    minAutoHeight = 150,
    showCutChild,
    gantCustomHeader,
    numberGoToMode = false,
    ...orignProps
  } = props;
  const apiRef = useRef<GridApi>();
  const shiftRef = useRef<boolean>(false);
  const selectedChanged = useRef<boolean>(false);
  const columnsRef = useRef<ColumnApi>();
  const selectedLoadingRef = useRef<boolean>(false);
  const gridRef = useRef<any>();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<RowClickedEvent>();

  const gridVariableRef = useRef<GridVariableRef>({
    hasSelectedRows:
      typeof rowSel !== 'boolean' && isObject(rowSel) && Reflect.has(rowSel, 'selectedRows'),
    hideSelectedBox: hideSelcetedBox || hideSelectedBox,
    selectedRows: [],
  });
  const [innerSelectedRows, setInnerSelectedRows] = useState([]);
  const [ready, setReady] = useState(false);
  //自定义列头文字
  const { ColumnLabelComponent } = frameworkComponents;
  const gridManager = useMemo(() => {
    return new GridManager();
  }, []);
  /**默认基本方法 */
  const getRowNodeId = useCallback(data => {
    if (typeof rowkey === 'string') {
      return get(data, rowkey);
    }
    return rowkey(data);
  }, []);

  const getDataPath = useCallback(
    data => {
      if (!treeData) return [];
      let dataPath = orignGetDataPath ? orignGetDataPath(data) : isCompute ? data.treeDataPath : [];
      return dataPath;
    },
    [orignGetDataPath, treeData],
  );
  //自动高度
  const gridHeight = useMemo(() => {
    if (height) return height;
    if (!autoHeight && !height) return 400;
    let data = initDataSource;
    if (!data) {
      data = [];
    }
    let resHeight: number | string = 0;
    if (!treeData || groupDefaultExpanded === -1) {
      resHeight = 24 * (data.length + 1);
    } else {
      const filterData = data.filter(itemData => {
        const isExpaned = getDataPath(itemData).length <= groupDefaultExpanded + 1;
        return isExpaned;
      });
      resHeight = 24 * (filterData.length + 1);
    }
    resHeight = maxAutoHeight && resHeight >= maxAutoHeight ? maxAutoHeight : resHeight;
    resHeight = minAutoHeight && minAutoHeight >= resHeight ? minAutoHeight : resHeight;
    return parseInt(resHeight as any) + 4;
  }, [autoHeight, initDataSource, getDataPath, groupDefaultExpanded, height]);

  // filter

  useEffect(() => {
    if (typeof propVisibleDrawer === 'boolean') {
      setVisibleDrawer(propVisibleDrawer);
    }
  }, [propVisibleDrawer]);

  // 判断数据分别处理 treeTable 和普通table
  const dataSource = useMemo(() => {
    if (treeData && isCompute)
      return flattenTreeData(initDataSource, getRowNodeId, treeDataChildrenName);
    return initDataSource;
  }, [initDataSource, treeData, treeDataChildrenName]);
  const serverDataRequest = useCallback(
    (params, groupKeys, successCallback) => {
      if (serverGroupExpend) {
        return serverGroupExpend(params, serverDataCallback(groupKeys, successCallback));
      }
      return successCallback([], 0);
    },
    [serverGroupExpend],
  );
  /**fix: 解决保存时候标记状态无法清楚的问题 */
  // 分页事件
  const computedPagination: any = useMemo(() => usePagination(pagination), [pagination]);

  // context
  const context = useMemo(() => {
    return {
      globalEditable: editable,
      serverDataRequest,
      isServerSideGroup,
      size,
      getDataPath: getDataPath,
      computedPagination,
      treeData,
      gridManager,
      showCut,
      createConfig,
      getRowNodeId,
      watchEditChange: typeof onCellEditChange === 'function',
      onCellEditChange,
      onCellEditingChange,
      onCellChanged,
      ...propsContext,
    };
  }, [
    propsContext,
    size,
    computedPagination,
    editable,
    drawerMode,
    showCut,
    onCellEditChange,
    onCellEditingChange,
    onCellChanged,
    getDataPath,
  ]);

  const {
    filterDataRef,
    onFilterModified,
    forcedGridKey,
    filterModelRef,
    columnIdRef,
  } = filterHooks({
    treeData,
    treeDataForcedFilter,
    handleFilterModified,
    getRowNodeId,
    dataSource,
    context,
  });
  const gridForcedProps = useMemo(() => {
    if (!treeDataForcedFilter && forcedGridKey) return {};
    return {
      key: forcedGridKey,
    };
  }, [forcedGridKey]);

  // 处理selection
  const gantSelection: RowSelection = useMemo(() => {
    if (rowSel === true) {
      return defaultRowSelection;
    }
    if (rowSel) return { ...defaultRowSelection, ...rowSel };
    return {};
  }, [rowSel]);
  const {
    onSelect,
    selectedRows,
    showDefalutCheckbox,
    type: rowSelection,
    onSelectedChanged,
    defaultSelectionCol,
    ...selection
  } = gantSelection;

  // 初始注册配置信息；
  useEffect(() => {
    gridManager.reset({
      getRowNodeId,
      createConfig,
      treeData,
      getDataPath,
      isCompute,
      treeDataChildrenName,
      editChangeCallback,
      onRowsPasteEnd,
      multiLineVerify,
    });
  }, []);
  useEffect(() => {
    if (ready) gridManager.dataSourceChanged(dataSource);
  }, [dataSource, ready]);
  const serverDataCallback = useCallback((groupKeys, successCallback) => {
    return rows => {
      successCallback(rows, rows.length);
      gridManager.appendChild(groupKeys, rows);
    };
  }, []);

  const { componentsMaps, frameworkComponentsMaps } = useMemo(() => {
    return getAllComponentsMaps();
  }, []);

  // 获取selected 数据
  const getAllSelectedRows = useCallback(selectedRows => {
    const dataSource = gridManager.agGridConfig.dataSource;
    const currentRows: string[] = [];
    const extraRows: any[] = [];
    selectedRows.map(itemRow => {
      const index = findIndex(dataSource, function(itemData) {
        return getRowNodeId(itemData) === getRowNodeId(itemRow);
      });
      if (
        index < 0 &&
        !apiRef.current.getRowNode(getRowNodeId(itemRow)) &&
        get(itemRow, '_rowType') !== DataActions.add
      )
        extraRows.push(itemRow);
      else {
        currentRows.push(itemRow);
      }
    });
    return { extraRows, currentRows };
  }, []);
  const onBoxSelectionChanged = useCallback(
    (keys, rows) => {
      if (!gridVariableRef.current.hasSelectedRows) {
        const nodes = apiRef.current?.getSelectedNodes();
        const innerSelectedRows: any[] = [];
        nodes.map(node => {
          const nodeId = getRowNodeId(get(node, 'data'));
          if (keys.indexOf(nodeId) < 0) return node.setSelected(false);
          innerSelectedRows.push(get(node, 'data'));
        });
        setInnerSelectedRows(innerSelectedRows);
      }
      onSelect && onSelect(keys, rows);
    },
    [onSelect],
  );
  const { selectedChangeRef } = selectedHooks({
    gridVariable: gridVariableRef.current,
    ready,
    apiRef,
    dataSource,
    getRowNodeId,
    selectedRows,
    isSingle: rowSelection === 'single',
  });
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      propsOnSelectionChanged && propsOnSelectionChanged(event);
      // if (selectedChangeRef.current) return;
      if (gridVariableRef.current?.hasSelectedRows && rowSelection === 'multiple') {
        const rows = event.api.getSelectedRows();
        const { extraRows, currentRows } = getAllSelectedRows(
          get(gridVariableRef.current, 'selectedRows', []),
        );
        if (isEqual(currentRows, rows)) return;
        const selectedRows = [...extraRows, ...rows];
        return (
          onSelect &&
          onSelect(
            selectedRows.map(item => getRowNodeId(item)),
            selectedRows,
          )
        );
      }
      const rows = event.api.getSelectedRows();
      if (isEqual(gridVariableRef.current?.selectedRows, rows)) return;
      onSelect &&
        onSelect(
          rows.map(item => getRowNodeId(item)),
          rows,
        );
      if (gridVariableRef.current?.hideSelectedBox) return;

      gridVariableRef.current.selectedRows = rows;
      setInnerSelectedRows(rows);
    },
    [getAllSelectedRows, propsOnSelectionChanged, rowSelection],
  );

  const handleRowClicked = useCallback(
    (event: RowClickedEvent) => {
      if (drawerMode && visibleDrawer) {
        if (typeof propVisibleDrawer !== 'boolean') setVisibleDrawer(true);
        setClickedEvent(event);
      }
      onRowClicked && onRowClicked(event);
    },
    [onRowClicked, drawerMode, propVisibleDrawer],
  );

  const handleRowDoubleClicked = useCallback(
    (event: RowDoubleClickedEvent) => {
      if (onRowDoubleClicked) onRowDoubleClicked(event);
      const doubleClickedOpenDrawer = true
      if(drawerMode && doubleClickedOpenDrawer){
        if (typeof propVisibleDrawer !== 'boolean') setVisibleDrawer(true);
        setClickedEvent(event);
      }
      if (doubleClickedExpanded){
        const { node } = event;
        if (node.childrenAfterGroup.length > 0) node.setExpanded(!node.expanded);
      };
    },
    [onRowDoubleClicked, drawerMode, doubleClickedExpanded],
  );

  const onRowSelected = useCallback(
    (event: RowSelectedEvent) => {
      if (selectedChanged.current) return;
      propsOnRowSelected && propsOnRowSelected(event);
      if (!groupSelectsChildren || !treeData) return;
      const gridSelectedRows = event.api.getSelectedRows();
      if (
        gridSelectedRows.length === 0 ||
        gridManager.getRowData().length === gridSelectedRows.length
      )
        return;
      if (selectedLoadingRef.current) return;
      selectedLoadingRef.current = true;
      const { node } = event;
      const nodeSelected = node.isSelected();
      groupNodeSelectedToggle(node, nodeSelected);
      checkParentGroupSelectedStatus(node, nodeSelected, event.api);
      setTimeout(() => {
        selectedLoadingRef.current = false;
        event.api.refreshCells({
          columns: ['defalutSelection'],
          rowNodes: [node],
          force: true,
        });
      }, 200);
    },
    [propsOnRowSelected],
  );

  const boxSelectedRows = useMemo(() => {
    if (gridVariableRef.current.hasSelectedRows) return selectedRows;
    return innerSelectedRows;
  }, [innerSelectedRows, selectedRows]);
  // 处理selection-end
  //columns
  const defaultSelection = !isEmpty(gantSelection) && showDefalutCheckbox;
  const { columnDefs, validateFields, requireds } = useMemo(() => {
    return mapColumns<T>(
      columns,
      getRowNodeId,
      defaultSelection,
      defaultSelectionCol,
      rowSelection,
      serialNumber,
      groupSelectsChildren,
    );
  }, [columns]);
  // 选中栏grid  columns;
  const selectedColumns = useMemo(() => {
    return selectedMapColumns(columns, boxColumnIndex);
  }, [columns, boxColumnIndex]);
  /// 导出 columns
  const getExportColmns = useCallback(columns => {
    const arr: string[] = [];
    columns.map((item: any) => {
      if (item.field !== 'defalutSelection' && item.field !== 'g-index') {
        item.field && arr.push(item.field);
        if (Array.isArray(item.children)) {
          const childrenArray = getExportColmns(item.children);
          arr.push(...childrenArray);
        }
      }
    });
    return arr;
  }, []);
  const exportColumns = useMemo(() => {
    return getExportColmns(columnDefs);
  }, [columnDefs]);
  // 配置验证规则
  useEffect(() => {
    gridManager.validateFields = validateFields;
  }, [validateFields]);
  // 监听columns变换
  const onColumnsChange = useCallback(
    (event: ColumnMovedEvent | ColumnResizedEvent | ColumnVisibleEvent) => {
      switch (event.type) {
        case 'columnVisible':
          onColumnVisible && onColumnVisible(event as any);
          break;
        case 'columnResized':
          onColumnResized && onColumnResized(event as any);
          break;
        case 'columnMoved':
          onColumnMoved && onColumnMoved(event as any);
          break;
      }
      gridManager.setLocalStorageColumnsState();
    },
    [onColumnMoved, onColumnResized, onColumnVisible],
  );
  const localColumnsDefs = useMemo(() => {
    return gridManager.getLocalStorageColumns(columnDefs, gridKey);
  }, [columnDefs, gridKey]);

  // columns-end
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      apiRef.current = params.api;
      columnsRef.current = params.columnApi;
      gridManager.agGridApi = params.api;
      gridManager.agGridColumnApi = params.columnApi;
      gridManager.rowkey = rowkey
      onReady && onReady(params, gridManager);
      setReady(true);
      // if (filterModelRef.current && treeDataForcedFilter) {
      //   params.api.setRowData(get(gridManager, 'agGridConfig.dataSource', []));
      //   params.api.setFilterModel(filterModelRef.current);
      //   // params.api.ensureColumnVisible(columnIdRef?.current);
      //   // const {lef} = get(columnIdRef, 'current',{});
      //   gridRef.current?.eGridDiv
      //     .querySelector('.ag-center-cols-viewport')
      //     ?.scrollTo(columnIdRef.current, 0);
      // }
      // gridManager.dataSourceChanged(dataSource);
    },
    [onReady, gridKey, dataSource],
  );

  const onSuppressKeyboardEvent = useCallback((params: SuppressKeyboardEventParams) => {
    const { event, colDef, data, api } = params;
    if (event.key === 'Shift') {
      shiftRef.current = true;
      return false;
    }
    // if (event.keyCode == 67 && (event.ctrlKey || event.composed)) {
    //   api.copySelectedRangeToClipboard(false);
    //   return true;
    // }
    return false;
  }, []);

  const onRowSelectable = useCallback((rowNode: RowNode) => {
    const notRemove = get(rowNode, 'data._rowType') !== DataActions.removeTag;
    if (isRowSelectable) {
      return isRowSelectable(rowNode) && notRemove;
    }
    return notRemove;
  }, []);

  // 监听context变换并更新
  contextHooks(context, apiRef, onContextChangeRender);

  const exportParams = useMemo(() => {
    return {
      columnKeys: exportColumns,
      allColumns: false,
      columnGroups: true,
      ...defaultExportParams,
    };
  }, [defaultExportParams, exportColumns]);
  const hideBox = useMemo(() => {
    return hideSelectedBox || rowSelection !== 'multiple' || hideSelcetedBox;
  }, [hideSelectedBox, rowSelection, hideSelcetedBox]);
  //编辑结束
  const onCellEditingStopped = useCallback((params: CellEditingStoppedEvent) => {
    const tipDoms = document.querySelectorAll('.gant-cell-tooltip.ag-tooltip-custom');
    tipDoms.forEach(itemDom => {
      itemDom.remove();
    });
  }, []);
  // 监听数据变化
  const onRowDataUpdated = useCallback(
    (event: RowDataUpdatedEvent) => {
      const { api } = event;
      propOnRowDataUpdated && propOnRowDataUpdated(event);
      if (isEmpty(selectedRows) || typeof onSelectedChanged !== 'function') return;
      const gridSelectedRows = api.getSelectedRows();
      let changed = false;
      const newSelectedRows = selectedRows.map(item => {
        const gridIndex = findIndex(
          gridSelectedRows,
          gridItem => getRowNodeId(gridItem) === getRowNodeId(item),
        );
        if (gridIndex >= 0) {
          const newSelectedItem = gridSelectedRows[gridIndex];
          const diff = !isEqual(newSelectedItem, item);
          changed = diff ? diff : changed;
          return diff ? newSelectedItem : item;
        }
        return item;
      });
      if (changed)
        onSelectedChanged(
          newSelectedRows.map(item => getRowNodeId(item)),
          newSelectedRows,
        );
    },
    [selectedRows, onSelectedChanged],
  );

  const currentTreeData = useMemo(() => {
    if (!treeDataForcedFilter || !treeData) return treeData;
    if (isEmpty(filterModelRef.current)) return true;
    return false;
  }, [forcedGridKey]);

  const renderColumns = useCallback((columnDefs: (ColGroupDef | ColDef)[]) => {
    return columnDefs.map((item, index) => {
      const props: any = { key: (item as any).field || index };
      if ((item as ColGroupDef).marryChildren)
        return (
          <AgGridColumn {...item} {...props} groupId={(item as any).field || index}>
            {renderColumns((item as any).children)}
          </AgGridColumn>
        );
      return <AgGridColumn {...item} {...props} />;
    });
  }, []);

  return (
    <LocaleReceiver
      children={(local, localeCode = 'zh-cn') => {
        let lang = langs[localeCode] || langs['zh-cn'];
        const locale = { ...lang, ...customLocale };
        const contextMenuItems = function(params: GetContextMenuItemsParams) {
          return gantGetcontextMenuItems(params, {
            downShift: shiftRef.current,
            onRowsCut,
            onRowsPaste,
            locale,
            getContextMenuItems,
            defaultJsonParams,
            hideMenuItemExport,
            hideMenuItemExpand,
            hiddenMenuItemNames,
            suppressRightClickSelected,
            showCutChild,
          });
        };
        return (
          <Spin spinning={loading || !ready}>
            <GridContext.Provider
              value={{
                serverDataRequest,
                isServerSideGroup,
                size,
                getDataPath: getDataPath,
                computedPagination,
                treeData: currentTreeData,
                ...context,
              }}
            >
              <div
                style={{ width, height: gridHeight }}
                className={classnames(
                  'gant-grid',
                  `gant-grid-${getSizeClassName(size)}`,
                  openEditSign && `gant-grid-edit`,
                  editable && openEditSign && 'gant-grid-editable',
                )}
              >
                <div
                  style={{
                    display: 'flex',
                    width,
                    height: computedPagination ? 'calc(100% - 30px)' : '100%',
                  }}
                >
                  <div
                    className={classnames(themeClass, 'gant-ag-wrapper', editable && 'no-zebra')}
                    data-refid={gridKey}
                    style={{
                      width: '100%',
                      height: '100%',
                      flex: 1,
                    }}
                    {...gridForcedProps}
                  >
                    {!hideBox && (
                      <SelectedGrid
                        apiRef={apiRef}
                        onChange={onBoxSelectionChanged}
                        getRowNodeId={getRowNodeId}
                        columnDefs={selectedColumns as any}
                        rowData={boxSelectedRows}
                        selectedBoxHeight={selectedBoxHeight}
                        selectedBoxWidth={selectedBoxWidth}
                      />
                    )}
                    <AgGridReact
                      frameworkComponents={{
                        agColumnHeader: gantCustomHeader ? CustomHeader : null,
                        agDateInput: gantDateComponent ? GantDateComponent : null,
                        ...frameworkComponentsMaps,
                        ...frameworkComponents,
                      }}
                      components={{
                        ...componentsMaps,
                        ...components,
                      }}
                      onRowClicked={handleRowClicked}
                      onSelectionChanged={onSelectionChanged}
                      onRowSelected={onRowSelected}
                      rowSelection={rowSelection}
                      getRowNodeId={getRowNodeId}
                      onGridReady={onGridReady}
                      undoRedoCellEditing
                      enableFillHandle
                      headerHeight={24}
                      floatingFiltersHeight={20}
                      singleClickEdit
                      defaultExportParams={exportParams}
                      context={{
                        serverDataRequest,
                        isServerSideGroup,
                        size,
                        getDataPath: getDataPath,
                        computedPagination,
                        groupSelectsChildren,
                        ...context,
                        treeData: currentTreeData,
                        requireds,
                      }}
                      onFilterModified={onFilterModified}
                      suppressCsvExport
                      stopEditingWhenGridLosesFocus={false}
                      treeData={currentTreeData}
                      suppressScrollOnNewData
                      tooltipShowDelay={0}
                      tooltipMouseTrack
                      excludeChildrenWhenTreeDataFiltering
                      {...selection}
                      excelStyles={[{ id: 'stringType', dataType: 'String' }, ...excelStyles]}
                      immutableData
                      enableCellTextSelection
                      {...orignProps}
                      rowHeight={size == 'small' ? 24 : 32}
                      getDataPath={getDataPath}
                      // columnDefs={localColumnsDefs}
                      gridOptions={{
                        ...orignProps?.gridOptions,
                      }}
                      isRowSelectable={onRowSelectable}
                      defaultColDef={{
                        resizable,
                        sortable,
                        filter,
                        minWidth: 30,
                        tooltipValueGetter: (params: any) => params.value,
                        headerCheckboxSelectionFilteredOnly: true,
                        tooltipComponent: 'gantTooltip',
                        headerComponentParams: {
                          ColumnLabelComponent,
                        },
                        cellClass: 'stringType',
                        ...defaultColDef,
                        filterParams: {
                          buttons: ['reset'],
                          ...get(defaultColDef, 'filterParams', {}),
                        },
                      }}
                      onRowDoubleClicked={handleRowDoubleClicked}
                      groupSelectsChildren={treeData ? false : groupSelectsChildren}
                      ensureDomOrder
                      groupDefaultExpanded={groupDefaultExpanded}
                      localeText={locale}
                      rowClassRules={{
                        'gant-grid-row-isdeleted': params =>
                          get(params, 'data._rowType') === DataActions.removeTag,
                        'gant-grid-row-cut': params => get(params, 'data._rowCut'),
                        ...rowClassRules,
                      }}
                      getContextMenuItems={contextMenuItems as any}
                      modules={[...AllModules]}
                      suppressKeyboardEvent={onSuppressKeyboardEvent}
                      onCellEditingStopped={onCellEditingStopped}
                      onRowDataUpdated={onRowDataUpdated}
                      onColumnMoved={onColumnsChange}
                      onColumnVisible={onColumnsChange}
                      onColumnResized={onColumnsChange}
                    >
                      {renderColumns(localColumnsDefs)}
                    </AgGridReact>
                  </div>
                  {drawerMode && visibleDrawer && (
                    <GantGridFormToolPanelRenderer
                      columns={columns}
                      clickedEvent={clickedEvent}
                      gridManager={gridManager}
                      visible={visibleDrawer}
                      closeDrawer={() =>
                        typeof propVisibleDrawer !== 'boolean' && setVisibleDrawer(false)
                      }
                      onCellEditChange={onCellEditChange}
                      onCellEditingChange={onCellEditingChange}
                      defaultDrawerWidth={defaultDrawerWidth}
                      customDrawerContent={customDrawerContent}
                      editable={editable}
                    />
                  )}
                </div>
                {computedPagination && (
                  <GantPagination numberGoToMode={numberGoToMode} {...computedPagination} />
                )}
              </div>
            </GridContext.Provider>
          </Spin>
        );
      }}
    ></LocaleReceiver>
  );
};

Grid.defaultProps = defaultProps;
Grid.LicenseManager = LicenseManager;

export default Grid;
