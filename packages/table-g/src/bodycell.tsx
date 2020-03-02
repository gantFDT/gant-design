import React, { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import classnames from 'classnames'
import _ from 'lodash'
import { EditStatus, SwitchStatus } from '@data-cell'
import { DataContext, RowContext, TableContext } from './context'

import { EditConfig, Record } from './index'

const invalidateValue = ['', null, undefined]

const getPrefixCls = (cls) => 'gant-' + cls;

interface BodyCellProps<T> {
	record: T,
	dataIndex: string,
	rowIndex: number,
	editConfig: EditConfig<T>,
	sortable: boolean,
	wrap: boolean,
	light: boolean,
	className: string,
	style: React.CSSProperties,
	[k: string]: any
}

const BodyCell = <T extends Record = {}>({ record = {} as T, dataIndex = '', rowIndex, editConfig = {} as EditConfig<T>, sortable, wrap, light, children, className, style, ...props }: BodyCellProps<T>) => {
	const [value, setValue] = useState<string>()
	const [activeCell, setActiveCell] = useState(null)
	const [cacheInitialValue, setCacheInitialValue] = useState<string>()
	const [element, setElement] = useState<React.ReactElement>()
	const [edit, setedit] = useState(EditStatus.CANCEL)
	const { dataSource, setDataSource, isTree, cellPadding, computedRowKey, editable, originRowHeight, originLineHeight } = useContext(DataContext)
	const { dataRowKey } = useContext(RowContext)
	const { virtualScroll } = useContext(TableContext)
	const showDirt = useMemo(() => _.get(editConfig, 'showDirt', true), [editConfig])
	const isSelection = useMemo(() => className.includes('ant-table-selection-column'), [className])
	const { editValue, render: editRender } = editConfig

	const getEditValue = useCallback(
		() => {
			let value: string = _.get(record, dataIndex)
			if (editValue) {
				if (typeof editValue === 'function') {
					value = editValue(record, rowIndex, dataIndex)
				}
				else {
					value = editValue
				}
			}
			return value;
		},
		[record, dataIndex, editValue],
	)
	const updateElement = useCallback(
		() => {
			const value = getEditValue()
			setValue(value)
			if (editRender) {
				const element = editRender(value, record, rowIndex)
				setElement(element)
			}
		},
		[record, rowIndex, editRender],
	)
	const close = useCallback(() => setedit(EditStatus.CANCEL), [])

	// 设置编辑值的初始值
	useEffect(() => {
		const value = getEditValue()
		setCacheInitialValue(value)
		setValue(value)
	}, [])

	// 编辑状态改变
	useEffect(() => {
		if (editable === EditStatus.SAVE) { // 清除脏标记
			setCacheInitialValue(value)
		} else if (editable === EditStatus.CANCEL && !_.isEqual(cacheInitialValue, value)) { // 回退值
			setValue(cacheInitialValue)
			// 曾经编辑过
			// onCancel作为回退值的特定方法，没有的话会调用onChange
			if (element) {
				if (element.props.onCancel) {
					element.props.onCancel(cacheInitialValue)
				} else if (element.props.onChange) {
					element.props.onChange(cacheInitialValue, close, setDataSource)
				}
			}
		}
	}, [editable, value, cacheInitialValue, element])
	// fix bug 可拖拽排序的课编辑表格，在进入编辑状态的时候会重新排列，因此rowIndex可能会不一样
	// useEffect(() => updateElement(), [rowIndex])

	const onTD = useCallback(
		td => {
			if (td) {
				// 用于拖拽时候的比对
				td.dataIndex = dataIndex
				td.rowIndex = rowIndex
				setActiveCell(td)
			}
		},
		[dataIndex, rowIndex],
	)

	// 切换显示状态
	const switchEdit = useCallback(
		() => {
			if (editable !== EditStatus.EDIT || !editRender) return false
			setedit(SwitchStatus(edit))
			return true
		},
		[edit, editable, editRender],
	)

	const onClick = useCallback(
		(e) => {
			let switchSuccess = false
			if (!record.isDeleted && edit !== EditStatus.EDIT) {
				switchSuccess = switchEdit()// 切换编辑状态成功
				if (switchSuccess) updateElement()
			}
			if (props.onClick) {
				props.onClick(e, switchSuccess ? setDataSource : undefined);
			}

		},
		[edit, switchEdit, updateElement, props.onClick, record.isDeleted],
	)

	const onBlur = useCallback(
		() => {
			if (element.props.onBlur) {
				// 添加dataSource，保证在不需要切换状态的表格上面可以得到数据，来自行计算
				element.props.onBlur(value, dataSource, setDataSource)
			}
			if (!isTree) {
				setDataSource(([...list]) => {
					list[rowIndex][dataIndex] = value
					return list
				})
			} else {
				setDataSource(([...list]) => {
					console.time('更新树耗时')
					const [tree] = getCurrentRecord(list, value)
					console.timeEnd('更新树耗时')
					return tree
				})
			}
			switchEdit()
		},
		[value, element, switchEdit, isTree, dataSource],
	)

	// 更新树状数据
	const getCurrentRecord = useCallback(
		([...list], value) => {
			let seted = false
			let index = 0
			const item = list[rowIndex]
			// 比如：更新树状table的时候，第一层数据只有2条数据，而更新的数据是下面某一层中的第3条数据
			// 这个时候rowIndex为2，在第一层数据中取不到值，会出现iten不存在的情况
			if (item && _.isEqual(computedRowKey(item), dataRowKey)) {
				list[rowIndex][dataIndex] = value
				seted = true
			}
			while (!seted && index < list.length) {
				if (_.get(list[index], 'children.length')) {
					const [children, finded] = getCurrentRecord(list[index].children, value)
					seted = finded
					if (finded) {
						list[index].children = children
					}
				}
				index++
			}
			return [list, seted]
		},
		[record, dataIndex, rowIndex, dataRowKey],
	)

	const onChange = useCallback(
		(value, ...args) => {
			setValue(value)
			if (element.props.onChange) {
				element.props.onChange(value, close, setDataSource, ...args)
			}
		},
		[element, dataIndex, rowIndex],
	)

	const renderChildren = useCallback(
		() => {
			// 在排序表格中，不渲染默认的第一行假数据
			if (sortable && record.placeholder) return
			if (edit !== EditStatus.EDIT) return children
			if (element) {
				const { clientWidth, clientHeight } = activeCell
				const elementProps = {
					value,
					allowEdit: false,
					edit: EditStatus.EDIT,
					autoFocus: true,
					...element.props,
					className: classnames(element.props.className, 'table-cell-editing'),
					style: {
						width: clientWidth,
						height: clientHeight,
						maxWidth: clientWidth,
						maxHeight: clientHeight,
						minWidth: clientWidth,
						minHeight: clientHeight,
						margin: (cellPadding as number) * -1,
						...element.props.style,
					},
					onChange,
					onBlur,

				}
				return React.cloneElement(element, elementProps)

			}
		},
		[edit, value, element, children, sortable, record, activeCell, cellPadding],
	)

	const valueChanged = useMemo(
		() => {
			if (invalidateValue.includes(value) && invalidateValue.includes(cacheInitialValue)) return false
			return !_.isEqual(value, cacheInitialValue)
		},
		[value, cacheInitialValue],
	)

	const renderTd = useCallback(
		() => {
			const computedClassName = classnames(
				className,
				wrap ? [getPrefixCls('table-editcell-wrap')] : [isSelection ? '' : getPrefixCls('table-editcell-ellipsis')],
				element ?
					{
						[getPrefixCls('table-editcell-dirt')]: showDirt && valueChanged,
					} : null,
			)
			if (virtualScroll) {
				const dStyle = { ...style, padding: cellPadding, height: originRowHeight }
				if (originLineHeight) {
					dStyle.lineHeight = originLineHeight
				}
				return (
					<td {...props} style={{ padding: 0 }} className={computedClassName} onClick={onClick} ref={onTD}>
						<div style={dStyle} className={isSelection ? '' : getPrefixCls('table-editcell-ellipsis')} >
							{renderChildren()}
						</div>
					</td>
				)
			}

			return (
				<td {...props} style={{ padding: cellPadding, ...style }} className={computedClassName} onClick={onClick} ref={onTD}>
					{renderChildren()}
				</td>
			)
		},
		[className, cellPadding, style, wrap, showDirt, valueChanged, element, onClick, onTD, renderChildren, isSelection, originRowHeight, virtualScroll, originLineHeight],
	)

	return renderTd()
}

export default BodyCell
