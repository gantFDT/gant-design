"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WraperDatePick = exports.DatePicker = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _configProvider = require("antd/lib/config-provider");
var _InputIcon = _interopRequireDefault(require("antd/lib/date-picker/InputIcon"));
var _wrapPicker = _interopRequireDefault(require("antd/lib/date-picker/wrapPicker"));
var _interopDefault = _interopRequireDefault(require("antd/lib/_util/interopDefault"));
var _classnames = _interopRequireDefault(require("classnames"));
var moment = _interopRequireWildcard(require("moment"));
var _rcCalendar = _interopRequireDefault(require("rc-calendar"));
var _Picker = _interopRequireDefault(require("rc-calendar/lib/Picker"));
var React = _interopRequireWildcard(require("react"));
var _reactLifecyclesCompat = require("react-lifecycles-compat");
var _recompose = require("recompose");
var _compose = require("../compose");
var _icon = _interopRequireDefault(require("../icon"));
var _utils = require("./_utils");
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
function formatValue(value, format) {
  return value && value.format(format) || '';
}
var getText = function getText(_ref) {
  var value = _ref.value,
    format = _ref.format;
  return value ? (0, _utils.getCurTime)(value, format).format(format) : '';
};
var withDatePicker = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.defaultProps)({
  format: 'YYYY-MM-DD'
}));
var DatePicker = exports.DatePicker = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(DatePicker, _React$Component);
  function DatePicker(props) {
    var _this;
    (0, _classCallCheck2.default)(this, DatePicker);
    _this = _callSuper(this, DatePicker, [props]);
    _this.saveInput = function (node) {
      _this.input = node;
    };
    _this.handleChange = function (value) {
      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }
      _this.props.onChange(value, formatValue(value, _this.props.format));
    };
    _this.handleOpenChange = function (open) {
      var onOpenChange = _this.props.onOpenChange;
      if (!('open' in _this.props)) {
        _this.setState({
          open: open
        });
      }
      if (onOpenChange) {
        onOpenChange(open);
      }
    };
    _this.clearSelection = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.handleChange(null);
    };
    _this.renderFooter = function () {
      var _this$props = _this.props,
        prefixCls = _this$props.prefixCls,
        renderExtraFooter = _this$props.renderExtraFooter;
      return renderExtraFooter ? React.createElement("div", {
        className: "".concat(prefixCls, "-footer-extra")
      }, renderExtraFooter.apply(void 0, arguments)) : null;
    };
    _this.weekDateRender = function (current) {
      var selectedValue = _this.state.value;
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
        prefixCls = _assertThisInitialize.prefixCls;
      var dateRender = _this.props.dateRender;
      var dateNode = dateRender ? dateRender(current) : current.date();
      if (selectedValue && current.year() === selectedValue.year() && current.week() === selectedValue.week()) {
        return React.createElement("div", {
          className: "".concat(prefixCls, "-selected-day")
        }, React.createElement("div", {
          className: "".concat(prefixCls, "-date")
        }, dateNode));
      }
      return React.createElement("div", {
        className: "".concat(prefixCls, "-date")
      }, dateNode);
    };
    _this.renderWeekPicker = function (_ref2) {
      var getPrefixCls = _ref2.getPrefixCls;
      var _a = _this.props,
        customizePrefixCls = _a.prefixCls,
        className = _a.className,
        disabled = _a.disabled,
        pickerClass = _a.pickerClass,
        popupStyle = _a.popupStyle,
        pickerInputClass = _a.pickerInputClass,
        format = _a.format,
        allowClear = _a.allowClear,
        locale = _a.locale,
        localeCode = _a.localeCode,
        disabledDate = _a.disabledDate,
        style = _a.style,
        onFocus = _a.onFocus,
        onBlur = _a.onBlur,
        id = _a.id,
        suffixIcon = _a.suffixIcon,
        defaultPickerValue = _a.defaultPickerValue,
        restProps = __rest(_a, ["prefixCls", "className", "disabled", "pickerClass", "popupStyle", "pickerInputClass", "format", "allowClear", "locale", "localeCode", "disabledDate", "style", "onFocus", "onBlur", "id", "suffixIcon", "defaultPickerValue"]);
      var prefixCls = getPrefixCls('calendar', customizePrefixCls);
      // To support old version react.
      // Have to add prefixCls on the instance.
      // https://github.com/facebook/react/issues/12397
      _this.prefixCls = prefixCls;
      var _this$state = _this.state,
        open = _this$state.open,
        pickerValue = _this$state.value;
      if (pickerValue && localeCode) {
        pickerValue.locale(localeCode);
      }
      var placeholder = 'placeholder' in _this.props ? _this.props.placeholder : locale.lang.placeholder;
      var calendar = React.createElement(_rcCalendar.default, {
        showWeekNumber: true,
        dateRender: _this.weekDateRender,
        prefixCls: prefixCls,
        format: format,
        locale: locale.lang,
        // showDateInput={false}
        // showToday={false}
        disabledDate: disabledDate,
        renderFooter: _this.renderFooter,
        defaultValue: defaultPickerValue,
        className: "gant-calendar"
      });
      var clearIcon = !disabled && allowClear && _this.state.value ? React.createElement(_icon.default, {
        type: "close-circle",
        className: "".concat(prefixCls, "-picker-clear"),
        onClick: _this.clearSelection,
        theme: "filled"
      }) : null;
      var inputIcon = React.createElement(_InputIcon.default, {
        suffixIcon: suffixIcon,
        prefixCls: prefixCls
      });
      var input = function input(_ref3) {
        var value = _ref3.value;
        return React.createElement("span", {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, React.createElement("input", {
          ref: _this.saveInput,
          disabled: disabled,
          readOnly: true,
          value: value && value.format(format) || '',
          placeholder: placeholder,
          className: pickerInputClass,
          onFocus: onFocus,
          onBlur: onBlur
        }), clearIcon, inputIcon);
      };
      return React.createElement("span", {
        className: (0, _classnames.default)(className, pickerClass),
        style: style,
        id: id
      }, React.createElement(_Picker.default, Object.assign({}, _this.props, {
        calendar: calendar,
        prefixCls: "".concat(prefixCls, "-picker-container"),
        value: pickerValue,
        onChange: _this.handleChange,
        open: open,
        onOpenChange: _this.handleOpenChange,
        style: popupStyle
      }), input));
    };
    var value = props.value || props.defaultValue;
    if (value && !(0, _interopDefault.default)(moment).isMoment(value)) {
      throw new Error('The value/defaultValue of WeekPicker must be ' + 'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
    }
    _this.state = {
      value: value,
      open: props.open
    };
    return _this;
  }
  (0, _createClass2.default)(DatePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      if (!('open' in this.props) && prevState.open && !this.state.open) {
        this.focus();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_configProvider.ConfigConsumer, null, this.renderWeekPicker);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('value' in nextProps || 'open' in nextProps) {
        var state = {};
        if ('value' in nextProps) {
          state.value = nextProps.value;
        }
        if ('open' in nextProps) {
          state.open = nextProps.open;
        }
        return state;
      }
      return null;
    }
  }]);
  return DatePicker;
}(React.Component);
DatePicker.defaultProps = {
  format: 'YYYY-MM-DD',
  allowClear: true
};
(0, _reactLifecyclesCompat.polyfill)(DatePicker);
var WraperDatePick = exports.WraperDatePick = (0, _wrapPicker.default)(DatePicker, 'date');
var GantDatePicker = /*#__PURE__*/function (_React$Component2) {
  (0, _inherits2.default)(GantDatePicker, _React$Component2);
  function GantDatePicker() {
    var _this2;
    (0, _classCallCheck2.default)(this, GantDatePicker);
    _this2 = _callSuper(this, GantDatePicker, arguments);
    _this2.onChange = function (mom, timeString) {
      var onChange = _this2.props.onChange;
      onChange(timeString, mom);
    };
    return _this2;
  }
  (0, _createClass2.default)(GantDatePicker, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        value = _a.value,
        defaultPickerValue = _a.defaultPickerValue,
        defaultValue = _a.defaultValue,
        onChange = _a.onChange,
        props = __rest(_a, ["value", "defaultPickerValue", "defaultValue", "onChange"]);
      var className = (0, _classnames.default)('gant-calendar-picker', props.className);
      var restprops = {
        value: value,
        defaultPickerValue: defaultPickerValue,
        defaultValue: defaultValue
      };
      Object.keys(restprops).map(function (name) {
        if (Reflect.has(restprops, name)) restprops[name] = (0, _utils.getCurTime)(restprops[name], props.format);else delete restprops[name];
      });
      return React.createElement(WraperDatePick, Object.assign({}, props, restprops, {
        onChange: this.onChange,
        className: className
      }));
    }
  }]);
  return GantDatePicker;
}(React.Component);
GantDatePicker = __decorate([(0, _recompose.compose)(withDatePicker, (0, _compose.withEdit)(getText, 'ant-calendar-picker-container'))], GantDatePicker);
var _default = exports.default = GantDatePicker;