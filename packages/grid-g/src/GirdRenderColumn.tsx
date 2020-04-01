import React, { memo } from 'react'
import { DataActions, Size } from './interface'
export default memo(function GirdRenderColumn(props: any) {
	const { value, rowIndex, render, data: { _rowType, _rowData }, colDef: { field }, size = Size.small } = props;
	return (
		<>
			< span className={`gant-grid-cell-content gant-grid-cell-content-${size}`} > {typeof render == 'function' ? render(value, rowIndex) : value}</span >
		</>
	)
})
