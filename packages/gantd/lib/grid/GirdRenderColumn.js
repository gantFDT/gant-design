"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/(0, _react.memo)(function GirdRenderColumnComponent(props) {
  var value = props.value,
      rowIndex = props.rowIndex,
      render = props.render,
      data = props.data,
      valueFormatted = props.valueFormatted,
      context = props.context;
  var showValue = (0, _react.useMemo)(function () {
    return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
  }, [valueFormatted, value]);
  var renderContent = (0, _react.useMemo)(function () {
    return typeof render == 'function' ? render(showValue, data, rowIndex, props) : showValue;
  }, [showValue, data, rowIndex]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderContent);
});

exports.default = _default;