"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var _default = function _default(_popupClassName) {
  return function (WrapperedComponent) {
    return /*#__PURE__*/_react.default.forwardRef(function (_a, ref) {
      var isInner = _a.isInner,
          wrapperStyle = _a.wrapperStyle,
          wrapperClassName = _a.wrapperClassName,
          onBlur = _a.onBlur,
          onFocus = _a.onFocus,
          _disabledBlur = _a.disabledBlur,
          props = __rest(_a, ["isInner", "wrapperStyle", "wrapperClassName", "onBlur", "onFocus", "disabledBlur"]);

      var factory = /*#__PURE__*/_react.default.createFactory(WrapperedComponent);

      var _useState = (0, _react.useState)(_popupClassName),
          _useState2 = (0, _slicedToArray2.default)(_useState, 2),
          popupClassName = _useState2[0],
          setPopupClassName = _useState2[1];

      var _useState3 = (0, _react.useState)(_disabledBlur),
          _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
          disabledBlur = _useState4[0],
          setDisabledBlur = _useState4[1];

      (0, _react.useEffect)(function () {
        setDisabledBlur(_disabledBlur);
      }, [_disabledBlur]);

      var _useState5 = (0, _react.useState)(props.autoFocus),
          _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
          isFoucs = _useState6[0],
          setFoucs = _useState6[1];

      (0, _react.useEffect)(function () {
        setFoucs(props.autoFocus);
        if (props.autoFocus) onFocus && onFocus();
      }, [props.autoFocus]);
      var className = (0, _classnames.default)('gant-input-wrapper', {
        'gant-input-inner': isInner
      }, wrapperClassName);
      var divRef = (0, _react.useRef)(null);
      var handleClick = (0, _react.useCallback)(function (e) {
        if (divRef.current && isFoucs && !disabledBlur) {
          var target = e.target;
          if (divRef.current.contains(target)) return;

          if (!popupClassName) {
            setFoucs(false);
            return onBlur && onBlur();
          }

          var popupDoms = document.getElementsByClassName(popupClassName);
          var len = popupDoms.length;

          for (var i = 0; i < len; i++) {
            if (popupDoms[i].contains(target)) return;
          }

          setFoucs(false);
          onBlur && onBlur();
        }
      }, [onBlur, popupClassName, isFoucs, disabledBlur]);
      (0, _react.useEffect)(function () {
        popupClassName && window.addEventListener('mousedown', handleClick);
        return function () {
          return popupClassName && window.removeEventListener('mousedown', handleClick);
        };
      }, [handleClick, popupClassName]);
      var handleFoucs = (0, _react.useCallback)(function (e) {
        if (isFoucs) return;
        setFoucs(true);
        onFocus && onFocus();
      }, [onFocus, isFoucs]);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className,
        ref: divRef,
        onClick: handleFoucs,
        style: wrapperStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "gant-input",
        ref: ref
      }, factory(popupClassName ? Object.assign(Object.assign({}, props), {
        setPopupClassName: setPopupClassName,
        setDisabledBlur: setDisabledBlur
      }) : Object.assign(Object.assign({}, props), {
        setPopupClassName: setPopupClassName,
        setDisabledBlur: setDisabledBlur,
        onBlur: onBlur,
        onFocus: onFocus
      }))));
    });
  };
};

exports.default = _default;