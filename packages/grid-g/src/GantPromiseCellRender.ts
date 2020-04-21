function GantPromiseCellRender() {
	
 }
GantPromiseCellRender.prototype.init = function (params) {
		this.eGui= document.createElement('span');
		this.params=params;
		this.renderPromise&&this.renderPromise()
};
GantPromiseCellRender.prototype.getGui = function () {
		return this.eGui;
};

export default GantPromiseCellRender