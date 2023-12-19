"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

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

var _default = function _default(_a) {
  var _classnames;

  var _a$gant = _a.gant,
      gant = _a$gant === void 0 ? true : _a$gant,
      edit = _a.edit,
      props = __rest(_a, ["gant", "edit"]);

  return /*#__PURE__*/_react.default.createElement(_input.default.Group, Object.assign({}, props, {
    className: (0, _classnames2.default)(props.className, props.size == "small" && 'gant-input-group-sm', (_classnames = {}, (0, _defineProperty2.default)(_classnames, 'gant-input-group', gant), (0, _defineProperty2.default)(_classnames, 'gant-input-group-edit', edit), _classnames))
  }));
};

exports.default = _default;