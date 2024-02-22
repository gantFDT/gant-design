"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _common = require("react-color/lib/components/common");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  return _react.default.createElement("div", {
    style: Object.assign(Object.assign({}, styles.card), {
      width: size === 'small' ? width - 40 : width
    }),
    className: "".concat(prefixCls, "-subpicker")
  }, _react.default.createElement("div", {
    style: placement === 'top' ? Object.assign(Object.assign({}, styles.triangleShadow), {
      borderWidth: '10px 9px 0 9px',
      borderColor: 'rgba(0,0,0,.1) transparent transparent transparent',
      bottom: '-11px',
      top: undefined
    }) : styles.triangleShadow
  }), _react.default.createElement("div", {
    style: placement === 'top' ? Object.assign(Object.assign({}, styles.triangle), {
      borderWidth: '10px 9px 0 9px',
      borderColor: '#fff transparent transparent transparent',
      bottom: '-10px',
      top: undefined
    }) : styles.triangle
  }), _react.default.createElement("div", {
    style: styles.body
  }, colors.map(function (c, i) {
    return _react.default.createElement(_common.Swatch, {
      key: i,
      color: c,
      hex: c,
      style: styles.swatch,
      onClick: handleChange,
      focusStyle: {
        boxShadow: "0 0 4px ".concat(c)
      }
    });
  }), _react.default.createElement("div", {
    style: styles.clear
  })));
};
var _default = exports.default = SubPicker;