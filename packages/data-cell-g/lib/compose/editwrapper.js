"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Group = _interopRequireDefault(require("../input/Group"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var _default = exports.default = function _default(WrapperedComponent) {
  return function (_a) {
    var editAfter = _a.editAfter,
      props = __rest(_a, ["editAfter"]);
    var factory = _react.default.createFactory(WrapperedComponent);
    return _react.default.createElement(_Group.default, {
      gantd: true,
      size: props.size,
      edit: editAfter
    }, _react.default.createElement("span", {
      className: "gant-input-group-inner"
    }, factory(props)), editAfter && _react.default.createElement("span", {
      className: "gant-input-group-addon ant-input-group-addon"
    }, editAfter));
  };
};