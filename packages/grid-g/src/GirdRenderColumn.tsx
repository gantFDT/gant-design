import React, { memo, useEffect } from 'react'
export default memo(function GirdRenderColumn(props: any) {
	const { value, rowIndex, render, data, } = props;
	return (
		<>
			< span className={`gant-grid-cell-content`} > {typeof render == 'function' ? render(value, data, rowIndex) : value}</span >
		</>
	)
})
export function MedalCellRenderer(): any {
}

// init method gets the details of the cell to be renderer
MedalCellRenderer.prototype.init = function (params) {

	this.eGui = document.createElement('span');
	var text = '111111';
	for (var i = 0; i < params.value; i++) {
		text += '#';
	}
	this.eGui.innerHTML = <div className="111" >
		{1111}
	</div>;
};

MedalCellRenderer.prototype.getGui = function () {
	return this.eGui;
};
