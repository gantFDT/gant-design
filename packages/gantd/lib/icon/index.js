"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IconSelector = void 0;

require("antd/es/empty/style/css");

var _empty = _interopRequireDefault(require("antd/es/empty"));

require("antd/es/radio/style/css");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/drawer/style/css");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _recompose = require("recompose");

var _Icon = _interopRequireDefault(require("./Icon"));

var _compose = require("../compose");

var _input = _interopRequireDefault(require("../input"));

var _editStatus = _interopRequireDefault(require("../edit-status"));

var _Receiver = _interopRequireDefault(require("./locale/Receiver"));

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

var getOutLine = _Icon.default.getOutLine,
    updateFromIconfontCN = _Icon.default.updateFromIconfontCN,
    Ant = _Icon.default.Ant;
var outline = getOutLine();
var bodyStyle = {
  height: 'calc(100vh - 41px)',
  padding: 10,
  overflow: 'hidden'
};
var IconTypes;

(function (IconTypes) {
  IconTypes["IconFont"] = "IconFont";
  IconTypes["AntIcon"] = "AntIcon";
})(IconTypes || (IconTypes = {}));

var defaultprops = {
  perfix: 'icon-',
  // onChange(icon: string) { },
  value: ''
};
var drawerClassname = 'gant-icon-selector-drawer-wrapper';

var IconHouse = function IconHouse(_a) {
  var onChange = _a.onChange,
      value = _a.value,
      _a$onBlur = _a.onBlur,
      onBlur = _a$onBlur === void 0 ? undefined : _a$onBlur,
      addonAfter = _a.addonAfter,
      allowEdit = _a.allowEdit,
      onEnter = _a.onEnter,
      perfix = _a.perfix,
      _a$size = _a.size,
      size = _a$size === void 0 ? 'normal' : _a$size,
      controlMode = _a.controlMode,
      props = __rest(_a, ["onChange", "value", "onBlur", "addonAfter", "allowEdit", "onEnter", "perfix", "size", "controlMode"]);

  var prefixCls = 'gant-icon-selector'; // 图标抽屉

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      visible = _useState2[0],
      setvisible = _useState2[1]; // 图标id


  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      IDs = _useState4[0],
      setIDs = _useState4[1]; // 搜索框


  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      text = _useState6[0],
      settext = _useState6[1]; // 当前icon


  var _useState7 = (0, _react.useState)(value),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      currentId = _useState8[0],
      setCurrentId = _useState8[1]; // 当前显示的图标类型


  var iconTypes = (0, _react.useMemo)(function () {
    var iconTypeArr = [IconTypes.AntIcon];

    if (!_lodash.default.isEmpty(IDs)) {
      iconTypeArr.push(IconTypes.IconFont);
    }

    return iconTypeArr;
  }, [IDs]);

  var _useState9 = (0, _react.useState)(iconTypes[0]),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      iconType = _useState10[0],
      seticonType = _useState10[1];

  var icons = (0, _react.useMemo)(function () {
    return {
      IconFont: IDs,
      AntIcon: outline
    };
  }, [IDs]);
  (0, _react.useEffect)(function () {
    setCurrentId(value);
  }, [value]);
  var toggleVisible = (0, _react.useCallback)(function () {
    if (!visible) {
      // 打开
      settext('');
    }

    setvisible(!visible);
  }, [visible]);
  var onSelectIcon = (0, _react.useCallback)(function (id) {
    setCurrentId(id);
    if (onChange) onChange(id);
    toggleVisible();
  }, []); // 获取图标id

  (0, _react.useState)(function () {
    // const tag = queryIconHouse(iconWareHouse)
    var tag = document.querySelector('svg');
    if (!tag) return;
    var iconIds = [].slice.call(tag.querySelectorAll('symbol')).map(function (symbol) {
      return symbol.id;
    });
    setIDs(iconIds);
  }); // 切换图标

  var handleTypeChange = (0, _react.useCallback)(function (e) {
    seticonType(e.target.value);
  }, []);
  var iconsWithFilter = (0, _react.useMemo)(function () {
    return icons[iconType].filter(function (id) {
      return id.includes(text);
    });
  }, [icons, iconType, text]);
  return /*#__PURE__*/_react.default.createElement(_Receiver.default, null, function (locale) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)('gant-icon-select', size),
      onClick: toggleVisible
    }, currentId ? /*#__PURE__*/_react.default.createElement(_Icon.default, Object.assign({
      type: currentId,
      title: locale.clickToggle,
      perfix: perfix
    }, props)) : /*#__PURE__*/_react.default.createElement("span", {
      className: prefixCls + '-btn'
    }, locale.clickSelect)), /*#__PURE__*/_react.default.createElement(_drawer.default, {
      width: visible ? 500 : 0,
      title: locale.pleaseSelect,
      destroyOnClose: true,
      placement: "right",
      onClose: toggleVisible,
      visible: visible,
      bodyStyle: bodyStyle,
      className: drawerClassname
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls + '-search')
    }, /*#__PURE__*/_react.default.createElement(_radio.default.Group, {
      value: iconType,
      onChange: handleTypeChange
    }, iconTypes.map(function (type) {
      return /*#__PURE__*/_react.default.createElement(_radio.default.Button, {
        key: type,
        value: type
      }, type);
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flex: 1,
        marginLeft: 10
      }
    }, /*#__PURE__*/_react.default.createElement(_input.default, {
      edit: _editStatus.default.EDIT,
      value: text,
      onChange: settext,
      placeholder: locale.search,
      allowClear: true
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls + '-scroll')
    }, iconsWithFilter.length ? null : /*#__PURE__*/_react.default.createElement(_empty.default, {
      image: _empty.default.PRESENTED_IMAGE_SIMPLE,
      description: locale.noMatch,
      style: {
        margin: '30px auto 0'
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls + '-content')
    }, iconsWithFilter.map(function (id) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: prefixCls + '-content-item',
        title: id,
        key: id,
        onClick: function onClick() {
          return onSelectIcon(id);
        }
      }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
        perfix: perfix,
        type: id,
        className: prefixCls + '-content-item-iconitem'
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '100%'
        }
      }, id));
    })))));
  });
};

var IconSelector = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.defaultProps)(defaultprops), (0, _recompose.withProps)(function (_ref) {
  var allowEdit = _ref.allowEdit,
      edit = _ref.edit,
      _ref$wrapperStyle = _ref.wrapperStyle,
      wrapperStyle = _ref$wrapperStyle === void 0 ? {} : _ref$wrapperStyle,
      type = _ref.type,
      value = _ref.value,
      onChange = _ref.onChange;
  var cStyle = Object.assign({}, wrapperStyle); // 根据是否有value和onChange来确定是否受控

  var controlMode = !(_lodash.default.isUndefined(value) || _lodash.default.isUndefined(onChange));

  if (!controlMode) {
    cStyle.display = 'inline-block';
    cStyle.width = 'auto';
  }

  return {
    wrapperStyle: cStyle,
    value: value || type,
    allowEdit: controlMode ? allowEdit : false,
    edit: controlMode ? edit : _editStatus.default.CANCEL,
    controlMode: controlMode
  };
}), (0, _compose.withEdit)(function (_ref2) {
  var value = _ref2.value,
      style = _ref2.style,
      theme = _ref2.theme,
      spin = _ref2.spin,
      rotate = _ref2.rotate,
      component = _ref2.component,
      twoToneColor = _ref2.twoToneColor,
      controlMode = _ref2.controlMode,
      perfix = _ref2.perfix,
      className = _ref2.className,
      onClick = _ref2.onClick;

  var element = /*#__PURE__*/_react.default.createElement(_Icon.default, {
    type: value,
    perfix: perfix,
    style: style,
    theme: theme,
    spin: spin,
    rotate: rotate,
    component: component,
    twoToneColor: twoToneColor,
    className: className,
    onClick: onClick
  });

  if (!controlMode) {
    return element;
  }

  return value ? element : undefined;
}, drawerClassname))(IconHouse);
exports.IconSelector = IconSelector;
IconSelector.updateFromIconfontCN = updateFromIconfontCN;
IconSelector.Ant = Ant;
var _default = IconSelector;
exports.default = _default;