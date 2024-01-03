"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextHooks = contextHooks;
exports.selectedHooks = selectedHooks;
exports.useConfigColumns = void 0;
exports.useGridPaste = useGridPaste;
exports.usePrev = usePrev;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = require("react");

var _lodash = require("lodash");

var _util = require("util-g");

var garidShowSelectedRows = function garidShowSelectedRows(selectedRows, apiRef, getRowNodeId, isSingle) {
  var gridSelectedRows = apiRef.current.getSelectedRows();
  var gridSelcetedKeys = gridSelectedRows.map(function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return getRowNodeId(item);
  });
  var selectedKeys = selectedRows.map(function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return getRowNodeId(item);
  });
  if (selectedKeys.length === 0) apiRef.current.deselectAll();
  var allKeys = (0, _lodash.uniq)([].concat((0, _toConsumableArray2.default)(gridSelcetedKeys), (0, _toConsumableArray2.default)(selectedKeys)));

  if (isSingle) {
    var _selectedKeys = (0, _slicedToArray2.default)(selectedKeys, 1),
        key = _selectedKeys[0];

    var singleNode = apiRef.current.getRowNode(key);
    singleNode && singleNode.setSelected(true, true);
    return;
  }

  allKeys.map(function (id) {
    var nodeItem = apiRef.current.getRowNode(id);
    if (!nodeItem) return;
    if (selectedKeys.indexOf(id) >= 0) nodeItem.setSelected(true);else nodeItem.setSelected(false);
  });
};

function selectedHooks(params) {
  var _params$dataSource = params.dataSource,
      dataSource = _params$dataSource === void 0 ? [] : _params$dataSource,
      ready = params.ready,
      apiRef = params.apiRef,
      gridVariable = params.gridVariable,
      selectedRows = params.selectedRows,
      getRowNodeId = params.getRowNodeId,
      isSingle = params.isSingle;
  var selectedChangeRef = (0, _react.useRef)(false);
  var updateSelection = (0, _react.useCallback)(function (selectedRows, dataSource) {
    var _a;

    selectedChangeRef.current = true;
    gridVariable.selectedRows = selectedRows;
    var selectedKeys = (0, _lodash.map)(selectedRows, function (item) {
      return getRowNodeId(item);
    });
    var gridKeys = (0, _lodash.map)((_a = apiRef.current) === null || _a === void 0 ? void 0 : _a.getSelectedRows(), function (item) {
      return getRowNodeId(item);
    });

    if ((0, _lodash.isEqual)(gridKeys, selectedKeys) || dataSource.length <= 0) {
      selectedChangeRef.current = false;
      return;
    }

    garidShowSelectedRows(selectedRows, apiRef, getRowNodeId, isSingle);
    setTimeout(function () {
      selectedChangeRef.current = false;
    }, 300);
  }, []);
  (0, _react.useEffect)(function () {
    if (!gridVariable.hasSelectedRows || !ready || !apiRef.current) return;
    updateSelection(selectedRows, dataSource);
  }, [dataSource, ready, selectedRows]);
  return {
    selectedChangeRef: selectedChangeRef,
    updateSelection: updateSelection
  };
}

function contextHooks(context, apiRef, onContextChangeRender) {
  var contextRef = (0, _react.useRef)(context);
  (0, _react.useEffect)(function () {
    var _a;

    var cancheContext = contextRef.current;
    var newContext = Object.assign(Object.assign({}, cancheContext), context);
    var diffKeys = [];
    Object.keys(newContext).map(function (key) {
      if (!(0, _lodash.isEqual)(cancheContext[key], context[key])) diffKeys.push(key);
    });
    if (diffKeys.length === 0) return;
    var params = onContextChangeRender && onContextChangeRender(context, diffKeys);
    if (!params) return;
    var columns = params.columns,
        _params$nodeIds = params.nodeIds,
        nodeIds = _params$nodeIds === void 0 ? [] : _params$nodeIds;
    var rowNodes = null;
    if (nodeIds && nodeIds.length > 0) rowNodes = nodeIds.map(function (id) {
      var _a;

      return (_a = apiRef.current) === null || _a === void 0 ? void 0 : _a.getRowNode(id);
    });
    (_a = apiRef.current) === null || _a === void 0 ? void 0 : _a.refreshCells({
      columns: columns,
      rowNodes: rowNodes,
      force: true
    });
  }, [context]);
}

function usePrev(value) {
  var ref = (0, _react.useRef)(value);
  (0, _react.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}

function useGridPaste(props) {
  var columns = props.columns,
      gridManager = props.gridManager,
      suppressCreateWhenPaste = props.suppressCreateWhenPaste,
      suppressManagerPaste = props.suppressManagerPaste;
  if (suppressManagerPaste) return {};
  var pastePosRef = (0, _react.useRef)({}); // 粘贴可编辑校验

  var colEditableMap = (0, _react.useMemo)(function () {
    var result = {};
    if (!columns) return result;

    var inner = function inner(colDef) {
      var _a, _b;

      if (colDef.children) {
        colDef.children.forEach(inner);
      } else {
        if ((_a = colDef.editConfig) === null || _a === void 0 ? void 0 : _a.suppressManagerPaste) {
          result[colDef.fieldName] = false;
        } else {
          result[colDef.fieldName] = (_b = colDef.editConfig) === null || _b === void 0 ? void 0 : _b.editable;
        }
      }
    };

    columns.forEach(inner);
    return result;
  }, [columns]);
  var onRangeSelectionChanged = (0, _react.useCallback)(function (params) {
    if (params.finished) {
      var cellRanges = gridManager.agGridApi.getCellRanges();

      if (cellRanges) {
        var startColId = (0, _lodash.get)(cellRanges, '0.columns.0.colId');
        var startRowIndex = (0, _lodash.get)(cellRanges, '0.startRow.rowIndex');
        var endRowIndex = (0, _lodash.get)(cellRanges, '0.endRow.rowIndex');
        var xLen = (0, _lodash.get)(cellRanges, '0.columns.length');
        pastePosRef.current = {
          rowIdx: startRowIndex,
          colId: startColId,
          yLen: Math.abs(endRowIndex - startRowIndex) + 1,
          xLen: xLen
        };
      }
    }
  }, []);
  var processCellForClipboard = (0, _react.useCallback)(function (params) {
    if (params.node.rowPinned === 'top') {
      return '__delete';
    }

    return params.value;
  }, []);
  var processDataFromClipboard = (0, _react.useCallback)(function (params) {
    // 固定顶部行总是被复制问题
    var copyData = params.data.filter(function (row) {
      return (0, _lodash.first)(row) !== '__delete';
    }); // Excel复制来的总是多一行 [''] 数据

    if (copyData.length > 1 && (0, _lodash.last)(copyData).length === 1 && (0, _lodash.first)((0, _lodash.last)(copyData)) === '') {
      copyData = copyData.slice(0, -1);
    }

    var pastePos = pastePosRef.current;

    if (pastePos.rowIdx !== undefined) {
      var modifiedRows = [];
      var addedRows = [];
      var colIdx;
      var colIds = [];
      var colDefs = []; // 复制一个单元格数据，粘贴到多个单元格

      if (copyData.length === 1 && (0, _lodash.first)(copyData).length === 1) {
        var copyValue = (0, _lodash.first)((0, _lodash.first)(copyData));
        copyData = [];
        var xLen = pastePos.xLen,
            yLen = pastePos.yLen;

        for (var yIdx = 0; yIdx < yLen; yIdx++) {
          var copyRow = [];

          for (var xIdx = 0; xIdx < xLen; xIdx++) {
            copyRow.push(copyValue);
          }

          copyData.push(copyRow);
        }
      }

      gridManager.agGridApi.getColumnDefs().forEach(function (colDef) {
        if (colDef.children) {
          colDefs.push.apply(colDefs, (0, _toConsumableArray2.default)(colDef.children));
        } else {
          colDefs.push(colDef);
        }
      });
      colDefs.forEach(function (colDef, idx) {
        if (colDef.colId === pastePos.colId) {
          colIdx = idx;
        }

        if (idx >= colIdx && idx < colIdx + (0, _lodash.first)(copyData).length) {
          colIds.push(colDef.colId);
        }
      });
      var dataList = gridManager.getPureData(); // 复制多个单元格数据

      copyData.forEach(function (vals, idx) {
        var newRow = (0, _lodash.cloneDeep)(dataList[pastePos.rowIdx + idx]);

        var genColIdForEachFn = function genColIdForEachFn(row) {
          return function (colId, idx) {
            try {
              var editable = typeof colEditableMap[colId] === 'function' ? colEditableMap[colId](row, {
                context: params.context,
                node: gridManager.agGridApi.getRowNode(row[gridManager.rowkey || 'id']),
                data: row
              }) : colEditableMap[colId];

              if (editable) {
                (0, _lodash.set)(row, colId, vals[idx]);
              }
            } catch (error) {
              console.warn('Editable兼容性错误，', colEditableMap[colId]);
            }
          };
        };

        if (newRow) {
          colIds.forEach(genColIdForEachFn(newRow));
          modifiedRows.push(newRow);
        } else {
          newRow = (0, _defineProperty2.default)({}, gridManager.rowkey || 'id', 'N_' + (0, _util.generateUuid)());
          colIds.forEach(genColIdForEachFn(newRow));
          addedRows.push(newRow);
        }
      });
      gridManager.modify(modifiedRows);

      if (!suppressCreateWhenPaste) {
        gridManager.create(addedRows);
      }
    }

    return null;
  }, []);
  return {
    singleClickEdit: false,
    suppressClipboardPaste: false,
    enableRangeSelection: true,
    enableCellTextSelection: false,
    onRangeSelectionChanged: onRangeSelectionChanged,
    processDataFromClipboard: processDataFromClipboard,
    processCellForClipboard: processCellForClipboard
  };
}

var useConfigColumns = function useConfigColumns(columns, onColumnsChange) {
  var _useState = (0, _react.useState)(columns),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      innerColumns = _useState2[0],
      setInnerColumns = _useState2[1];

  (0, _react.useEffect)(function () {
    if (onColumnsChange) onColumnsChange({
      columns: columns,
      setInnerColumns: setInnerColumns
    });else setInnerColumns(columns);
  }, [columns]);
  return innerColumns;
};

exports.useConfigColumns = useConfigColumns;