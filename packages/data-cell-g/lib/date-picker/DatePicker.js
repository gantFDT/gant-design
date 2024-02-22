"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
require("antd/es/date-picker/style/css");
var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _recompose = require("recompose");
var _compose = require("../compose");
var _utils = require("./_utils");
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
var WeekPicker = _datePicker.default.WeekPicker;
var getText = function getText(_ref) {
  var value = _ref.value,
    format = _ref.format;
  return value ? (0, _utils.getCurTime)(value, format).format(format) : '';
};
var withDatePicker = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.defaultProps)({
  style: {},
  format: 'YYYY-MM-DD',
  onChange: function onChange() {}
}));
var DatePicker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DatePicker, _React$Component);
  function DatePicker() {
    var _this;
    (0, _classCallCheck2.default)(this, DatePicker);
    _this = _callSuper(this, DatePicker, arguments);
    _this.onChange = function (mom, timeString) {
      var onChange = _this.props.onChange;
      onChange(timeString);
    };
    return _this;
  }
  (0, _createClass2.default)(DatePicker, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        value = _a.value,
        defaultPickerValue = _a.defaultPickerValue,
        defaultValue = _a.defaultValue,
        props = __rest(_a, ["value", "defaultPickerValue", "defaultValue"]);
      var className = (0, _classnames.default)('gant-calendar-picker', props.className);
      return _react.default.createElement(_datePicker.default, Object.assign({}, props, {
        value: (0, _utils.getCurTime)(value, props.format),
        defaultValue: (0, _utils.getCurTime)(defaultValue, props.format),
        defaultPickerValue: (0, _utils.getCurTime)(defaultPickerValue, props.format),
        className: className,
        onChange: this.onChange
      }));
    }
  }]);
  return DatePicker;
}(_react.default.Component);
DatePicker = __decorate([(0, _recompose.compose)(withDatePicker, (0, _compose.withEdit)(getText, 'ant-calendar-picker-container'))], DatePicker);
var _default = exports.default = DatePicker;