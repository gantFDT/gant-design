"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gantGetcontextMenuItems = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _lodash = require("lodash");
var _fileSaver = _interopRequireDefault(require("file-saver"));
var gantGetcontextMenuItems = exports.gantGetcontextMenuItems = function gantGetcontextMenuItems(params, config) {
  var downShift = config.downShift,
    locale = config.locale,
    onRowsCut = config.onRowsCut,
    onRowsPaste = config.onRowsPaste,
    getContextMenuItems = config.getContextMenuItems,
    _config$defaultJsonPa = config.defaultJsonParams,
    defaultJsonParams = _config$defaultJsonPa === void 0 ? {} : _config$defaultJsonPa,
    hideMenuItemExport = config.hideMenuItemExport,
    hideMenuItemExpand = config.hideMenuItemExpand,
    hiddenMenuItemNames = config.hiddenMenuItemNames,
    suppressRightClickSelected = config.suppressRightClickSelected,
    showCutChild = config.showCutChild,
    showMenuItemClearFilter = config.showMenuItemClearFilter,
    onMenuItemClearFilter = config.onMenuItemClearFilter,
    exportParams = config.exportParams,
    onContextExportCallback = config.onContextExportCallback;
  var _params$context = params.context,
    globalEditable = _params$context.globalEditable,
    treeData = _params$context.treeData,
    createConfig = _params$context.createConfig,
    getRowNodeId = _params$context.getRowNodeId,
    gridManager = _params$context.gridManager,
    showCut = _params$context.showCut,
    suppressExcelExport = _params$context.suppressExcelExport,
    node = params.node,
    api = params.api,
    columnApi = params.columnApi;
  var exportJson = !(0, _lodash.isEmpty)(defaultJsonParams);
  var rowIndex = (0, _lodash.get)(node, 'rowIndex', 0);
  var selectedRowNodes = api.getSelectedNodes();
  //右键选中⌚️
  if (node && !suppressRightClickSelected) {
    var rowNodes = api.getSelectedNodes();
    if (!downShift || rowNodes.length == 0) {
      node.setSelected(true, true);
      selectedRowNodes = [node];
    } else {
      var rowNodeIndexs = rowNodes.map(function (rowNode) {
        return rowNode.rowIndex;
      });
      var maxIndex = (0, _lodash.max)(rowNodeIndexs);
      var minIndex = (0, _lodash.min)(rowNodeIndexs);
      if (rowIndex >= minIndex && rowIndex <= maxIndex) {
        node.setSelected(true, true);
        selectedRowNodes = [node];
      } else {
        var isMin = rowIndex < minIndex;
        var nodesCount = isMin ? minIndex - rowIndex : rowIndex - maxIndex;
        var startIndex = isMin ? rowIndex : maxIndex + 1;
        var extraNodes = Array(nodesCount).fill('').map(function (item, index) {
          var startNode = api.getDisplayedRowAtIndex(index + startIndex);
          startNode.setSelected(true);
          return startNode;
        });
        selectedRowNodes = isMin ? [].concat((0, _toConsumableArray2.default)(extraNodes), (0, _toConsumableArray2.default)(rowNodes)) : [].concat((0, _toConsumableArray2.default)(rowNodes), (0, _toConsumableArray2.default)(extraNodes));
      }
    }
  }
  var gridSelectedKeys = [];
  var gridSelectedRows = selectedRowNodes.map(function (item) {
    gridSelectedKeys.push(getRowNodeId((0, _lodash.get)(item, 'data', {})));
    return item.data;
  }, []);
  var items = getContextMenuItems ? getContextMenuItems(Object.assign({
    selectedRows: gridSelectedRows,
    selectedKeys: gridSelectedKeys,
    selectedRowKeys: gridSelectedKeys
  }, params)) : [];
  if (hiddenMenuItemNames && hiddenMenuItemNames.length) {
    (0, _lodash.remove)(items, function (menuItem) {
      return hiddenMenuItemNames.some(function (menuName) {
        return menuName === menuItem.name;
      });
    });
  }
  var defultMenu = Array.isArray(items) ? items : [];
  //剪切
  if (globalEditable) {
    var showCutBtns = typeof showCut === 'function' ? showCut(params) : showCut;
    if (showCutBtns) {
      var disabledCut = selectedRowNodes.length <= 0 || treeData && (0, _lodash.isEmpty)(createConfig);
      var hasPaste = selectedRowNodes.length > 1 || treeData && (0, _lodash.isEmpty)(createConfig) || (0, _lodash.isEmpty)(gridManager.cutRows);
      var cutMenu = [];
      cutMenu.push.apply(cutMenu, [{
        name: locale.cutRows,
        disabled: disabledCut,
        action: function action(params) {
          try {
            var canPut = onRowsCut ? onRowsCut(selectedRowNodes) : true;
            return canPut && gridManager.cut(selectedRowNodes);
          } catch (error) {}
        }
      }, {
        name: locale.cancelCut,
        disabled: (0, _lodash.isEmpty)(gridManager.cutRows),
        action: function action(params) {
          try {
            gridManager.cancelCut();
          } catch (error) {}
        }
      }, {
        name: locale.pasteTop,
        disabled: hasPaste,
        action: function action(params) {
          var _selectedRowNodes = selectedRowNodes,
            _selectedRowNodes2 = (0, _slicedToArray2.default)(_selectedRowNodes, 1),
            rowNode = _selectedRowNodes2[0];
          var canPaste = onRowsPaste ? onRowsPaste(gridManager.cutRows, rowNode, 'top') : true;
          canPaste && gridManager.paste(rowNode);
        }
      }, {
        name: locale.pasteBottom,
        disabled: hasPaste,
        action: function action(params) {
          var _selectedRowNodes3 = selectedRowNodes,
            _selectedRowNodes4 = (0, _slicedToArray2.default)(_selectedRowNodes3, 1),
            rowNode = _selectedRowNodes4[0];
          var canPaste = onRowsPaste ? onRowsPaste(gridManager.cutRows, rowNode, 'bottom') : true;
          canPaste && gridManager.paste(rowNode, false);
        }
      }]);
      if (showCutChild) cutMenu.push({
        name: locale.pasteChild,
        disabled: hasPaste,
        action: function action(params) {
          var _selectedRowNodes5 = selectedRowNodes,
            _selectedRowNodes6 = (0, _slicedToArray2.default)(_selectedRowNodes5, 1),
            rowNode = _selectedRowNodes6[0];
          var canPaste = onRowsPaste ? onRowsPaste(gridManager.cutRows, rowNode, 'inner') : true;
          canPaste && gridManager.paste(rowNode, false, true);
        }
      });
      if (defultMenu.length) {
        cutMenu.unshift('separator');
      }
      defultMenu.push.apply(defultMenu, cutMenu);
    }
  }
  //  导出相关
  var exportMenus = [];
  if (!hideMenuItemExport && !suppressExcelExport) {
    var exportMenuItem = {
      name: locale.export,
      icon: '<span class="ag-icon ag-icon-save" unselectable="on" role="presentation"></span>',
      action: function action() {
        var columnsState = columnApi.getColumnState();
        var columnKeys = exportParams.columnKeys.sort(function (itemA, itemB) {
          var indexA = (0, _lodash.findIndex)(columnsState, {
            colId: itemA
          });
          var indexB = (0, _lodash.findIndex)(columnsState, {
            colId: itemB
          });
          return indexA - indexB;
        });
        var params = Object.assign(Object.assign({}, exportParams), {
          columnKeys: columnKeys
        });
        onContextExportCallback === null || onContextExportCallback === void 0 ? void 0 : onContextExportCallback(params);
        api.exportDataAsExcel(params);
      }
    };
    exportMenus.push(exportMenuItem);
    if (suppressRightClickSelected) {
      var exporSelectedMenuItem = {
        name: locale.exportSelected,
        icon: '<span class="ag-icon ag-icon-save" unselectable="on" role="presentation"></span>',
        action: function action() {
          var columnsState = columnApi.getColumnState();
          var columnKeys = exportParams.columnKeys.sort(function (itemA, itemB) {
            var indexA = (0, _lodash.findIndex)(columnsState, {
              colId: itemA
            });
            var indexB = (0, _lodash.findIndex)(columnsState, {
              colId: itemB
            });
            return indexA - indexB;
          });
          var params = Object.assign(Object.assign({}, exportParams), {
            columnKeys: columnKeys,
            onlySelected: true
          });
          onContextExportCallback === null || onContextExportCallback === void 0 ? void 0 : onContextExportCallback(params);
          api.exportDataAsExcel(params);
        }
      };
      exportMenus.push(exporSelectedMenuItem);
    }
  }
  if (exportJson) {
    exportMenus.push({
      name: locale.exportJson,
      action: function action() {
        var _defaultJsonParams$ti = defaultJsonParams.title,
          title = _defaultJsonParams$ti === void 0 ? 'gantdGrid' : _defaultJsonParams$ti,
          onlySelected = defaultJsonParams.onlySelected;
        var data = [];
        if (onlySelected) {
          data = api.getSelectedRows();
        } else {
          api.forEachNode(function (node) {
            if (node.data) data.push(node.data);
          });
        }
        var jsonBlob = new Blob([JSON.stringify(data)], {
          type: 'text/plain;charset=utf-8'
        });
        _fileSaver.default.saveAs(jsonBlob, "".concat(title, ".json"));
      }
    });
  }
  if (exportMenus.length && defultMenu.length) exportMenus.unshift('separator');
  defultMenu.push.apply(defultMenu, exportMenus);
  // export ----end
  // 清空过滤 按钮
  if (showMenuItemClearFilter) {
    if (defultMenu.length) defultMenu.push('separator');
    defultMenu.push({
      name: locale.clearFilter,
      action: function action() {
        api.setFilterModel({});
        onMenuItemClearFilter === null || onMenuItemClearFilter === void 0 ? void 0 : onMenuItemClearFilter();
      }
    });
  }
  //树形展开/收起
  if (treeData && !hideMenuItemExpand) {
    if (defultMenu.length) defultMenu.push('separator');
    defultMenu.push.apply(defultMenu, ['expandAll', 'contractAll']);
  }
  return defultMenu;
};