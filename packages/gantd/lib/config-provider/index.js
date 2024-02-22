"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ConfigConsumer", {
  enumerable: true,
  get: function get() {
    return _context.ConfigConsumer;
  }
});
Object.defineProperty(exports, "ConfigContext", {
  enumerable: true,
  get: function get() {
    return _context.ConfigContext;
  }
});
exports.default = exports.configConsumerProps = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var React = _interopRequireWildcard(require("react"));
var _localeProvider = _interopRequireDefault(require("../locale-provider"));
var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));
var _context = require("./context");
var _SizeContext = require("./SizeContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var configConsumerProps = exports.configConsumerProps = ['getPopupContainer', 'rootPrefixCls', 'getPrefixCls', 'renderEmpty', 'csp', 'autoInsertSpaceInButton', 'locale', 'pageHeader'];
var ConfigProvider = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ConfigProvider, _React$Component);
  function ConfigProvider() {
    var _this;
    (0, _classCallCheck2.default)(this, ConfigProvider);
    _this = _callSuper(this, ConfigProvider, arguments);
    _this.getPrefixCls = function (suffixCls, customizePrefixCls) {
      var _this$props$prefixCls = _this.props.prefixCls,
        prefixCls = _this$props$prefixCls === void 0 ? 'gant' : _this$props$prefixCls;
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
    };
    _this.renderProvider = function (context, legacyLocale) {
      var _this$props = _this.props,
        children = _this$props.children,
        getPopupContainer = _this$props.getPopupContainer,
        renderEmpty = _this$props.renderEmpty,
        csp = _this$props.csp,
        autoInsertSpaceInButton = _this$props.autoInsertSpaceInButton,
        locale = _this$props.locale,
        pageHeader = _this$props.pageHeader,
        componentSize = _this$props.componentSize,
        direction = _this$props.direction;
      var config = Object.assign(Object.assign({}, context), {
        getPrefixCls: _this.getPrefixCls,
        csp: csp,
        autoInsertSpaceInButton: autoInsertSpaceInButton,
        locale: locale || legacyLocale,
        direction: direction
      });
      if (getPopupContainer) {
        config.getPopupContainer = getPopupContainer;
      }
      if (renderEmpty) {
        config.renderEmpty = renderEmpty;
      }
      if (pageHeader) {
        config.pageHeader = pageHeader;
      }
      var childNode = children;
      // if (form && form.validateMessages) {
      //   childNode = (
      //     <RcFormProvider validateMessages={form.validateMessages}>{children}</RcFormProvider>
      //   );
      // }
      return React.createElement(_SizeContext.SizeContextProvider, {
        size: componentSize
      }, React.createElement(_context.ConfigContext.Provider, {
        value: config
      }, React.createElement(_localeProvider.default, {
        locale: locale || legacyLocale
      }, childNode)));
    };
    return _this;
  }
  (0, _createClass2.default)(ConfigProvider, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      return React.createElement(_LocaleReceiver.default, null, function (_, __, legacyLocale) {
        return React.createElement(_context.ConfigConsumer, null, function (context) {
          return _this2.renderProvider(context, legacyLocale);
        });
      });
    }
  }]);
  return ConfigProvider;
}(React.Component);
var _default = exports.default = ConfigProvider;