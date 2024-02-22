"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/date-picker/style/css");
var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lodash = require("lodash");
var _recompose = require("recompose");
var _utils = require("./_utils");
var _compose = require("../compose");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var getValue = function getValue(_ref) {
  var value = _ref.value,
    format = _ref.format,
    separator = _ref.separator;
  if (!value) return null;
  var formateValue = value;
  if (!Array.isArray(formateValue)) {
    formateValue = [formateValue];
  }
  var text = formateValue.map(function (time) {
    return (0, _utils.getCurTime)(time, format).format(format);
  });
  return text.join(" ".concat(separator, " "));
};
var withRangePicker = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.defaultProps)({
  style: {},
  format: 'YYYY-MM-DD',
  separator: '~',
  onChange: function onChange() {}
}));
var RangePicker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(RangePicker, _React$Component);
  function RangePicker() {
    var _this;
    (0, _classCallCheck2.default)(this, RangePicker);
    _this = _callSuper(this, RangePicker, arguments);
    _this.onChange = function (mom, timeStringArr) {
      var onChange = _this.props.onChange;
      onChange(timeStringArr);
    };
    _this.getValue = function (value) {
      var format = _this.props.format;
      var formateValue = value;
      if (!(0, _lodash.isUndefined)(formateValue)) {
        if (!Array.isArray(formateValue)) {
          formateValue = [formateValue];
        }
        formateValue = formateValue.map(function (time) {
          return (0, _utils.getCurTime)(time, format);
        });
      }
      return formateValue;
    };
    return _this;
  }
  (0, _createClass2.default)(RangePicker, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        className = _a.className,
        value = _a.value,
        defaultPickerValue = _a.defaultPickerValue,
        defaultValue = _a.defaultValue,
        style = _a.style,
        props = __rest(_a, ["className", "value", "defaultPickerValue", "defaultValue", "style"]);
      return _react.default.createElement(_datePicker.default.RangePicker, Object.assign({}, props, {
        defaultPickerValue: this.getValue(defaultPickerValue),
        defaultValue: this.getValue(defaultPickerValue),
        value: this.getValue(value),
        onChange: this.onChange,
        style: Object.assign(Object.assign({}, style), {
          width: "100%"
        }),
        className: (0, _classnames.default)('gant-calendar-picker', className)
      }));
    }
  }]);
  return RangePicker;
}(_react.default.Component);
RangePicker = __decorate([(0, _recompose.compose)(withRangePicker, (0, _compose.withEdit)(getValue, 'ant-calendar-picker-container'))], RangePicker);
var _default = exports.default = RangePicker;