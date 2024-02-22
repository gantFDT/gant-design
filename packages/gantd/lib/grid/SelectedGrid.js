"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
require("antd/es/badge/style/css");
var _badge = _interopRequireDefault(require("antd/es/badge"));
require("antd/es/popover/style/css");
var _popover = _interopRequireDefault(require("antd/es/popover"));
require("antd/es/button/style/css");
var _button = _interopRequireDefault(require("antd/es/button"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _agGridReact = require("ag-grid-react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = exports.default = (0, _react.memo)(function SelectedGrid(props) {
  var columnDefs = props.columnDefs,
    _props$rowData = props.rowData,
    rowData = _props$rowData === void 0 ? [] : _props$rowData,
    onChange = props.onChange,
    getRowNodeId = props.getRowNodeId,
    gridApiRef = props.apiRef,
    selectedBoxHeight = props.selectedBoxHeight,
    selectedBoxWidth = props.selectedBoxWidth,
    locale = props.locale;
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    selectedRows = _useState2[0],
    setSelectedRows = _useState2[1];
  var apiRef = (0, _react.useRef)();
  var onSelectionChanged = (0, _react.useCallback)(function (event) {
    var rows = event.api.getSelectedRows();
    setSelectedRows(rows);
  }, []);
  var onGridReady = (0, _react.useCallback)(function (event) {
    var api = event.api;
    apiRef.current = api;
  }, []);
  var girdHeight = (0, _react.useMemo)(function () {
    if (selectedBoxHeight) return selectedBoxHeight;
    var count = rowData.length < 4 ? 4 : rowData.length;
    count = count > 10 ? 10 : count;
    return (count + 1) * 24 + 4;
  }, [rowData, selectedBoxHeight]);
  var onClearSelection = (0, _react.useCallback)(function () {
    var _a;
    var rows = [];
    (_a = apiRef.current) === null || _a === void 0 ? void 0 : _a.forEachNode(function (node) {
      if (!node.isSelected()) rows.push(node.data);
    });
    onChange(rows.map(function (itemData) {
      return getRowNodeId(itemData);
    }), rows);
  }, [onChange, selectedRows, rowData]);
  var onRowClicked = (0, _react.useCallback)(function (event) {
    var data = event.data;
    var id = getRowNodeId(data);
    if (gridApiRef && gridApiRef.current) {
      var node = gridApiRef.current.getRowNode(id);
      if (node) {
        gridApiRef.current.ensureIndexVisible(node.rowIndex, 'top');
      }
    }
  }, []);
  var overSelectedContet = (0, _react.useMemo)(function () {
    return _react.default.createElement("div", {
      className: "gant-grid gant-grid-sm"
    }, _react.default.createElement("div", {
      className: "gant-selected-agrid-title"
    }, _react.default.createElement("p", null, locale.selectedData, "\uFF1A"), _react.default.createElement("div", null, _react.default.createElement(_button.default, {
      disabled: selectedRows.length <= 0,
      onClick: onClearSelection,
      size: "small"
    }, locale.clear))), _react.default.createElement("div", {
      className: "ag-theme-balham gant-ag-wrapper",
      style: {
        width: selectedBoxWidth,
        height: girdHeight
      }
    }, _react.default.createElement(_agGridReact.AgGridReact, {
      onRowClicked: onRowClicked,
      onSelectionChanged: onSelectionChanged,
      columnDefs: columnDefs,
      rowData: rowData,
      rowSelection: "multiple",
      headerHeight: 24,
      floatingFiltersHeight: 20,
      rowHeight: 24,
      getRowNodeId: getRowNodeId,
      onGridReady: onGridReady,
      immutableData: true,
      defaultColDef: {
        suppressMenu: true,
        resizable: true
      },
      localeText: locale,
      suppressContextMenu: true,
      suppressExcelExport: true,
      suppressCsvExport: true
    })));
  }, [columnDefs, rowData, selectedRows]);
  return _react.default.createElement("div", {
    className: "gant-grid-selected-wrapper"
  }, rowData.length > 0 ? _react.default.createElement(_popover.default, {
    content: overSelectedContet,
    placement: "topRight"
  }, _react.default.createElement(_badge.default, {
    count: rowData.length,
    overflowCount: 1000000
  }, _react.default.createElement("div", {
    className: "gant-grid-selected-box"
  }, _react.default.createElement(_icon.default, {
    type: "inbox"
  })))) : _react.default.createElement(_badge.default, {
    count: 0
  }, _react.default.createElement("div", {
    className: "gant-grid-selected-box"
  }, _react.default.createElement(_icon.default, {
    type: "inbox"
  }))));
});