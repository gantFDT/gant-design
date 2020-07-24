import React, { useState, useCallback, useRef, useMemo, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { AgGridReact } from '@ag-grid-community/react';
import { GridApi, ColumnApi, GridReadyEvent, SelectionChangedEvent, CellClickedEvent, RowNode, GetContextMenuItemsParams } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { LicenseManager, AllModules } from '@ag-grid-enterprise/all-modules';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Spin } from 'antd';
import { get, isEmpty, isEqual, cloneDeep, set, max, min, findIndex, uniq } from 'lodash';
import key from './license';
import { mapColumns, flattenTreeData, usePagination, getSizeClassName, selectedMapColumns } from './utils';
import { Size, GridPropsPartial, RowSelection, DataActions } from './interface';
import SelectedGrid from './SelectedGrid';
import GantPagination from './Pagination';
import GridManager from './gridManager';
import { gantGetcontextMenuItems } from './contextMenuItems';
import { getAllComponentsMaps } from './maps';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import en from './locale/en-US';
import './style';
import zh from './locale/zh-CN';
export * from './interface';
export { default as GantGroupCellRenderer } from './GantGroupCellRenderer';
export { setComponentsMaps, setFrameworkComponentsMaps } from './maps';
LicenseManager.setLicenseKey(key);
export { default as GantPromiseCellRender } from './GantPromiseCellRender';
const langs = {
  en: en,
  'zh-cn': zh,
};
export const defaultProps = {
  /**加载状态 */
  loading: false,
  resizable: true,
  /**是否处于编辑状态 */
  editable: false,
  /**单列的过滤器 */
  filter: false,
  /**禁止调整列顺序 */
  // lockPosition: false,
  /**直接在列头下面显示过滤器 */
  floatingFilter: false,
  /**编辑状态下的尺寸 */
  size: Size.small,
  /**rowkey */
  rowkey: 'key',
  width: '100%',
  height: 400,
  sortable: true,
  treeDataChildrenName: 'children',
  /** 默认的删除行为 */
  /**是否执行treeDataPath计算 */
  isCompute: true,
  //默认开启编辑校验
  openEditSign: true,
};
export const defaultRowSelection: RowSelection = {
  type: 'multiple',
  // checkboxIndex: 0,
  showDefalutCheckbox: true,
  // rowMultiSelectWithClick: true,
  rowDeselection: true,
};

const Grid = function Grid<T extends any>(props: GridPropsPartial<T>) {
  const {
    dataSource: initDataSource,
    // headerProps,
    // editActions,
    onReady,
    columns,
    editable,
    rowSelection: rowSel,
    size,
    rowkey,
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
    frameworkComponents,
    treeDataChildrenName,
    locale: customLocale,
    serverGroupExpend,
    groupDefaultExpanded,
    defaultColDef,
    context: propsContext,
    components,
    serialNumber,
    rowClassRules,
    isCompute,
    getDataPath: orignGetDataPath,
    onCellEditChange,
    onCellEditingChange,
    openEditSign = true,
    onCellValueChanged,
    getContextMenuItems,
    createConfig,
    onRowsCut,
    onRowsPaste,
    onRowsPasteEnd,
    showCut = false,
    onContextChangeRender,
    defaultExportParams,
    editChangeCallback,
    isRowSelectable,
    boxColumnIndex,
    hideSelcetedBox,
    onSelectionChanged: propsOnSelectionChanged,
    ...orignProps
  } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<GridApi>();
  const shiftRef = useRef<boolean>(false);
  const columnsRef = useRef<ColumnApi>();
  const selectedRowsRef = useRef<string[]>([]);
  const [pasteContent, setPasetContent] = useState<any>({});
  const [pasteLoading, setPasteLoading] = useState(false);
  const [innerSelectedRows, setInnerSelectedRows] = useState([]);
  const [errors, setErrors] = useState(null);
  const gridKeydownFunc = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Shift') shiftRef.current = true;
  }, []);
  const gridKeyUpFunc = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Shift') shiftRef.current = false;
  }, []);
  useEffect(() => {
    divRef.current?.addEventListener('keydown', gridKeydownFunc);
    divRef.current?.addEventListener('keyup', gridKeyUpFunc);
    return () => {
      divRef.current?.removeEventListener('keydown', gridKeydownFunc);
      divRef.current?.removeEventListener('keyup', gridKeyUpFunc);
    };
  }, []);
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
      if (orignGetDataPath) return orignGetDataPath(data);
      return data.treeDataPath;
    },
    [orignGetDataPath],
  );
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      apiRef.current = params.api;
      columnsRef.current = params.columnApi;
      gridManager.agGridApi = params.api;
      onReady && onReady(params, gridManager);
    },
    [onReady],
  );

  // 处理selection
  const gantSelection: RowSelection = useMemo(() => {
    if (rowSel === true) {
      return defaultRowSelection;
    }
    if (rowSel) return { ...defaultRowSelection, ...rowSel };
    return {};
  }, [rowSel]);
  const { onSelect, selectedKeys, selectedRows, showDefalutCheckbox, type: rowSelection, defaultSelectionCol, ...selection } = gantSelection;

  useEffect(() => {
    if (!editable) {
      apiRef.current?.stopEditing();
      gridManager.reset({});
    }
  }, [editable]);

  /**fix: 解决保存时候标记状态无法清楚的问题 */

  // 判断数据分别处理 treeTable 和普通table
  const dataSource = useMemo(() => {
    if (treeData && isCompute) return flattenTreeData(initDataSource, getRowNodeId, treeDataChildrenName);
    return initDataSource;
  }, [initDataSource, treeData, treeDataChildrenName]);

  // 分页事件
  const computedPagination: any = usePagination(pagination);
  useEffect(() => {
    gridManager.reset({
      dataSource,
      getRowNodeId,
      createConfig,
      treeData,
      getDataPath,
      isCompute,
      treeDataChildrenName,
      editChangeCallback,
      onRowsPasteEnd,
      setErrors,
    });
  }, [dataSource]);
  const serverDataCallback = useCallback((groupKeys, successCallback) => {
    return rows => {
      successCallback(rows, rows.length);
      gridManager.appendChild(groupKeys, rows);
    };
  }, []);
  const serverDataRequest = useCallback(
    (params, groupKeys, successCallback) => {
      if (serverGroupExpend) {
        return serverGroupExpend(params, serverDataCallback(groupKeys, successCallback));
      }
      return successCallback([], 0);
    },
    [serverGroupExpend],
  );

  const { componentsMaps, frameworkComponentsMaps } = useMemo(() => {
    return getAllComponentsMaps();
  }, []);
  // 处理selection- 双向绑定selectKeys
  // 根据数据显示选中行；
  const garidShowSelectedRows = useCallback(
    selectedRows => {
      const gridSelectedRows = apiRef.current.getSelectedRows();
      const gridSelcetedKeys = gridSelectedRows.map((item = {}) => getRowNodeId(item));
      const selectedKeys = selectedRows.map((item = {}) => getRowNodeId(item));
      if (isEqual(selectedKeys, gridSelcetedKeys)) return;
      const allKeys = uniq([...gridSelcetedKeys, ...selectedKeys]);
      allKeys.map(id => {
        const nodeItem = apiRef.current.getRowNode(id);
        if (!nodeItem) return;
        if (selectedKeys.indexOf(id) >= 0) nodeItem.setSelected(true, rowSelection === 'single');
        else nodeItem.setSelected(false);
      });
    },
    [rowSelection],
  );
  const onSelectionChange = useCallback(
    (keys: string[], rows: any[]) => {
      const extraKeys: string[] = [];
      const extraRows: any[] = [];
      innerSelectedRows.map(itemRow => {
        const index = findIndex(dataSource, function(itemData) {
          return getRowNodeId(itemData) === getRowNodeId(itemRow);
        });
        if (index < 0 && itemRow._rowType !== DataActions.add) {
          extraKeys.push(getRowNodeId(itemRow));
          extraRows.push(itemRow);
        }
      });
      const newSelectedKeys = [...extraKeys, ...keys];
      const newSelectedRows = [...extraRows, ...rows];
      if (selectedKeys === undefined) {
        setInnerSelectedRows(newSelectedRows);
        selectedRowsRef.current = newSelectedKeys;
      }
      onSelect && onSelect(newSelectedKeys, newSelectedRows);
    },
    [onSelect, dataSource, innerSelectedRows, selectedKeys],
  );
  const onBoxSelectionChanged = useCallback(
    (keys, rows) => {
      garidShowSelectedRows(rows);
      if (selectedKeys === undefined) {
        setInnerSelectedRows(rows);
        selectedRowsRef.current = rows;
      }
      onSelect && onSelect(keys, rows);
    },
    [selectedKeys, garidShowSelectedRows],
  );
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const rows = event.api.getSelectedRows();
      const keys = rows.map(item => getRowNodeId(item));
      onSelectionChange(keys, rows);
      propsOnSelectionChanged && propsOnSelectionChanged(event);
    },
    [onSelectionChange, propsOnSelectionChanged],
  );
  useEffect(() => {
    if (!apiRef.current) return;
    if (selectedRows) {
      garidShowSelectedRows(selectedRows);
      if (isEqual(selectedRows, selectedRowsRef.current)) return;
      setInnerSelectedRows(selectedRows);
      selectedRowsRef.current = selectedRows;
    } else {
      garidShowSelectedRows(selectedRowsRef.current);
    }
  }, [selectedRows, dataSource, garidShowSelectedRows]);
  const boxSelectedRows = useMemo(() => {
    if (selectedRows) return selectedRows;
    return innerSelectedRows;
  }, [selectedRows, innerSelectedRows]);
  // 监听 dataSource
  // 处理selection-end
  //columns
  const defaultSelection = !isEmpty(gantSelection) && showDefalutCheckbox;
  const { columnDefs, validateFields } = useMemo(() => {
    return mapColumns<T>(columns, getRowNodeId, defaultSelection, defaultSelectionCol, rowSelection, serialNumber);
  }, [columns]);
  // 选中栏grid  columns;
  const selectedColumns = useMemo(() => {
    return selectedMapColumns(columns, boxColumnIndex);
  }, [columns, boxColumnIndex]);
  /// 导出 columns
  const exportColumns = useMemo(() => {
    const arr: string[] = [];
    columnDefs.map((item: any) => {
      if (item.field !== 'defalutSelection' && item.field !== 'g-index') {
        arr.push(item.field);
      }
    });
    return arr;
  }, [columnDefs]);
  // 配置验证规则
  useEffect(() => {
    gridManager.validateFields = validateFields;
  }, [validateFields]);
  //columns-end
  const editRowDataChanged = useCallback(
    async (record: any, fieldName: string, newValue: any, oldValue: any, oldRecord) => {
      gridManager.loading = true;
      if (typeof onCellEditChange === 'function') {
        let newRecords = await onCellEditChange(cloneDeep(record), fieldName, newValue, oldValue);
        return gridManager.modify(newRecords, [oldRecord]);
      }
      return gridManager.modify([record], [oldRecord]);
    },
    [onCellEditChange],
  );
  const editingRowDataChange = useCallback(
    async (record, fieldName, newValue, oldValue, oldRecord) => {
      gridManager.loading = true;
      let modifyRecord = record;
      if (typeof onCellEditingChange === 'function') {
        modifyRecord = await onCellEditingChange(cloneDeep(record), fieldName, newValue, oldValue);
      }
      gridManager.modify(modifyRecord);
    },
    [onCellEditingChange],
  );
  const processCellForClipboard = useCallback(params => {
    const {
      column: { colId },
    } = params;
    if (colId === 'defalutSelection' || colId === 'g-index') return colId;
    return params.value;
  }, []);
  const processDataFromClipboard = params => {
    const data = params.data.map(rowData => {
      return rowData.filter(item => item !== 'defalutSelection' && item !== 'g-index');
    });
    return data;
  };
  const onPasteStart = useCallback(params => {
    setPasteLoading(true);
  }, []);
  const onPasteEnd = useCallback(
    params => {
      setPasteLoading(false);
      const records: any[] = [],
        oldRecords: any[] = [];
      Object.keys(pasteContent).map(rowIndex => {
        records.push(pasteContent[rowIndex].newData);
        oldRecords.push(pasteContent[rowIndex].oldData);
      });
      if (!isEmpty(records)) gridManager.modify(records, oldRecords);
    },
    [pasteContent],
  );
  const cellValueChanged = useCallback(
    params => {
      const {
        rowIndex,
        data,
        colDef: { field },
        oldValue,
      } = params;
      pasteLoading &&
        setPasetContent(content => {
          let oldData = get(content, `${rowIndex}.oldData`, data);
          oldData = cloneDeep(oldData);
          oldData = set(oldData, field, oldValue);
          return {
            ...content,
            [rowIndex]: {
              newData: {
                ...get(content, `[${rowIndex}].newData`, {}),
                ...data,
              },
              oldData,
            },
          };
        });
      onCellValueChanged && onCellValueChanged(params);
    },
    [onCellValueChanged, pasteLoading],
  );

  const onRowSelectable = useCallback((rowNode: RowNode) => {
    const notRemove = get(rowNode, 'data._rowType') !== DataActions.removeTag;
    if (isRowSelectable) {
      return isRowSelectable(rowNode) && notRemove;
    }
    return notRemove;
  }, []);
  // context 变化
  const context = useMemo(() => {
    return {
      globalEditable: editable,
      serverDataRequest,
      isServerSideGroup,
      size,
      getDataPath: getDataPath,
      editRowDataChanged,
      editingRowDataChange,
      computedPagination,
      treeData,
      gridManager,
      showCut,
      errors,
      createConfig,
      getRowNodeId,
      watchEditChange: typeof onCellEditChange === 'function',
      ...propsContext,
    };
  }, [propsContext, size, computedPagination, editable, showCut, errors]);
  const [cancheContext, setCancheContext] = useState(context);
  useEffect(() => {
    setCancheContext(cancheContext => {
      const newContext = { ...cancheContext, ...context };
      const diffKeys: string[] = [];
      Object.keys(newContext).map(key => {
        if (!isEqual(cancheContext[key], context[key])) diffKeys.push(key);
      });
      if (diffKeys.length === 0) return cancheContext;
      const params = onContextChangeRender && onContextChangeRender(context, diffKeys);
      if (!params) return context;
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
      return context;
    });
  }, [context]);
  const hideBox = useMemo(() => {
    return hideSelcetedBox || rowSelection == 'single';
  }, [hideSelcetedBox, rowSelection]);
  return (
    <LocaleReceiver>
      {(local, localeCode = 'zh-cn') => {
        let lang = langs[localeCode] || langs['zh-cn'];
        const locale = { ...lang, ...customLocale };
        const contextMenuItems = function(params: GetContextMenuItemsParams) {
          return gantGetcontextMenuItems(params, {
            downShift: shiftRef.current,
            onRowsCut,
            onRowsPaste,
            locale,
            getContextMenuItems,
          });
        };
        return (
          <Spin spinning={loading}>
            <div style={{ width, height }} className={classnames('gant-grid', `gant-grid-${getSizeClassName(size)}`, openEditSign && `gant-grid-edit`, editable && 'gant-grid-editable')} ref={divRef}>
              <div
                className="ag-theme-balham gant-ag-wrapper"
                style={{
                  width: '100%',
                  height: computedPagination ? 'calc(100% - 30px)' : '100%',
                }}
              >
                {!hideBox && <SelectedGrid onChange={onBoxSelectionChanged} getRowNodeId={getRowNodeId} columnDefs={selectedColumns as any} rowData={boxSelectedRows} />}

                <AgGridReact
                  frameworkComponents={{
                    ...frameworkComponentsMaps,
                    ...frameworkComponents,
                  }}
                  components={{
                    ...componentsMaps,
                    ...components,
                  }}
                  onSelectionChanged={onSelectionChanged}
                  columnDefs={columnDefs}
                  rowSelection={rowSelection}
                  getRowNodeId={getRowNodeId}
                  onGridReady={onGridReady}
                  undoRedoCellEditing
                  enableFillHandle
                  headerHeight={24}
                  floatingFiltersHeight={20}
                  rowHeight={size == 'small' ? 24 : 32}
                  singleClickEdit
                  defaultExportParams={{
                    columnKeys: exportColumns,
                    allColumns: false,
                    ...defaultExportParams,
                  }}
                  context={{
                    globalEditable: editable,
                    serverDataRequest,
                    isServerSideGroup,
                    size,
                    getDataPath: getDataPath,
                    editRowDataChanged,
                    editingRowDataChange,
                    computedPagination,
                    treeData,
                    ...context,
                  }}
                  stopEditingWhenGridLosesFocus={false}
                  treeData={treeData}
                  getDataPath={getDataPath}
                  enableRangeSelection
                  rowData={dataSource}
                  immutableData
                  tooltipShowDelay={10}
                  {...selection}
                  {...orignProps}
                  isRowSelectable={onRowSelectable}
                  defaultColDef={{
                    resizable,
                    sortable,
                    filter,
                    minWidth: 30,
                    tooltip: (params: any) => 'tooltip',
                    tooltipComponent: 'gantValidateTooltip',
                    ...defaultColDef,
                  }}
                  groupDefaultExpanded={groupDefaultExpanded}
                  localeText={locale}
                  rowClassRules={{
                    'gant-grid-row-isdeleted': params => get(params, 'data._rowType') === DataActions.removeTag,
                    'gant-grid-row-cut': params => get(params, 'data._rowCut'),
                    ...rowClassRules,
                  }}
                  onCellValueChanged={cellValueChanged}
                  processCellForClipboard={processCellForClipboard}
                  processDataFromClipboard={processDataFromClipboard}
                  onPasteStart={onPasteStart}
                  onPasteEnd={onPasteEnd}
                  getContextMenuItems={contextMenuItems as any}
                  modules={[...AllModules, ...AllCommunityModules]}
                />
              </div>
              <GantPagination pagination={computedPagination} />
            </div>
          </Spin>
        );
      }}
    </LocaleReceiver>
  );
};

Grid.defaultProps = defaultProps;
Grid.LicenseManager = LicenseManager;
export default Grid;
