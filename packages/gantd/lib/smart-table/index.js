"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TableConfig", {
  enumerable: true,
  get: function get() {
    return _UIContent.default;
  }
});
exports.default = void 0;

var _formatschema = require("./formatschema");

var _SmartTable = _interopRequireDefault(require("./SmartTable"));

var _UIContent = _interopRequireDefault(require("./config/UIContent"));

_SmartTable.default.setFields = _formatschema.setFields;
var _default = _SmartTable.default;
exports.default = _default;