"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/input/style/css");
var _input = _interopRequireDefault(require("antd/es/input"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
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
var getText = function getText(_ref) {
  var value = _ref.value;
  return value ? _react.default.createElement("div", {
    style: {
      whiteSpace: 'normal',
      wordWrap: 'break-word'
    }
  }, value) : null;
};
var TextArea = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(TextArea, _React$Component);
  function TextArea() {
    (0, _classCallCheck2.default)(this, TextArea);
    return _callSuper(this, TextArea, arguments);
  }
  (0, _createClass2.default)(TextArea, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        _onChange = _a.onChange,
        mapProps = __rest(_a, ["onChange"]);
      var _props = mapProps;
      var onEnter = _props.onEnter,
        wrapperRef = _props.wrapperRef,
        props = __rest(_props, ["onEnter", "wrapperRef"]);
      return _react.default.createElement(_input.default.TextArea, Object.assign({}, props, {
        ref: wrapperRef,
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        },
        onKeyDown: onEnter
      }));
    }
  }]);
  return TextArea;
}(_react.default.Component);
TextArea.defaultProps = {
  style: {}
};
TextArea = __decorate([(0, _compose.withEdit)(getText)], TextArea);
var _default = exports.default = TextArea;