"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _dataEditCell = _interopRequireDefault(require("../data-edit-cell"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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

var Input = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Input, _React$Component);

  var _super = _createSuper(Input);

  function Input() {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = _super.apply(this, arguments);

    _this.onChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          strict = _this$props.strict;
      var value = e.target.value;

      if (strict) {
        value = value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
      }

      onChange && onChange(value);
    };

    _this.onBlur = function (e) {
      var _this$props2 = _this.props,
          onBlur = _this$props2.onBlur,
          onChange = _this$props2.onChange,
          trimmed = _this$props2.trimmed;
      onBlur && onBlur(e);

      if (trimmed) {
        var value = e.target.value;
        value = value.trim();
        onChange && onChange(value);
      }
    };

    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _a = this.props,
          strict = _a.strict,
          wrapperRef = _a.wrapperRef,
          trimmed = _a.trimmed,
          props = __rest(_a, ["strict", "wrapperRef", "trimmed"]);

      return /*#__PURE__*/_react.default.createElement(_dataEditCell.default, Object.assign({}, props), function (_a) {
        var onEnter = _a.onEnter,
            onChange = _a.onChange,
            ref = _a.wrapperRef,
            childProps = __rest(_a, ["onEnter", "onChange", "wrapperRef"]);

        return /*#__PURE__*/_react.default.createElement(_input.default, Object.assign({}, childProps, {
          ref: wrapperRef,
          onChange: function onChange(e) {
            return _this2.onChange(e);
          },
          onBlur: function onBlur(e) {
            return _this2.onBlur(e);
          },
          onPressEnter: onEnter,
          autoComplete: 'off',
          trimmed: typeof trimmed == 'boolean' ? trimmed.toString() : trimmed
        }));
      });
    }
  }]);
  return Input;
}(_react.default.Component);

Input.defaultProps = {
  trimmed: false
};

Input.setDefaultProps = function (props) {
  Input.defaultProps = props;
};

var _default = Input;
exports.default = _default;