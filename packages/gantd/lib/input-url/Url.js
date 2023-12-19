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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _compose = require("../compose");

var _recompose = require("recompose");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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

var getValue = function getValue(_ref) {
  var value = _ref.value;
  // const reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
  var isUrl = /[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
  if (!isUrl.test(value)) return value; // 如果不是网址格式，直接返回

  var reg = /^(ht|f)tps?:\/\//;

  if (!reg.test(value)) {
    value = "http://".concat(value);
  }

  return /*#__PURE__*/_react.default.createElement("a", {
    href: value,
    target: '_blank',
    rel: 'noopener noreferrer'
  }, value);
};
/**
 * 普通模式下与Input一样
 */


var Url = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Url, _React$Component);

  var _super = _createSuper(Url);

  function Url() {
    (0, _classCallCheck2.default)(this, Url);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Url, [{
    key: "render",
    value: function render() {
      var _a = this.props,
          _onChange = _a.onChange,
          mapProps = __rest(_a, ["onChange"]);

      var _props = mapProps;

      var onEnter = _props.onEnter,
          wrapperRef = _props.wrapperRef,
          props = __rest(_props, ["onEnter", "wrapperRef"]);

      return /*#__PURE__*/_react.default.createElement(_input.default, Object.assign({
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        },
        ref: wrapperRef,
        onKeyDown: onEnter
      }, props));
    }
  }]);
  return Url;
}(_react.default.Component);

Url = __decorate([(0, _recompose.compose)(_recompose.toClass, (0, _compose.withEdit)(getValue))], Url);
var _default = Url;
exports.default = _default;