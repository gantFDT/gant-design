import React, { memo, forwardRef, useImperativeHandle, useState, useCallback, useEffect } from 'react'
import { EditStatus } from '@data-cell'
import { get, isEmpty } from 'lodash'
const defalutProps = {
	autoFocus: true,
	edit: EditStatus.EDIT,
}
export default (WrapperComponent) => forwardRef(function GridEidtColumn(props: any, ref: any) {
	const { value, stopEditing, api, data, colDef: { field }, size = "small" } = props;
	const [cacheValue, setCacheValue] = useState(value);
	const onChange = useCallback((val) => {
		setCacheValue(val)
	}, [value])
	const onBlur = useCallback(() => {
		stopEditing()
	}, [stopEditing])
	useEffect(() => {
		return () => {

		}
	}, [])
	useImperativeHandle(ref, () => {
		return {
			getValue: () => {
				if (value === cacheValue) return cacheValue;
				let newRowData: any = data;
				if (data._rowType === "edit") {
					const rowData = get(data, `_rowData`, {})
					console.log("rowData", rowData, data, cacheValue)
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
					newRowData = { _rowData: { [field]: value }, _rowType: "edit", ...newRowData }
				}

				const rowNode = api.getRowNode(data.model);
				rowNode.setData(newRowData);
				return cacheValue
			}
		};
	}, [cacheValue, data, value, field, cacheValue]);
	return (
		<div className='gant-grid-column-editing'>
			<WrapperComponent value={cacheValue} {...defalutProps} onChange={onChange} size={size} onBlur={onBlur} />
		</div>
	)
})
