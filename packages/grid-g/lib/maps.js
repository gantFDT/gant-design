"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllComponentsMaps = getAllComponentsMaps;
exports.getGridConfig = getGridConfig;
exports.setComponentsMaps = setComponentsMaps;
exports.setFrameworkComponentsMaps = setFrameworkComponentsMaps;
exports.setGridConfig = setGridConfig;

var _GantGridFormToolPanelRenderer = _interopRequireDefault(require("./GantGridFormToolPanelRenderer"));

var _GantGroupCellRenderer = _interopRequireDefault(require("./GantGroupCellRenderer"));

var _GantPinnedRowRenderer = _interopRequireDefault(require("./GantPinnedRowRenderer"));

var _GantTooltip = _interopRequireDefault(require("./GantTooltip"));

var _GirdRenderColumn = _interopRequireDefault(require("./GirdRenderColumn"));

var _lodash = require("lodash");

var componentsMaps = {};
var frameworkComponentsMaps = {
  gantGroupCellRenderer: _GantGroupCellRenderer.default,
  gantRenderCol: _GirdRenderColumn.default,
  gantTooltip: _GantTooltip.default,
  gantPinnedRowRenderer: _GantPinnedRowRenderer.default,
  gantGridFormToolPanelRenderer: _GantGridFormToolPanelRenderer.default
};

function setComponentsMaps(components) {
  componentsMaps = Object.assign(Object.assign({}, componentsMaps), components);
  return componentsMaps;
}

function setFrameworkComponentsMaps(components) {
  frameworkComponentsMaps = Object.assign(Object.assign({}, frameworkComponentsMaps), components);
  return frameworkComponentsMaps;
}

function getAllComponentsMaps() {
  return {
    componentsMaps: componentsMaps,
    frameworkComponentsMaps: frameworkComponentsMaps
  };
}

var globalGridConfig = {};

function setGridConfig(config) {
  (0, _lodash.merge)(globalGridConfig, config);
}

function getGridConfig() {
  return globalGridConfig;
}