"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _editStatus = _interopRequireDefault(require("../edit-status"));
var SwitchStatus = function SwitchStatus(status) {
  if (status === _editStatus.default.EDIT) return _editStatus.default.CANCEL;
  if (status === _editStatus.default.CANCEL || status === _editStatus.default.SAVE) return _editStatus.default.EDIT;
};
var _default = exports.default = SwitchStatus;