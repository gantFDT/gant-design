"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/input-number/style/css");
var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));
require("antd/es/switch/style/css");
var _switch = _interopRequireDefault(require("antd/es/switch"));
require("antd/es/divider/style/css");
var _divider = _interopRequireDefault(require("antd/es/divider"));
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
require("antd/es/tooltip/style/css");
var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _LocaleReceiver = _interopRequireDefault(require("antd/lib/locale-provider/LocaleReceiver"));
var _moment = _interopRequireDefault(require("moment"));
var _classnames = _interopRequireDefault(require("classnames"));
var _enUS = _interopRequireDefault(require("./locale/en-US"));
var _zhCN = _interopRequireDefault(require("./locale/zh-CN"));
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
var format = 'hh:mm:ss';
var langs = {
  en: _enUS.default,
  'zh-cn': _zhCN.default
};
var playFun = null;
var AutoReload = function AutoReload(_a) {
  var _a$auto = _a.auto,
    auto = _a$auto === void 0 ? false : _a$auto,
    _a$interval = _a.interval,
    interval = _a$interval === void 0 ? 1 : _a$interval,
    customLocale = _a.locale,
    props = __rest(_a, ["auto", "interval", "locale"]);
  var _props$prefixCls = props.prefixCls,
    customizePrefixCls = _props$prefixCls === void 0 ? 'gant' : _props$prefixCls,
    className = props.className,
    style = props.style,
    time = props.time,
    _props$refresh = props.refresh,
    refresh = _props$refresh === void 0 ? function () {} : _props$refresh;
  var prefixCls = customizePrefixCls + '-auto-reload';
  var clsString = (0, _classnames.default)(prefixCls, className);
  var _useState = (0, _react.useState)(time ? time : (0, _moment.default)().format(format)),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    updateTime = _useState2[0],
    setUpdateTime = _useState2[1];
  (0, _react.useEffect)(function () {
    if (time) setUpdateTime(time);
  }, [time, setUpdateTime, playFun]);
  var _useState3 = (0, _react.useState)(auto),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    autoRefresh = _useState4[0],
    setAutoRefresh = _useState4[1];
  var _useState5 = (0, _react.useState)(interval),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    autoTime = _useState6[0],
    setAutoTime = _useState6[1];
  var handleRefresh = (0, _react.useCallback)(function () {
    if (refresh) refresh();
    if (!time) setUpdateTime((0, _moment.default)().format(format));
  }, [refresh, setUpdateTime]);
  (0, _react.useEffect)(function () {
    if (autoRefresh) {
      if (playFun) clearInterval(playFun);
      playFun = setInterval(handleRefresh, 60 * 1000 * autoTime);
    } else {
      clearInterval(playFun);
      playFun = null;
    }
    return function () {
      if (playFun) clearInterval(playFun);
    };
  }, [autoTime, handleRefresh, autoRefresh]);
  var switchChange = (0, _react.useCallback)(function (checked) {
    setAutoRefresh(checked);
  }, [setAutoRefresh]);
  var inputChange = (0, _react.useCallback)(function (value) {
    var reg = /(^[1-9]\d*$)/;
    if (reg.test(value)) {
      setAutoTime(value);
    }
  }, [setAutoTime]);
  return _react.default.createElement(_LocaleReceiver.default, null, function (local) {
    var localeCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-cn';
    var lang = langs[localeCode] || langs['zh-cn'];
    var locale = Object.assign(Object.assign({}, lang), customLocale);
    return _react.default.createElement("div", {
      className: (0, _classnames.default)('ant-btn', 'ant-btn-sm', prefixCls + '-container', clsString),
      style: style
    }, _react.default.createElement(_tooltip.default, {
      title: locale.tips
    }, _react.default.createElement("div", {
      onClick: handleRefresh,
      className: prefixCls + '-toolTipTime'
    }, _react.default.createElement("span", {
      style: {
        verticalAlign: 0
      }
    }, _react.default.createElement(_icon.default, {
      type: "redo"
    })), ' ', updateTime)), _react.default.createElement(_divider.default, {
      type: "vertical"
    }), _react.default.createElement(_tooltip.default, {
      title: autoRefresh ? locale.close : locale.open
    }, _react.default.createElement(_switch.default, {
      className: prefixCls + '-autoSwitch',
      size: "small",
      checked: autoRefresh,
      onChange: switchChange
    })), autoRefresh && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_divider.default, {
      type: "vertical"
    }), _react.default.createElement(_tooltip.default, {
      title: _react.default.createElement("div", {
        className: prefixCls + '-toolTipContainer'
      }, _react.default.createElement("p", null, locale.set), _react.default.createElement("p", null, "(", locale.unit, ")"))
    }, _react.default.createElement(_inputNumber.default, {
      value: autoTime,
      min: 1,
      max: 30,
      size: "small",
      onChange: inputChange,
      className: prefixCls + '-autoTimeInput'
    }))));
  });
};
var _default = exports.default = AutoReload;