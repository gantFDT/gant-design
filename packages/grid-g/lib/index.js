"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GridContext: true,
  defaultProps: true,
  defaultRowSelection: true,
  setComponentsMaps: true,
  setFrameworkComponentsMaps: true,
  setGridConfig: true,
  GantDateComponent: true,
  GantGroupCellRenderer: true,
  c: true,
  SideGridDetail: true
};
Object.defineProperty(exports, "GantDateComponent", {
  enumerable: true,
  get: function get() {
    return _GantDateComponent.default;
  }
});
Object.defineProperty(exports, "GantGroupCellRenderer", {
  enumerable: true,
  get: function get() {
    return _GantGroupCellRenderer.default;
  }
});
exports.GridContext = void 0;
Object.defineProperty(exports, "SideGridDetail", {
  enumerable: true,
  get: function get() {
    return _sidegriddetail.default;
  }
});
Object.defineProperty(exports, "c", {
  enumerable: true,
  get: function get() {
    return _GantPromiseCellRender.default;
  }
});
exports.defaultRowSelection = exports.defaultProps = exports.default = void 0;
Object.defineProperty(exports, "setComponentsMaps", {
  enumerable: true,
  get: function get() {
    return _maps.setComponentsMaps;
  }
});
Object.defineProperty(exports, "setFrameworkComponentsMaps", {
  enumerable: true,
  get: function get() {
    return _maps.setFrameworkComponentsMaps;
  }
});
Object.defineProperty(exports, "setGridConfig", {
  enumerable: true,
  get: function get() {
    return _maps.setGridConfig;
  }
});

require("antd/es/spin/style/css");

var _spin = _interopRequireDefault(require("antd/es/spin"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("ag-grid-community/dist/styles/ag-grid.css");

require("ag-grid-community/dist/styles/ag-theme-balham.css");

var _agGridReact = require("ag-grid-react");

var _agGridEnterprise = require("ag-grid-enterprise");

var _Receiver = _interopRequireDefault(require("./locale/Receiver"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _contextMenuItems = require("./contextMenuItems");

var _CustomHeader = _interopRequireDefault(require("./CustomHeader"));

var _gantFilter = require("./gantFilter");

var _GantGridFormToolPanelRenderer = _interopRequireDefault(require("./GantGridFormToolPanelRenderer"));

var _gridManager = _interopRequireDefault(require("./gridManager"));

var _hooks = require("./hooks");

var _interface = require("./interface");

Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});

var _license = _interopRequireDefault(require("./license"));

var _maps = require("./maps");

var _Pagination = _interopRequireDefault(require("./Pagination"));

var _SelectedGrid = _interopRequireDefault(require("./SelectedGrid"));

var _GantDateComponent = _interopRequireDefault(require("./GantDateComponent"));

require("./style");

var _utils = require("./utils");

var _GantGroupCellRenderer = _interopRequireDefault(require("./GantGroupCellRenderer"));

var _GantPromiseCellRender = _interopRequireDefault(require("./GantPromiseCellRender"));

var _sidegriddetail = _interopRequireDefault(require("./sidegriddetail"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

//表格默认高度
var DEFAULT_HEIGHT = 400;

_agGridEnterprise.LicenseManager.setLicenseKey(_license.default);

var GridContext = /*#__PURE__*/(0, _react.createContext)({});
exports.GridContext = GridContext;
var defaultProps = {
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
  suppressCreateWhenPaste: false
};
exports.defaultProps = defaultProps;
var defaultRowSelection = {
  type: 'multiple',
  // checkboxIndex: 0,
  showDefalutCheckbox: true,
  // rowMultiSelectWithClick: true,
  rowDeselection: true
};
exports.defaultRowSelection = defaultRowSelection;

var Grid = function Grid(gridProps) {
  var globalConfig = (0, _react.useMemo)(function () {
    return (0, _maps.getGridConfig)();
  }, []);
  var props = Object.assign(Object.assign(Object.assign({}, defaultProps), (0, _lodash.omit)(globalConfig, ['pagination'])), gridProps);

  var initDataSource = props.dataSource,
      onReady = props.onReady,
      columns = props.columns,
      editable = props.editable,
      rowSel = props.rowSelection,
      rowkey = props.rowkey,
      gridKey = props.gridKey,
      resizable = props.resizable,
      filter = props.filter,
      sortable = props.sortable,
      width = props.width,
      height = props.height,
      treeData = props.treeData,
      pagination = props.pagination,
      loading = props.loading,
      isServerSideGroup = props.isServerSideGroup,
      getServerSideGroupKey = props.getServerSideGroupKey,
      _props$frameworkCompo = props.frameworkComponents,
      frameworkComponents = _props$frameworkCompo === void 0 ? {} : _props$frameworkCompo,
      treeDataChildrenName = props.treeDataChildrenName,
      customLocale = props.locale,
      serverGroupExpend = props.serverGroupExpend,
      _props$groupDefaultEx = props.groupDefaultExpanded,
      groupDefaultExpanded = _props$groupDefaultEx === void 0 ? 0 : _props$groupDefaultEx,
      defaultColDef = props.defaultColDef,
      propsContext = props.context,
      components = props.components,
      serialNumber = props.serialNumber,
      rowClassRules = props.rowClassRules,
      isCompute = props.isCompute,
      orignGetDataPath = props.getDataPath,
      onCellEditChange = props.onCellEditChange,
      onCellEditingChange = props.onCellEditingChange,
      onCellChanged = props.onCellChanged,
      _props$openEditSign = props.openEditSign,
      openEditSign = _props$openEditSign === void 0 ? true : _props$openEditSign,
      getContextMenuItems = props.getContextMenuItems,
      createConfig = props.createConfig,
      onRowsCut = props.onRowsCut,
      onRowsPaste = props.onRowsPaste,
      onRowsPasteEnd = props.onRowsPasteEnd,
      _props$showCut = props.showCut,
      showCut = _props$showCut === void 0 ? false : _props$showCut,
      pasteToGridManager = props.pasteToGridManager,
      onContextChangeRender = props.onContextChangeRender,
      defaultExportParams = props.defaultExportParams,
      defaultJsonParams = props.defaultJsonParams,
      editChangeCallback = props.editChangeCallback,
      isRowSelectable = props.isRowSelectable,
      boxColumnIndex = props.boxColumnIndex,
      hideSelectedBox = props.hideSelectedBox,
      suppressKeyboardEvent = props.suppressKeyboardEvent,
      propsOnSelectionChanged = props.onSelectionChanged,
      propsOnRowSelected = props.onRowSelected,
      propOnRowDataUpdated = props.onRowDataUpdated,
      propOnRowDataChanged = props.onRowDataChanged,
      groupSelectsChildren = props.groupSelectsChildren,
      onColumnMoved = props.onColumnMoved,
      onColumnResized = props.onColumnResized,
      onColumnVisible = props.onColumnVisible,
      onRowClicked = props.onRowClicked,
      drawerMode = props.drawerMode,
      multiLineVerify = props.multiLineVerify,
      defaultDrawerWidth = props.defaultDrawerWidth,
      selectedBoxHeight = props.selectedBoxHeight,
      _props$selectedBoxWid = props.selectedBoxWidth,
      selectedBoxWidth = _props$selectedBoxWid === void 0 ? 240 : _props$selectedBoxWid,
      onRowDoubleClicked = props.onRowDoubleClicked,
      handleFilterModified = props.onFilterModified,
      doubleClickedExpanded = props.doubleClickedExpanded,
      customDrawerContent = props.customDrawerContent,
      propVisibleDrawer = props.visibleDrawer,
      hideMenuItemExport = props.hideMenuItemExport,
      hideMenuItemExpand = props.hideMenuItemExpand,
      hiddenMenuItemNames = props.hiddenMenuItemNames,
      _props$showMenuItemCl = props.showMenuItemClearFilter,
      showMenuItemClearFilter = _props$showMenuItemCl === void 0 ? false : _props$showMenuItemCl,
      onMenuItemClearFilter = props.onMenuItemClearFilter,
      _props$excelStyles = props.excelStyles,
      excelStyles = _props$excelStyles === void 0 ? [] : _props$excelStyles,
      suppressRightClickSelected = props.suppressRightClickSelected,
      treeDataForcedFilter = props.treeDataForcedFilter,
      _props$themeClass = props.themeClass,
      themeClass = _props$themeClass === void 0 ? 'ag-theme-balham' : _props$themeClass,
      gantThemeClass = props.gantThemeClass,
      gantDateComponent = props.gantDateComponent,
      autoHeight = props.autoHeight,
      maxAutoHeight = props.maxAutoHeight,
      _props$minAutoHeight = props.minAutoHeight,
      minAutoHeight = _props$minAutoHeight === void 0 ? 150 : _props$minAutoHeight,
      showCutChild = props.showCutChild,
      gantCustomHeader = props.gantCustomHeader,
      _props$numberGoToMode = props.numberGoToMode,
      numberGoToMode = _props$numberGoToMode === void 0 ? false : _props$numberGoToMode,
      _props$domLayout = props.domLayout,
      _domLayout = _props$domLayout === void 0 ? 'normal' : _props$domLayout,
      _props$size = props.size,
      size = _props$size === void 0 ? 'small' : _props$size,
      _props$border = props.border,
      border = _props$border === void 0 ? true : _props$border,
      _props$zebra = props.zebra,
      zebra = _props$zebra === void 0 ? true : _props$zebra,
      _rowHeight = props.rowHeight,
      getRowHeight = props.getRowHeight,
      headerHeight = props.headerHeight,
      _props$controlCellWor = props.controlCellWordWrap,
      controlCellWordWrap = _props$controlCellWor === void 0 ? false : _props$controlCellWor,
      suppressGroupSelectParent = props.suppressGroupSelectParent,
      exportHiddenFields = props.exportHiddenFields,
      propsOnColumnsChange = props.onColumnsChange,
      suppressManagerPaste = props.suppressManagerPaste,
      suppressCreateWhenPaste = props.suppressCreateWhenPaste,
      suppressExcelExport = props.suppressExcelExport,
      removeRowSelectable = props.removeRowSelectable,
      exportExcludeColumns = props.exportExcludeColumns,
      orignProps = __rest(props, ["dataSource", "onReady", "columns", "editable", "rowSelection", "rowkey", "gridKey", "resizable", "filter", "sortable", "width", "height", "treeData", "pagination", "loading", "isServerSideGroup", "getServerSideGroupKey", "frameworkComponents", "treeDataChildrenName", "locale", "serverGroupExpend", "groupDefaultExpanded", "defaultColDef", "context", "components", "serialNumber", "rowClassRules", "isCompute", "getDataPath", "onCellEditChange", "onCellEditingChange", "onCellChanged", "openEditSign", "getContextMenuItems", "createConfig", "onRowsCut", "onRowsPaste", "onRowsPasteEnd", "showCut", "pasteToGridManager", "onContextChangeRender", "defaultExportParams", "defaultJsonParams", "editChangeCallback", "isRowSelectable", "boxColumnIndex", "hideSelectedBox", "suppressKeyboardEvent", "onSelectionChanged", "onRowSelected", "onRowDataUpdated", "onRowDataChanged", "groupSelectsChildren", "onColumnMoved", "onColumnResized", "onColumnVisible", "onRowClicked", "drawerMode", "multiLineVerify", "defaultDrawerWidth", "selectedBoxHeight", "selectedBoxWidth", "onRowDoubleClicked", "onFilterModified", "doubleClickedExpanded", "customDrawerContent", "visibleDrawer", "hideMenuItemExport", "hideMenuItemExpand", "hiddenMenuItemNames", "showMenuItemClearFilter", "onMenuItemClearFilter", "excelStyles", "suppressRightClickSelected", "treeDataForcedFilter", "themeClass", "gantThemeClass", "gantDateComponent", "autoHeight", "maxAutoHeight", "minAutoHeight", "showCutChild", "gantCustomHeader", "numberGoToMode", "domLayout", "size", "border", "zebra", "rowHeight", "getRowHeight", "headerHeight", "controlCellWordWrap", "suppressGroupSelectParent", "exportHiddenFields", "onColumnsChange", "suppressManagerPaste", "suppressCreateWhenPaste", "suppressExcelExport", "removeRowSelectable", "exportExcludeColumns"]);

  var apiRef = (0, _react.useRef)();
  var shiftRef = (0, _react.useRef)(false);
  var wrapperRef = (0, _react.useRef)();
  var columnsRef = (0, _react.useRef)();
  var selectedLoadingRef = (0, _react.useRef)(false);
  var clickedEventRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      visibleDrawer = _useState2[0],
      setVisibleDrawer = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      exportColumns = _useState4[0],
      setExportColumns = _useState4[1]; // const [clickedEvent, setClickedEvent] = useState<RowClickedEvent>();


  var _useState5 = (0, _react.useState)(-1),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      clickRowIndex = _useState6[0],
      setClickRowIndex = _useState6[1];

  var domLayout = _domLayout; //如果是开启启动表格高度，并且是指定了行高策略, 那么就使用真实的自动高度模式

  domLayout = autoHeight ? 'autoHeight' : domLayout;
  var gridVariableRef = (0, _react.useRef)({
    hasSelectedRows: typeof rowSel !== 'boolean' && (0, _lodash.isObject)(rowSel) && Reflect.has(rowSel, 'selectedRows'),
    hideSelectedBox: hideSelectedBox,
    selectedRows: []
  });

  var _useState7 = (0, _react.useState)([]),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      innerSelectedRows = _useState8[0],
      setInnerSelectedRows = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      ready = _useState10[0],
      setReady = _useState10[1]; //自定义列头文字


  var ColumnLabelComponent = frameworkComponents.ColumnLabelComponent; //行高

  var rowHeight = _rowHeight || (0, _lodash.get)(_utils.sizeDefinitions, "rowHeight.".concat(size));

  rowHeight = autoHeight ? undefined : rowHeight; //实例化manager

  var gridManager = (0, _react.useMemo)(function () {
    return new _gridManager.default({
      pasteToGridManager: pasteToGridManager
    });
  }, []);
  /**默认基本方法 */

  var getRowNodeId = (0, _react.useCallback)(function (data) {
    if (typeof rowkey === 'string') {
      return (0, _lodash.get)(data, rowkey) + '';
    }

    return rowkey(data) + '';
  }, []);
  var getRowId = (0, _react.useCallback)(function (params) {
    return getRowNodeId(params.data);
  }, []);
  var getDataPath = (0, _react.useCallback)(function (data) {
    if (!treeData) return [];
    var dataPath = orignGetDataPath ? orignGetDataPath(data) : isCompute ? data.treeDataPath : [];
    return dataPath;
  }, [orignGetDataPath, treeData]); // 分页事件

  var computedPagination = (0, _react.useMemo)(function () {
    return (0, _utils.usePagination)((0, _lodash.isEmpty)(pagination) ? false : Object.assign({}, pagination), size, globalConfig.pagination);
  }, [pagination, size]); //表格外层容器高度，高度策略有两种，一种是兼容虚拟滚动计算出来的假的自动高度，一种是完全自动高度，稍微有点复杂

  var gridHeight = (0, _react.useMemo)(function () {
    //如果没指定高度，也没指定自动高度，那么给予默认高度
    if (!autoHeight && !height) return DEFAULT_HEIGHT; //如果是开启自动高度并且指定了行高策略，则使用domLayout:'autoHeight'

    if (autoHeight) {
      return '100%';
    }

    return height;
  }, [autoHeight, height]); //表格内层容器高度策略

  var girdWrapHeight = (0, _react.useMemo)(function () {
    if (autoHeight) {
      return '100%';
    }

    return computedPagination ? "calc(100% - ".concat((0, _lodash.get)(_utils.sizeDefinitions, "paginationHeight.".concat(size)), "px - ").concat(gantThemeClass === 'gant-grid-theme' ? 'var(--space,10px) - 2px' : '0px', ")") : '100%';
  }, [autoHeight, computedPagination, _utils.sizeDefinitions, size]); //侧边栏显示隐藏

  (0, _react.useEffect)(function () {
    if (typeof propVisibleDrawer === 'boolean') {
      setVisibleDrawer(propVisibleDrawer);
    }
  }, [propVisibleDrawer]); // 判断数据分别处理 treeTable 和普通table

  var dataSource = (0, _react.useMemo)(function () {
    if (treeData && isCompute) return (0, _utils.flattenTreeData)(initDataSource, getRowNodeId, treeDataChildrenName);
    return initDataSource;
  }, [initDataSource, treeData, treeDataChildrenName]); //

  var serverDataRequest = (0, _react.useCallback)(function (params, groupKeys, successCallback) {
    if (serverGroupExpend) {
      return serverGroupExpend(params, serverDataCallback(groupKeys, successCallback));
    }

    return successCallback([], 0);
  }, [serverGroupExpend]); // 处理selection

  var gantSelection = (0, _react.useMemo)(function () {
    if (rowSel === true) {
      return defaultRowSelection;
    }

    if (rowSel) return Object.assign(Object.assign({}, defaultRowSelection), rowSel);
    return {};
  }, [rowSel]);

  var onSelect = gantSelection.onSelect,
      selectedRows = gantSelection.selectedRows,
      showDefalutCheckbox = gantSelection.showDefalutCheckbox,
      rowSelection = gantSelection.type,
      onSelectedChanged = gantSelection.onSelectedChanged,
      defaultSelectionCol = gantSelection.defaultSelectionCol,
      selection = __rest(gantSelection, ["onSelect", "selectedRows", "showDefalutCheckbox", "type", "onSelectedChanged", "defaultSelectionCol"]); // context


  var context = (0, _react.useMemo)(function () {
    return Object.assign({
      globalEditable: editable,
      serverDataRequest: serverDataRequest,
      isServerSideGroup: isServerSideGroup,
      size: size,
      getDataPath: getDataPath,
      computedPagination: computedPagination,
      treeData: treeData,
      gridManager: gridManager,
      showCut: showCut,
      createConfig: createConfig,
      getRowNodeId: getRowNodeId,
      watchEditChange: typeof onCellEditChange === 'function',
      onCellEditChange: onCellEditChange,
      onCellEditingChange: onCellEditingChange,
      onCellChanged: onCellChanged,
      rowSelection: rowSelection
    }, propsContext);
  }, [propsContext, size, computedPagination, editable, drawerMode, showCut, onCellEditChange, onCellEditingChange, onCellChanged, getDataPath, rowSelection]);

  var _filterHooks = (0, _gantFilter.filterHooks)({
    treeData: treeData,
    treeDataForcedFilter: treeDataForcedFilter,
    handleFilterModified: handleFilterModified,
    getRowNodeId: getRowNodeId,
    dataSource: dataSource,
    context: context
  }),
      filterDataRef = _filterHooks.filterDataRef,
      onFilterModified = _filterHooks.onFilterModified,
      forcedGridKey = _filterHooks.forcedGridKey,
      filterModelRef = _filterHooks.filterModelRef,
      columnIdRef = _filterHooks.columnIdRef; //强制树形过滤，已废弃，使用原生 excludeChildrenWhenTreeDataFiltering


  var gridForcedProps = (0, _react.useMemo)(function () {
    if (!treeDataForcedFilter && forcedGridKey) return {};
    return {
      key: forcedGridKey
    };
  }, [forcedGridKey]); // 初始注册配置信息；

  (0, _react.useEffect)(function () {
    gridManager.reset({
      getRowNodeId: getRowNodeId,
      createConfig: createConfig,
      treeData: treeData,
      getDataPath: getDataPath,
      isCompute: isCompute,
      treeDataChildrenName: treeDataChildrenName,
      editChangeCallback: editChangeCallback,
      onRowsPasteEnd: onRowsPasteEnd,
      multiLineVerify: multiLineVerify
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (ready) gridManager.dataSourceChanged(dataSource);
  }, [dataSource, ready]);
  var serverDataCallback = (0, _react.useCallback)(function (groupKeys, successCallback) {
    return function (rows) {
      successCallback(rows, rows.length);
      gridManager.appendChild(groupKeys, rows);
    };
  }, []);

  var _useMemo = (0, _react.useMemo)(function () {
    return (0, _maps.getAllComponentsMaps)();
  }, []),
      componentsMaps = _useMemo.componentsMaps,
      frameworkComponentsMaps = _useMemo.frameworkComponentsMaps; // 获取selected 数据


  var getAllSelectedRows = (0, _react.useCallback)(function (selectedRows, hideBox) {
    var currentRows = [];
    var extraRows = [];
    if (hideBox) return {
      extraRows: extraRows,
      currentRows: selectedRows
    };
    var dataSource = gridManager.agGridConfig.dataSource;
    selectedRows.map(function (itemRow) {
      var index = (0, _lodash.findIndex)(dataSource, function (itemData) {
        return getRowNodeId(itemData) === getRowNodeId(itemRow);
      });
      if (index < 0 && !apiRef.current.getRowNode(getRowNodeId(itemRow)) && (0, _lodash.get)(itemRow, '_rowType') !== _interface.DataActions.add) extraRows.push(itemRow);else {
        currentRows.push(itemRow);
      }
    });
    return {
      extraRows: extraRows,
      currentRows: currentRows
    };
  }, []); //已选择盒子选择行

  var onBoxSelectionChanged = (0, _react.useCallback)(function (keys, rows) {
    var _a;

    if (!gridVariableRef.current.hasSelectedRows) {
      var nodes = (_a = apiRef.current) === null || _a === void 0 ? void 0 : _a.getSelectedNodes();
      var _innerSelectedRows = [];
      nodes.map(function (node) {
        var nodeId = getRowNodeId((0, _lodash.get)(node, 'data'));
        if (keys.indexOf(nodeId) < 0) return node.setSelected(false);

        _innerSelectedRows.push((0, _lodash.get)(node, 'data'));
      });
      setInnerSelectedRows(_innerSelectedRows);
    }

    onSelect && onSelect(keys, rows);
  }, [onSelect]);

  var _selectedHooks = (0, _hooks.selectedHooks)({
    gridVariable: gridVariableRef.current,
    ready: ready,
    apiRef: apiRef,
    dataSource: dataSource,
    getRowNodeId: getRowNodeId,
    selectedRows: selectedRows,
    isSingle: rowSelection === 'single'
  }),
      selectedChangeRef = _selectedHooks.selectedChangeRef,
      updateSelection = _selectedHooks.updateSelection; //是否隐藏selectedBox


  var hideBox = (0, _react.useMemo)(function () {
    return hideSelectedBox || rowSelection !== 'multiple';
  }, [hideSelectedBox, rowSelection]); //选择行改变

  var onSelectionChanged = (0, _react.useCallback)(function (event) {
    var _a, _b, _c, _d;

    propsOnSelectionChanged && propsOnSelectionChanged(event);
    if (selectedChangeRef.current) return;

    if (((_a = gridVariableRef.current) === null || _a === void 0 ? void 0 : _a.hasSelectedRows) && rowSelection === 'multiple') {
      var _rows = event.api.getSelectedRows();

      var _getAllSelectedRows = getAllSelectedRows((0, _lodash.get)(gridVariableRef.current, 'selectedRows', []), hideBox),
          extraRows = _getAllSelectedRows.extraRows,
          currentRows = _getAllSelectedRows.currentRows;

      if ((0, _lodash.isEqual)(currentRows, _rows)) return;

      var _selectedRows = [].concat((0, _toConsumableArray2.default)(extraRows), (0, _toConsumableArray2.default)(_rows));

      return onSelect && onSelect(_selectedRows.map(function (item) {
        return getRowNodeId(item);
      }), _selectedRows);
    }

    var rows = event.api.getSelectedRows();
    if (((_b = gridVariableRef.current) === null || _b === void 0 ? void 0 : _b.hasSelectedRows) && (0, _lodash.isEqual)((_c = gridVariableRef.current) === null || _c === void 0 ? void 0 : _c.selectedRows, rows)) return;
    onSelect && onSelect(rows.map(function (item) {
      return getRowNodeId(item);
    }), rows);
    if ((_d = gridVariableRef.current) === null || _d === void 0 ? void 0 : _d.hideSelectedBox) return;
    gridVariableRef.current.selectedRows = rows;
    setInnerSelectedRows(rows);
  }, [getAllSelectedRows, propsOnSelectionChanged, rowSelection, hideBox]); //单击行

  var handleRowClicked = (0, _react.useCallback)(function (event) {
    if (drawerMode && visibleDrawer) {
      if (typeof propVisibleDrawer !== 'boolean') setVisibleDrawer(true);
      clickedEventRef.current = event;
      setClickRowIndex((0, _lodash.get)(event, 'rowIndex'));
    }

    onRowClicked && onRowClicked(event);
  }, [onRowClicked, drawerMode, visibleDrawer, propVisibleDrawer]); //双击行

  var handleRowDoubleClicked = (0, _react.useCallback)(function (event) {
    if (onRowDoubleClicked) onRowDoubleClicked(event);
    var doubleClickedOpenDrawer = true;

    if (drawerMode && doubleClickedOpenDrawer) {
      if (typeof propVisibleDrawer !== 'boolean') setVisibleDrawer(true);
      clickedEventRef.current = event;
      setClickRowIndex((0, _lodash.get)(event, 'rowIndex'));
    }

    if (doubleClickedExpanded) {
      var node = event.node;
      if (node.childrenAfterGroup.length > 0) node.setExpanded(!node.expanded);
    }
  }, [onRowDoubleClicked, drawerMode, doubleClickedExpanded]); //行被选择

  var onRowSelected = (0, _react.useCallback)(function (event) {
    if (selectedChangeRef.current) return;
    propsOnRowSelected && propsOnRowSelected(event);
    if (!groupSelectsChildren || !treeData) return;
    var gridSelectedRows = event.api.getSelectedRows();
    if (gridSelectedRows.length === 0 || gridManager.getRowData().length === gridSelectedRows.length) return;
    if (selectedLoadingRef.current) return;
    selectedLoadingRef.current = true;
    var node = event.node;
    var nodeSelected = node.isSelected();
    (0, _utils.groupNodeSelectedToggle)(node, nodeSelected);
    if (!suppressGroupSelectParent) (0, _utils.checkParentGroupSelectedStatus)(node, nodeSelected, event.api);
    setTimeout(function () {
      selectedLoadingRef.current = false;
      event.api.refreshCells({
        columns: ['defalutSelection'],
        rowNodes: [node],
        force: true
      });
    }, 200);
  }, [propsOnRowSelected, suppressGroupSelectParent]); //已选择行

  var boxSelectedRows = (0, _react.useMemo)(function () {
    if (gridVariableRef.current.hasSelectedRows) return selectedRows;
    return innerSelectedRows;
  }, [innerSelectedRows, selectedRows]); // 处理selection-end
  //columns

  var defaultSelection = !(0, _lodash.isEmpty)(gantSelection) && showDefalutCheckbox;
  var innerColumns = (0, _hooks.useConfigColumns)(columns, propsOnColumnsChange);

  var _useMemo2 = (0, _react.useMemo)(function () {
    return (0, _utils.mapColumns)(innerColumns, getRowNodeId, defaultSelection, defaultSelectionCol, rowSelection, serialNumber, size);
  }, [columns, size]),
      columnDefs = _useMemo2.columnDefs,
      validateFields = _useMemo2.validateFields,
      requireds = _useMemo2.requireds; // 选中栏grid  columns;


  var selectedColumns = (0, _react.useMemo)(function () {
    return (0, _utils.selectedMapColumns)(columns, boxColumnIndex);
  }, [columns, boxColumnIndex]); // 配置验证规则

  (0, _react.useEffect)(function () {
    gridManager.validateFields = validateFields;
  }, [validateFields]); // 监听columns变换

  var onColumnsChange = (0, _react.useCallback)(function (event) {
    switch (event.type) {
      case 'columnVisible':
        onColumnVisible && onColumnVisible(event);
        break;

      case 'columnResized':
        onColumnResized && onColumnResized(event);
        break;

      case 'columnMoved':
        onColumnMoved && onColumnMoved(event);
        break;
    }

    gridManager.setLocalStorageColumnsState();
  }, [onColumnMoved, onColumnResized, onColumnVisible]); // 监听onColumnEverythingChanged

  var onColumnEverythingChanged = (0, _react.useCallback)(function (event) {
    var columnState = event.columnApi.getColumnState();
    var arr = [];
    columnState.map(function (item) {
      var field = (0, _lodash.get)(item, 'colId');
      var hide = (0, _lodash.get)(item, 'hide');
      var suspressExport = (0, _lodash.get)(item, 'suspressExport');

      if (field !== 'defalutSelection' && field !== 'g-index') {
        if (!exportHiddenFields && hide || suspressExport) return;
        arr.push(field);
      }
    });
    setExportColumns(function (pre) {
      return (0, _lodash.isEqual)(pre, arr) ? pre : arr;
    });
  }, [exportHiddenFields]);
  var localColumnsDefs = (0, _react.useMemo)(function () {
    return gridManager.getLocalStorageColumns(columnDefs, gridKey);
  }, [columnDefs, gridKey]); // columns-end

  var onGridReady = (0, _react.useCallback)(function (params) {
    apiRef.current = params.api;
    columnsRef.current = params.columnApi;
    gridManager.agGridApi = params.api;
    gridManager.agGridColumnApi = params.columnApi;
    gridManager.rowkey = rowkey;
    onReady && onReady(params, gridManager);
    setReady(true);

    if (filterModelRef.current && treeDataForcedFilter) {
      params.api.setRowData((0, _lodash.get)(gridManager, 'agGridConfig.dataSource', []));
      params.api.setFilterModel(filterModelRef.current);
    }
  }, [onReady, gridKey]); // //阻止键盘事件
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

  var onRowSelectable = (0, _react.useCallback)(function (rowNode) {
    var notRemove = (0, _lodash.get)(rowNode, 'data._rowType') !== _interface.DataActions.removeTag || removeRowSelectable;

    if (isRowSelectable) {
      return isRowSelectable(rowNode) && notRemove;
    }

    return notRemove;
  }, []); // 监听context变换并更新

  (0, _hooks.contextHooks)(context, apiRef, onContextChangeRender); //导出设置

  var exportParams = (0, _react.useMemo)(function () {
    var cloneColumns = (0, _lodash.cloneDeep)(exportColumns);
    (0, _lodash.remove)(cloneColumns, function (name) {
      var _a;

      if (!exportExcludeColumns) return false;
      return (_a = exportExcludeColumns) === null || _a === void 0 ? void 0 : _a.includes(name);
    });
    return Object.assign(Object.assign({
      columnKeys: cloneColumns,
      allColumns: false,
      columnGroups: true
    }, globalConfig.defaultExportParams), defaultExportParams);
  }, [defaultExportParams, exportColumns]); //编辑结束

  var onCellEditingStopped = (0, _react.useCallback)(function (event) {
    clickedEventRef.current = event;
    var tipDoms = document.querySelectorAll('.gant-cell-tooltip.ag-tooltip-custom');
    tipDoms.forEach(function (itemDom) {
      itemDom.remove();
    });
  }, []); // 监听数据变化

  var onRowDataUpdated = (0, _react.useCallback)(function (event) {
    var api = event.api;
    propOnRowDataUpdated && propOnRowDataUpdated(event);
  }, []);

  var _defaultColDef = (0, _react.useMemo)(function () {
    return Object.assign(Object.assign(Object.assign({
      resizable: resizable,
      sortable: sortable,
      filter: filter,
      minWidth: 30,
      tooltipValueGetter: function tooltipValueGetter(params) {
        return params.value;
      },
      headerCheckboxSelectionFilteredOnly: true,
      tooltipComponent: 'gantTooltip',
      headerComponentParams: {
        ColumnLabelComponent: ColumnLabelComponent
      },
      cellClass: 'stringType'
    }, globalConfig.defaultColDef), defaultColDef), {
      filterParams: Object.assign({
        buttons: ['reset']
      }, (0, _lodash.get)(defaultColDef, 'filterParams', {}))
    });
  }, []);

  var currentTreeData = (0, _react.useMemo)(function () {
    if (!treeDataForcedFilter || !treeData) return treeData;
    if ((0, _lodash.isEmpty)(filterModelRef.current)) return true;
    return false;
  }, [forcedGridKey]); // 粘贴处理

  var gridPasteProps = (0, _hooks.useGridPaste)({
    gridManager: gridManager,
    columns: columns,
    suppressManagerPaste: suppressManagerPaste,
    suppressCreateWhenPaste: suppressCreateWhenPaste
  });
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, {
    children: function children(defaultLocale) {
      var locale = Object.assign(Object.assign({}, defaultLocale), customLocale);

      var contextMenuItems = function contextMenuItems(params) {
        return (0, _contextMenuItems.gantGetcontextMenuItems)(params, {
          downShift: shiftRef.current,
          onRowsCut: onRowsCut,
          onRowsPaste: onRowsPaste,
          locale: locale,
          getContextMenuItems: getContextMenuItems,
          defaultJsonParams: defaultJsonParams,
          hideMenuItemExport: hideMenuItemExport,
          hideMenuItemExpand: hideMenuItemExpand,
          hiddenMenuItemNames: hiddenMenuItemNames,
          suppressRightClickSelected: suppressRightClickSelected,
          showCutChild: showCutChild,
          showMenuItemClearFilter: showMenuItemClearFilter,
          onMenuItemClearFilter: onMenuItemClearFilter
        });
      };

      return /*#__PURE__*/_react.default.createElement(_spin.default, {
        spinning: loading || !ready
      }, /*#__PURE__*/_react.default.createElement(GridContext.Provider, {
        value: Object.assign({
          serverDataRequest: serverDataRequest,
          isServerSideGroup: isServerSideGroup,
          size: size,
          getDataPath: getDataPath,
          computedPagination: computedPagination,
          treeData: currentTreeData
        }, context)
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: width,
          height: gridHeight
        },
        className: (0, _classnames.default)('gant-grid', gantThemeClass, editable && openEditSign && 'gant-grid-editable', controlCellWordWrap && "grid-control-break-line")
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'flex',
          width: width,
          height: girdWrapHeight
        }
      }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
        className: (0, _classnames.default)(themeClass, 'gant-ag-wrapper'),
        "data-refid": gridKey,
        style: {
          width: '100%',
          height: '100%',
          fontSize: _utils.sizeDefinitions.fontSize[size]
        },
        ref: wrapperRef
      }, gridForcedProps), !hideBox && /*#__PURE__*/_react.default.createElement(_SelectedGrid.default, {
        apiRef: apiRef,
        onChange: onBoxSelectionChanged,
        getRowNodeId: getRowNodeId,
        columnDefs: selectedColumns,
        rowData: boxSelectedRows,
        selectedBoxHeight: selectedBoxHeight,
        selectedBoxWidth: selectedBoxWidth,
        locale: locale
      }), /*#__PURE__*/_react.default.createElement(_agGridReact.AgGridReact, Object.assign({
        frameworkComponents: Object.assign(Object.assign({
          agColumnHeader: gantCustomHeader ? _CustomHeader.default : null,
          agDateInput: gantDateComponent ? _GantDateComponent.default : null
        }, frameworkComponentsMaps), frameworkComponents),
        components: Object.assign(Object.assign({}, componentsMaps), components),
        onRowClicked: handleRowClicked,
        onSelectionChanged: onSelectionChanged,
        onRowSelected: onRowSelected,
        rowSelection: rowSelection,
        // getRowNodeId={getRowNodeId}
        getRowId: getRowId,
        onGridReady: onGridReady,
        enableFillHandle: true,
        headerHeight: headerHeight || (0, _lodash.get)(_utils.sizeDefinitions, "headerHeight.".concat(size)),
        floatingFiltersHeight: (0, _lodash.get)(_utils.sizeDefinitions, "floatingFiltersHeight.".concat(size)),
        singleClickEdit: true,
        defaultExportParams: exportParams,
        context: Object.assign(Object.assign({
          serverDataRequest: serverDataRequest,
          isServerSideGroup: isServerSideGroup,
          size: size,
          suppressExcelExport: suppressExcelExport,
          getDataPath: getDataPath,
          computedPagination: computedPagination,
          groupSelectsChildren: groupSelectsChildren
        }, context), {
          treeData: currentTreeData,
          requireds: requireds
        }),
        onFilterModified: onFilterModified,
        suppressCsvExport: true,
        stopEditingWhenGridLosesFocus: false,
        treeData: currentTreeData,
        suppressScrollOnNewData: true,
        tooltipShowDelay: 0,
        tooltipMouseTrack: true,
        excludeChildrenWhenTreeDataFiltering: true
      }, selection, {
        excelStyles: [{
          id: 'stringType',
          dataType: 'String'
        }].concat((0, _toConsumableArray2.default)(excelStyles)),
        enableCellTextSelection: true,
        domLayout: domLayout,
        rowHeight: rowHeight || (0, _lodash.get)(_utils.sizeDefinitions, "rowHeight.".concat(size)),
        getRowHeight: getRowHeight
      }, orignProps, {
        getDataPath: getDataPath,
        gridOptions: Object.assign({}, orignProps === null || orignProps === void 0 ? void 0 : orignProps.gridOptions),
        isRowSelectable: onRowSelectable,
        defaultColDef: _defaultColDef,
        onRowDoubleClicked: handleRowDoubleClicked,
        groupSelectsChildren: treeData ? false : groupSelectsChildren,
        groupDefaultExpanded: groupDefaultExpanded,
        localeText: locale,
        rowClassRules: Object.assign({
          'gant-grid-row-isdeleted': function gantGridRowIsdeleted(params) {
            return (0, _lodash.get)(params, 'data._rowType') === _interface.DataActions.removeTag;
          },
          'gant-grid-row-cut': function gantGridRowCut(params) {
            return (0, _lodash.get)(params, 'data._rowCut');
          }
        }, rowClassRules)
      }, gridPasteProps, {
        getContextMenuItems: contextMenuItems,
        onCellEditingStopped: onCellEditingStopped,
        onRowDataUpdated: onRowDataUpdated,
        onColumnMoved: onColumnsChange,
        onColumnVisible: onColumnsChange,
        onColumnResized: onColumnsChange,
        onColumnEverythingChanged: onColumnEverythingChanged,
        columnDefs: localColumnsDefs
      }))), drawerMode && visibleDrawer && /*#__PURE__*/_react.default.createElement(_GantGridFormToolPanelRenderer.default, {
        columns: columns,
        clickedEvent: clickedEventRef.current,
        gridManager: gridManager,
        visible: visibleDrawer,
        closeDrawer: function closeDrawer() {
          return typeof propVisibleDrawer !== 'boolean' && setVisibleDrawer(false);
        },
        onCellEditChange: onCellEditChange,
        onCellEditingChange: onCellEditingChange,
        defaultDrawerWidth: defaultDrawerWidth,
        customDrawerContent: customDrawerContent,
        editable: editable,
        clickRowIndex: clickRowIndex,
        context: Object.assign(Object.assign({
          serverDataRequest: serverDataRequest,
          isServerSideGroup: isServerSideGroup,
          size: size,
          getDataPath: getDataPath,
          computedPagination: computedPagination,
          groupSelectsChildren: groupSelectsChildren
        }, context), {
          treeData: currentTreeData,
          requireds: requireds
        })
      })), computedPagination && /*#__PURE__*/_react.default.createElement(_Pagination.default, Object.assign({
        numberGoToMode: numberGoToMode,
        size: size
      }, computedPagination)))));
    }
  });
};

Grid.LicenseManager = _agGridEnterprise.LicenseManager;
var _default = Grid;
exports.default = _default;