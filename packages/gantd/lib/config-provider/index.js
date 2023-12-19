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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var _localeProvider = _interopRequireDefault(require("../locale-provider"));

var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));

var _context = require("./context");

var _SizeContext = require("./SizeContext");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var configConsumerProps = ['getPopupContainer', 'rootPrefixCls', 'getPrefixCls', 'renderEmpty', 'csp', 'autoInsertSpaceInButton', 'locale', 'pageHeader'];
exports.configConsumerProps = configConsumerProps;

var ConfigProvider = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ConfigProvider, _React$Component);

  var _super = _createSuper(ConfigProvider);

  function ConfigProvider() {
    var _this;

    (0, _classCallCheck2.default)(this, ConfigProvider);
    _this = _super.apply(this, arguments);

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

      var childNode = children; // if (form && form.validateMessages) {
      //   childNode = (
      //     <RcFormProvider validateMessages={form.validateMessages}>{children}</RcFormProvider>
      //   );
      // }

      return /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
        size: componentSize
      }, /*#__PURE__*/React.createElement(_context.ConfigContext.Provider, {
        value: config
      }, /*#__PURE__*/React.createElement(_localeProvider.default, {
        locale: locale || legacyLocale
      }, childNode)));
    };

    return _this;
  }

  (0, _createClass2.default)(ConfigProvider, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(_LocaleReceiver.default, null, function (_, __, legacyLocale) {
        return /*#__PURE__*/React.createElement(_context.ConfigConsumer, null, function (context) {
          return _this2.renderProvider(context, legacyLocale);
        });
      });
    }
  }]);
  return ConfigProvider;
}(React.Component);

var _default = ConfigProvider;
exports.default = _default;