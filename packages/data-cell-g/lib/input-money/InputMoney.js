"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/select/style/css");
var _select = _interopRequireDefault(require("antd/es/select"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireWildcard(require("react"));
var _lodash = require("lodash");
var _numeral = _interopRequireDefault(require("numeral"));
var _recompose = require("recompose");
var _inputNumber = _interopRequireDefault(require("../input-number"));
var _compose = require("../compose");
var _symbol = _interopRequireDefault(require("./symbol.json"));
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
var withMoneyType = (0, _recompose.compose)((0, _recompose.defaultProps)({
  allowClear: true,
  precision: 2,
  onEnter: function onEnter() {}
}), (0, _recompose.withProps)(function (_ref) {
  var precision = _ref.precision;
  var pre = Math.max(0, precision);
  return {
    precision: pre,
    format: '0,0.' + '0'.repeat(pre),
    step: 1 / Math.pow(10, pre),
    reg: new RegExp("[1-9](?:[0-9]+)?(?:.[0-9]{0,".concat(pre, "})?|0.[0-9]{0,").concat(pre, "}"))
  };
}), (0, _recompose.withProps)(function (_ref2) {
  var _ref2$value = _ref2.value,
    value = _ref2$value === void 0 ? {} : _ref2$value,
    format = _ref2.format,
    onChange = _ref2.onChange;
  var _value$key = value.key,
    currency = _value$key === void 0 ? _symbol.default[0] : _value$key,
    money = value.value;
  var obj = {
    currency: currency,
    money: money
  };
  return obj;
}), (0, _recompose.withProps)(function (_ref3) {
  var onChange = _ref3.onChange,
    oCurrency = _ref3.currency,
    oMoney = _ref3.money;
  return {
    onCurrencyChange: function onCurrencyChange(currency) {
      onChange({
        key: currency,
        value: oMoney
      });
    },
    onMoneyChange: function onMoneyChange(money) {
      onChange({
        key: oCurrency,
        value: money
      });
    }
  };
}));
var InputMoney = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(InputMoney, _Component);
  function InputMoney(props) {
    var _this;
    (0, _classCallCheck2.default)(this, InputMoney);
    _this = _callSuper(this, InputMoney, [props]);
    _this.state = {
      value: undefined
    };
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }
  (0, _createClass2.default)(InputMoney, [{
    key: "onChange",
    value: function onChange(v) {
      var _this$props = this.props,
        reg = _this$props.reg,
        onMoneyChange = _this$props.onMoneyChange;
      var value = String((0, _numeral.default)(v).value()); // 通过numeral去掉非数字
      var match = value.match(reg); // 最多两位小数
      if (match && match[0]) {
        value = match[0];
      }
      value = (0, _numeral.default)(value).value(); // 转化成数字
      this.setState({
        value: value
      });
      onMoneyChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _a = this.props,
        setType = _a.setType,
        onEnter = _a.onEnter,
        wrapperRef = _a.wrapperRef,
        onValueChange = _a.onValueChange,
        precision = _a.precision,
        format = _a.format,
        reg = _a.reg,
        addonBefore = _a.addonBefore,
        props = __rest(_a, ["setType", "onEnter", "wrapperRef", "onValueChange", "precision", "format", "reg", "addonBefore"]);
      var value = this.state.value;
      return _react.default.createElement("span", {
        className: 'gant-input-moeny'
      }, addonBefore, _react.default.createElement(_inputNumber.default, Object.assign({}, props, {
        ref: wrapperRef,
        wrapperClassName: 'gant-input-moeny-number',
        isInner: true,
        value: props.money || value,
        min: 0,
        edit: _compose.EditStatus.EDIT,
        onPressEnter: onEnter,
        onChange: this.onChange
      })));
    }
  }]);
  return InputMoney;
}(_react.Component);
InputMoney = __decorate([(0, _recompose.compose)(withMoneyType, (0, _compose.withEdit)(function (_ref4) {
  var currency = _ref4.currency,
    money = _ref4.money,
    format = _ref4.format;
  if (!(0, _lodash.isNumber)(money)) return null;
  var num = (0, _numeral.default)(money).format(format);
  return "".concat(currency, " ").concat(num);
}, "gantd-input-money-addonBefore"), (0, _recompose.withProps)(function (_ref5) {
  var currency = _ref5.currency,
    onCurrencyChange = _ref5.onCurrencyChange,
    size = _ref5.size;
  return {
    addonBefore: _react.default.createElement(_select.default, {
      dropdownClassName: "gantd-input-money-addonBefore",
      className: "gant-input-money-select",
      style: {
        width: 75
      },
      value: currency,
      size: size,
      onChange: onCurrencyChange
    }, _symbol.default.map(function (type) {
      return _react.default.createElement(_select.default.Option, {
        key: type,
        value: type
      }, type);
    }))
  };
}))], InputMoney);
var InputMoneyWrapper = exports.default = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(InputMoneyWrapper, _Component2);
  function InputMoneyWrapper() {
    (0, _classCallCheck2.default)(this, InputMoneyWrapper);
    return _callSuper(this, InputMoneyWrapper, arguments);
  }
  (0, _createClass2.default)(InputMoneyWrapper, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(InputMoney, Object.assign({}, this.props));
    }
  }]);
  return InputMoneyWrapper;
}(_react.Component);