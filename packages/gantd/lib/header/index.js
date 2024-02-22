"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "setGlobalConfig", {
  enumerable: true,
  get: function get() {
    return _utils.setGlobalConfig;
  }
});
exports.sizeDefinitions = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
require("antd/es/icon/style/css");
var _icon = _interopRequireDefault(require("antd/es/icon"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactResizeDetector = _interopRequireDefault(require("react-resize-detector"));
var _ResizeDetector = _interopRequireDefault(require("./ResizeDetector"));
var _ExtraContent = _interopRequireDefault(require("./ExtraContent"));
var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("./utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
//大小配置
var sizeDefinitions = exports.sizeDefinitions = {
  //组件高度
  height: {
    small: 30,
    default: 52,
    large: 62
  },
  //标题高度
  title: {
    small: 12,
    default: 14,
    large: 16
  },
  //短线宽度
  lineWidth: {
    small: 2,
    default: 2,
    large: 4
  },
  //短线高度
  lineHeight: {
    small: 16,
    default: 16,
    large: 16
  },
  //图标大小
  icon: {
    small: 18,
    default: 22,
    large: 24
  },
  marginLeft: {
    small: 4,
    default: 10,
    large: 14
  },
  //number框
  num: {
    minWidth: {
      small: 16,
      default: 18,
      large: 20
    },
    fontSize: {
      small: 12,
      default: 14,
      large: 16
    },
    lineHeight: {
      small: 16,
      default: 18,
      large: 20
    },
    height: {
      small: 16,
      default: 18,
      large: 20
    }
  }
};
var Header = function Header(headerProps) {
  var globalConfig = (0, _utils.getGlobalConfig)();
  var props = Object.assign(Object.assign({}, globalConfig), headerProps);
  var customizePrefixCls = props.prefixCls,
    _props$type = props.type,
    type = _props$type === void 0 ? '' : _props$type,
    _props$bottomLine = props.bottomLine,
    bottomLine = _props$bottomLine === void 0 ? false : _props$bottomLine,
    title = props.title,
    beforeExtra = props.beforeExtra,
    _props$extra = props.extra,
    extra = _props$extra === void 0 ? null : _props$extra,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? null : _props$icon,
    _props$num = props.num,
    num = _props$num === void 0 ? '1' : _props$num,
    _props$color = props.color,
    color = _props$color === void 0 ? 'var(--text-color)' : _props$color,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    className = props.className,
    _props$size = props.size,
    size = _props$size === void 0 ? 'small' : _props$size,
    _props$suppressMap = props.suppressMap,
    suppressMap = _props$suppressMap === void 0 ? true : _props$suppressMap,
    restProps = __rest(props, ["prefixCls", "type", "bottomLine", "title", "beforeExtra", "extra", "icon", "num", "color", "style", "className", "size", "suppressMap"]);
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    tools = _useState2[0],
    setTools = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    innerExtra = _useState4[0],
    setInnerExtra = _useState4[1];
  //打平extra
  var _useState5 = (0, _react.useState)(0),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    allWidth = _useState6[0],
    setAllWidth = _useState6[1];
  var leftRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (_lodash.default.isEmpty(extra) || suppressMap) {
      return function () {};
    }
    var toolsCollection = _react.default.Children.toArray(extra);
    var toolsArr = [];
    var interator = function interator(items) {
      _react.default.Children.map(items, function (item, index) {
        if (item && item.type && item.type.toString() === 'Symbol(react.fragment)') {
          interator([item.props.children]);
        } else {
          if (_react.default.isValidElement(item) || typeof item === 'string') {
            toolsArr.push(item);
          }
        }
      });
    };
    //过滤掉fragment
    // interator(toolsCollection)
    _react.default.Children.map(toolsCollection, function (item) {
      interator(item);
    });
    if (_lodash.default.isEqual(tools, toolsArr) || _lodash.default.isEqual(extra, innerExtra)) return;
    setInnerExtra(extra);
    setTools(toolsArr);
  }, [extra, tools, innerExtra]);
  var getPrefixCls = function getPrefixCls(cls) {
    return 'gant-' + cls;
  };
  var width = '100%';
  var prefixCls = 'gant-blockheader';
  var clsString = (0, _classnames.default)(prefixCls, className);
  var toolWidth = (0, _react.useMemo)(function () {
    if (leftRef.current) {
      return isNaN(allWidth - leftRef.current.clientWidth) ? 0 : allWidth - leftRef.current.clientWidth;
    }
    return 0;
  }, [allWidth, leftRef.current, size]);
  return _react.default.createElement("div", Object.assign({
    className: clsString,
    style: Object.assign({
      borderBottom: bottomLine && '1px solid rgba(128,128,128,0.2)'
    }, style)
  }, restProps), extra && _react.default.createElement(_reactResizeDetector.default, {
    handleWidth: true,
    handleHeight: true,
    key: 1
  }, _react.default.createElement(_ResizeDetector.default, {
    setAllWidth: setAllWidth
  })), _react.default.createElement("div", {
    className: prefixCls + '-container'
  }, _react.default.createElement("div", {
    className: prefixCls + '-wrapper',
    style: {
      height: sizeDefinitions.height[size]
    },
    ref: leftRef
  }, _react.default.createElement("div", {
    className: prefixCls + '-beforeExtra'
  }, beforeExtra), type == 'icon' && _react.default.createElement("div", {
    className: prefixCls + '-icon',
    style: {
      color: color,
      fontSize: sizeDefinitions.icon[size]
    }
  }, typeof icon === 'string' && _react.default.createElement(_icon.default, {
    type: icon
  }), (0, _typeof2.default)(icon) === 'object' && {
    icon: icon
  }), type == 'line' && title && _react.default.createElement("div", {
    className: prefixCls + '-line',
    style: {
      background: color,
      width: sizeDefinitions.lineWidth[size],
      height: sizeDefinitions.lineHeight[size]
    }
  }), type == 'num' && _react.default.createElement("div", {
    className: prefixCls + '-num',
    style: {
      background: color,
      fontSize: sizeDefinitions.num.fontSize[size],
      lineHeight: sizeDefinitions.num.lineHeight[size] + 'px',
      height: sizeDefinitions.num.height[size],
      minWidth: sizeDefinitions.num.minWidth[size]
    }
  }, num), _react.default.createElement("div", {
    className: prefixCls + '-title',
    style: {
      color: color,
      fontSize: sizeDefinitions.title[size],
      marginLeft: sizeDefinitions.marginLeft[size]
    }
  }, title)), _react.default.createElement("div", {
    className: getPrefixCls('overflow-tool-outer')
  }, _react.default.createElement("div", {
    className: getPrefixCls('overflow-tool-inner')
  }, extra && !suppressMap && _react.default.createElement(_ExtraContent.default, {
    tools: tools,
    prefixCls: prefixCls,
    width: toolWidth
  }), suppressMap && _react.default.createElement("div", {
    className: "".concat(prefixCls, "-extra-tools")
  }, extra)))));
};
var _default = exports.default = Header;