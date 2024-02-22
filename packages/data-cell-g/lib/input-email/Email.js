"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/auto-complete/style/css");
var _autoComplete = _interopRequireDefault(require("antd/es/auto-complete"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _recompose = require("recompose");
var _compose = require("../compose");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
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
var emails = ['qq.com', '163.com', '126.com', '139.com', 'gmail.com', 'sohu.com', 'sina.com', 'outlook.com', 'amazon.com', 'yahoo.com', 'hotmail.com'];
var emailRegexp = /^[a-zA-Z_\-0-9\u4e00-\u9fa5]+(\.[a-zA-Z_\-0-9\u4e00-\u9fa5]+)?@([a-zA-Z_\-0-9]{2,10}\.){1,3}[a-zA-Z]{2,10}$/;
var withResult = (0, _recompose.compose)((0, _recompose.withState)('list', 'setList', []), (0, _recompose.defaultProps)({
  allowClear: true,
  placeholder: "请输入邮箱",
  onChange: function onChange() {}
}), (0, _recompose.withProps)(function (_ref) {
  var value = _ref.value;
  return {
    confirmable: !value || emailRegexp.test(value)
  };
}), (0, _recompose.lifecycle)({
  componentDidMount: function componentDidMount() {
    var _this$props = this.props,
      value = _this$props.value,
      onChange = _this$props.onChange;
    if (value && !emailRegexp.test(value)) {
      onChange();
    }
  }
}));
var Email = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Email, _React$Component);
  function Email() {
    var _this;
    (0, _classCallCheck2.default)(this, Email);
    _this = _callSuper(this, Email, arguments);
    _this.onSearch = function (value) {
      var setList = _this.props.setList;
      var result = null;
      if (!value || value.indexOf('@') >= 0) {
        result = [];
      } else {
        result = emails.map(function (domain) {
          return "".concat(value, "@").concat(domain);
        });
      }
      setList(result);
    };
    _this.getDataSource = function () {
      var list = _this.props.list;
      return list.map(function (item) {
        return _react.default.createElement(_autoComplete.default.Option, {
          key: item,
          value: item
        }, item);
      });
    };
    _this.renderSelect = function () {
      var _a = _this.props,
        dropdownClassName = _a.dropdownClassName,
        className = _a.className,
        list = _a.list,
        wrapperRef = _a.wrapperRef,
        props = __rest(_a, ["dropdownClassName", "className", "list", "wrapperRef"]);
      return _react.default.createElement(_autoComplete.default, Object.assign({
        className: (0, _classnames.default)('gant-select-email', className),
        showSearch: true,
        dropdownMatchSelectWidth: false,
        dropdownClassName: (0, _classnames.default)('gant-select-email-dropdown', dropdownClassName)
      }, props, {
        onSearch: _this.onSearch,
        ref: wrapperRef
      }), _this.getDataSource());
    };
    return _this;
  }
  (0, _createClass2.default)(Email, [{
    key: "render",
    value: function render() {
      return this.renderSelect();
    }
  }]);
  return Email;
}(_react.default.Component);
Email = __decorate([(0, _recompose.compose)(withResult, (0, _compose.withEdit)(function (_ref2) {
  var value = _ref2.value;
  return value;
}, 'gant-select-email-dropdown'))], Email);
var EmailWrapper = exports.default = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(EmailWrapper, _Component);
  function EmailWrapper() {
    (0, _classCallCheck2.default)(this, EmailWrapper);
    return _callSuper(this, EmailWrapper, arguments);
  }
  (0, _createClass2.default)(EmailWrapper, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(Email, Object.assign({}, this.props));
    }
  }]);
  return EmailWrapper;
}(_react.Component);