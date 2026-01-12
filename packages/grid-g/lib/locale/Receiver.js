"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LocaleReceiver = _interopRequireDefault(require("antd/lib/locale-provider/LocaleReceiver"));
var _maps = require("../maps");
var _enUS = _interopRequireDefault(require("./en-US"));
var _zhCN = _interopRequireDefault(require("./zh-CN"));
var _deDE = _interopRequireDefault(require("./de-DE"));
var _frFR = _interopRequireDefault(require("./fr-FR"));
var _jaJP = _interopRequireDefault(require("./ja-JP"));
var _ruRU = _interopRequireDefault(require("./ru-RU"));
var _itIT = _interopRequireDefault(require("./it-IT"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  var _useMemo = (0, _react.useMemo)(function () {
      return (0, _maps.getGridConfig)();
    }, []),
    _locale = _useMemo.locale;
  return /*#__PURE__*/_react.default.createElement(_LocaleReceiver.default, null, function (local) {
    var localeCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-cn';
    var locale = langs[localeCode] || langs['zh-cn'];
    if (_locale) {
      locale = Object.assign(Object.assign({}, locale), _locale);
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.children(locale));
  });
};