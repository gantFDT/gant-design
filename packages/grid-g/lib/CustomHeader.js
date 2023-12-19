"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(props) {
  var column = props.column,
      displayName = props.displayName,
      showColumnMenu = props.showColumnMenu,
      setSort = props.setSort,
      enableMenu = props.enableMenu,
      enableSorting = props.enableSorting,
      _props$ColumnLabelCom = props.ColumnLabelComponent,
      ColumnLabelComponent = _props$ColumnLabelCom === void 0 ? null : _props$ColumnLabelCom,
      columnApi = props.columnApi,
      api = props.api;
  var sortInfo = props.api.sortController.getSortModel();

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      ascSort = _useState2[0],
      setAscSort = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      descSort = _useState4[0],
      setDescSort = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      noSort = _useState6[0],
      setNoSort = _useState6[1];

  var _useState7 = (0, _react.useState)(undefined),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      sortIndex = _useState8[0],
      setSortIndex = _useState8[1];

  var _useState9 = (0, _react.useState)(sortInfo.length),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      sortCount = _useState10[0],
      setSortCount = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      isFilterActive = _useState12[0],
      setIsFilterActive = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      visibleSortNumber = _useState14[0],
      setVisibleSortNumber = _useState14[1];

  var refButton = (0, _react.useRef)(null);

  var onMenuClicked = function onMenuClicked() {
    showColumnMenu(refButton.current);
  };

  var onSortChanged = function onSortChanged() {
    var stateColumns = columnApi.getColumnState();
    var sortColumns = stateColumns.filter(function (item) {
      return item.sort;
    });
    sortColumns = sortColumns.sort(function (a, b) {
      return a.sortIndex - b.sortIndex;
    });
    setVisibleSortNumber(sortColumns.length > 1);
    setSortIndex((0, _lodash.findIndex)(sortColumns, {
      colId: column.colId
    }));
    setSortCount(sortInfo.length);
    setAscSort(column.isSortAscending());
    setDescSort(column.isSortDescending());
    setNoSort(!column.isSortAscending() && !column.isSortDescending());
  };

  var filterChanged = function filterChanged() {
    var isActive = column.isFilterActive();
    setIsFilterActive(isActive);
  };

  var onSortRequested = function onSortRequested(order, event) {
    setSort(order, event.shiftKey);
  };

  (0, _react.useEffect)(function () {
    api.addEventListener('sortChanged', onSortChanged);
    column.addEventListener('filterChanged', filterChanged);
    return function () {
      api.removeEventListener('sortChanged', onSortChanged);
      column.removeEventListener('filterChanged', filterChanged);
    };
  }, []);
  (0, _react.useEffect)(function () {
    onSortChanged();
  }, []);
  var menu = null;

  if (enableMenu) {
    menu = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      ref: refButton
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "customHeaderMenuButton",
      onClick: function onClick() {
        return onMenuClicked();
      }
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "menu"
    })));
  }

  var handleSortChange = (0, _react.useCallback)(function (event) {
    if (ascSort) {
      onSortRequested('desc', event);
    }

    if (descSort) {
      onSortRequested('', event);
    }

    if (noSort) {
      onSortRequested('asc', event);
    }
  }, [ascSort, descSort, noSort]);
  var sort = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "customHeaderSort",
      onClick: enableSorting ? handleSortChange : function () {}
    }, visibleSortNumber && sortIndex !== undefined && !noSort && /*#__PURE__*/_react.default.createElement("span", {
      style: {
        verticalAlign: 'middle'
      }
    }, sortIndex + 1), !noSort && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, ascSort && /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "sort-descending"
    }), descSort && /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "sort-ascending"
    })));
  }, [sortIndex, descSort, ascSort, noSort, enableSorting, handleSortChange, sortCount, visibleSortNumber]);
  var filter = (0, _react.useMemo)(function () {
    if (isFilterActive) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "customHeaderFilter"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "filter"
      }));
    }

    return null;
  }, [isFilterActive]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "customHeaderLabel",
    style: {
      marginRight: 5
    }
  }, ColumnLabelComponent ? /*#__PURE__*/_react.default.createElement(ColumnLabelComponent, Object.assign({
    title: displayName
  }, props)) : displayName), filter, sort, menu);
};

exports.default = _default;