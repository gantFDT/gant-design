"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "setGlobalConfig", {
  enumerable: true,
  get: function get() {
    return _utils.setGlobalConfig;
  }
});

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var Button = function Button(buttonProps) {
  var globalConfig = (0, _utils.getGlobalConfig)();
  var props = Object.assign(Object.assign({}, globalConfig), buttonProps);
  return /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({}, props));
};

Button.Group = _button.default.Group;
var _default = Button;
exports.default = _default;