import React, { memo, useEffect, useMemo } from 'react'
import { DataActions, Size } from './interface'
import { Icon, EditStatus } from '@data-cell'
import { trackRenderValueChange } from './utils'
export default memo(function GirdRenderColumn(props: any) {

	const { value, rowIndex, render, data, api, colDef: { field }, size = Size.small, rowkey } = props;
	const rowId = useMemo(() => {
		if (!rowkey) return rowIndex;
		return rowkey(data)
	}, [rowIndex, rowkey, data])
	const { _rowType, rowData, ...record } = data;
	useEffect(() => {
		const newData = trackRenderValueChange(data, field, value)
		if (newData) {
			const rowNode = api.getRowNode(rowId);
			rowNode.setData(newData);
		}
	}, [rowId, value, data, field])
	return (
		<>
			<span className={`gant-grid-cell-content gant-grid-cell-content-${size}`} > {typeof render == 'function' ? render(value, record, rowIndex) : value}</span >
		</>
	)
})
