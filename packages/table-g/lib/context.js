"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableContext = exports.TableBodyWrapperContext = exports.RowContext = exports.DataContext = void 0;

var _react = _interopRequireDefault(require("react"));

var DataContext = /*#__PURE__*/_react.default.createContext({});

exports.DataContext = DataContext;

var RowContext = /*#__PURE__*/_react.default.createContext({});

exports.RowContext = RowContext;

var TableContext = /*#__PURE__*/_react.default.createContext({});

exports.TableContext = TableContext;

var TableBodyWrapperContext = /*#__PURE__*/_react.default.createContext({});

exports.TableBodyWrapperContext = TableBodyWrapperContext;