"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _common = require("react-color/lib/components/common");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SubPicker = function SubPicker(props) {
  var onChange = props.onChange,
      _props$width = props.width,
      width = _props$width === void 0 ? 148 : _props$width,
      _props$colors = props.colors,
      colors = _props$colors === void 0 ? ['#1890FF'] : _props$colors,
      placement = props.placement,
      prefixCls = props.prefixCls,
      size = props.size;
  var styles = (0, _react.useMemo)(function () {
    return {
      card: {
        border: '0 solid rgba(0,0,0,0.25)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        borderRadius: '3px',
        position: 'relative'
      },
      body: {
        padding: '3px 0 0 3px'
      },
      triangle: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent #fff transparent',
        position: 'absolute',
        top: '-10px',
        left: '7px'
      },
      triangleShadow: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
        position: 'absolute',
        top: '-11px',
        left: '7px'
      },
      swatch: {
        width: size === 'small' ? '18px' : '26px',
        height: size === 'small' ? '18px' : '26px',
        float: 'left',
        borderRadius: '3px',
        margin: '0 3px 3px 0'
      },
      clear: {
        clear: 'both'
      }
    };
  }, [size]);

  var handleChange = function handleChange(color, ev) {
    ev.stopPropagation();
    onChange && onChange(color);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    style: Object.assign(Object.assign({}, styles.card), {
      width: size === 'small' ? width - 40 : width
    }),
    className: "".concat(prefixCls, "-subpicker")
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: placement === 'top' ? Object.assign(Object.assign({}, styles.triangleShadow), {
      borderWidth: '10px 9px 0 9px',
      borderColor: 'rgba(0,0,0,.1) transparent transparent transparent',
      bottom: '-11px',
      top: undefined
    }) : styles.triangleShadow
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: placement === 'top' ? Object.assign(Object.assign({}, styles.triangle), {
      borderWidth: '10px 9px 0 9px',
      borderColor: '#fff transparent transparent transparent',
      bottom: '-10px',
      top: undefined
    }) : styles.triangle
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: styles.body
  }, colors.map(function (c, i) {
    return /*#__PURE__*/_react.default.createElement(_common.Swatch, {
      key: i,
      color: c,
      hex: c,
      style: styles.swatch,
      onClick: handleChange,
      focusStyle: {
        boxShadow: "0 0 4px ".concat(c)
      }
    });
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: styles.clear
  })));
};

var _default = SubPicker;
exports.default = _default;