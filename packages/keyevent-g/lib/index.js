"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _keygroup = _interopRequireDefault(require("./keygroup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var KEY_EVENT = 'keydown';
var keyReg = /^on(Alt|Ctrl|Meta|Shift){0,4}([A-Z][a-z]*)+$/;
var withKeyEvent = function withKeyEvent(bindKeys, needFouce) {
  var ref = (0, _react.useRef)(null);
  var validPropName = (0, _react.useCallback)(function (e, keyName) {
    // 验证属性名
    if (keyReg.test(keyName) && _keygroup.default.checkKeyGroup(e, keyName)) {
      return true;
    }
    return false;
  }, []);
  return function (WrapedComponent) {
    if (!bindKeys) return WrapedComponent;
    (0, _react.useLayoutEffect)(function () {
      var dom = ref.current || window;
      var callback = function callback(ev) {
        Object.keys(bindKeys).filter(function (keyName) {
          return validPropName(ev, keyName);
        }).forEach(function (key) {
          bindKeys[key](ev);
        });
      };
      if (dom) dom.addEventListener(KEY_EVENT, callback);
      return function () {
        if (dom) dom.removeEventListener(KEY_EVENT, callback);
      };
    }, [ref, bindKeys]);
    return needFouce ? _react.default.createElement("div", {
      ref: ref,
      tabIndex: -1
    }, WrapedComponent) : WrapedComponent;
  };
};
var _default = exports.default = withKeyEvent;