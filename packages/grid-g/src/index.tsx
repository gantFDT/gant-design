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
import DataManage from './datamanage';
import RenderCol from './GirdRenderColumn';
import GantGroupCellRenderer from './GantGroupCellRenderer';
export * from './interface';
export { default as DataManage } from './datamanage';
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
  removeShowLine: true,
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
    onRowGroupOpened,
    rowClassRules,
    ...orignProps
  } = props;
  const apiRef = useRef<GridApi>();
  const columnsRef = useRef<ColumnApi>();

  /**编辑时数据 */
  const [manageData, setManageData] = useState(initDataSource);
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

  const getRowNodeId = useCallback(
    data => {
      if (typeof rowkey === 'string') {
        return get(data, rowkey);
      }
      return rowkey(data);
    },
    [rowkey],
  );
  /**管理编辑数据对象 */
  const dataManage = useMemo(() => {
    const manager = new DataManage<T>();
    manager.removeAllListeners();
    manager.on('update', list => {
      setManageData(list);
    });
    manager.getRowNodeId = getRowNodeId;
    manager.childrenName = treeDataChildrenName;
    manager.getServerSideGroupKey = getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId;
    manager.removeShowLine = removeShowLine;
    return manager;
  }, []);

  useEffect(() => {
    dataManage.init(initDataSource);
  }, [initDataSource]);
  /**fix: 解决保存时候标记状态无法清楚的问题 */

  // 分页事件
  const computedPagination = usePagination(pagination);

  // 判断数据分别处理 treeTable 和普通table
  const dataSource = useMemo(() => {
    if (!treeData) return manageData;
    if (!isServer) return flattenTreeData(manageData, getRowNodeId, [], treeDataChildrenName);
    return manageData;
  }, [manageData, treeData, treeDataChildrenName, getRowNodeId]);
  const serverModel = useMemo(() => {
    return isServer && treeData;
  }, [isServer && treeData]);
  const serverDataCallback = useCallback((groupKeys, successCallback) => {
    return rows => {
      successCallback(rows, rows.length);
      dataManage.appendChild(groupKeys, rows);
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
  useEffect(() => {
    if (!serverModel) return;
    const fakeServer = createFakeServer(
      dataManage,
      getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId,
      treeDataChildrenName,
    );
    const serverDataSource = createServerSideDatasource(fakeServer, serverDataRequest);
    apiRef.current && apiRef.current.setServerSideDatasource(serverDataSource);
  }, [
    serverModel,
    treeDataChildrenName,
    serverDataRequest,
    apiRef.current,
    initDataSource,
    getServerSideGroupKey,
    getRowNodeId,
  ]);
  const getDataPath = useCallback(data => {
    return data.treeDataPath;
  }, []);
  const gridPartProps = useMemo(() => {
    if (treeData && isServer)
      return {
        isServerSideGroup,
        treeData,
        rowModelType: 'serverSide',
        rowData: dataSource,
        getServerSideGroupKey: getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId,
      };
    return {
      treeData,
      rowData: dataSource,
      getDataPath,
    };
  }, [dataSource, getRowNodeId, isServerSideGroup, treeData, isServer]);

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      apiRef.current = params.api;
      columnsRef.current = params.columnApi;
      onReady && onReady(params, dataManage);
      dataManage.gridApi = params.api;
      dataManage.columnApi = params.columnApi;
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
  }, [selectedKeys, apiRef.current, rowSelection, getRowNodeId, manageData]);
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
      dataManage.cellEvents,
    );
  }, [columnDefs, getRowNodeId]);
  //columns-end
  const cellValueChanged = useCallback(changed => {
    dataManage.modify(changed);
  }, []);
  const refreshRowBufferCells = useCallback(
    rowIndex => {
      let rowBuffer = orignProps.rowBuffer == 0 ? 100 : orignProps.rowBuffer;
      rowBuffer = rowBuffer ? rowBuffer : 10;
      const rowNodes: any[] = [];
      for (let index = 0; index < 10; index++) {
        const indexRowNode = apiRef.current.getDisplayedRowAtIndex(index + rowIndex);
        if (indexRowNode) rowNodes.push(indexRowNode);
      }
      apiRef.current.refreshCells({
        rowNodes,
        force: true,
        columns:["g-index"]
      });
    },
    [orignProps.rowBuffer, apiRef.current],
  );
  const onGantRowGroupOpened = useCallback(
    params => {
      if (apiRef.current && serialNumber) {
        const {
          rowIndex,
          node: { expanded },
        } = params;
        if (!expanded) return;
        refreshRowBufferCells(rowIndex);
      }
      onRowGroupOpened && onRowGroupOpened(params);
    },
    [onRowGroupOpened, serialNumber],
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
                    // "gantGroupCellRenderer": GantGroupCellRenderer as any,
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
                  getDataPath={getDataPath}
                  rowHeight={size == 'small' ? 24 : 32}
                  singleClickEdit
                  context={{
                    golbalEditable: editable,
                    serverDataRequest,
                    isServerSideGroup,
                    size,
                    ...context,
                  }}
                  suppressAnimationFrame
                  suppressRowDrag
                  {...gridPartProps}
                  {...selection}
                  {...orignProps}
                  defaultColDef={{
                    resizable,
                    sortable,
                    filter,
                    minWidth: 30,
                    ...defaultColDef,
                  }}
                  onCellValueChanged={cellValueChanged}
                  deltaRowDataMode
                  groupDefaultExpanded={groupDefaultExpanded}
                  onRowGroupOpened={onGantRowGroupOpened}
                  localeText={locale}
                  rowClassRules={{
                    'gant-grid-row-isdeleted': params => get(params, 'data.isDeleted'),
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
