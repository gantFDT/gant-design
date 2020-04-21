function GantPromiseCellRender() {}
GantPromiseCellRender.prototype.init = function(params) {
  this.params = params;
  const synchroName = typeof this.renderSynchro === 'function' ? this.renderSynchro() : undefined;
  this.eGui = document.createElement('span');
  if (synchroName) this.eGui.innerHTML = synchroName;
  if (!synchroName && typeof this.renderPromise === 'function') this.renderPromise();
};
GantPromiseCellRender.prototype.getGui = function() {
  return this.eGui;
};

export default GantPromiseCellRender;
