"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ModalContext", {
  enumerable: true,
  get: function get() {
    return _Context.default;
  }
});
Object.defineProperty(exports, "ResizableModal", {
  enumerable: true,
  get: function get() {
    return _ResizableModal.default;
  }
});
Object.defineProperty(exports, "ResizableProvider", {
  enumerable: true,
  get: function get() {
    return _ResizableProvider.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "setGlobalConfig", {
  enumerable: true,
  get: function get() {
    return _utils.setGlobalConfig;
  }
});
require("antd/es/modal/style/css");
var _modal = _interopRequireDefault(require("antd/es/modal"));
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _Context = _interopRequireDefault(require("./Context"));
var _ResizableModal = _interopRequireDefault(require("./ResizableModal"));
var _ResizableProvider = _interopRequireDefault(require("./ResizableProvider"));
var _utils = require("./utils");
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
var uuid = 'modal-g-uuid';
var providerPropKeys = ['initalState', 'maxZIndex', 'minWidth', 'minHeight'];
var ContextContent = function ContextContent(_ref) {
  var id = _ref.id,
    onSizeChange = _ref.onSizeChange,
    throttleTime = _ref.throttleTime,
    children = _ref.children;
  var _useContext = (0, _react.useContext)(_Context.default),
    modals = _useContext.state.modals;
  var _modals$id = modals[id],
    width = _modals$id.width,
    height = _modals$id.height;
  (0, _react.useEffect)(function () {
    sizeChange(width, height);
  }, [width, height]);
  var sizeChange = (0, _react.useCallback)((0, _lodash.throttle)(function (width, height) {
    onSizeChange && onSizeChange(width, height);
  }, throttleTime), []);
  return _react.default.createElement(_react.default.Fragment, null, children);
};
var ModalComponent = function ModalComponent(modelProps) {
  var globalConfig = (0, _utils.getGlobalConfig)();
  var props = Object.assign(Object.assign({}, globalConfig), modelProps);
  var _props$id = props.id,
    id = _props$id === void 0 ? uuid : _props$id,
    _props$throttle = props.throttle,
    throttle = _props$throttle === void 0 ? 0 : _props$throttle,
    children = props.children,
    _props$maxZIndex = props.maxZIndex,
    maxZIndex = _props$maxZIndex === void 0 ? 999 : _props$maxZIndex,
    _props$isModalDialog = props.isModalDialog,
    isModalDialog = _props$isModalDialog === void 0 ? true : _props$isModalDialog,
    onSizeChange = props.onSizeChange,
    _props$type = props.type,
    type = _props$type === void 0 ? 'resize' : _props$type,
    restProps = __rest(props, ["id", "throttle", "children", "maxZIndex", "isModalDialog", "onSizeChange", "type"]);
  var _restProps$itemState = restProps.itemState,
    itemState = _restProps$itemState === void 0 ? {} : _restProps$itemState,
    restWidth = restProps.width;
  var itemWidth = itemState.width,
    itemHeight = itemState.height;
  //兼容type为autoHeight的情况中的指定高度
  //宽度
  var modelWidth;
  if (typeof itemWidth === 'number') {
    modelWidth = itemWidth;
  }
  if (typeof itemWidth === 'string' && itemWidth.indexOf('%')) {
    modelWidth = window.innerWidth * parseInt(itemWidth) / 100;
  }
  if (restWidth) {
    modelWidth = restWidth;
  }
  //高度
  var modelHeight;
  if (typeof itemHeight === 'number') {
    modelHeight = itemHeight;
  }
  if (typeof itemHeight === 'string' && itemHeight.indexOf('%')) {
    modelHeight = window.innerHeight * parseInt(itemHeight) / 100;
  }
  var contentHeight = (0, _react.useMemo)(function () {
    if (type === 'autoHeight') {
      return 'auto';
    }
    if (itemHeight && modelHeight) {
      return modelHeight - 0;
    }
  }, [type, itemHeight, modelHeight]);
  return _react.default.createElement(_react.default.Fragment, null, type === 'resize' ? _react.default.createElement(_ResizableProvider.default, Object.assign({
    maxZIndex: maxZIndex
  }, (0, _lodash.pick)(restProps, providerPropKeys)), _react.default.createElement(_ResizableModal.default, Object.assign({
    id: id,
    isModalDialog: isModalDialog
  }, (0, _lodash.omit)(restProps, providerPropKeys)), _react.default.createElement(ContextContent, {
    id: id,
    children: children,
    throttleTime: throttle,
    onSizeChange: onSizeChange
  }))) : _react.default.createElement(_modal.default, Object.assign({
    width: modelWidth
  }, restProps), _react.default.createElement("div", {
    style: {
      height: contentHeight
    }
  }, children)));
};
ModalComponent.ResizableModal = _ResizableModal.default;
ModalComponent.ResizableProvider = _ResizableProvider.default;
ModalComponent.ModalContext = _Context.default;
var _default = exports.default = ModalComponent;