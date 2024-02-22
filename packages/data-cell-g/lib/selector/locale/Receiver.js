"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _LocaleReceiver = _interopRequireDefault(require("antd/lib/locale-provider/LocaleReceiver"));
var _enUS = _interopRequireDefault(require("./en-US"));
var _zhCN = _interopRequireDefault(require("./zh-CN"));
var _deDE = _interopRequireDefault(require("./de-DE"));
var _frFR = _interopRequireDefault(require("./fr-FR"));
var _jaJP = _interopRequireDefault(require("./ja-JP"));
var _ruRU = _interopRequireDefault(require("./ru-RU"));
var _itIT = _interopRequireDefault(require("./it-IT"));
//参考antd的locale文件的定义规范
var langs = {
  'zh-cn': _zhCN.default,
  en: _enUS.default,
  de: _deDE.default,
  fr: _frFR.default,
  ja: _jaJP.default,
  ru: _ruRU.default,
  it: _itIT.default
};
var _default = exports.default = function _default(props) {
  return _react.default.createElement(_LocaleReceiver.default, null, function (local) {
    var localeCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-cn';
    var locale = langs[localeCode] || langs['zh-cn'];
    return _react.default.createElement(_react.default.Fragment, null, props.children(locale));
  });
};