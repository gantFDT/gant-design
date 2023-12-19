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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _loadings = _interopRequireDefault(require("./loadings"));

var _excluded = ["index", "height", "className"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Loading = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Loading, _Component);

  var _super = _createSuper(Loading);

  function Loading() {
    var _this;

    (0, _classCallCheck2.default)(this, Loading);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
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


exports.default = Loading;