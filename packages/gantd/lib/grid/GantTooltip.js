"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cellPadding = 22;

var isEmptyObj = function isEmptyObj(value) {
  if (typeof value === 'number') return false;
  if ((0, _typeof2.default)(value) === 'object') return (0, _lodash.isEmpty)(value);
  return !value;
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var value = props.value,
      valueFormatted = props.valueFormatted,
      column = props.column,
      context = props.context,
      rowIndex = props.rowIndex,
      _props$colDef = props.colDef,
      tooltip = _props$colDef.tooltip,
      tooltipRender = _props$colDef.tooltipRender,
      field = _props$colDef.field,
      requireds = props.context.requireds,
      columnApi = props.columnApi,
      api = props.api;
  var required = (0, _react.useMemo)(function () {
    return requireds.indexOf(field) >= 0;
  }, [requireds, field]);
  var node = api === null || api === void 0 ? void 0 : api.getDisplayedRowAtIndex(rowIndex);
  var data = (0, _lodash.get)(node, 'data', {});
  var params = Object.assign(Object.assign({}, props), {
    node: node,
    data: data
  });
  var containerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showTip = _useState2[0],
      setTipShow = _useState2[1];

  var actualColumnWidth = (0, _lodash.get)(columnApi.getColumn(field), 'actualWidth', 0); //获取要显示的内容内容

  var renderOverflow = String(value);
  var render = (0, _lodash.get)(props, 'colDef.cellRendererParams.render');

  if (valueFormatted) {
    renderOverflow = valueFormatted;
  }

  if (render) {
    renderOverflow = !(0, _lodash.isEmpty)(data) && value ? render(value, data, rowIndex, params) : value;
  }

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getReactContainerClasses: function getReactContainerClasses() {
        return ['gant-cell-tooltip'];
      }
    };
  });
  (0, _react.useEffect)(function () {
    var width = (0, _lodash.get)(containerRef.current, 'clientWidth');

    if (width) {
      if (width + cellPadding > actualColumnWidth) {
        setTipShow(true);
      }
    }
  }, []);
  var errorMsg = (0, _lodash.get)(data, "_rowError.".concat(field), null); // errorMsg = isEmptyObj(get(data, `${field}`, null)) && required ? null : errorMsg;

  errorMsg = undefined;
  var ToolTipRender = tooltipRender ? tooltipRender(params) : null;

  if (!showTip && !ToolTipRender && !errorMsg) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement("div", {
      id: "tempDiv",
      ref: containerRef,
      style: {
        width: 'fit-content',
        position: 'fixed',
        opacity: 0,
        whiteSpace: 'pre'
      }
    }, renderOverflow && renderOverflow), document.body));
  }

  if (renderOverflow || ToolTipRender || errorMsg) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "gant-cell-tooltip"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)('gant-cell-tooltip-content', errorMsg && 'gant-cell-tooltip-error')
    }, showTip && renderOverflow && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderOverflow), ToolTipRender && /*#__PURE__*/_react.default.createElement("div", null, ToolTipRender), errorMsg && /*#__PURE__*/_react.default.createElement("div", {
      className: "gant-cell-tooltip-errorMsg"
    }, errorMsg)));
  }

  return null;
});

exports.default = _default;