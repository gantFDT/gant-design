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
  ColGroupDef,
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
import { get, isEmpty, isEqual } from 'lodash';
import key from './license';

import {
  mapColumns,
  NonBool,
  isbool,
  isstring,
  isarray,
  ispromise,
  isfunc,
  flattenTreeData,
  usePagination,
  getSizeClassName,
  createFakeServer,
  createServerSideDatasource,
  isDeleted,
} from './utils';
import {
  Filter,
  Size,
  Fixed,
  GridPropsPartial,
  RowSelection,
  Record,
  DataActions,
} from './interface';
import './style';
import RenderCol from './GirdRenderColumn';
import GantGroupCellRenderer from './GantGroupCellRenderer';
import GridManager from './gridManager';
export * from './interface';
import { getAllComponentsMaps } from './maps';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import en from './locale/en-US';
import zh from './locale/zh-CN';
import { generateUuid } from '@util';
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
  removeShowLine: true,
  /**是否执行treeDataPath计算 */
  isCompute: true,
};
let gobalEditable: any;
export const defaultRowSelection: RowSelection = {
  type: 'multiple',
  // checkboxIndex: 0,
  showDefalutCheckbox: true,
  selectedKeys: [],
  rowMultiSelectWithClick: true,
  rowDeselection: true,
};

const Grid = function Grid<T extends Record>(props: GridPropsPartial<T>) {
  const {
    dataSource: initDataSource,
    // headerProps,
    // editActions,
    onReady,
    columns: columnDefs,
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
    isServer,
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
    removeShowLine,
    serialNumber,
    rowClassRules,
    isCompute,
    getDataPath: orignGetDataPath,
    onCellEditChange,
    ...orignProps
  } = props;
  const apiRef = useRef<GridApi>();
  const columnsRef = useRef<ColumnApi>();
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
  const getRowNodeId = useCallback(
    data => {
      if (typeof rowkey === 'string') {
        return get(data, rowkey);
      }
      return rowkey(data);
    },
    [rowkey],
  );
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
    if (!treeData && isCompute) return initDataSource;
    return flattenTreeData(initDataSource, getRowNodeId, treeDataChildrenName);
  }, [initDataSource, treeData, treeDataChildrenName, getRowNodeId]);
  useEffect(() => {
    gridManager.reset({ dataSource, getRowNodeId });
  }, [dataSource, getRowNodeId]);
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
      onReady && onReady(params, gridManager);
    },
    [onReady],
  );
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const rows = event.api.getSelectedRows();
      const keys = rows.map(item => getRowNodeId(item));
      typeof onSelect === 'function' && onSelect(keys, rows);
    },
    [onSelect, getRowNodeId],
  );
  // 处理selection- 双向绑定selectKeys
  useEffect(() => {
    if (selectedKeys && apiRef.current) {
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
  }, [selectedKeys, apiRef.current, rowSelection, getRowNodeId]);
  // 处理selection-end
  //columns
  const defaultSelection = !isEmpty(gantSelection) && showDefalutCheckbox;
  const columns = useMemo<ColDef[] | ColGroupDef[]>(() => {
    return mapColumns<T>(
      columnDefs,
      getRowNodeId,
      defaultSelection,
      defaultSelectionCol,
      rowSelection,
      serialNumber,
    );
  }, [columnDefs, getRowNodeId]);

  //columns-end
  const editRowDataChanged = useCallback(
    record => {
      if (typeof onCellEditChange === 'function')
        return gridManager.modify(onCellEditChange(record));
      return gridManager.modify([record]);
    },
    [onCellEditChange],
  );

  return (
    <LocaleReceiver>
      {(local, localeCode = 'zh-cn') => {
        let lang = langs[localeCode] || langs['zh-cn'];
        const locale = { ...lang, ...customLocale };
        return (
          <Spin spinning={loading}>
            <div
              style={{ width, height }}
              className={classnames('gant-grid', `gant-grid-${getSizeClassName(size)}`)}
            >
              <div
                className="ag-theme-balham"
                style={{
                  width: '100%',
                  height: computedPagination ? 'calc(100% - 30px)' : 'calc(100% - 3px)',
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
                  columnDefs={columns}
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
                    computedPagination,
                    ...context,
                  }}
                  suppressAnimationFrame
                  stopEditingWhenGridLosesFocus={false}
                  rowData={dataSource}
                  treeData
                  getDataPath={getDataPath}
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

export default Grid;
