"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
var _react = _interopRequireWildcard(require("react"));
var allIcons = _interopRequireWildcard(require("@ant-design/icons/lib/dist"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var dynamicIcon = _icon.default;
// 所有icon的更新函数列表，实际是setState函数
var chain = new Map();
var GantIcon = function GantIcon(props) {
  var _useState = (0, _react.useState)(function () {
      return dynamicIcon;
    }),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    RenderIcon = _useState2[0],
    setRenderIcon = _useState2[1];
  (0, _react.useEffect)(function () {
    chain.set(props.type, setRenderIcon);
    return function () {
      chain.delete(props.type);
    };
  }, [RenderIcon, props.type]);
  var icon = (0, _react.useMemo)(function () {
    if (typeof props.type === 'string') {
      if (props.type.startsWith('http')) {
        return _react.default.createElement(_icon.default, {
          component: function component() {
            return _react.default.createElement("img", {
              src: props.type,
              alt: "icon",
              className: "ant-pro-sider-menu-icon"
            });
          }
        });
      }
      if (props.type.startsWith(props.perfix)) {
        return _react.default.createElement(RenderIcon, Object.assign({}, props, {
          type: props.type
        }));
      }
      return _react.default.createElement(_icon.default, Object.assign({}, props, {
        type: props.type
      }));
    }
    return _react.default.createElement(_react.default.Fragment, null);
  }, [props.type, RenderIcon]);
  return icon;
};
// 添加图标库,并更新
GantIcon.updateFromIconfontCN = function (config) {
  var Iconfont = _icon.default.createFromIconfontCN(config);
  // 记忆最新icon
  dynamicIcon = Iconfont;
  // // 更新操作
  var _iterator = _createForOfIteratorHelper(chain.values()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var setFn = _step.value;
      setFn(function () {
        return Iconfont;
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
// 在Icon上追加组件,
// const iconmap = new Map()
// GantIcon.createFromIconfontCN = (key, config) => {
//     const computedKey = key.slice(0, 1).toUpperCase() + key.slice(1)
//     if (iconmap.has(computedKey)) {
//         return iconmap.get(computedKey)
//     } else if (config) {
//         const Iconfont = Icon.createFromIconfontCN(config)
//         iconmap.set(computedKey, Iconfont)
//         GantIcon[computedKey] = Iconfont
//         return Iconfont
//     }
//     return dynamicIcon
// }
GantIcon.Ant = _icon.default;
var excludeIcons = ['interation', 'colum-height'];
function getIconsByTheme(theme) {
  var types = [];
  for (var _i = 0, _Object$values = Object.values(allIcons); _i < _Object$values.length; _i++) {
    var icon = _Object$values[_i];
    if (icon.theme === theme) {
      if (!excludeIcons.includes(icon.name)) {
        types.push(icon.name);
      }
    }
  }
  return types;
}
GantIcon.getOutLine = function () {
  return getIconsByTheme('outline');
};
GantIcon.getFill = function () {
  return getIconsByTheme('fill');
};
GantIcon.getTwoTone = function () {
  return getIconsByTheme('twotone');
};
var _default = exports.default = GantIcon;