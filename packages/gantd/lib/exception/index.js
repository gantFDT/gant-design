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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: clsString
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: 'imgBlock'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'imgEle',
    style: {
      backgroundImage: "url(".concat(img || _typeConfig.default[pageType].img, ")")
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: 'content'
  }, /*#__PURE__*/_react.default.createElement("h1", null, title || _typeConfig.default[pageType].title), /*#__PURE__*/_react.default.createElement("div", {
    className: 'desc'
  }, " ", desc || _typeConfig.default[pageType].desc), /*#__PURE__*/_react.default.createElement("div", {
    className: 'actions'
  }, actions || /*#__PURE__*/(0, _react.createElement)(linkElement, {
    to: redirect,
    href: redirect
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "primary"
  }, " ", backText, " ")))));
};

var _default = Exception;
exports.default = _default;