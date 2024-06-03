"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableContext = exports.TableBodyWrapperContext = exports.RowContext = exports.DataContext = void 0;
var _react = _interopRequireDefault(require("react"));
var DataContext = exports.DataContext = /*#__PURE__*/_react.default.createContext({});
var RowContext = exports.RowContext = /*#__PURE__*/_react.default.createContext({});
var TableContext = exports.TableContext = /*#__PURE__*/_react.default.createContext({});
var TableBodyWrapperContext = exports.TableBodyWrapperContext = /*#__PURE__*/_react.default.createContext({});