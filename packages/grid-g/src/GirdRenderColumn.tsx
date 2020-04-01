import React, { memo } from 'react'
export default memo(function GirdRenderColumn(props: any) {
	const { value, rowIndex, render, data: { _rowType, _rowData }, colDef: { field }, size = "small" } = props;
	return (
		<>
			{(_rowType === "edit" && _rowData[field] !== value) && < span className={`gant-grid-cell-icon gant-grid-cell-icon-edit`} ></span>}
			{(_rowType === "add" && rowIndex === 0) && < span className={`gant-grid-cell-icon gant-grid-cell-icon-edit`} ></span>}
			< span className={`gant-grid-cell gant-grid-cell-${size}`} > {typeof render == 'function' ? render(value, rowIndex) : value}</span >
		</>
	)
})
