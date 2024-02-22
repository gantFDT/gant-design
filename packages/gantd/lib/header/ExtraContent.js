"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/button/style/css");
var _button = _interopRequireDefault(require("antd/es/button"));
require("antd/es/menu/style/css");
var _menu = _interopRequireDefault(require("antd/es/menu"));
require("antd/es/dropdown/style/css");
var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = exports.default = (0, _react.memo)(function ExtraContent(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 0 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 0 : _ref$height,
    tools = _ref.tools,
    prefixCls = _ref.prefixCls;
  var _useState = (0, _react.useState)(-1),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    startIndex = _useState2[0],
    setStartIndex = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    toolsHeight = _useState4[0],
    setToolsHeight = _useState4[1];
  var renderFixed = (0, _react.useMemo)(function () {
    return _react.default.Children.map(tools, function (item, index) {
      return _react.default.cloneElement(item, {
        key: index
      });
    });
  }, [tools]);
  var getDrapContent = (0, _react.useMemo)(function () {
    if (startIndex === -1) return null;
    var renderDrapChildren = [];
    _react.default.Children.map(tools, function (item, index) {
      if (index >= startIndex) renderDrapChildren.push(_react.default.createElement("div", {
        key: index,
        style: {
          margin: '5px'
        }
      }, item));
    });
    return renderDrapChildren;
  }, [tools, startIndex]);
  var renderExtra = (0, _react.useMemo)(function () {
    if (startIndex === -1) return _react.default.Children.map(tools, function (item, index) {
      return _react.default.cloneElement(item, {
        key: index
      });
    });
    var renderChildren = [];
    _react.default.Children.map(tools, function (item, index) {
      if (index < startIndex) {
        renderChildren.push(_react.default.cloneElement(item, {
          key: index
        }));
      }
    });
    return renderChildren;
  }, [tools, startIndex]);
  var toolsRef = (0, _react.useRef)(null);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (toolsRef.current && width) {
      var toolsRefHeight = toolsRef.current.clientHeight;
      setToolsHeight(toolsRefHeight);
      if (width - toolsRefHeight - 20 >= toolsRef.current.clientWidth) {
        setStartIndex(-1);
      }
      var toolWidth = 0;
      var childrenItems = toolsRef.current.children;
      for (var i = 0; i < childrenItems.length - 1; i++) {
        var childItem = childrenItems.item(i);
        var _getComputedStyle = getComputedStyle(childItem),
          styleWidth = _getComputedStyle.width,
          marginLeft = _getComputedStyle.marginLeft,
          marginRight = _getComputedStyle.marginRight,
          _height = _getComputedStyle.height;
        var itemWidth = parseInt(styleWidth) + parseInt(marginLeft) + parseInt(marginRight);
        toolWidth += itemWidth;
        var itemHeight = parseInt(_height);
        setToolsHeight(itemHeight);
        if (toolWidth + toolsRefHeight + 20 > width) {
          return setStartIndex(i);
        }
      }
      return setStartIndex(-1);
    }
  }, [toolsRef.current, width, tools]);
  return _react.default.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, _react.default.createElement("div", {
    className: "".concat(prefixCls, "-extra-tools"),
    ref: ref
  }, renderExtra, startIndex > -1 && _react.default.createElement(_dropdown.default, {
    trigger: ['click'],
    overlay: _react.default.createElement(_menu.default, {
      style: {
        padding: '5px 0'
      }
    }, getDrapContent),
    placement: "bottomRight",
    overlayStyle: {
      zIndex: 2
    },
    overlayClassName: prefixCls + '-dropdown'
  }, _react.default.createElement(_button.default, {
    icon: "ellipsis",
    className: "".concat(prefixCls, "-icon"),
    style: {
      height: toolsHeight,
      width: toolsHeight
    }
  }))), _react.default.createElement("div", {
    ref: toolsRef,
    className: "".concat(prefixCls, "-extra-fixed")
  }, renderFixed));
});