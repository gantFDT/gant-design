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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-contextfooter"), className),
    style: style
  }, _react.default.createElement("div", {
    className: "".concat(prefixCls, "-footerdiv"),
    onClick: onFooterChangePage.bind(null, 'before'),
    style: {
      display: currentIndex == 0 ? 'none' : 'block'
    }
  }, _react.default.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 16,
      color: 'rgba(128,128,128,1)',
      margin: '0 5px'
    }
  }, _react.default.createElement(_icon.default, {
    type: "left-circle"
  })), _react.default.createElement("p", {
    style: {
      display: 'inline-block',
      color: 'rgba(128,128,128,1)',
      margin: 0
    }
  }, currentIndex == 0 ? '' : data[currentIndex - 1].title)), _react.default.createElement("div", {
    className: "".concat(prefixCls, "-footerdiv"),
    onClick: onFooterChangePage.bind(null, 'after'),
    style: {
      textAlign: 'right',
      display: currentIndex + 1 == data.length ? 'none' : 'block'
    }
  }, _react.default.createElement("p", {
    style: {
      display: 'inline-block',
      color: 'rgba(128,128,128,1)',
      margin: 0
    }
  }, currentIndex + 1 == data.length ? '' : data[currentIndex + 1].title), _react.default.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 16,
      color: 'rgba(128,128,128,1)',
      margin: '0 5px'
    }
  }, _react.default.createElement(_icon.default, {
    type: "right-circle"
  }))));
};
FlipOverFooter.defaultProps = {
  data: [],
  itemKey: 'key',
  style: {}
};
var _default = exports.default = FlipOverFooter;