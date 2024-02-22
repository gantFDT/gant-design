"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _configProvider = require("../config-provider");
var _loadings = _interopRequireDefault(require("./loadings"));
var _excluded = ["index", "height", "className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } //页面加载loading
var Loading = exports.default = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Loading, _Component);
  function Loading() {
    var _this;
    (0, _classCallCheck2.default)(this, Loading);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Loading, [].concat(args));
    // static propTypes = {
    //   className: propTypes.string,
    //   size: propTypes.string,
    //   bordered: propTypes.bool,
    //   bodyStyle: propTypes.object,
    //   defaultMinHei: propTypes.bool,
    //   showBoxShadow: propTypes.bool
    // }
    // static defaultProps = {
    //   className: '',
    //   defaultMinHei: false,
    //   showBoxShadow: false,
    //   bordered: true,
    //   bodyStyle: {},
    // }
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderWithConfigConsumer", function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var prefixCls = getPrefixCls('pageloading');
      var _this$props = _this.props,
        _this$props$index = _this$props.index,
        index = _this$props$index === void 0 ? 0 : _this$props$index,
        _this$props$height = _this$props.height,
        height = _this$props$height === void 0 ? 200 : _this$props$height,
        className = _this$props.className,
        rest = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var clsString = (0, _classnames.default)(prefixCls, 'gant-align-center', className);
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: height
        },
        className: clsString
      }, _loadings.default[index]);
    });
    return _this;
  }
  (0, _createClass2.default)(Loading, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_configProvider.ConfigConsumer, null, this.renderWithConfigConsumer);
    }
  }]);
  return Loading;
}(_react.Component); // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
//选择loading预览 请访问  https://codepen.io/favori/pen/QRQKpV