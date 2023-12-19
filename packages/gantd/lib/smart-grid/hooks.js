"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalStorage = useLocalStorage;
exports.useTableConfig = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _lodash = require("lodash");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// localStorage相关
function useLocalStorage(storageKey, initValue) {
  var getLocaLStorageData = function getLocaLStorageData() {
    var localDataString = localStorage.getItem(storageKey);
    if (!localDataString) return initValue;
    return localDataString[0] === '{' || localDataString[0] === '[' ? (0, _lodash.merge)(JSON.parse(localDataString), initValue) : localDataString;
  };

  var _useState = (0, _react.useState)(getLocaLStorageData()),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      localData = _useState2[0],
      setLocalData = _useState2[1];

  (0, _react.useEffect)(function () {
    localData && localStorage.setItem(storageKey, (0, _typeof2.default)(localData) !== 'object' ? localData.toString() : JSON.stringify(Array.isArray(localData) ? localData : Object.assign({}, localData, localData)));
  }, [localData]);
  return [localData, setLocalData];
}

var useTableConfig = function useTableConfig(props) {
  var tableConfig = props.tableConfig,
      columns = props.columns; // 行选中开关

  var _tableConfig$columnFi = tableConfig.columnFields,
      columnFields = _tableConfig$columnFi === void 0 ? [] : _tableConfig$columnFi; // 列渲染

  var fakeColumns = [];

  var _iterator = _createForOfIteratorHelper(columnFields),
      _step;

  try {
    var _loop = function _loop() {
      var _columnField = _step.value;

      var _columnItem = columns.find(function (_column) {
        return _column.fieldName === _columnField.fieldName;
      });

      if (_columnItem) {
        fakeColumns.push(Object.assign({}, _columnItem, {
          width: _columnField.width || _columnItem.width || 120,
          fixed: _columnField.fixed,
          sort: _columnField.sort,
          sortIndex: _columnField.sortIndex,
          hide: _columnField.hide
        }));
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [fakeColumns];
};

exports.useTableConfig = useTableConfig;