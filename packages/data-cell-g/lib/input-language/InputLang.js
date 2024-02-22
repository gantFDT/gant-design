"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/select/style/css");
var _select = _interopRequireDefault(require("antd/es/select"));
require("antd/es/input/style/css");
var _input = _interopRequireDefault(require("antd/es/input"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");
var _recompose = require("recompose");
var _compose = require("../compose");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
var defaultLocaleList = [{
  locale: 'zh-CN',
  label: '中文'
}, {
  locale: 'en-US',
  label: 'English'
}];
var getMergeLocale = function getMergeLocale(list) {
  if (list.length) {
    var entries = [].concat(defaultLocaleList, (0, _toConsumableArray2.default)(list)).map(function (item) {
      return [item.locale, item.label];
    });
    var _map = new Map(entries);
    var localeList = [];
    var _iterator = _createForOfIteratorHelper(_map.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
          locale = _step$value[0],
          label = _step$value[1];
        localeList.push({
          label: label,
          locale: locale
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return localeList;
  }
  return defaultLocaleList;
};
var withLangSelect = (0, _recompose.compose)((0, _recompose.defaultProps)({
  allowClear: true,
  placeholder: '请输入文本',
  onChange: function onChange() {},
  localeList: []
}), (0, _recompose.withProps)(function (_ref) {
  var localeList = _ref.localeList;
  return {
    language: localeList.length ? (0, _lodash.map)(localeList, function (item) {
      return (0, _lodash.pick)(item, ['locale', 'label']);
    }) : defaultLocaleList
  };
}), (0, _recompose.withState)("currentLocale", "setCurrentLocale", function (_ref2) {
  var language = _ref2.language,
    defalutLocale = _ref2.defalutLocale;
  return defalutLocale || language[0].locale;
}), (0, _recompose.withHandlers)({
  onLocaleChange: function onLocaleChange(_ref3) {
    var setCurrentLocale = _ref3.setCurrentLocale;
    return function (locale) {
      setCurrentLocale(locale);
    };
  }
}));
var InputLang = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(InputLang, _Component);
  function InputLang() {
    var _this;
    (0, _classCallCheck2.default)(this, InputLang);
    _this = _callSuper(this, InputLang, arguments);
    _this.onInputChange = function (e) {
      var v = e.target.value;
      var _this$props = _this.props,
        currentLocale = _this$props.currentLocale,
        onChange = _this$props.onChange,
        value = _this$props.value;
      var cv = (0, _lodash.cloneDeep)(value);
      cv[currentLocale] = v;
      onChange(cv);
    };
    return _this;
  }
  (0, _createClass2.default)(InputLang, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        onEnter = _a.onEnter,
        setlocale = _a.setlocale,
        cacheId = _a.cacheId,
        localeList = _a.localeList,
        wrapperRef = _a.wrapperRef,
        setCurrentLocale = _a.setCurrentLocale,
        onLocaleChange = _a.onLocaleChange,
        currentValue = _a.currentValue,
        currentLocale = _a.currentLocale,
        props = __rest(_a, ["onEnter", "setlocale", "cacheId", "localeList", "wrapperRef", "setCurrentLocale", "onLocaleChange", "currentValue", "currentLocale"]);
      return _react.default.createElement(_input.default, Object.assign({}, props, {
        value: currentValue,
        ref: wrapperRef,
        onKeyDown: onEnter,
        onChange: this.onInputChange
      }));
    }
  }]);
  return InputLang;
}(_react.Component);
InputLang = __decorate([(0, _recompose.compose)(_recompose.toClass, withLangSelect, (0, _compose.withEdit)(function (_ref4) {
  var currentLocale = _ref4.currentLocale,
    value = _ref4.value;
  return value[currentLocale];
}, "gantd-input-lang-addonBefore"), (0, _recompose.withProps)(function (_ref5) {
  var onLocaleChange = _ref5.onLocaleChange,
    language = _ref5.language,
    currentLocale = _ref5.currentLocale,
    size = _ref5.size,
    value = _ref5.value;
  return {
    addonBefore: _react.default.createElement(_select.default, {
      dropdownClassName: "gantd-input-lang-addonBefore",
      style: {
        width: 75
      },
      size: size,
      value: currentLocale,
      onChange: onLocaleChange
    }, language.map(function (item) {
      return _react.default.createElement(_select.default.Option, {
        value: item.locale,
        key: item.locale
      }, item.label);
    })),
    currentValue: value[currentLocale]
  };
}))], InputLang);
var InputLangWapper = exports.default = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(InputLangWapper, _Component2);
  function InputLangWapper() {
    (0, _classCallCheck2.default)(this, InputLangWapper);
    return _callSuper(this, InputLangWapper, arguments);
  }
  (0, _createClass2.default)(InputLangWapper, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(InputLang, Object.assign({}, this.props));
    }
  }]);
  return InputLangWapper;
}(_react.Component);