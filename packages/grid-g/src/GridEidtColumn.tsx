import React, { forwardRef, useImperativeHandle, useState, useCallback, useMemo } from 'react'
import { EditStatus } from '@data-cell'
import { get, isEmpty } from 'lodash'
import { DataActions, Size } from './interface'
const defalutProps = {
	autoFocus: true,
	edit: EditStatus.EDIT,
}
export default (WrapperComponent) => forwardRef(function GridEidtColumn(props: any, ref: any) {
	const { value, stopEditing, api, data, colDef: { field }, size = Size.small, props: fieldProps, changeFormatter, rowKey, rowIndex } = props;
	const [cacheValue, setCacheValue] = useState(value);
	const onChange = useCallback((val) => {
		let chageVal = val
		if (typeof changeFormatter === 'function') chageVal = changeFormatter(val)
		setCacheValue(chageVal)
	}, [changeFormatter])
	const onBlur = useCallback(() => {
		stopEditing()
	}, [stopEditing])
	const rowId = useMemo(() => {
		if (!rowKey) return rowIndex;
		return rowKey(data)
	}, [rowIndex, rowKey, data])
	useImperativeHandle(ref, () => {
		return {
			getValue: () => {
				if (value === cacheValue) return cacheValue;
				let newRowData: any = data;
				if (data._rowType === DataActions.modify) {
					const rowData = get(data, `_rowData`, {})
					if (cacheValue === rowData[field]) {
						delete rowData[field];
					} else if (!rowData[field] && rowData[field] !== value) {
						rowData[field] = value
					}

					if (isEmpty(rowData)) {
						const { _rowType, _rowData, ...newData } = data;
						newRowData = newData;
					} else {
						newRowData = { ...data, _rowData: rowData }
					}
				} else if (!data._rowType) {
					newRowData = { _rowData: { [field]: value }, _rowType: DataActions.modify, ...newRowData }
				}
				const rowNode = api.getRowNode(rowId);
				rowNode.setData(newRowData);
				return cacheValue
			}
		};
	}, [cacheValue, data, value, field, cacheValue,rowId]);
	return (
		<div className='gant-grid-column-editing'>
			<WrapperComponent  {...fieldProps} value={cacheValue} {...defalutProps} onChange={onChange} size={size} onBlur={onBlur} />
		</div>
	)
})
