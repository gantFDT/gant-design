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
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var _colorPicker = _interopRequireDefault(require("color-picker-g"));
var _recompose = require("recompose");
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
var withColorPicker = (0, _recompose.compose)((0, _recompose.defaultProps)({
  onChange: function onChange() {},
  value: '#ffffff'
}));
var ColorPicker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ColorPicker, _React$Component);
  function ColorPicker() {
    (0, _classCallCheck2.default)(this, ColorPicker);
    return _callSuper(this, ColorPicker, arguments);
  }
  (0, _createClass2.default)(ColorPicker, [{
    key: "render",
    value: function render() {
      var props = __rest(this.props, []);
      return _react.default.createElement("span", null, _react.default.createElement(_colorPicker.default, Object.assign({}, props)));
    }
  }]);
  return ColorPicker;
}(_react.default.Component);
ColorPicker = __decorate([(0, _recompose.compose)(_recompose.toClass, withColorPicker, (0, _compose.withEdit)(function (_ref) {
  var value = _ref.value;
  return value ? _react.default.createElement(_colorPicker.default, {
    value: value,
    edit: false
  }) : undefined;
}))], ColorPicker);
ColorPicker.PurePicker = _colorPicker.default;
var _default = exports.default = ColorPicker;