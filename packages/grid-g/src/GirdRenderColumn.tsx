import React, { memo } from 'react'
export default memo(function GirdRenderColumn(props: any) {
	const { value, rowIndex, render, data, } = props;
	return (
		<>
			< span className={`gant-grid-cell-content`} > {typeof render == 'function' ? render(value, data, rowIndex) : value}</span >
		</>
	)
})
