"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/select/style/css");

var _select = _interopRequireDefault(require("antd/es/select"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/tag/style/css");

var _tag = _interopRequireDefault(require("antd/es/tag"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _recompose = require("recompose");

var _input = require("../input");

var _compose = require("../compose");

var _excluded = ["width"],
    _excluded2 = ["dataSource", "style", "children", "setSelectRef", "valueProp", "labelProp"];

var _dec, _class, _class2;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// 支持boolean类型的传值
var boolMap = new Map([['false', false], ['true', true], [false, "false"], [true, 'true']]);

function formatBoolValue(value) {
  if (boolMap.has(value)) {
    return boolMap.get(value);
  }

  return value;
}

var withSelect = (0, _recompose.compose)((0, _recompose.defaultProps)({
  valueProp: 'value',
  labelProp: 'label',
  style: {},
  dataSource: [],
  allowClear: true,
  mode: '',
  onChange: function onChange() {}
}), (0, _recompose.withState)('label', 'setLabel', null), (0, _recompose.withState)('selectRef', 'setSelectRef', null), (0, _recompose.withPropsOnChange)(['value'], function (_ref) {
  var mode = _ref.mode,
      originValue = _ref.value,
      setLabel = _ref.setLabel,
      dataSource = _ref.dataSource,
      children = _ref.children;

  if ((0, _lodash.isNil)(originValue)) {
    setLabel(null);
    return;
  }

  var value = originValue;
  var label = null;
  var data = [];
  if (!Array.isArray(originValue)) value = [value];
  value = value.map(formatBoolValue);

  if (dataSource && dataSource.length) {
    data = dataSource;
  } else if (children) {
    data = _react.default.Children.map(children, function (item) {
      var _item$props = item.props,
          value = _item$props.value,
          children = _item$props.children,
          label = _item$props.label;
      return {
        value: value,
        label: label || children
      };
    });
  }

  label = value.map(function (v) {
    var currentItem = data.find(function (source) {
      return source.value === v;
    }); // datasource中使用key、或者value

    if (currentItem && currentItem.label) {
      return currentItem.label;
    }
  });

  if (['multiple', 'tags'].includes(mode)) {
    setLabel(label);
  } else {
    setLabel(label[0]);
  }
}));
var Select = (_dec = (0, _recompose.compose)(withSelect, (0, _compose.withEdit)(function (_ref2) {
  var label = _ref2.label,
      mode = _ref2.mode;
  if (!label || !label.length) return '';

  if (mode === 'multiple') {
    return label.filter(Boolean).join('、');
  } else if (mode === 'tags') {
    return label.filter(Boolean).map(function (l) {
      return /*#__PURE__*/_react.default.createElement(_tag.default, {
        key: l
      }, l);
    });
  }

  return label;
}), // 计算lanbelinvalue需要的value
(0, _recompose.withPropsOnChange)(['value', 'label'], function (_ref3) {
  var mode = _ref3.mode,
      originValue = _ref3.value,
      label = _ref3.label;
  // console.log(originValue, label)
  if ((0, _lodash.isNil)(originValue)) return {
    value: undefined
  };
  var value = originValue;
  if (!Array.isArray(originValue)) value = [value];

  if (['multiple', 'tags'].includes(mode)) {
    return {
      value: (0, _lodash.zipWith)(value, label, function (key, label) {
        return {
          key: key,
          label: label
        };
      })
    };
  } else {
    return {
      value: {
        key: value[0],
        label: label
      }
    };
  }
})), _dec(_class = (_class2 = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Select, _React$Component);

  var _super = _createSuper(Select);

  function Select() {
    var _this;

    (0, _classCallCheck2.default)(this, Select);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSelect", function () {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          selectRef = _this$props.selectRef,
          mode = _this$props.mode;

      if (onSelect && typeof onSelect === 'function') {
        onSelect.apply(void 0, arguments);
      }

      if (!['multiple', 'tags'].includes(mode)) {
        // 单选的情况下、选中失焦
        setTimeout(function () {
          selectRef.blur();
        }, 0);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChange", function (selected) {
      var _this$props2 = _this.props,
          originOnChange = _this$props2.onChange,
          setLabel = _this$props2.setLabel;
      var isArray = Array.isArray(selected);
      var value = isArray ? selected : [selected];

      var _map = ['key', 'label'].map(function (key) {
        return value.map(function (v) {
          return v && v[key];
        });
      }),
          _map2 = (0, _slicedToArray2.default)(_map, 2),
          keys = _map2[0],
          label = _map2[1];

      var formatedValue = isArray ? keys.map(formatBoolValue) : formatBoolValue(keys[0]);
      var formatedLabel = isArray ? label : label[0];
      originOnChange(formatedValue);
      setLabel(formatedLabel);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderSelect", function () {
      var _this$props3 = _this.props,
          _this$props3$dataSour = _this$props3.dataSource,
          dataSource = _this$props3$dataSour === void 0 ? [] : _this$props3$dataSour,
          _this$props3$style = _this$props3.style,
          width = _this$props3$style.width,
          style = (0, _objectWithoutProperties2.default)(_this$props3$style, _excluded),
          children = _this$props3.children,
          setSelectRef = _this$props3.setSelectRef,
          valueProp = _this$props3.valueProp,
          labelProp = _this$props3.labelProp,
          props = (0, _objectWithoutProperties2.default)(_this$props3, _excluded2);
      return /*#__PURE__*/_react.default.createElement(_select.default, (0, _extends2.default)({
        dropdownMatchSelectWidth: false
      }, props, {
        ref: setSelectRef,
        labelInValue: true,
        style: style,
        onSelect: _this.onSelect,
        onChange: _this.onChange,
        className: 'gant-select'
      }), children ? children : dataSource.map(function (item) {
        var formatValue = String(item[valueProp]);
        return /*#__PURE__*/_react.default.createElement(_select.default.Option, {
          value: formatValue,
          key: formatValue
        }, item[labelProp]);
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          addonAfter = _this$props4.addonAfter,
          style = _this$props4.style,
          className = _this$props4.className;
      return /*#__PURE__*/_react.default.createElement(_input.Group, {
        gant: true,
        style: style,
        className: className
      }, this.renderSelect(), addonAfter ? /*#__PURE__*/_react.default.createElement("span", {
        className: "ant-input-group-addon"
      }, addonAfter) : null);
    }
  }]);
  return Select;
}(_react.default.Component), (0, _defineProperty2.default)(_class2, "properTypes", {
  mode: _propTypes.default.oneOf(['multiple', 'tags'])
}), _class2)) || _class);
Select.Option = _select.default.Option;
var _default = Select;
exports.default = _default;