"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableContext = exports.TableBodyWrapperContext = exports.RowContext = exports.DataContext = void 0;
var _react = _interopRequireDefault(require("react"));
var DataContext = exports.DataContext = _react.default.createContext({});
var RowContext = exports.RowContext = _react.default.createContext({});
var TableContext = exports.TableContext = _react.default.createContext({});
var TableBodyWrapperContext = exports.TableBodyWrapperContext = _react.default.createContext({});