"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = exports.getLocationNameList = exports.default = void 0;
require("antd/es/cascader/style/css");
var _cascader = _interopRequireDefault(require("antd/es/cascader"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _district_zh = _interopRequireDefault(require("./district_zh.json"));
var _compose = require("../compose");
var _recompose = require("recompose");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var transformData = function transformData($code) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Object.entries(_district_zh.default[$code]).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      code = _ref2[0],
      name = _ref2[1];
    var item = {
      label: name,
      value: code
    };
    // 根据code找到子级单位
    // 确保不会有同名代码或者子级里面的同名代码对应的名字不同
    if (_district_zh.default[code] && (!_district_zh.default[code][code] || _district_zh.default[code][code] !== name)) {
      if (level < 3) {
        item.children = transformData(code, level + 1);
      }
    }
    return item;
  });
};
// 获取位置的名称列表
var getLocationNameList = exports.getLocationNameList = function getLocationNameList(locationList) {
  var nameList = [];
  var country = _district_zh.default.COUNTRIES;
  if (locationList && locationList.length) {
    locationList.forEach(function (code, index) {
      if (index === 0) {
        nameList.push(country[code] || '未知地址');
      } else {
        var prevCode = locationList[index - 1];
        var currentCodeList = _district_zh.default[prevCode];
        if (currentCodeList) {
          nameList.push(currentCodeList[code] || '未知地址');
        }
      }
    });
  }
  return nameList;
};
// 获取地址的展示值
var getValue = exports.getValue = function getValue(_ref3) {
  var value = _ref3.value;
  var msg = getLocationNameList(value);
  return msg.join(' / ');
};
var withLocation = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.defaultProps)({
  style: {},
  options: transformData('COUNTRIES'),
  placeholder: '请选择地址'
}));
var Location = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Location, _React$Component);
  function Location() {
    (0, _classCallCheck2.default)(this, Location);
    return _callSuper(this, Location, arguments);
  }
  (0, _createClass2.default)(Location, [{
    key: "render",
    value: function render() {
      var _a = this.props,
        onEnter = _a.onEnter,
        className = _a.className,
        popupClassName = _a.popupClassName,
        wrapperRef = _a.wrapperRef,
        props = __rest(_a, ["onEnter", "className", "popupClassName", "wrapperRef"]);
      return _react.default.createElement(_cascader.default, Object.assign({}, props, {
        className: (0, _classnames.default)('gant-location-cascader', className),
        changeOnSelect: true,
        ref: wrapperRef,
        popupClassName: (0, _classnames.default)('gant-location-cascader-popup', popupClassName),
        showSearch: {
          filter: function filter(value, paths) {
            return paths.some(function (option) {
              return option.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
            });
          }
        }
      }));
    }
  }]);
  return Location;
}(_react.default.Component);
Location = __decorate([(0, _recompose.compose)(withLocation, (0, _compose.withEdit)(getValue, 'gant-location-cascader-popup'))], Location);
var LocationWrapper = exports.default = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LocationWrapper, _Component);
  function LocationWrapper() {
    (0, _classCallCheck2.default)(this, LocationWrapper);
    return _callSuper(this, LocationWrapper, arguments);
  }
  (0, _createClass2.default)(LocationWrapper, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(Location, Object.assign({}, this.props));
    }
  }]);
  return LocationWrapper;
}(_react.Component);
LocationWrapper.getLocationName = function (locationList) {
  var nameList = getLocationNameList(locationList);
  return nameList;
};