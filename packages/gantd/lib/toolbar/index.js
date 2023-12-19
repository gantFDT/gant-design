"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var Toolbar = function Toolbar(props) {
  var extraLeft = props.extraLeft,
      extraRight = props.extraRight,
      fixed = props.fixed,
      className = props.className,
      style = props.style,
      restProps = __rest(props, ["extraLeft", "extraRight", "fixed", "className", "style"]);

  var prefixCls = 'gant-toolbar';
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)(prefixCls, fixed ? prefixCls + '-fixed' : '', className),
    style: style
  }, restProps), /*#__PURE__*/_react.default.createElement("div", {
    className: prefixCls + "-left"
  }, extraLeft), /*#__PURE__*/_react.default.createElement("div", {
    className: prefixCls + '-space'
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefixCls + "-right"
  }, extraRight));
};

var _default = Toolbar;
exports.default = _default;