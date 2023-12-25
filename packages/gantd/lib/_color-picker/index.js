"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactColor = require("react-color");

var _common = require("react-color/lib/components/common");

var _chrome = _interopRequireDefault(require("./chrome"));

var _subpicker = _interopRequireDefault(require("./subpicker"));

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var inputStyles = {
  input: {
    width: 60,
    fontSize: 13,
    border: 'none',
    outline: 'none',
    height: '100%',
    backgroundColor: 'transparent'
  }
};

function ColorPicker(props) {
  var rgb = props.rgb,
      hsl = props.hsl,
      hsv = props.hsv,
      hex = props.hex,
      onChange = props.onChange,
      _props$prefixCls = props.prefixCls,
      customizePrefixCls = _props$prefixCls === void 0 ? 'gant' : _props$prefixCls,
      _props$width = props.width,
      width = _props$width === void 0 ? 'auto' : _props$width,
      _props$edit = props.edit,
      edit = _props$edit === void 0 ? true : _props$edit,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'top' : _props$placement,
      _props$size = props.size,
      size = _props$size === void 0 ? 'normal' : _props$size;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      visibleStatus = _useState2[0],
      setVisibleStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      pickerVisible = _useState4[0],
      setPickerVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      currentColor = _useState6[0],
      setCurrentColor = _useState6[1];

  var modifyColor = (0, _react.useCallback)(function (color) {
    if (disabled) return;
    setCurrentColor(color);
    onChange && onChange(color);
  }, [disabled]);
  var inputColor = (0, _react.useCallback)(function (color) {
    modifyColor("#".concat((0, _utils.fillText)(color)));
  }, []);
  (0, _react.useEffect)(function () {
    if (!hex) {
      setCurrentColor('#ffffff');
    } else {
      setCurrentColor(hex);
    }
  }, [hex]);
  var showText = (0, _utils.fillText)(currentColor);
  var prefixCls = customizePrefixCls + '-color-picker' + (size === 'small' ? '-small' : '');
  var l = hsl.l;
  return !edit ? /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-onlypreview"),
    style: {
      backgroundColor: currentColor,
      width: width !== 'auto' ? width : 80
    }
  }, "#", showText) : /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-mainwrap"),
    style: {
      width: width
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-preview"),
    onMouseEnter: function onMouseEnter() {
      return !disabled && setPickerVisible(true);
    },
    onMouseLeave: function onMouseLeave() {
      return !disabled && setPickerVisible(false);
    },
    style: {
      backgroundColor: currentColor,
      color: l < 0.8 ? '#fff' : '#000'
    }
  }, disabled ? /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-preview-text")
  }, "#", showText) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-inputlabel"),
    style: {
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, "#"), pickerVisible && /*#__PURE__*/_react.default.createElement("div", {
    style: Object.assign({
      position: 'absolute',
      left: 0,
      zIndex: 99
    }, placement === 'top' ? {
      top: -172,
      paddingBottom: 10
    } : {
      bottom: -172,
      paddingTop: 10
    })
  }, /*#__PURE__*/_react.default.createElement(_chrome.default, {
    prefixCls: prefixCls,
    color: currentColor,
    placement: placement,
    onChange: function onChange(color) {
      return modifyColor(color.hex);
    }
  }))), /*#__PURE__*/_react.default.createElement(_common.EditableInput, {
    label: null,
    style: inputStyles,
    value: showText,
    onChange: inputColor
  }))), _utils.PrimaryColors.map(function (_ref) {
    var id = _ref.id,
        primary = _ref.primary,
        children = _ref.children;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-itemwrap"),
      key: id,
      onMouseEnter: function onMouseEnter() {
        return setVisibleStatus(id);
      },
      onMouseLeave: function onMouseLeave() {
        return setVisibleStatus('');
      },
      onClick: function onClick() {
        return modifyColor(primary);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-mainitem"),
      style: {
        backgroundColor: primary,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }
    }), !disabled && id === visibleStatus && /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-picker"),
      style: placement === 'top' ? {
        bottom: 29 - (size === 'small' ? 5 : 0),
        paddingBottom: 10
      } : {
        top: 27 - (size === 'small' ? 5 : 0),
        paddingTop: 10
      }
    }, /*#__PURE__*/_react.default.createElement(_subpicker.default, {
      prefixCls: prefixCls,
      placement: placement,
      color: currentColor,
      colors: children,
      onChange: modifyColor,
      size: size
    })));
  }));
}

var WithWrap = (0, _reactColor.CustomPicker)(ColorPicker);

var _default = function _default(props) {
  var value = props.value,
      onChange = props.onChange,
      restProps = __rest(props, ["value", "onChange"]);

  var handlerChange = function handlerChange(color) {
    onChange && onChange(color.hex);
  };

  return /*#__PURE__*/_react.default.createElement(WithWrap, Object.assign({}, restProps, {
    onChange: handlerChange,
    color: value
  }));
};

exports.default = _default;