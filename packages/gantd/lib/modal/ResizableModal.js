"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/es/modal/style/css");
var _modal = _interopRequireDefault(require("antd/es/modal"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _icon = _interopRequireDefault(require("../icon"));
var _Context = _interopRequireDefault(require("./Context"));
var _Reducer = require("./Reducer");
var _Hooks = require("./Hooks");
var _interface = require("./interface");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var modalStyle = {
  position: 'absolute',
  margin: 0,
  paddingBottom: 0
};
// 对角方向
var diagonalDirections = ['rightTop', 'rightBottom', 'leftBottom', 'leftTop'];
// 坐标轴方向
var axialDirections = ['top', 'right', 'bottom', 'left'];
var ModalInner = function ModalInner(props) {
  var customizePrefixCls = props.prefixCls,
    id = props.id,
    itemState = props.itemState,
    visible = props.visible,
    title = props.title,
    style = props.style,
    wrapClassName = props.wrapClassName,
    canMaximize = props.canMaximize,
    canResize = props.canResize,
    isModalDialog = props.isModalDialog,
    onCancel = props.onCancel,
    onOk = props.onOk,
    cancelButtonProps = props.cancelButtonProps,
    okButtonProps = props.okButtonProps,
    children = props.children,
    restProps = __rest(props, ["prefixCls", "id", "itemState", "visible", "title", "style", "wrapClassName", "canMaximize", "canResize", "isModalDialog", "onCancel", "onOk", "cancelButtonProps", "okButtonProps", "children"]);
  var prefixCls = customizePrefixCls || 'gant' + '-modal';
  var _useContext = (0, _react.useContext)(_Context.default),
    dispatch = _useContext.dispatch,
    state = _useContext.state;
  var modalState = (0, _Reducer.getModalState)(state, id);
  var visiblePrev = (0, _Hooks.usePrev)(visible);
  var minHeight = state.minHeight,
    minWidth = state.minWidth,
    windowSize = state.windowSize;
  (0, _react.useEffect)(function () {
    dispatch({
      type: _interface.ActionTypes.mount,
      id: id,
      itemState: itemState
    });
    return function () {
      return dispatch({
        type: _interface.ActionTypes.unmount,
        id: id
      });
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (visible || visible !== visiblePrev) dispatch({
      type: visible ? _interface.ActionTypes.show : _interface.ActionTypes.hide,
      id: id
    });
  }, [visible]);
  var modalVisible = modalState.visible,
    zIndex = modalState.zIndex,
    x = modalState.x,
    y = modalState.y,
    width = modalState.width,
    height = modalState.height,
    isMaximized = modalState.isMaximized;
  var _style = (0, _react.useMemo)(function () {
    return Object.assign(Object.assign(Object.assign({}, style), modalStyle), {
      top: y,
      left: x,
      height: height
    });
  }, [y, x, height]);
  var onFocus = (0, _react.useCallback)(function () {
    return dispatch({
      type: _interface.ActionTypes.focus,
      id: id
    });
  }, [id]);
  var onDrag = (0, _react.useCallback)(function (payload) {
    return dispatch(Object.assign({
      type: _interface.ActionTypes.drag,
      id: id
    }, payload));
  }, [id]);
  var onResize = (0, _react.useCallback)(function (payload) {
    return dispatch(Object.assign({
      type: _interface.ActionTypes.resize,
      id: id
    }, payload));
  }, [id]);
  var toggleMaximize = (0, _react.useCallback)(function () {
    if (!canMaximize) return;
    dispatch({
      type: isMaximized ? _interface.ActionTypes.reset : _interface.ActionTypes.max,
      id: id
    });
  }, [id, isMaximized, canMaximize]);
  var onMouseDrag = (0, _Hooks.useDrag)(x, y, onDrag);
  var onMouseResize = (0, _Hooks.useResize)(x, y, Number(width), Number(height), minWidth, minHeight, windowSize, onResize);
  var titleElement = (0, _react.useMemo)(function () {
    return _react.default.createElement("div", {
      className: (0, _classnames.default)("".concat(prefixCls, "-resizableModalTitle"), isMaximized ? '' : "".concat(prefixCls, "-canDrag")),
      style: {
        marginRight: canMaximize ? 70 : 30
      },
      onMouseDown: onMouseDrag,
      onClick: onFocus,
      onDoubleClick: toggleMaximize
    }, title);
  }, [onMouseDrag, onFocus, toggleMaximize, title, isMaximized, canMaximize]);
  var combineWrapClassName = (0, _react.useMemo)(function () {
    return (0, _classnames.default)("".concat(prefixCls, "-resizableModalWrapper"), isModalDialog ? "".concat(prefixCls, "-resizableModalDialog") : "".concat(prefixCls, "-resizableModalDefault"), isMaximized && "".concat(prefixCls, "-maximize"), wrapClassName);
  }, [isMaximized, isModalDialog]);
  return _react.default.createElement(_modal.default, Object.assign({
    wrapClassName: combineWrapClassName,
    title: title && titleElement,
    width: width,
    visible: modalVisible,
    zIndex: zIndex,
    style: _style,
    mask: isModalDialog,
    maskClosable: isModalDialog,
    destroyOnClose: true,
    onCancel: onCancel,
    onOk: onOk,
    cancelButtonProps: Object.assign({
      size: 'small'
    }, cancelButtonProps),
    okButtonProps: Object.assign({
      size: 'small'
    }, okButtonProps)
  }, restProps), _react.default.createElement("div", {
    className: "".concat(prefixCls, "-resizableModalContent"),
    onClick: onFocus
  }, children), canMaximize && _react.default.createElement("div", {
    className: "".concat(prefixCls, "-maximizeAnchor"),
    onClick: toggleMaximize
  }, _react.default.createElement(_icon.default, {
    value: isMaximized ? 'switcher' : 'border'
  })), canResize && !isMaximized && _react.default.createElement(_react.default.Fragment, null, diagonalDirections.map(function (direction) {
    return _react.default.createElement("div", {
      key: direction,
      className: "".concat(prefixCls, "-").concat(direction, "-resizeAnchor"),
      onMouseDown: onMouseResize.bind(null, direction)
    });
  }), axialDirections.map(function (direction) {
    return _react.default.createElement("div", {
      key: direction,
      className: "".concat(prefixCls, "-").concat(direction, "-resizeAnchor"),
      onMouseDown: onMouseResize.bind(null, direction)
    });
  })));
};
var defaultProps = {
  itemState: {},
  style: {},
  canMaximize: true,
  canResize: true,
  isModalDialog: false,
  onCancel: function onCancel() {},
  onOk: function onOk() {}
};
ModalInner.defaultProps = defaultProps;
var ResizableModal = (0, _react.memo)(ModalInner);
var _default = exports.default = ResizableModal;