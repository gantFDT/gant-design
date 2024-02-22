"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function GantPromiseCellRender() {}
GantPromiseCellRender.prototype.init = function (params) {
  this.params = params;
  var synchroName = typeof this.renderSynchro === 'function' ? this.renderSynchro() : undefined;
  this.eGui = document.createElement('span');
  if (synchroName) this.eGui.innerHTML = synchroName;
  if (!synchroName && typeof this.renderPromise === 'function') this.renderPromise();
};
GantPromiseCellRender.prototype.getGui = function () {
  return this.eGui;
};
var _default = exports.default = GantPromiseCellRender;