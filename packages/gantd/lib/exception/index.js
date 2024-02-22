"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/button/style/css");
var _button = _interopRequireDefault(require("antd/es/button"));
var _react = _interopRequireWildcard(require("react"));
var _typeConfig = _interopRequireDefault(require("./typeConfig"));
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/*
 * @Descripttion:
 * @MainAuthor:
 */

var Exception = function Exception(props) {
  var prefixCls = 'gant-exception';
  var className = props.className,
    backText = props.backText,
    _props$linkElement = props.linkElement,
    linkElement = _props$linkElement === void 0 ? 'a' : _props$linkElement,
    type = props.type,
    title = props.title,
    desc = props.desc,
    img = props.img,
    actions = props.actions,
    redirect = props.redirect,
    rest = __rest(props, ["className", "backText", "linkElement", "type", "title", "desc", "img", "actions", "redirect"]);
  var pageType = type in _typeConfig.default ? type : '404';
  var clsString = (0, _classnames.default)(prefixCls, className);
  return _react.default.createElement("div", Object.assign({
    className: clsString
  }, rest), _react.default.createElement("div", {
    className: 'imgBlock'
  }, _react.default.createElement("div", {
    className: 'imgEle',
    style: {
      backgroundImage: "url(".concat(img || _typeConfig.default[pageType].img, ")")
    }
  })), _react.default.createElement("div", {
    className: 'content'
  }, _react.default.createElement("h1", null, title || _typeConfig.default[pageType].title), _react.default.createElement("div", {
    className: 'desc'
  }, " ", desc || _typeConfig.default[pageType].desc), _react.default.createElement("div", {
    className: 'actions'
  }, actions || (0, _react.createElement)(linkElement, {
    to: redirect,
    href: redirect
  }, _react.default.createElement(_button.default, {
    type: "primary"
  }, " ", backText, " ")))));
};
var _default = exports.default = Exception;