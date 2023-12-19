"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FlipOverFooter = function FlipOverFooter(props) {
  var prefixCls = props.prefixCls,
      className = props.className,
      style = props.style,
      data = props.data,
      nowKey = props.nowKey,
      itemKey = props.itemKey,
      onSelectedChange = props.onSelectedChange;
  var currentIndex = (0, _react.useMemo)(function () {
    return data.findIndex(function (item) {
      return item[itemKey] == nowKey;
    }) || 0;
  }, [data, nowKey]);
  var onFooterChangePage = (0, _react.useCallback)(function (parameter) {
    var item = parameter == 'before' ? data[currentIndex - 1] : data[currentIndex + 1];
    item && onSelectedChange && onSelectedChange(item[itemKey], item);
  }, [data, currentIndex]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-contextfooter"), className),
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-footerdiv"),
    onClick: onFooterChangePage.bind(null, 'before'),
    style: {
      display: currentIndex == 0 ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 16,
      color: 'rgba(128,128,128,1)',
      margin: '0 5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "left-circle"
  })), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      display: 'inline-block',
      color: 'rgba(128,128,128,1)',
      margin: 0
    }
  }, currentIndex == 0 ? '' : data[currentIndex - 1].title)), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-footerdiv"),
    onClick: onFooterChangePage.bind(null, 'after'),
    style: {
      textAlign: 'right',
      display: currentIndex + 1 == data.length ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      display: 'inline-block',
      color: 'rgba(128,128,128,1)',
      margin: 0
    }
  }, currentIndex + 1 == data.length ? '' : data[currentIndex + 1].title), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 16,
      color: 'rgba(128,128,128,1)',
      margin: '0 5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "right-circle"
  }))));
};

FlipOverFooter.defaultProps = {
  data: [],
  itemKey: 'key',
  style: {}
};
var _default = FlipOverFooter;
exports.default = _default;