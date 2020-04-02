import React, { memo } from 'react'
import { DataActions, Size } from './interface'
export default memo(function GirdRenderColumn(props: any) {
	const { value, rowIndex, render, data: { _rowType, _rowData, ...nowData }, colDef: { field }, size = Size.small, rowkey } = props;
	return (
		<>
			< span className={`gant-grid-cell-content gant-grid-cell-content-${size}`} > {typeof render == 'function' ? render(value, nowData, rowIndex) : value}</span >
		</>
	)
})
