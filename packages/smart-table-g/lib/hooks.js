"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalStorage = useLocalStorage;
exports.useTableConfig = exports.usePagination = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _lodash = require("lodash");

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

// localStorage相关
function useLocalStorage(storageKey, initValue) {
  var getLocaLStorageData = function getLocaLStorageData() {
    var localDataString = localStorage.getItem(storageKey);
    return localDataString ? (0, _lodash.merge)(JSON.parse(localDataString), initValue) : initValue;
  };

  var _useState = (0, _react.useState)(getLocaLStorageData()),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      localData = _useState2[0],
      setLocalData = _useState2[1];

  var setLocalStorage = (0, _react.useCallback)(function (list) {
    setLocalData(list);
    localStorage.setItem(storageKey, JSON.stringify(Array.isArray(list) ? list : Object.assign({}, localData, list)));
  }, []);
  return [localData, setLocalStorage];
} //  分页相关


var getPageFromIndex = function getPageFromIndex(pageIndex, pageSize) {
  if (!pageIndex) return 1;
  return pageIndex / pageSize + 1;
};

var usePagination = function usePagination(props) {
  var pagination = props.pagination,
      _props$pageIndex = props.pageIndex,
      pageIndex = _props$pageIndex === void 0 ? 1 : _props$pageIndex,
      _props$pageSize = props.pageSize,
      pageSize = _props$pageSize === void 0 ? 50 : _props$pageSize,
      onPageChange = props.onPageChange,
      isGantPageMode = props.isGantPageMode,
      _props$totalCount = props.totalCount,
      totalCount = _props$totalCount === void 0 ? 0 : _props$totalCount,
      _props$pageSizeOption = props.pageSizeOptions,
      pageSizeOptions = _props$pageSizeOption === void 0 ? ['50', '100', '150', '200'] : _props$pageSizeOption;
  var handlerPageChange = (0, _react.useCallback)(function () {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    if (pagination !== undefined || !onPageChange) return;
    var fakePageIndex = isGantPageMode ? (page - 1) * pageSize : page;
    onPageChange(fakePageIndex, pageSize);
  }, [onPageChange, isGantPageMode]);
  return (0, _react.useMemo)(function () {
    if (pagination !== undefined) return pagination;
    if (!onPageChange) return undefined;
    return {
      total: totalCount,
      current: isGantPageMode ? getPageFromIndex(pageIndex, pageSize) : pageIndex,
      pageSize: pageSize,
      onChange: handlerPageChange,
      onShowSizeChange: handlerPageChange,
      pageSizeOptions: pageSizeOptions
    };
  }, [pagination, pageIndex, pageSize, onPageChange, isGantPageMode, totalCount]);
};

exports.usePagination = usePagination;

var useTableConfig = function useTableConfig(props) {
  var tableConfig = props.tableConfig,
      columns = props.columns,
      rowSelection = props.rowSelection,
      paginationProps = __rest(props, ["tableConfig", "columns", "rowSelection"]); // 行选中开关


  var clickable = tableConfig.clickable,
      _tableConfig$columnFi = tableConfig.columnFields,
      columnFields = _tableConfig$columnFi === void 0 ? [] : _tableConfig$columnFi;
  var fakeRowSelection = (0, _react.useMemo)(function () {
    return rowSelection ? Object.assign({
      columnWidth: 35,
      clickable: clickable
    }, rowSelection) : undefined;
  }, [rowSelection, clickable]); // 列渲染

  var fakeColumns = (0, _react.useMemo)(function () {
    return columnFields.filter(function (item) {
      return item.checked;
    }).map(function (ck) {
      var columnItem = columns.find(function (oc) {
        return oc.fieldName === ck.fieldName;
      });
      var finalWidth = columnItem.width || ck.width;
      return Object.assign(Object.assign({}, columnItem), {
        width: finalWidth || (ck.fixed ? 120 : undefined),
        fixed: ck.fixed,
        align: ck.align
      });
    });
  }, [columnFields, columns]); // 分页

  var fakePagination = usePagination(paginationProps);
  return [fakeRowSelection, fakeColumns, fakePagination];
};

exports.useTableConfig = useTableConfig;