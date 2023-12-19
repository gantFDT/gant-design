"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/badge/style/css");

var _badge = _interopRequireDefault(require("antd/es/badge"));

require("antd/es/menu/style/css");

var _menu = _interopRequireDefault(require("antd/es/menu"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _FlipOverFooter = _interopRequireDefault(require("./FlipOverFooter"));

var _dataCell = require("data-cell-g");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Submenu = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Submenu, _React$Component);

  var _super = _createSuper(Submenu);

  function Submenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Submenu);
    _this = _super.call(this, props);

    _this.setMenuWidthByStatusChange = function () {
      var mode = _this.state.mode;
      var showMenuMagnet = _this.props.showMenuMagnet;
      if (!_this.warpRef || !showMenuMagnet) return;

      var fixedEle = _this.warpRef.querySelector(".".concat(_this.prefixCls, "-wrap")); //定位元素


      var fixedEleParent = _this.warpRef.querySelector(".".concat(_this.prefixCls, "-menubox"));

      if (fixedEleParent) {//上下文菜单切换方向时menu宽度
        // fixedEle.style.width = `${fixedEleParent.offsetWidth - (mode == 'inline' ? 1 : 0)}px`;
      }
    };

    _this.handleScroll = function () {
      var _this$props = _this.props,
          fixedTopHeight = _this$props.fixedTopHeight,
          showFixedBoxShadow = _this$props.showFixedBoxShadow,
          zIndex = _this$props.zIndex;
      var mode = _this.state.mode;
      if (!_this.warpRef) return;

      var fixedEle = _this.warpRef.querySelector(".".concat(_this.prefixCls, "-wrap")); //定位元素


      var fixedEleParent = _this.warpRef.querySelector(".".concat(_this.prefixCls, "-menubox"));

      var parentClientTop = fixedEleParent ? fixedEleParent.getBoundingClientRect().top : 0; //定位元素父级距离浏览器的高度

      var horEle = _this.warpRef.querySelector(".".concat(_this.prefixCls, "-menuboxhor"));

      if (parentClientTop <= fixedTopHeight) {
        fixedEle.classList.add("".concat(_this.prefixCls, "-fixed"));
        fixedEle.style.top = "".concat(fixedTopHeight, "px");
        zIndex && (fixedEle.style.zIndex = zIndex);
        fixedEle.style.width = "".concat(fixedEleParent.offsetWidth - (mode == 'inline' ? 1 : 0), "px");

        if (showFixedBoxShadow && horEle) {
          fixedEle.classList.add("".concat(_this.prefixCls, "-boxShow"));
        }
      } else {
        fixedEle.classList.remove("".concat(_this.prefixCls, "-fixed"));
        fixedEle.classList.remove("".concat(_this.prefixCls, "-boxShow"));
      }
    }; //点击切换mode


    _this.onSwitchClick = function () {
      var onSwitchChange = _this.props.onSwitchChange;
      var nowMode = _this.state.mode == 'inline' ? 'horizontal' : 'inline';

      _this.setState({
        mode: nowMode
      });

      onSwitchChange && onSwitchChange(nowMode);
    }; //点击收缩


    _this.toggleCollapsed = function () {
      var onCollapseChange = _this.props.onCollapseChange;

      _this.setState(function (state) {
        return {
          collapsed: !state.collapsed
        };
      }, function () {
        onCollapseChange && onCollapseChange(_this.state.collapsed);
        window.dispatchEvent(new Event('resize'));
      });
    }; //点击菜单item


    _this.onClick = function (_ref) {
      var key = _ref.key,
          item = _ref.item;
      var _this$props2 = _this.props,
          onSelectedChange = _this$props2.onSelectedChange,
          menuData = _this$props2.menuData;
      var record = menuData.find(function (i) {
        return i.key == key;
      });
      onSelectedChange && onSelectedChange(key, record, item);
    }; //点击翻页页脚


    _this.onFooterSelectedChange = function (nowKey, record) {
      var onSelectedChange = _this.props.onSelectedChange;
      onSelectedChange && onSelectedChange(nowKey, record);
    };

    var collapsed = props.collapsed,
        mode = props.mode;
    _this.state = {
      collapsed: collapsed,
      mode: mode
    };
    return _this;
  }

  (0, _createClass2.default)(Submenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var collapsedWidth = this.props.collapsedWidth;
      document.body.style.setProperty('--submenu-collapsed-width', collapsedWidth + 'px');
      this.props.showMenuMagnet && window.addEventListener('scroll', this.handleScroll); //监听滚动
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var prev = {
        mode: prevState.mode,
        collapsed: prevState.collapsed
      };
      var next = {
        mode: this.state.mode,
        collapsed: this.state.collapsed
      };

      if (!(0, _lodash.isEqual)(prev, next)) {
        this.setMenuWidthByStatusChange();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    } //渲染menu主体

  }, {
    key: "renderSubMenu",
    value: function renderSubMenu(prefixCls) {
      var _this$state = this.state,
          collapsed = _this$state.collapsed,
          mode = _this$state.mode;
      var _this$props3 = this.props,
          selectedKey = _this$props3.selectedKey,
          menuData = _this$props3.menuData;
      var selectedKeys = selectedKey ? [selectedKey] : menuData.length && [menuData[0].key] || [];
      var inlineCollapsed = mode == 'inline' && collapsed;
      var inlineProperty = mode == 'inline' ? {
        inlineCollapsed: collapsed
      } : {};
      return /*#__PURE__*/_react.default.createElement(_menu.default, Object.assign({
        className: prefixCls,
        selectedKeys: selectedKeys,
        mode: mode,
        onClick: this.onClick
      }, inlineProperty), menuData.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
          className: inlineCollapsed && "".concat(prefixCls, "-collapsed"),
          disabled: item.disabled,
          key: item.key
        }, typeof item.icon == 'string' ? /*#__PURE__*/_react.default.createElement(_dataCell.Icon, {
          type: item.icon,
          wrapperStyle: {
            width: 'auto'
          }
        }) : item.icon, /*#__PURE__*/_react.default.createElement("span", null, item.title), item.count && /*#__PURE__*/_react.default.createElement("span", {
          className: "".concat(prefixCls, "-item-count")
        }, /*#__PURE__*/_react.default.createElement(_badge.default, {
          count: item.count
        })));
      }));
    } // 渲染垂直菜单

  }, {
    key: "renderInlineMenu",
    value: function renderInlineMenu(prefixCls) {
      var collapsed = this.state.collapsed;
      var _this$props4 = this.props,
          extra = _this$props4.extra,
          width = _this$props4.width,
          collapsedWidth = _this$props4.collapsedWidth,
          setMenuBoxRef = _this$props4.setMenuBoxRef,
          style = _this$props4.style;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: setMenuBoxRef,
        className: "".concat(prefixCls, "-menubox ").concat(prefixCls, "-menuboxinline"),
        style: Object.assign({
          width: collapsed ? collapsedWidth + 1 : width
        }, style)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-wrap"),
        style: {
          width: 'calc(100% - 1px)'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-collapsebtn"),
        style: {
          width: collapsed ? collapsedWidth : '100%',
          lineHeight: collapsedWidth + 'px',
          textAlign: 'right'
        }
      }, /*#__PURE__*/_react.default.createElement(_dataCell.Icon.Ant, {
        type: collapsed ? 'menu-unfold' : 'menu-fold',
        onClick: this.toggleCollapsed
      }), /*#__PURE__*/_react.default.createElement(_dataCell.Icon.Ant, {
        type: "switcher",
        onClick: this.onSwitchClick
      })), !collapsed && extra, this.renderSubMenu(prefixCls)));
    } // 渲染水平菜单

  }, {
    key: "renderHorMenu",
    value: function renderHorMenu(prefixCls) {
      var _this$props5 = this.props,
          setMenuBoxRef = _this$props5.setMenuBoxRef,
          style = _this$props5.style;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-menubox ").concat(prefixCls, "-menuboxhor"),
        style: Object.assign({
          width: '100%'
        }, style)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-wrap"),
        style: {
          width: 'calc(100% - 1px)'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: setMenuBoxRef,
        className: "".concat(prefixCls, "-menuinternal")
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-menuleft")
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-horMenu")
      }, this.renderSubMenu(prefixCls))), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefixCls, "-menuright")
      }, /*#__PURE__*/_react.default.createElement(_dataCell.Icon.Ant, {
        type: "switcher",
        onClick: this.onSwitchClick
      })))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var getPrefixCls = function getPrefixCls(cls, customizePrefixCls) {
        return customizePrefixCls || 'gant' + cls;
      };

      var _this$props6 = this.props,
          customizePrefixCls = _this$props6.prefixCls,
          classname = _this$props6.classname,
          children = _this$props6.children,
          subMinHeight = _this$props6.subMinHeight,
          selectedKey = _this$props6.selectedKey,
          menuData = _this$props6.menuData,
          showFlipOverFooter = _this$props6.showFlipOverFooter,
          bordered = _this$props6.bordered;
      this.prefixCls = getPrefixCls('-submenu', customizePrefixCls);
      var isInline = this.state.mode == 'inline';
      var wrapStyle = {
        minHeight: subMinHeight
      };
      isInline && (wrapStyle['display'] = 'flex');
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(_ref2) {
          return _this2.warpRef = _ref2;
        },
        className: (0, _classnames.default)("".concat(this.prefixCls, "-pagewrap"), classname),
        style: Object.assign({
          border: bordered ? '1px solid rgba(128,128,128,0.2)' : 'none'
        }, wrapStyle)
      }, isInline ? this.renderInlineMenu(this.prefixCls) : this.renderHorMenu(this.prefixCls), /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(this.prefixCls, "-pagecard")
      }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children), menuData.length > 0 && showFlipOverFooter && /*#__PURE__*/_react.default.createElement(_FlipOverFooter.default, {
        prefixCls: this.prefixCls,
        data: menuData,
        nowKey: selectedKey,
        onSelectedChange: this.onFooterSelectedChange
      })));
    }
  }]);
  return Submenu;
}(_react.default.Component);

exports.default = Submenu;
Submenu.defaultProps = {
  collapsed: false,
  mode: 'inline',
  width: 200,
  fixedTopHeight: 0,
  collapsedWidth: 30,
  subMinHeight: 112,
  selectedKey: '',
  menuData: [],
  bordered: true,
  showMenuMagnet: false,
  showFlipOverFooter: false,
  style: {}
};