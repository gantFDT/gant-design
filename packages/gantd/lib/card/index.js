"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "setGlobalConfig", {
  enumerable: true,
  get: function get() {
    return _utils.setGlobalConfig;
  }
});
require("antd/es/card/style/css");
var _card = _interopRequireDefault(require("antd/es/card"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("./utils");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/**
 * 卡片组件(layout级别)
 * 默认提供pagecard类名;bordered:false,size:small属性。提供可选的最小高度属性
 */

var dafaultBodyStyle = {
  padding: 10
};
var Card = function Card(cardProps) {
  var globalConfig = (0, _utils.getGlobalConfig)();
  var props = Object.assign(Object.assign({}, globalConfig), cardProps);
  var className = props.className,
    bodyStyle = props.bodyStyle,
    showBoxShadow = props.showBoxShadow,
    restProps = __rest(props, ["className", "bodyStyle", "showBoxShadow"]);
  var prefixCls = 'gantd-card';
  return _react.default.createElement(_card.default, Object.assign({
    className: (0, _classnames.default)(prefixCls, showBoxShadow ? prefixCls + '-page-boxshadow' : '', className),
    bodyStyle: Object.assign(Object.assign({}, dafaultBodyStyle), bodyStyle)
  }, restProps));
};
var _default = exports.default = Card;