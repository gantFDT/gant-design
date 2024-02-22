"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _dataCell = require("data-cell-g");
var _moment = _interopRequireDefault(require("moment"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var WraperDatePick = _dataCell.DatePicker.WraperDatePick;
var _default = exports.default = (0, _react.forwardRef)(function GantDateComponent(props, ref) {
  var onDateChanged = props.onDateChanged;
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    placeholder = _useState2[0],
    setplaceholder = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    date = _useState4[0],
    _setDate = _useState4[1];
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      setInputPlaceholder: function setInputPlaceholder(placeholder) {
        setplaceholder(placeholder);
      },
      getDate: function getDate() {
        return date ? new Date(date) : null;
      },
      setDate: function setDate(date) {
        _setDate(date);
      }
    };
  }, [date]);
  return _react.default.createElement(WraperDatePick, {
    size: "small",
    style: {
      width: '100%'
    },
    dropdownClassName: "ag-custom-component-popup",
    placeholder: placeholder,
    value: date ? (0, _moment.default)(date) : null,
    onChange: function onChange(value, timeString) {
      _setDate(value ? value.format() : null);
      onDateChanged();
    }
  });
});