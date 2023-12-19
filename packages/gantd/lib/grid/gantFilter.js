"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterDateComparator = filterDateComparator;
exports.filterHooks = filterHooks;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

function filterDateComparator(filterLocalDateAtMidnight, cellValue) {
  if (!cellValue) return -1;
  var filterTime = (0, _moment.default)(filterLocalDateAtMidnight).valueOf();
  var cellTime = (0, _moment.default)(cellValue).valueOf();

  if (filterTime == cellTime) {
    return 0;
  }

  if (cellTime < filterTime) {
    return -1;
  }

  if (cellTime > filterTime) {
    return 1;
  }

  return 0;
}

function filterHooks(params) {
  var filterDataRef = (0, _react.useRef)({});
  var dataSourceRef = (0, _react.useRef)([]);
  var debounceRef = (0, _react.useRef)(null);
  var columnIdRef = (0, _react.useRef)();
  var filterModelRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      forcedGridKey = _useState2[0],
      setForcedGridKey = _useState2[1];

  var treeData = params.treeData,
      treeDataForcedFilter = params.treeDataForcedFilter,
      handleFilterModified = params.handleFilterModified,
      getRowNodeId = params.getRowNodeId,
      dataSource = params.dataSource,
      context = params.context;
  if (!treeData || !treeDataForcedFilter) return {
    onFilterModified: handleFilterModified,
    filterDataRef: filterDataRef,
    forcedGridKey: forcedGridKey,
    filterModelRef: filterModelRef
  };
  (0, _react.useEffect)(function () {
    dataSourceRef.current = dataSource;
  }, [dataSource]);
  return {
    onFilterModified: (0, _react.useCallback)(function (filterModifiedEvent) {
      handleFilterModified && handleFilterModified(filterModifiedEvent);
      if (!treeDataForcedFilter || !treeData) return;
      var api = filterModifiedEvent.api,
          columnApi = filterModifiedEvent.columnApi,
          column = filterModifiedEvent.column;
      api.showLoadingOverlay();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(function () {
        filterDataRef.current = {};
        var filterModel = api.getFilterModel();

        if ((0, _lodash.isEmpty)(filterModelRef.current) != (0, _lodash.isEmpty)(filterModel)) {
          filterModelRef.current = filterModel;
          columnIdRef.current = api.getHorizontalPixelRange().left;
          setForcedGridKey(function () {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return key + 1;
          });
        }

        filterModelRef.current = filterModel;
        api.hideOverlay();
        debounceRef.current = null;
      }, 500);
    }, []),
    filterDataRef: filterDataRef,
    forcedGridKey: forcedGridKey,
    filterModelRef: filterModelRef,
    columnIdRef: columnIdRef
  };
}

function applyTransactionAddAsync(api) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var num = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
  var nowData = data;
  var nextData = [];

  if (nowData.length > num) {
    nextData = nowData.slice(num);
    nowData = nowData.slice(0, num);
  }

  api.applyTransactionAsync({
    update: nowData
  }, function () {
    if (nextData.length > 0) return applyTransactionAddAsync(api, nextData, callback, num);
    callback();
  });
}

function judgeFilter(filterIn, value) {
  var appliedModel = (0, _lodash.get)(filterIn, 'appliedModel', {});
  appliedModel = appliedModel ? appliedModel : {};

  switch (appliedModel.filterType) {
    case 'set':
      var appliedModelValues = filterIn.appliedModelValues;
      if (typeof value !== 'boolean' && !value) return appliedModelValues['null'];
      return appliedModelValues[value];

    case 'text':
      {
        var _appliedModel = appliedModel,
            condition1 = _appliedModel.condition1,
            condition2 = _appliedModel.condition2,
            operator = _appliedModel.operator;

        if (operator) {
          var isAdopt = getTextFilterIsAdopt(condition1, condition2, operator, value);
          return isAdopt;
        }

        var _appliedModel2 = appliedModel,
            type = _appliedModel2.type,
            filter = _appliedModel2.filter;
        return filterTextComparator(filter, value, type);
      }

    default:
      var _appliedModel3 = appliedModel,
          filterType = _appliedModel3.filterType;

      if (filterType === 'date' || filterType === 'number') {
        var _appliedModel4 = appliedModel,
            _condition = _appliedModel4.condition1,
            _condition2 = _appliedModel4.condition2,
            _operator = _appliedModel4.operator;

        if (_operator) {
          var result1 = filterNumberAndDateComparator(_condition, value);
          var result2 = filterNumberAndDateComparator(_condition2, value);
          if (_operator === 'AND') return result1 && result2;
          return result1 || result2;
        }

        return filterNumberAndDateComparator(appliedModel, value);
      }

      return true;
  }
}

function getTextFilterIsAdopt(condition1, condition2, operator, itemValue) {
  var result1 = filterTextComparator(condition1.filter, itemValue, condition1.filterType);
  var result2 = filterTextComparator(condition2.filter, itemValue, condition2.filterType);
  if (operator === 'AND') return result1 && result2;
  return result1 || result2;
}

function filterTextComparator(filterText, value, filterType) {
  var filterTextLowerCase = filterText.toLowerCase();
  var valueLowerCase = value.toString().toLowerCase();

  switch (filterType) {
    case 'contains':
      return valueLowerCase.indexOf(filterTextLowerCase) >= 0;

    case 'notContains':
      return valueLowerCase.indexOf(filterTextLowerCase) === -1;

    case 'equals':
      return valueLowerCase === filterTextLowerCase;

    case 'notEqual':
      return valueLowerCase != filterTextLowerCase;

    case 'startsWith':
      return valueLowerCase.indexOf(filterTextLowerCase) === 0;

    case 'endsWith':
      var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
      return index >= 0 && index === valueLowerCase.length - filterTextLowerCase.length;

    default:
      // should never happen
      console.warn('invalid filter type ' + filterType);
      return false;
  }
}

function filterNumberAndDateComparator(appliedModel, value) {
  var dateFrom = appliedModel.dateFrom,
      dateTo = appliedModel.dateTo,
      filter = appliedModel.filter,
      filter2 = appliedModel.filter2,
      type = appliedModel.type,
      filterType = appliedModel.filterType;
  var startVal = filterType === 'date' ? (0, _moment.default)(dateFrom).valueOf() : filter;
  var endVal = filterType === 'date' ? (0, _moment.default)(dateTo).valueOf() : filter2;

  var _value = filterType === 'date' ? value ? (0, _moment.default)(value).valueOf() : 0 : value;

  switch (type) {
    case 'equals':
      return _value == startVal;

    case 'notEqual':
      return _value != startVal;

    case 'lessThan':
      return _value < startVal;

    case 'lessThanOrEqual':
      return _value <= startVal;

    case 'greaterThan':
      return _value > startVal;

    case 'greaterThanOrEqual':
      return _value >= startVal;

    case 'inRange':
      var maxVal = startVal > endVal ? startVal : endVal;
      var minVal = startVal > endVal ? endVal : startVal;
      return maxVal >= _value && value >= minVal;

    default:
      // should never happen
      console.warn('invalid filter type ' + filterType);
      return false;
  }
}