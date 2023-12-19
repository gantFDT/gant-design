"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/anchor/style/css");

var _anchor = _interopRequireDefault(require("antd/es/anchor"));

require("antd/es/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/menu/style/css");

var _menu = _interopRequireDefault(require("antd/es/menu"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _scrollTo = _interopRequireDefault(require("antd/es/_util/scrollTo"));

var _getScroll = _interopRequireDefault(require("antd/es/_util/getScroll"));

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

var customizePrefixCls = 'gant';
var prefixCls = customizePrefixCls + '-anchor';
var FIXED_HEIGHT = 40;

var defaultContainer = function defaultContainer() {
  return window;
};
/**
 * 获取容器的滚动高度
 */


function getContainerScrollHeight(getContainer) {
  var container = getContainer();
  var isWindow = container == window;
  var scrollHeight = isWindow ? document.documentElement.scrollTop || document.body.scrollTop : container.scrollTop;
  return scrollHeight;
}

var GantAnchor = function GantAnchor(props) {
  var _props$list = props.list,
      list = _props$list === void 0 ? [] : _props$list,
      content = props.content,
      _props$fixedTop = props.fixedTop,
      fixedTop = _props$fixedTop === void 0 ? 0 : _props$fixedTop,
      _props$layout = props.layout,
      layout = _props$layout === void 0 ? 'vertical' : _props$layout,
      onLayoutChange = props.onLayoutChange,
      _props$minHeight = props.minHeight,
      minHeight = _props$minHeight === void 0 ? 400 : _props$minHeight,
      className = props.className,
      style = props.style,
      _props$getContainer = props.getContainer,
      getContainer = _props$getContainer === void 0 ? defaultContainer : _props$getContainer,
      nextProps = __rest(props, ["list", "content", "fixedTop", "layout", "onLayoutChange", "minHeight", "className", "style", "getContainer"]);

  var _useState = (0, _react.useState)(layout),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      stateMode = _useState2[0],
      setStateMode = _useState2[1];

  var _useState3 = (0, _react.useState)(list.length ? list[0].id : ''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      currentId = _useState4[0],
      setId = _useState4[1]; //当前选中id，进入页面默认选中第一


  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      leftArrowsShow = _useState6[0],
      setLeftArrowsShow = _useState6[1]; //左侧箭头


  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      rightArrowsShow = _useState8[0],
      setRightArrowsShow = _useState8[1]; //右侧箭头


  var _useState9 = (0, _react.useState)(true),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      menuArrowsShow = _useState10[0],
      setMenuArrowsShow = _useState10[1];

  var _useState11 = (0, _react.useState)(0),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      silderIdWidth = _useState12[0],
      setSilderIdWidth = _useState12[1]; //List外层宽度


  var _useState13 = (0, _react.useState)(0),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      contentWidth = _useState14[0],
      setContentWidth = _useState14[1]; //List实际宽度


  var _useState15 = (0, _react.useState)(false),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      isClickScroll = _useState16[0],
      setIsClickScroll = _useState16[1]; //页面滚动判断是点击后的滚动还是手动的滚动


  var scrollHeight = 0; // 滚动的值

  var m2 = 0; // 对比时间的值

  var timer = null;
  var Data = (0, _react.useCallback)(function (e) {
    m2 = getContainerScrollHeight(getContainer);

    if (m2 == scrollHeight) {
      if (isClickScroll) {
        setIsClickScroll(false);
      }
    }
  }, [isClickScroll, setIsClickScroll, getContainer]); //   //滚动时触发

  var handleScroll = (0, _react.useCallback)(function (e) {
    var _a, _b, _c;

    var fixedEle = document.getElementById('anchorBoxId'); //定位元素

    var fixedEleParent = document.querySelector('.gant-anchor-horAnchorOut'); //定位元素的父元素

    if (fixedEle && stateMode == 'horizontal') {
      clearTimeout(timer);
      timer = setTimeout(Data, 300);
      var menuboxhor = document.querySelector('.gant-submenu-menuboxhor'); //anchor的外层card

      var extraheight = menuboxhor ? menuboxhor['offsetHeight'] : 0;
      var container = getContainer();
      var isWindow = container == window; // 容器距离浏览器顶部的距离

      var containerScrollTop = isWindow ? 0 : (_c = (_b = (_a = container) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.top; // 滚动条滚动的距离

      scrollHeight = getContainerScrollHeight(getContainer);

      if (fixedEle) {
        if (scrollHeight >= FIXED_HEIGHT + fixedTop + extraheight) {
          fixedEle.classList.add('gant-anchor-activeScroll');
          var active = document.querySelector('.gant-anchor-activeScroll');
          active['style'].top = "".concat(fixedTop + containerScrollTop, "px");
          active['style'].width = "".concat(fixedEleParent['offsetWidth'], "px");
        } else {
          fixedEle.classList.remove('gant-anchor-activeScroll');
        }
      }

      if (!isClickScroll) {
        //水平方向锚点跟随页面滚动高亮
        list.map(function (item) {
          if (!item.isInvalid) {
            var id = document.getElementById(item.id);
            var common = fixedTop + extraheight + FIXED_HEIGHT + containerScrollTop;

            if (id && id.getBoundingClientRect()) {
              var _id$getBoundingClient = id.getBoundingClientRect(),
                  top = _id$getBoundingClient.top,
                  height = _id$getBoundingClient.height;

              if (top <= common && top >= common - height) {
                //这里的44是水平锚点条高度
                setId(item.id);
              }
            }
          }
        });
      }
    }
  }, [stateMode, setId, isClickScroll, list, getContainer]); //   //点击左右箭头

  var handleMobileTabs = (0, _react.useCallback)(function (e) {
    var contentId = document.getElementById('contentId');
    var left = contentId.offsetLeft;
    var right = contentWidth - silderIdWidth + left;

    if (e == 'left') {
      if (left < 0 && left > -500) {
        contentId.style.left = '0px';
      } else if (left < -500) {
        contentId.style.left = "".concat(left + 500) + 'px';
      }

      var newLeft = contentId.offsetLeft;
      setLeftArrowsShow(newLeft == 0 ? false : true);
      setRightArrowsShow(true);
    } else {
      if (right > 0 && right < 500) {
        contentId.style.left = "".concat(left - right) + 'px';
      } else if (right >= 0 && right > 500) {
        contentId.style.left = "".concat(left - 500) + 'px';
      }

      var newRight = contentWidth - silderIdWidth + contentId.offsetLeft;
      setLeftArrowsShow(true);
      setRightArrowsShow(newRight == 0 ? false : true);
    }
  }, [contentWidth, silderIdWidth, setLeftArrowsShow, setRightArrowsShow]);
  (0, _react.useEffect)(function () {
    setStateMode(stateMode);
  }, [setStateMode]);
  (0, _react.useEffect)(function () {
    var container = getContainer();
    container.addEventListener('scroll', handleScroll); //监听滚动

    return function cleanup() {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, setIsClickScroll, getContainer]);
  (0, _react.useEffect)(function () {
    var silderId = document.getElementById('silderId');
    var contentId = document.getElementById('contentId');
    var silderIdWidth = silderId ? silderId.offsetWidth : 0;
    var contentWidth = contentId ? contentId.offsetWidth : 0;
    setSilderIdWidth(silderIdWidth);
    setContentWidth(contentWidth);
    setRightArrowsShow(stateMode == 'horizontal' ? silderIdWidth < contentWidth ? true : false : false);
    setMenuArrowsShow(stateMode == 'horizontal' ? silderIdWidth < contentWidth ? true : false : false);
  }, [stateMode, setSilderIdWidth, setContentWidth, setRightArrowsShow, setMenuArrowsShow]);
  var getOffsetTop = (0, _react.useCallback)(function (element, container) {
    if (!element.getClientRects().length) {
      return 0;
    }

    var rect = element.getBoundingClientRect();

    if (rect.width || rect.height) {
      if (container === window) {
        container = element.ownerDocument.documentElement;
        return rect.top - container.clientTop;
      }

      return rect.top - container.getBoundingClientRect().top;
    }

    return rect.top;
  }, []); //水平方向锚点事件

  var scrollToAnchor = (0, _react.useCallback)(function (anchorName) {
    if (anchorName) {
      var container = getContainer();
      var anchorElement = document.getElementById(anchorName);

      if (anchorElement) {
        var scrollTop = (0, _getScroll.default)(container, true);
        var eleOffsetTop = getOffsetTop(anchorElement, container);
        var y = scrollTop + eleOffsetTop - FIXED_HEIGHT - fixedTop;
        (0, _scrollTo.default)(y, {
          getContainer: getContainer
        });
      }

      setId(anchorName);
      setIsClickScroll(true);
    }
  }, [setId, setIsClickScroll, fixedTop, getContainer]); //水平方向锚点menu内容

  var menu = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react.default.createElement(_menu.default, {
      selectedKeys: [currentId]
    }, list.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
        key: item.id,
        onClick: function onClick() {
          return scrollToAnchor(item.id);
        },
        disabled: item.isInvalid ? true : false
      }, item.title);
    }));
  }, [currentId, list]); //锚点方向切换

  var onSwitchClick = (0, _react.useCallback)(function (e) {
    var newStateMode = stateMode === 'vertical' ? 'horizontal' : 'vertical';

    if (layout === 'vertical') {
      // 去掉磁吸效果
      var fixedEle = document.getElementById('anchorBoxId'); //定位元素

      fixedEle && fixedEle.classList.remove("".concat(prefixCls, "-activeScroll"));
    }

    setStateMode(newStateMode);
    onLayoutChange && onLayoutChange(newStateMode);
  }, [stateMode, setStateMode, onLayoutChange]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames3.default)(className, "".concat(prefixCls, "-wrapper")),
    style: Object.assign({}, style)
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: stateMode === 'horizontal' ? '100%' : 'calc(100% - 150px)',
      float: 'left'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames3.default)("".concat(prefixCls, "-horAnchorOut"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-horAnchorOut__hidden"), stateMode === 'vertical'))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-anchor",
    id: "anchorBoxId"
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "left",
    style: {
      display: leftArrowsShow ? 'block' : 'none',
      float: 'left'
    },
    className: "".concat(prefixCls, "-iconCss"),
    onClick: function onClick() {
      return handleMobileTabs('left');
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-silderCss"),
    id: "silderId"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-contentCss"),
    id: "contentId"
  }, list.map(function (item) {
    var nowCss = item.id == currentId ? 'activeCss' : '';

    if (item.isInvalid) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-isInvalid")
      }, item.title);
    }

    return /*#__PURE__*/_react.default.createElement("a", {
      className: "".concat(prefixCls, "-aCss"),
      key: item.id,
      onClick: function onClick() {
        return scrollToAnchor(item.id);
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "".concat(prefixCls, "-").concat(nowCss)
    }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, item.title, item.complete ? /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "check-circle",
      theme: "twoTone",
      twoToneColor: "#52c41a",
      style: {
        paddingLeft: '5px'
      }
    }) : null)));
  }))), /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "switcher",
    onClick: onSwitchClick,
    className: "".concat(prefixCls, "-iconCss"),
    style: {
      float: 'right'
    }
  }), /*#__PURE__*/_react.default.createElement(_dropdown.default, {
    overlay: menu,
    // style={{ display: menuArrowsShow ? 'block' : 'none' }}
    placement: "bottomRight"
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "down",
    className: "".concat(prefixCls, "-iconCss"),
    style: {
      float: 'right'
    }
  })), /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "right",
    style: {
      display: rightArrowsShow ? 'block' : 'none',
      float: 'right'
    },
    className: "".concat(prefixCls, "-iconCss"),
    onClick: function onClick() {
      return handleMobileTabs('right');
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-anchor-content",
    style: {
      padding: '0px',
      minHeight: minHeight
    }
  }, content)), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames3.default)("".concat(prefixCls, "-verticalbox"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-verticalbox__hidden"), stateMode === 'horizontal')),
    style: {
      width: 150,
      paddingLeft: '10px',
      paddingTop: '10px',
      float: stateMode === 'horizontal' ? 'none' : 'left'
    }
  }, /*#__PURE__*/_react.default.createElement(_anchor.default, Object.assign({
    offsetTop: fixedTop,
    onClick: function onClick(e) {
      e.preventDefault();
    }
  }, nextProps, {
    getContainer: getContainer
  }), /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "switcher",
    onClick: onSwitchClick,
    style: {
      width: '100%',
      paddingRight: '10px',
      textAlign: 'right'
    }
  }), list.map(function (item) {
    var nullCss = {};
    return /*#__PURE__*/_react.default.createElement("div", {
      key: item === null || item === void 0 ? void 0 : item.id,
      style: item.isInvalid ? {
        opacity: 0.5,
        cursor: 'not-allowed'
      } : nullCss
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: item.isInvalid ? {
        pointerEvents: 'none'
      } : nullCss
    }, /*#__PURE__*/_react.default.createElement(_anchor.default.Link, {
      key: item.key || item.title,
      href: "#".concat(item.id || item.title),
      title: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        title: item.title,
        placement: "left"
      }, item.title), item.complete ? /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "check-circle",
        theme: "twoTone",
        twoToneColor: "#52c41a",
        style: {
          paddingLeft: '5px'
        }
      }) : null)
    })));
  }))));
};

var _default = GantAnchor;
exports.default = _default;