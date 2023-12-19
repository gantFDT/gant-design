"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LocaleReceiver = _interopRequireDefault(require("antd/lib/locale-provider/LocaleReceiver"));

var _enUS = _interopRequireDefault(require("../locale/en-US"));

var _zhCN = _interopRequireDefault(require("../locale/zh-CN"));

var langs = {
  'en': _enUS.default,
  'zh-cn': _zhCN.default
};

var _default = function _default(props) {
  return /*#__PURE__*/_react.default.createElement(_LocaleReceiver.default, null, function (local) {
    var localeCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-cn';
    var locale = langs[localeCode] || langs['zh-cn'];
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.children(locale));
  });
};

exports.default = _default;