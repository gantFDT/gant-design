"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _datePicker = _interopRequireDefault(require("../date-picker"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var WraperDatePick = _datePicker.default.WraperDatePick;

var _default = /*#__PURE__*/(0, _react.forwardRef)(function GantDateComponent(props, ref) {
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
  return /*#__PURE__*/_react.default.createElement(WraperDatePick, {
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

exports.default = _default;