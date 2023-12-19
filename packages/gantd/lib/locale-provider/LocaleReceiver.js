"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _default = _interopRequireDefault(require("./default"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var LocaleReceiver = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(LocaleReceiver, _React$Component);

  var _super = _createSuper(LocaleReceiver);

  function LocaleReceiver() {
    (0, _classCallCheck2.default)(this, LocaleReceiver);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(LocaleReceiver, [{
    key: "getLocale",
    value: function getLocale() {
      var _this$props = this.props,
          componentName = _this$props.componentName,
          defaultLocale = _this$props.defaultLocale;
      var locale = defaultLocale || _default.default[componentName || 'global'];
      var gantLocale = this.context.gantLocale;
      var localeFromContext = componentName && gantLocale ? gantLocale[componentName] : {};
      return Object.assign(Object.assign({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {});
    }
  }, {
    key: "getLocaleCode",
    value: function getLocaleCode() {
      var gantLocale = this.context.gantLocale;
      var localeCode = gantLocale && gantLocale.locale; // Had use LocaleProvide but didn't set locale

      if (gantLocale && gantLocale.exist && !localeCode) {
        return _default.default.locale;
      }

      return localeCode;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children(this.getLocale(), this.getLocaleCode(), this.context.gantLocale);
    }
  }]);
  return LocaleReceiver;
}(React.Component);

exports.default = LocaleReceiver;
LocaleReceiver.defaultProps = {
  componentName: 'global'
};
LocaleReceiver.contextTypes = {
  gantLocale: PropTypes.object
};