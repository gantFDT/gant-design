"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _common = require("react-color/lib/components/common");

var Chrome = function Chrome(props) {
  var _props$width = props.width,
      width = _props$width === void 0 ? 225 : _props$width,
      onChange = props.onChange,
      rgb = props.rgb,
      hsl = props.hsl,
      hsv = props.hsv,
      placement = props.placement,
      prefixCls = props.prefixCls;
  var styles = {
    picker: {
      width: width,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '2px',
      boxShadow: '0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)',
      boxSizing: 'initial',
      fontFamily: 'Menlo'
    },
    saturation: {
      width: '100%',
      paddingBottom: '55%',
      position: 'relative',
      borderRadius: '2px 2px 0 0',
      overflow: 'hidden'
    },
    Saturation: {
      borderRadius: '2px 2px 0 0'
    },
    body: {
      padding: '16px 16px 12px'
    },
    controls: {
      display: 'flex'
    },
    color: {
      width: '22px'
    },
    swatch: {
      marginTop: '0px',
      width: '10px',
      height: '10px',
      borderRadius: '8px',
      position: 'relative',
      overflow: 'hidden'
    },
    active: {
      borderRadius: '8px',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
      background: "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(rgb.a, ")"),
      zIndex: 2
    },
    toggles: {
      flex: '1'
    },
    hue: {
      height: '10px',
      position: 'relative',
      marginBottom: '0px'
    },
    Hue: {
      borderRadius: '2px'
    },
    alpha: {
      height: '10px',
      position: 'relative'
    },
    Alpha: {
      borderRadius: '2px'
    },
    triangle: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 9px 10px 9px',
      borderColor: 'transparent transparent #fff transparent',
      position: 'absolute',
      top: '0',
      left: '33px'
    },
    triangleShadow: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 9px 10px 9px',
      borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
      position: 'absolute',
      top: '-1px',
      left: '33px'
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: Object.assign(Object.assign({}, styles.picker), {
      flexDirection: placement === 'top' ? 'column' : 'column-reverse'
    }),
    className: "".concat(prefixCls, "-chromepicker")
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: placement === 'top' ? Object.assign(Object.assign({}, styles.triangleShadow), {
      borderWidth: '10px 9px 0 9px',
      borderColor: 'rgba(0,0,0,.1) transparent transparent transparent',
      bottom: '-1px',
      top: undefined
    }) : styles.triangleShadow
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: placement === 'top' ? Object.assign(Object.assign({}, styles.triangle), {
      borderWidth: '10px 9px 0 9px',
      borderColor: '#fff transparent transparent transparent',
      bottom: '0px',
      top: undefined
    }) : styles.triangle
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: styles.saturation
  }, /*#__PURE__*/_react.default.createElement(_common.Saturation, {
    style: styles.Saturation,
    hsl: hsl,
    hsv: hsv,
    pointer: function pointer() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '12px',
          height: '12px',
          borderRadius: '6px',
          boxShadow: 'inset 0 0 0 1px #fff',
          transform: 'translate(-6px, -6px)'
        }
      });
    },
    onChange: onChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: styles.body
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: styles.controls,
    className: "flexbox-fix"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: styles.color
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: styles.swatch
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: styles.active
  }), /*#__PURE__*/_react.default.createElement(_common.Checkboard, null))), /*#__PURE__*/_react.default.createElement("div", {
    style: styles.toggles
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: styles.hue
  }, /*#__PURE__*/_react.default.createElement(_common.Hue, {
    style: styles.Hue,
    hsl: hsl,
    pointer: function pointer() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '12px',
          height: '12px',
          borderRadius: '6px',
          transform: 'translate(-6px, -1px)',
          backgroundColor: 'rgb(248, 248, 248)',
          boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
        }
      });
    },
    onChange: onChange
  }))))));
};

var _default = (0, _common.ColorWrap)(Chrome);

exports.default = _default;