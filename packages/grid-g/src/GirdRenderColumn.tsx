import React, { memo } from 'react'
import { DataActions, Size } from './interface'
export default memo(function GirdRenderColumn(props: any) {
	const { value, rowIndex, render, data: { _rowType, _rowData }, colDef: { field }, size = Size.small } = props;
	return (
		<>
			{(_rowType === DataActions.modify && _rowData[field] !== value) && < span className={`gant-grid-cell-icon gant-grid-cell-icon-edit`} ></span>}
			{(_rowType === DataActions.add) && < span className={`gant-grid-cell-icon gant-grid-cell-icon-edit`} ></span>}
			< span className={`gant-grid-cell gant-grid-cell-${size}`} > {typeof render == 'function' ? render(value, rowIndex) : value}</span >
		</>
	)
})
