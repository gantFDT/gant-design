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
  ColumnEverythingChangedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { Spin } from 'antd';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import classnames from 'classnames';
import _, {
  findIndex,
  get,
  isEmpty,
  isEqual,
  isObject,
  merge,
  cloneDeep,
  omit,
  debounce,
} from 'lodash';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { gantGetcontextMenuItems } from './contextMenuItems';
import CustomHeader from './CustomHeader';
import { filterHooks } from './gantFilter';
import GantGridFormToolPanelRenderer from './GantGridFormToolPanelRenderer';
import GridManager from './gridManager';
import { contextHooks, selectedHooks, useGridPaste } from './hooks';
import { DataActions, GridProps, GridVariableRef, RowSelection, Size } from './interface';
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
  groupNodeSelectedToggle,
  mapColumns,
  selectedMapColumns,
  usePagination,
  sizeDefinitions,
  isExportHiddenFields,
  getColumnInfo,
} from './utils';
export { default as GantGroupCellRenderer } from './GantGroupCellRenderer';
export { default as c } from './GantPromiseCellRender';
export * from './interface';
export { default as GantDateComponent } from './GantDateComponent';
export { setComponentsMaps, setFrameworkComponentsMaps, setGridConfig } from './maps';
//右侧边栏grid行转列详情组件，支持编辑和各种状态联动
export { default as SideGridDetail } from './sidegriddetail';

//表格默认高度
const DEFAULT_HEIGHT = 400;

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
  /** 是否导出隐藏字段 */
  exportHiddenFields: false,
  suppressManagerPaste: true,
  // 默认开启粘贴时创建数据
  suppressCreateWhenPaste: false,
};

export const defaultRowSelection: RowSelection = {
  type: 'multiple',
  // checkboxIndex: 0,
  showDefalutCheckbox: true,
  // rowMultiSelectWithClick: true,
  rowDeselection: true,
};

const Grid = function Grid<T extends any>(gridProps: GridProps<T>) {
  const globalConfig: any = useMemo(() => {
    return getGridConfig();
  }, []);

  const props = { ...defaultProps, ...omit(globalConfig, ['pagination']), ...gridProps };

  const {
    dataSource: initDataSource,
    onReady,
    columns,
    editable,
    rowSelection: rowSel,
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
    showMenuItemClearFilter = false,
    onMenuItemClearFilter,
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
    domLayout: _domLayout = 'normal',
    size = 'small',
    border = true,
    zebra = true,
    rowHeight: _rowHeight,
    getRowHeight,
    headerHeight,
    controlCellWordWrap = false,
    suppressGroupSelectParent,
    exportHiddenFields,
    onColumnsChange: propsOnColumnsChange,
    suppressManagerPaste,
    suppressCreateWhenPaste,
    ...orignProps
  } = props;

  const apiRef = useRef<GridApi>();
  const shiftRef = useRef<boolean>(false);
  const wrapperRef = useRef<any>();
  const columnsRef = useRef<ColumnApi>();
  const selectedLoadingRef = useRef<boolean>(false);
  const clickedEventRef = useRef<RowClickedEvent>();
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [exportColumns, setExportColumns] = useState<string[]>([]);
  // const [clickedEvent, setClickedEvent] = useState<RowClickedEvent>();
  const [clickRowIndex, setClickRowIndex] = useState(-1);

  let domLayout = _domLayout;
  //如果是开启启动表格高度，并且是指定了行高策略, 那么就使用真实的自动高度模式
  domLayout = autoHeight ? 'autoHeight' : domLayout;

  const gridVariableRef = useRef<GridVariableRef>({
    hasSelectedRows:
      typeof rowSel !== 'boolean' && isObject(rowSel) && Reflect.has(rowSel, 'selectedRows'),
    hideSelectedBox: hideSelectedBox,
    selectedRows: [],
  });
  const [innerSelectedRows, setInnerSelectedRows] = useState([]);
  const [ready, setReady] = useState(false);

  //自定义列头文字
  const { ColumnLabelComponent } = frameworkComponents;

  //行高
  let rowHeight = _rowHeight || get(sizeDefinitions, `rowHeight.${size}`);

  rowHeight = autoHeight ? undefined : rowHeight;

  //实例化manager
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

  const getRowId = useCallback(function(params) {
    return getRowNodeId(params.data);
  }, []);

  const getDataPath = useCallback(
    data => {
      if (!treeData) return [];
      let dataPath = orignGetDataPath ? orignGetDataPath(data) : isCompute ? data.treeDataPath : [];
      return dataPath;
    },
    [orignGetDataPath, treeData],
  );

  // 分页事件
  const computedPagination: any = useMemo(
    () =>
      usePagination(isEmpty(pagination) ? false : { ...pagination }, size, globalConfig.pagination),
    [pagination, size],
  );

  //表格外层容器高度，高度策略有两种，一种是兼容虚拟滚动计算出来的假的自动高度，一种是完全自动高度，稍微有点复杂
  const gridHeight = useMemo(() => {
    //如果没指定高度，也没指定自动高度，那么给予默认高度
    if (!autoHeight && !height) return DEFAULT_HEIGHT;
    //如果是开启自动高度并且指定了行高策略，则使用domLayout:'autoHeight'
    if (autoHeight) {
      return '100%';
    }
    return height;
  }, [autoHeight, height]);

  //表格内层容器高度策略
  const girdWrapHeight = useMemo(() => {
    if (autoHeight) {
      return '100%';
    }
    return computedPagination
      ? `calc(100% - ${get(sizeDefinitions, `paginationHeight.${size}`)}px)`
      : '100%';
  }, [autoHeight, computedPagination, sizeDefinitions, size]);

  //侧边栏显示隐藏
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

  //
  const serverDataRequest = useCallback(
    (params, groupKeys, successCallback) => {
      if (serverGroupExpend) {
        return serverGroupExpend(params, serverDataCallback(groupKeys, successCallback));
      }
      return successCallback([], 0);
    },
    [serverGroupExpend],
  );

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
      rowSelection,
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
    rowSelection,
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

  //强制树形过滤，已废弃，使用原生 excludeChildrenWhenTreeDataFiltering
  const gridForcedProps = useMemo(() => {
    if (!treeDataForcedFilter && forcedGridKey) return {};
    return {
      key: forcedGridKey,
    };
  }, [forcedGridKey]);

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
  const getAllSelectedRows = useCallback((selectedRows: any[], hideBox) => {
    const currentRows: string[] = [];
    const extraRows: any[] = [];
    if (hideBox)
      return {
        extraRows,
        currentRows: selectedRows,
      };
    const dataSource = gridManager.agGridConfig.dataSource;
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

  //已选择盒子选择行
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

  const { selectedChangeRef, updateSelection } = selectedHooks({
    gridVariable: gridVariableRef.current,
    ready,
    apiRef,
    dataSource,
    getRowNodeId,
    selectedRows,
    isSingle: rowSelection === 'single',
  });

  //是否隐藏selectedBox
  const hideBox = useMemo(() => {
    return hideSelectedBox || rowSelection !== 'multiple';
  }, [hideSelectedBox, rowSelection]);
  //选择行改变
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      propsOnSelectionChanged && propsOnSelectionChanged(event);
      if (selectedChangeRef.current) return;
      if (gridVariableRef.current?.hasSelectedRows && rowSelection === 'multiple') {
        const rows = event.api.getSelectedRows();
        const { extraRows, currentRows } = getAllSelectedRows(
          get(gridVariableRef.current, 'selectedRows', []),
          hideBox,
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
    [getAllSelectedRows, propsOnSelectionChanged, rowSelection, hideBox],
  );

  //单击行
  const handleRowClicked = useCallback(
    (event: RowClickedEvent) => {
      if (drawerMode && visibleDrawer) {
        if (typeof propVisibleDrawer !== 'boolean') setVisibleDrawer(true);
        clickedEventRef.current = event;
        setClickRowIndex(get(event, 'rowIndex'));
      }
      onRowClicked && onRowClicked(event);
    },
    [onRowClicked, drawerMode, visibleDrawer, propVisibleDrawer],
  );

  //双击行
  const handleRowDoubleClicked = useCallback(
    (event: RowDoubleClickedEvent) => {
      if (onRowDoubleClicked) onRowDoubleClicked(event);
      const doubleClickedOpenDrawer = true;
      if (drawerMode && doubleClickedOpenDrawer) {
        if (typeof propVisibleDrawer !== 'boolean') setVisibleDrawer(true);
        clickedEventRef.current = event;
        setClickRowIndex(get(event, 'rowIndex'));
      }
      if (doubleClickedExpanded) {
        const { node } = event;
        if (node.childrenAfterGroup.length > 0) node.setExpanded(!node.expanded);
      }
    },
    [onRowDoubleClicked, drawerMode, doubleClickedExpanded],
  );

  //行被选择
  const onRowSelected = useCallback(
    (event: RowSelectedEvent) => {
      if (selectedChangeRef.current) return;
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
      if (!suppressGroupSelectParent) checkParentGroupSelectedStatus(node, nodeSelected, event.api);
      setTimeout(() => {
        selectedLoadingRef.current = false;
        event.api.refreshCells({
          columns: ['defalutSelection'],
          rowNodes: [node],
          force: true,
        });
      }, 200);
    },
    [propsOnRowSelected, suppressGroupSelectParent],
  );

  //已选择行
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
      size,
    );
  }, [columns, size]);

  useEffect(() => {
    propsOnColumnsChange && propsOnColumnsChange(columnDefs);
  }, [columnDefs]);

  // 选中栏grid  columns;
  const selectedColumns = useMemo(() => {
    return selectedMapColumns(columns, boxColumnIndex);
  }, [columns, boxColumnIndex]);

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
  // 监听onColumnEverythingChanged
  const onColumnEverythingChanged = useCallback(
    (event: ColumnEverythingChangedEvent) => {
      const columnState = event.columnApi.getColumnState();
      const arr: string[] = [];
      columnState.map(item => {
        const field = get(item, 'colId');
        const hide = get(item, 'hide');
        if (field !== 'defalutSelection' && field !== 'g-index') {
          if (!exportHiddenFields && hide) return;
          arr.push(field);
        }
      });
      setExportColumns(pre => (isEqual(pre, arr) ? pre : arr));
    },
    [exportHiddenFields],
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
      gridManager.rowkey = rowkey;
      onReady && onReady(params, gridManager);
      setReady(true);
      if (filterModelRef.current && treeDataForcedFilter) {
        params.api.setRowData(get(gridManager, 'agGridConfig.dataSource', []));
        params.api.setFilterModel(filterModelRef.current);
      }
    },
    [onReady, gridKey],
  );

  // //阻止键盘事件
  // const onSuppressKeyboardEvent = useCallback((params: SuppressKeyboardEventParams) => {
  //   const { event, colDef, data, api } = params;
  //   if (event.key === 'Shift') {
  //     shiftRef.current = true;
  //     return false;
  //   }
  //   // if (event.keyCode == 67 && (event.ctrlKey || event.composed)) {
  //   //   api.copySelectedRangeToClipboard(false);
  //   //   return true;
  //   // }
  //   return false;
  // }, []);

  //行是否可选
  const onRowSelectable = useCallback((rowNode: RowNode) => {
    const notRemove = get(rowNode, 'data._rowType') !== DataActions.removeTag;
    if (isRowSelectable) {
      return isRowSelectable(rowNode) && notRemove;
    }
    return notRemove;
  }, []);

  // 监听context变换并更新
  contextHooks(context, apiRef, onContextChangeRender);

  //导出设置
  const exportParams = useMemo(() => {
    return {
      columnKeys: exportColumns,
      allColumns: false,
      columnGroups: true,
      ...globalConfig.defaultExportParams,
      ...defaultExportParams,
    };
  }, [defaultExportParams, exportColumns]);

  //编辑结束
  const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
    clickedEventRef.current = event;
    const tipDoms = document.querySelectorAll('.gant-cell-tooltip.ag-tooltip-custom');
    tipDoms.forEach(itemDom => {
      itemDom.remove();
    });
  }, []);

  // 监听数据变化
  const onRowDataUpdated = useCallback((event: RowDataUpdatedEvent) => {
    const { api } = event;
    propOnRowDataUpdated && propOnRowDataUpdated(event);
  }, []);

  const _defaultColDef = useMemo(() => {
    return {
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
      ...globalConfig.defaultColDef,
      ...defaultColDef,
      filterParams: {
        buttons: ['reset'],
        ...get(defaultColDef, 'filterParams', {}),
      },
    };
  }, []);

  const currentTreeData = useMemo(() => {
    if (!treeDataForcedFilter || !treeData) return treeData;
    if (isEmpty(filterModelRef.current)) return true;
    return false;
  }, [forcedGridKey]);

  // 粘贴处理
  const gridPasteProps = useGridPaste({
    gridManager,
    columns,
    suppressManagerPaste,
    suppressCreateWhenPaste,
  });

  const renderColumns = useCallback(
    (columnDefs: (ColGroupDef | ColDef)[]) => {
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
    },
    [localColumnsDefs],
  );

  const renderColumnsContent = useMemo(() => {
    return renderColumns(localColumnsDefs);
  }, [localColumnsDefs]);

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
            showMenuItemClearFilter,
            onMenuItemClearFilter,
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
                  openEditSign && `gant-grid-edit`,
                  editable && openEditSign && 'gant-grid-editable',
                  !border && `gant-grid-noborder`,
                  controlCellWordWrap && `grid-control-break-line`,
                )}
              >
                <div
                  style={{
                    display: 'flex',
                    width,
                    height: girdWrapHeight,
                  }}
                >
                  <div
                    className={classnames(
                      themeClass,
                      'gant-ag-wrapper',
                      editable && 'no-zebra',
                      !zebra && 'no-zebra',
                    )}
                    data-refid={gridKey}
                    style={{
                      width: '100%',
                      height: '100%',
                      fontSize: sizeDefinitions.fontSize[size],
                    }}
                    ref={wrapperRef}
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
                      // getRowNodeId={getRowNodeId}
                      getRowId={getRowId}
                      onGridReady={onGridReady}
                      enableFillHandle
                      headerHeight={headerHeight || get(sizeDefinitions, `headerHeight.${size}`)}
                      floatingFiltersHeight={get(sizeDefinitions, `floatingFiltersHeight.${size}`)}
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
                      enableCellTextSelection
                      domLayout={domLayout}
                      rowHeight={rowHeight || get(sizeDefinitions, `rowHeight.${size}`)}
                      getRowHeight={getRowHeight}
                      {...orignProps}
                      getDataPath={getDataPath}
                      gridOptions={{
                        ...orignProps?.gridOptions,
                      }}
                      isRowSelectable={onRowSelectable}
                      defaultColDef={_defaultColDef}
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
                      {...gridPasteProps}
                      getContextMenuItems={contextMenuItems as any}
                      onCellEditingStopped={onCellEditingStopped}
                      onRowDataUpdated={onRowDataUpdated}
                      onColumnMoved={onColumnsChange}
                      onColumnVisible={onColumnsChange}
                      onColumnResized={onColumnsChange}
                      onColumnEverythingChanged={onColumnEverythingChanged}
                    >
                      {renderColumnsContent}
                    </AgGridReact>
                  </div>
                  {drawerMode && visibleDrawer && (
                    <GantGridFormToolPanelRenderer
                      columns={columns}
                      clickedEvent={clickedEventRef.current}
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
                      clickRowIndex={clickRowIndex}
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
                    />
                  )}
                </div>
                {computedPagination && (
                  <GantPagination
                    numberGoToMode={numberGoToMode}
                    size={size}
                    {...computedPagination}
                  />
                )}
              </div>
            </GridContext.Provider>
          </Spin>
        );
      }}
    ></LocaleReceiver>
  );
};

Grid.LicenseManager = LicenseManager;

export default Grid;
