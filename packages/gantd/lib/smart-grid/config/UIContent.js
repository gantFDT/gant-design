"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/input/style/css");
var _input = _interopRequireDefault(require("antd/es/input"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");
var _sortable = _interopRequireDefault(require("../sortable"));
var _formatschema = _interopRequireDefault(require("../formatschema"));
var _Receiver = _interopRequireDefault(require("../locale/Receiver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function UIContent(props) {
  var _props$viewConfig = props.viewConfig,
    viewConfig = _props$viewConfig === void 0 ? {} : _props$viewConfig,
    schema = props.schema,
    gridKey = props.gridKey,
    height = props.height,
    onChange = props.onChange;
  var columnFields = viewConfig.columnFields;
  /** 首页widget兼容 */
  (0, _react.useEffect)(function () {
    if (schema && viewConfig && !viewConfig.columnFields) {
      var _formatSchema = (0, _formatschema.default)(schema, gridKey),
        _columnFields = _formatSchema.columnConfigs;
      onChange(Object.assign(Object.assign({}, viewConfig), {
        columnFields: _columnFields
      }));
    }
  }, [schema, gridKey]);
  var handlerChangeColumnKeys = (0, _react.useCallback)(function (records) {
    onChange(Object.assign(Object.assign({}, viewConfig), {
      columnFields: (0, _toConsumableArray2.default)(records)
    }));
  }, [viewConfig]);
  /** 筛选列 start */
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    fieldName = _useState2[0],
    setFieldName = _useState2[1];
  var sortDataSource = (0, _react.useMemo)(function () {
    return columnFields.map(function (column) {
      return Object.assign(Object.assign({}, column), {
        display: !fieldName || ~column.title.toLocaleLowerCase().indexOf(fieldName.toLocaleLowerCase()) ? 'block' : 'none'
      });
    });
  }, [fieldName, columnFields]);
  var handleSearch = (0, _lodash.debounce)(function (val) {
    return setFieldName(val);
  }, 500);
  var handleChange = (0, _react.useCallback)(function (e) {
    handleSearch(e.target.value);
  }, []);
  /** 筛选列 end */
  return _react.default.createElement(_Receiver.default, null, function (locale) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_input.default.Search, {
      size: "small",
      placeholder: locale.inputKeyword,
      onChange: handleChange,
      onSearch: handleSearch,
      style: {
        marginBottom: 5
      }
    }), _react.default.createElement(_sortable.default, {
      dataSource: sortDataSource,
      height: height,
      onChange: handlerChangeColumnKeys
    }));
  });
}
var _default = exports.default = _react.default.memo(UIContent);