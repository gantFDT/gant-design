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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/(0, _react.memo)(function ExtraContent(_ref) {
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
      return /*#__PURE__*/_react.default.cloneElement(item, {
        key: index
      });
    });
  }, [tools]);
  var getDrapContent = (0, _react.useMemo)(function () {
    if (startIndex === -1) return null;
    var renderDrapChildren = [];

    _react.default.Children.map(tools, function (item, index) {
      if (index >= startIndex) renderDrapChildren.push( /*#__PURE__*/_react.default.createElement("div", {
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
      return /*#__PURE__*/_react.default.cloneElement(item, {
        key: index
      });
    });
    var renderChildren = [];

    _react.default.Children.map(tools, function (item, index) {
      if (index < startIndex) {
        renderChildren.push( /*#__PURE__*/_react.default.cloneElement(item, {
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-extra-tools"),
    ref: ref
  }, renderExtra, startIndex > -1 && /*#__PURE__*/_react.default.createElement(_dropdown.default, {
    trigger: ['click'],
    overlay: /*#__PURE__*/_react.default.createElement(_menu.default, {
      style: {
        padding: '5px 0'
      }
    }, getDrapContent),
    placement: "bottomRight",
    overlayStyle: {
      zIndex: 2
    },
    overlayClassName: prefixCls + '-dropdown'
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    icon: "ellipsis",
    className: "".concat(prefixCls, "-icon"),
    style: {
      height: toolsHeight,
      width: toolsHeight
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    ref: toolsRef,
    className: "".concat(prefixCls, "-extra-fixed")
  }, renderFixed));
});

exports.default = _default;