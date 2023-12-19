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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _district_zh = _interopRequireDefault(require("./district_zh.json"));

var _compose = require("../compose");

var _recompose = require("recompose");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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

var transformData = function transformData($code) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Object.entries(_district_zh.default[$code]).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        code = _ref2[0],
        name = _ref2[1];

    var item = {
      label: name,
      value: code
    }; // 根据code找到子级单位
    // 确保不会有同名代码或者子级里面的同名代码对应的名字不同

    if (_district_zh.default[code] && (!_district_zh.default[code][code] || _district_zh.default[code][code] !== name)) {
      if (level < 3) {
        item.children = transformData(code, level + 1);
      }
    }

    return item;
  });
}; // 获取位置的名称列表


var getLocationNameList = function getLocationNameList(locationList) {
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
}; // 获取地址的展示值


exports.getLocationNameList = getLocationNameList;

var getValue = function getValue(_ref3) {
  var value = _ref3.value;
  var msg = getLocationNameList(value);
  return msg.join(' / ');
};

exports.getValue = getValue;
var withLocation = (0, _recompose.compose)(_recompose.toClass, (0, _recompose.defaultProps)({
  style: {},
  options: transformData('COUNTRIES'),
  placeholder: '请选择地址'
}));

var Location = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Location, _React$Component);

  var _super = _createSuper(Location);

  function Location() {
    (0, _classCallCheck2.default)(this, Location);
    return _super.apply(this, arguments);
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

      return /*#__PURE__*/_react.default.createElement(_cascader.default, Object.assign({}, props, {
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

var LocationWrapper = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LocationWrapper, _Component);

  var _super2 = _createSuper(LocationWrapper);

  function LocationWrapper() {
    (0, _classCallCheck2.default)(this, LocationWrapper);
    return _super2.apply(this, arguments);
  }

  (0, _createClass2.default)(LocationWrapper, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(Location, Object.assign({}, this.props));
    }
  }]);
  return LocationWrapper;
}(_react.Component);

exports.default = LocationWrapper;

LocationWrapper.getLocationName = function (locationList) {
  var nameList = getLocationNameList(locationList);
  return nameList;
};