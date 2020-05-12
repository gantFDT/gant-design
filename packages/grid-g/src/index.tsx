import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import classnames from 'classnames';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  GetContextMenuItems,
  GridApi,
  GridOptions,
  ColumnApi,
  GridReadyEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { Pagination, Spin } from 'antd';
import { get, isEmpty, isEqual, cloneDeep, set } from 'lodash';
import key from './license';
import { mapColumns, flattenTreeData, usePagination, getSizeClassName } from './utils';
import { Size, GridPropsPartial, RowSelection, DataActions } from './interface';
import './style';
import RenderCol from './GirdRenderColumn';
import GantGroupCellRenderer from './GantGroupCellRenderer';
import GridManager from './gridManager';
export * from './interface';
import { getAllComponentsMaps } from './maps';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import en from './locale/en-US';
import zh from './locale/zh-CN';
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
    context,
    components,
    serialNumber,
    rowClassRules,
    isCompute,
    getDataPath: orignGetDataPath,
    onCellEditChange,
    onCellEditingChange,
    openEditSign,
    onCellValueChanged,
    getContextMenuItems,
    createConfig,
    ...orignProps
  } = props;
  const apiRef = useRef<GridApi>();
  const columnsRef = useRef<ColumnApi>();
  const [pasteContent, setPasetContent] = useState<any>({});
  const [pasteLoading, setPasteLoading] = useState(false);
  const gridManager = useMemo(() => {
    return new GridManager();
  }, []);

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
    selectedKeys,
    showDefalutCheckbox,
    type: rowSelection,
    defaultSelectionCol,
    ...selection
  } = gantSelection;

  // getRowNodeId;
  const getRowNodeId = useCallback(data => {
    if (typeof rowkey === 'string') {
      return get(data, rowkey);
    }
    return rowkey(data);
  }, []);

  //
  const getDataPath = useCallback(
    data => {
      if (orignGetDataPath) return orignGetDataPath(data);
      return data.treeDataPath;
    },
    [orignGetDataPath],
  );
  /**fix: 解决保存时候标记状态无法清楚的问题 */

  // 分页事件
  const computedPagination = usePagination(pagination);
  // 判断数据分别处理 treeTable 和普通table
  const dataSource = useMemo(() => {
    if (treeData && isCompute)
      return flattenTreeData(initDataSource, getRowNodeId, treeDataChildrenName);
    return initDataSource;
  }, [initDataSource, treeData, treeDataChildrenName]);
  useEffect(() => {
    gridManager.reset({ dataSource, getRowNodeId, createConfig, treeData, getDataPath });
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
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      apiRef.current = params.api;
      columnsRef.current = params.columnApi;
      gridManager.agGridApi = params.api;
      params.api.setRowData(dataSource);
      onReady && onReady(params, gridManager);
    },
    [onReady, dataSource],
  );
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const rows = event.api.getSelectedRows();
      const keys = rows.map(item => getRowNodeId(item));
      typeof onSelect === 'function' && onSelect(keys, rows);
    },
    [onSelect],
  );
  // 处理selection- 双向绑定selectKeys
  useEffect(() => {
    if (selectedKeys && apiRef.current && dataSource && dataSource.length > 0) {
      const gridSelectedKeys = apiRef.current.getSelectedNodes();
      const allKeys = [
        ...gridSelectedKeys.map(item => getRowNodeId(get(item, 'data', {}))),
        ...selectedKeys,
      ];
      if (allKeys.length == 0 || isEqual(allKeys) === selectedKeys) return;
      allKeys.map(id => {
        const nodeItem = apiRef.current.getRowNode(id);
        if (!nodeItem) return;
        if (selectedKeys.indexOf(id) >= 0) nodeItem.setSelected(true, rowSelection === 'single');
        else nodeItem.setSelected(false);
      });
    }
  }, [selectedKeys, apiRef.current, rowSelection, getRowNodeId, dataSource]);
  // 处理selection-end
  //columns
  const defaultSelection = !isEmpty(gantSelection) && showDefalutCheckbox;
  const { columnDefs, validateFields } = useMemo(() => {
    return mapColumns<T>(
      columns,
      getRowNodeId,
      defaultSelection,
      defaultSelectionCol,
      rowSelection,
      serialNumber,
    );
  }, [columns]);
  useEffect(() => {
    gridManager.validateFields = validateFields;
  }, [validateFields]);
  //columns-end
  const editRowDataChanged = useCallback(
    (record: any, fieldName: string, newValue: any, oldValue: any) => {
      if (typeof onCellEditChange === 'function')
        return gridManager.modify(onCellEditChange(record, fieldName, newValue, oldValue));
      return gridManager.modify([record]);
    },
    [onCellEditChange],
  );
  const editingRowDataChange = useCallback(
    (record, fieldName, newValue, oldValue) => {
      if (typeof onCellEditingChange === 'function') {
        gridManager.modify(onCellEditingChange(record, fieldName, newValue, oldValue));
      }
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

  return (
    <LocaleReceiver>
      {(local, localeCode = 'zh-cn') => {
        let lang = langs[localeCode] || langs['zh-cn'];
        const locale = { ...lang, ...customLocale };
        const contextMenuItems = function(params) {
          const {
            context: { golbalEditable },
          } = params;
          const rowNodes = apiRef.current.getSelectedNodes();
          const hasCreateConfig = isEmpty(createConfig) || rowNodes.length !== 1;
          const items = getContextMenuItems ? getContextMenuItems(params) : [];
          const defultMenu = ['expandAll', 'contractAll', ...items, 'separator', 'export'];
          if (!golbalEditable) return defultMenu;
          return [
            'copy',
            'separator',
            ...defultMenu,
            'separator',
            {
              name: locale.createNode,
              disabled: hasCreateConfig,
              action: params => {
                const [rowNode] = rowNodes;
                const { id } = rowNode;
                return gridManager.createNode(id);
              },
            },
            {
              name: locale.createChildNode,
              disabled: hasCreateConfig,
              action: params => {
                const [rowNode] = rowNodes;
                const { id } = rowNode;
                return gridManager.createChildNode(id);
              },
            },
          ];
        };
        return (
          <Spin spinning={loading}>
            <div
              style={{ width, height }}
              className={classnames(
                'gant-grid',
                `gant-grid-${getSizeClassName(size)}`,
                openEditSign && `gant-grid-edit`,
              )}
            >
              <div
                className="ag-theme-balham"
                style={{
                  width: '100%',
                  height: computedPagination ? 'calc(100% - 30px)' : '100%',
                }}
              >
                <AgGridReact
                  frameworkComponents={{
                    gantRenderCol: RenderCol,
                    gantGroupCellRenderer: GantGroupCellRenderer,
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
                  deltaRowDataMode
                  context={{
                    golbalEditable: editable,
                    serverDataRequest,
                    isServerSideGroup,
                    size,
                    getDataPath: getDataPath,
                    editRowDataChanged,
                    editingRowDataChange,
                    computedPagination,
                    ...context,
                  }}
                  suppressAnimationFrame
                  stopEditingWhenGridLosesFocus={false}
                  treeData={treeData}
                  getDataPath={getDataPath}
                  enableRangeSelection
                  {...selection}
                  {...orignProps}
                  defaultColDef={{
                    resizable,
                    sortable,
                    filter,
                    minWidth: 30,
                    ...defaultColDef,
                  }}
                  groupDefaultExpanded={groupDefaultExpanded}
                  localeText={locale}
                  rowClassRules={{
                    'gant-grid-row-isdeleted': params =>
                      get(params, 'data._rowType') === DataActions.removeTag,
                    ...rowClassRules,
                  }}
                  onCellValueChanged={cellValueChanged}
                  processCellForClipboard={processCellForClipboard}
                  processDataFromClipboard={processDataFromClipboard}
                  onPasteStart={onPasteStart}
                  onPasteEnd={onPasteEnd}
                  getContextMenuItems={contextMenuItems as any}
                />
              </div>
              {/* 分页高度为30 */}
              {computedPagination && (
                <Pagination className="gant-grid-pagination" {...computedPagination} />
              )}
            </div>
          </Spin>
        );
      }}
    </LocaleReceiver>
  );
};

Grid.defaultProps = defaultProps;
Grid.LicenseManager = LicenseManager
export default Grid;
