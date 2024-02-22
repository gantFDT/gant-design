"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GantGridRowFormRenderer;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  if (!visible || !clickedEvent) return null;
  //自定义组件
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
  return _react.default.createElement("div", {
    className: "gant-grid-form-wrapper",
    style: {
      width: width
    }
  }, _react.default.createElement("div", {
    className: "gant-grid-form-cursor",
    onMouseDown: onMouseDown
  }), _react.default.createElement("div", {
    key: clickRowIndex
  }, customDrawerContent && customDrawerContentComponent));
}