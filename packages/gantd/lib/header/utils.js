"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalConfig = getGlobalConfig;
exports.setGlobalConfig = setGlobalConfig;
var _lodash = require("lodash");
var globalConfig = {};
function setGlobalConfig(config) {
  (0, _lodash.merge)(globalConfig, config);
}
function getGlobalConfig() {
  return globalConfig;
}