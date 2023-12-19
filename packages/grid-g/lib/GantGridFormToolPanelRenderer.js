"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GantGridRowFormRenderer;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GantGridRowFormRenderer(props) {
  var columns = props.columns,
      clickedEvent = props.clickedEvent,
      _props$defaultDrawerW = props.defaultDrawerWidth,
      defaultDrawerWidth = _props$defaultDrawerW === void 0 ? 300 : _props$defaultDrawerW,
      gridManager = props.gridManager,
      visible = props.visible,
      closeDrawer = props.closeDrawer,
      onCellEditChange = props.onCellEditChange,
      onCellEditingChange = props.onCellEditingChange,
      customDrawerContent = props.customDrawerContent,
      editable = props.editable,
      context = props.context,
      clickRowIndex = props.clickRowIndex;

  var _useState = (0, _react.useState)(defaultDrawerWidth),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      formWidth = _useState2[0],
      setFormWidth = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      distance = _useState4[0],
      setDistance = _useState4[1];

  var startPositionRef = (0, _react.useRef)(0);
  var mouseDownRef = (0, _react.useRef)(false);
  var width = formWidth - distance;
  var onMouseDown = (0, _react.useCallback)(function (event) {
    mouseDownRef.current = true;
    startPositionRef.current = event.clientX;
  }, []);
  var onMouseUp = (0, _react.useCallback)(function () {
    mouseDownRef.current = false;
    startPositionRef.current = 0;
    setFormWidth(formWidth - distance);
    setDistance(0);
  }, [formWidth, distance]);
  var onMouseMove = (0, _react.useCallback)(function (event) {
    if (!mouseDownRef.current) return;
    var dis = event.clientX - startPositionRef.current;
    setDistance(dis);
  }, []);
  (0, _react.useEffect)(function () {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return function () {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);
  if (!visible || !clickedEvent) return null; //自定义组件

  var customDrawerContentComponent = customDrawerContent({
    formWidth: formWidth,
    columns: columns,
    clickedEvent: clickedEvent,
    onCellEditChange: onCellEditChange,
    onCellEditingChange: onCellEditingChange,
    gridManager: gridManager,
    editable: editable,
    closeDrawer: closeDrawer,
    visible: visible,
    context: context
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-grid-form-wrapper",
    style: {
      width: width
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gant-grid-form-cursor",
    onMouseDown: onMouseDown
  }), /*#__PURE__*/_react.default.createElement("div", {
    key: clickRowIndex
  }, customDrawerContent && customDrawerContentComponent));
}