"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _Context = _interopRequireDefault(require("./Context"));
var _Reducer = _interopRequireDefault(require("./Reducer"));
var _interface = require("./interface");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof3(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var getWindowSize = function getWindowSize() {
  return {
    width: window.innerWidth || 0,
    height: window.innerHeight || 0
  };
};
var initial = {
  width: 520,
  height: 520,
  zIndex: 0,
  visible: false,
  maximize: false,
  keepStateOnClose: false
};
var ResizableProvider = function ResizableProvider(_ref) {
  var initalState = _ref.initalState,
    maxZIndex = _ref.maxZIndex,
    minWidth = _ref.minWidth,
    minHeight = _ref.minHeight,
    children = _ref.children;
  var initialModalsState = {
    modals: {},
    maxZIndex: maxZIndex,
    minWidth: minWidth,
    minHeight: minHeight,
    windowSize: getWindowSize(),
    initialModalState: Object.assign(Object.assign({}, initial), initalState)
  };
  var _useReducer = (0, _react.useReducer)(_Reducer.default, initialModalsState),
    _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
    state = _useReducer2[0],
    dispatch = _useReducer2[1];
  (0, _react.useEffect)(function () {
    if ((typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) !== 'object') return;
    var onResize = function onResize() {
      return dispatch({
        type: _interface.ActionTypes.windowResize,
        size: getWindowSize()
      });
    };
    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, []);
  return _react.default.createElement(_Context.default.Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, children);
};
ResizableProvider.defaultProps = {
  initalState: {},
  maxZIndex: 0,
  minWidth: 200,
  minHeight: 200
};
var _default = exports.default = ResizableProvider;