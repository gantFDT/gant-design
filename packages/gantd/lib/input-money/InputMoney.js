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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _numeral = _interopRequireDefault(require("numeral"));

var _recompose = require("recompose");

var _inputNumber = _interopRequireDefault(require("../input-number"));

var _compose = require("../compose");

var _symbol = _interopRequireDefault(require("./symbol.json"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

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

  var _super = _createSuper(InputMoney);

  function InputMoney(props) {
    var _this;

    (0, _classCallCheck2.default)(this, InputMoney);
    _this = _super.call(this, props);
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
      return /*#__PURE__*/_react.default.createElement("span", {
        className: 'gant-input-moeny'
      }, addonBefore, /*#__PURE__*/_react.default.createElement(_inputNumber.default, Object.assign({}, props, {
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
    addonBefore: /*#__PURE__*/_react.default.createElement(_select.default, {
      dropdownClassName: "gantd-input-money-addonBefore",
      className: "gant-input-money-select",
      style: {
        width: 75
      },
      value: currency,
      size: size,
      onChange: onCurrencyChange
    }, _symbol.default.map(function (type) {
      return /*#__PURE__*/_react.default.createElement(_select.default.Option, {
        key: type,
        value: type
      }, type);
    }))
  };
}))], InputMoney);

var InputMoneyWrapper = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(InputMoneyWrapper, _Component2);

  var _super2 = _createSuper(InputMoneyWrapper);

  function InputMoneyWrapper() {
    (0, _classCallCheck2.default)(this, InputMoneyWrapper);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2.default)(InputMoneyWrapper, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(InputMoney, Object.assign({}, this.props));
    }
  }]);
  return InputMoneyWrapper;
}(_react.Component);

exports.default = InputMoneyWrapper;