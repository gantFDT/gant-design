"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _keygroup = _interopRequireDefault(require("./keygroup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    return needFouce ? /*#__PURE__*/_react.default.createElement("div", {
      ref: ref,
      tabIndex: -1
    }, WrapedComponent) : WrapedComponent;
  };
};

var _default = withKeyEvent;
exports.default = _default;