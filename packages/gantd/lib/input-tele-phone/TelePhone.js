"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));
require("antd/es/select/style/css");
var _select = _interopRequireDefault(require("antd/es/select"));
require("antd/es/input/style/css");
var _input = _interopRequireDefault(require("antd/es/input"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireWildcard(require("react"));
var _recompose = require("recompose");
var _compose = require("../compose");
var _codes = _interopRequireDefault(require("./codes.json"));
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
var isPhone = /^\d{7,8}$/;
var reg = /^\d{0,8}$/;
var withCode = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.withProps)(function (_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? {} : _ref$value;
  var _value$key = value.key,
    code = _value$key === void 0 ? "010" : _value$key,
    phone = value.value;
  return {
    code: code,
    phone: phone
  };
}), (0, _recompose.defaultProps)({
  placeholder: '请输入电话号码',
  allowClear: true
}), (0, _recompose.withProps)(function (_ref2) {
  var onChange = _ref2.onChange,
    oCode = _ref2.code,
    oPhone = _ref2.phone;
  return {
    filterOption: function filterOption(text, option) {
      var key = option.key,
        label = option.props.label;
      return key.includes(text) || label.includes(text);
    },
    onCodeChange: function onCodeChange(code) {
      onChange({
        key: code,
        value: oPhone
      });
    },
    onPhoneChange: function onPhoneChange(phone) {
      onChange({
        key: oCode,
        value: phone
      });
    }
  };
}));
var getValue = function getValue(_ref3) {
  var code = _ref3.code,
    phone = _ref3.phone;
  return phone ? "".concat(code, " - ").concat(phone) : '';
};
var TelePhone = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(TelePhone, _Component);
  function TelePhone() {
    var _this;
    (0, _classCallCheck2.default)(this, TelePhone);
    _this = _callSuper(this, TelePhone, arguments);
    _this.onChange = function (e) {
      var onPhoneChange = _this.props.onPhoneChange;
      var value = e.target.value;
      if (!value || reg.test(value)) {
        onPhoneChange(value);
      }
    };
    _this.onKeyDown = function (e) {
      var _this$props = _this.props,
        value = _this$props.value,
        code = _this$props.code,
        phone = _this$props.phone,
        onEnter = _this$props.onEnter;
      if (!code || isPhone.test(phone)) {
        onEnter(e);
      }
    };
    return _this;
  }
  (0, _createClass2.default)(TelePhone, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        onEnter = _a.onEnter,
        onPhoneChange = _a.onPhoneChange,
        onCodeChange = _a.onCodeChange,
        phone = _a.phone,
        wrapperRef = _a.wrapperRef,
        props = __rest(_a, ["onEnter", "onPhoneChange", "onCodeChange", "phone", "wrapperRef"]);
      return _react.default.createElement(_input.default, Object.assign({}, props, {
        value: phone,
        ref: wrapperRef,
        onKeyDown: this.onKeyDown,
        onChange: this.onChange
      }));
    }
  }]);
  return TelePhone;
}(_react.Component);
TelePhone = __decorate([(0, _recompose.compose)(withCode, (0, _recompose.withPropsOnChange)(['phone'], function (_ref4) {
  var phone = _ref4.phone;
  return {
    confirmable: !phone || isPhone.test(String(phone))
  };
}), (0, _compose.withEdit)(getValue, "gantd-input-telphone-addonBefore"), (0, _recompose.withProps)(function (_ref5) {
  var code = _ref5.code,
    onCodeChange = _ref5.onCodeChange,
    filterOption = _ref5.filterOption,
    size = _ref5.size;
  return {
    addonBefore: _react.default.createElement(_select.default, {
      dropdownClassName: "gantd-input-telphone-addonBefore",
      size: size,
      style: {
        width: 130
      },
      value: code,
      onChange: onCodeChange,
      showSearch: true,
      filterOption: filterOption
    }, _codes.default.map(function (citys, index) {
      var renderCitys = citys;
      var _citys = (0, _toArray2.default)(citys),
        _citys$ = (0, _slicedToArray2.default)(_citys[0], 2),
        province = _citys$[0],
        pCode = _citys$[1],
        oCitys = _citys.slice(1);
      if (!pCode) renderCitys = oCitys;
      return _react.default.createElement(_select.default.OptGroup, {
        label: province,
        key: province
      }, renderCitys.map(function (city) {
        return city.length > 1 ? _react.default.createElement(_select.default.Option, {
          key: city[1],
          value: city[1],
          label: city[0]
        }, _react.default.createElement("span", null, city[1]), _react.default.createElement("span", {
          style: {
            display: "inline-block",
            marginLeft: 6
          }
        }, city[0])) : undefined;
      }));
    }))
  };
}), (0, _recompose.mapProps)(function (_a) {
  var filterOption = _a.filterOption,
    props = __rest(_a, ["filterOption"]);
  return props;
}))], TelePhone);
var TelePhoneWrapper = exports.default = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(TelePhoneWrapper, _Component2);
  function TelePhoneWrapper() {
    (0, _classCallCheck2.default)(this, TelePhoneWrapper);
    return _callSuper(this, TelePhoneWrapper, arguments);
  }
  (0, _createClass2.default)(TelePhoneWrapper, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(TelePhone, Object.assign({}, this.props));
    }
  }]);
  return TelePhoneWrapper;
}(_react.Component);