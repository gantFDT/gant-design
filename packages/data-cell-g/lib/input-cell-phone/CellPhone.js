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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _lodash = require("lodash");

var _compose = require("../compose");

var _codes = _interopRequireDefault(require("./codes.json"));

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

var reg = /^1$|^1[3-9]$|^1[3-9][0-9]\d{0,8}$/; // 格式化电话号码

var phoneFormatter = function phoneFormatter(phone) {
  return Array.from(phone).map(function (num, index) {
    return index % 4 == 3 ? "-".concat(num) : num;
  }).join('');
};

var withPhoneCode = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.withProps)(function (_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value;
  var _value$key = value.key,
      code = _value$key === void 0 ? "86" : _value$key,
      phone = value.value;
  return {
    code: code,
    phone: phone
  };
}), (0, _recompose.defaultProps)({
  placeholder: '请输入手机号码',
  allowClear: true
}), (0, _recompose.withProps)(function (_ref2) {
  var onChange = _ref2.onChange,
      oPhone = _ref2.phone,
      oCode = _ref2.code;
  return {
    onCodeChange: function onCodeChange(code) {
      if (!onChange) return; // 验证中国大陆电话

      var phone = oPhone;

      if (code === "86" && !(oPhone.length <= 11 && reg.test(oPhone))) {
        phone = '';
      }

      onChange({
        key: code,
        value: phone
      });
    },
    onPhoneChange: function onPhoneChange(phone) {
      if (!onChange) return;
      onChange({
        key: oCode,
        value: phone
      });
    },
    filterOption: function filterOption(inputValue, option) {
      var key = option.key;
      return key.includes(inputValue);
    }
  };
}));
var withValidate = (0, _recompose.compose)((0, _recompose.withHandlers)({
  validateValue: function validateValue(_ref3) {
    var phone = _ref3.phone;
    return function () {
      return !phone || phone.length === 11 && reg.test(phone);
    };
  }
}), (0, _recompose.withPropsOnChange)( // 监听value的变化，并修改是否可以提交的状态
['phone'], function (_ref4) {
  var validateValue = _ref4.validateValue;
  return {
    confirmable: validateValue()
  };
}), (0, _recompose.lifecycle)({
  componentDidMount: function componentDidMount() {
    var _this$props = this.props,
        validateValue = _this$props.validateValue,
        onPhoneChange = _this$props.onPhoneChange;

    if (!validateValue()) {
      onPhoneChange('');
    }
  }
}));

var CellPhone = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(CellPhone, _Component);

  var _super = _createSuper(CellPhone);

  function CellPhone(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CellPhone);
    _this = _super.call(this, props);
    _this.state = {
      value: ''
    };
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(CellPhone, [{
    key: "onChange",
    value: function onChange(e) {
      var _this$props2 = this.props,
          onPhoneChange = _this$props2.onPhoneChange,
          code = _this$props2.code;
      var value = e.target.value;

      if (value) {
        if (code === "86") {
          if (value.length <= 11 && reg.test(value)) {
            onPhoneChange(value);
            this.setState({
              value: value
            });
          }
        } else {
          onPhoneChange(value);
          this.setState({
            value: value
          });
        }
      } else {
        onPhoneChange('');
        this.setState({
          value: ''
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var _this$props3 = this.props,
          validateValue = _this$props3.validateValue,
          onEnter = _this$props3.onEnter;

      if (validateValue()) {
        onEnter(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _a = this.props,
          onPhoneChange = _a.onPhoneChange,
          validateValue = _a.validateValue,
          onEnter = _a.onEnter,
          wrapperRef = _a.wrapperRef,
          props = __rest(_a, ["onPhoneChange", "validateValue", "onEnter", "wrapperRef"]);

      var value = this.state.value;
      var computedValue = (0, _lodash.get)(props, 'phone', value);
      return /*#__PURE__*/_react.default.createElement(_input.default, Object.assign({}, props, {
        value: computedValue,
        ref: wrapperRef,
        onKeyDown: this.onKeyDown,
        onChange: this.onChange
      }));
    }
  }]);
  return CellPhone;
}(_react.Component);

CellPhone = __decorate([(0, _recompose.compose)(withPhoneCode, withValidate, (0, _compose.withEdit)(function (_ref5) {
  var code = _ref5.code,
      phone = _ref5.phone;
  return phone ? "+".concat(code, " ").concat(phone) : '';
}, "gantd-input-cellphone-addonBefore"), (0, _recompose.withProps)(function (_ref6) {
  var code = _ref6.code,
      onCodeChange = _ref6.onCodeChange,
      filterOption = _ref6.filterOption,
      size = _ref6.size;
  return {
    addonBefore: /*#__PURE__*/_react.default.createElement(_select.default, {
      dropdownClassName: "gantd-input-cellphone-addonBefore",
      style: {
        width: 86
      },
      value: code,
      onChange: onCodeChange,
      filterOption: filterOption,
      showSearch: true,
      size: size
    }, _codes.default.map(function (code) {
      return /*#__PURE__*/_react.default.createElement(_select.default.Option, {
        key: code,
        value: code
      }, "+", code);
    }))
  };
}), (0, _recompose.mapProps)(function (_a) {
  var onCodeChange = _a.onCodeChange,
      searchCode = _a.searchCode,
      codeList = _a.codeList,
      filterOption = _a.filterOption,
      props = __rest(_a, ["onCodeChange", "searchCode", "codeList", "filterOption"]);

  return props;
}))], CellPhone);

var CellPhoneWrapper = /*#__PURE__*/function (_Component2) {
  (0, _inherits2.default)(CellPhoneWrapper, _Component2);

  var _super2 = _createSuper(CellPhoneWrapper);

  function CellPhoneWrapper() {
    (0, _classCallCheck2.default)(this, CellPhoneWrapper);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2.default)(CellPhoneWrapper, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(CellPhone, Object.assign({}, this.props));
    }
  }]);
  return CellPhoneWrapper;
}(_react.Component);

exports.default = CellPhoneWrapper;