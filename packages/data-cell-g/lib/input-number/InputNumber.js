"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/input-number/style/css");
var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var _lodash = require("lodash");
var _numeral = _interopRequireDefault(require("numeral"));
var _recompose = require("recompose");
var _compose = require("../compose");
var _classnames = _interopRequireDefault(require("classnames"));
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
var withInputNumber = (0, _recompose.compose)((0, _recompose.withProps)(function (_ref) {
  var value = _ref.value,
    _onChange = _ref.onChange,
    format = _ref.format;
  var $value = value;
  var notnumber = value && !(0, _lodash.isNumber)(value);
  if (notnumber) {
    $value = null;
  }
  if (!(0, _lodash.isNil)($value)) {
    $value = (0, _numeral.default)($value).value();
  }
  return {
    value: $value,
    onChange: function onChange(val) {
      var numberVal = val;
      if (format) {
        numberVal = Number((0, _numeral.default)(numberVal).format(format));
      }
      _onChange && _onChange(numberVal);
    }
  };
}));
var InputNumber = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(InputNumber, _React$Component);
  function InputNumber() {
    (0, _classCallCheck2.default)(this, InputNumber);
    return _callSuper(this, InputNumber, arguments);
  }
  (0, _createClass2.default)(InputNumber, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        className = _a.className,
        props = __rest(_a, ["className"]);
      var numberProps = props;
      return _react.default.createElement(_inputNumber.default, Object.assign({}, props, {
        ref: numberProps.wrapperRef,
        className: (0, _classnames.default)('gant-input-number', className)
      }));
    }
  }]);
  return InputNumber;
}(_react.default.Component);
InputNumber = __decorate([(0, _recompose.compose)(_recompose.toClass, withInputNumber, (0, _compose.withEdit)(function (_ref2) {
  var value = _ref2.value;
  return value;
}), (0, _recompose.mapProps)(function (_a) {
  var onEnter = _a.onEnter,
    props = __rest(_a, ["onEnter"]);
  return Object.assign({
    onPressEnter: onEnter
  }, props);
}))], InputNumber);
var _default = exports.default = InputNumber;