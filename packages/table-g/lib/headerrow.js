"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var HeaderRow = function HeaderRow(props) {
  return /*#__PURE__*/_react.default.createElement("tr", Object.assign({}, props, {
    className: (0, _classnames.default)(props.className, 'gant-table-header-row')
  }));
};

var _default = HeaderRow;
exports.default = _default;