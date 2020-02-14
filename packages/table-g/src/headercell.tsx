import React, { useEffect, useState, useRef, useCallback, useMemo, useContext } from 'react'
import classnames from 'classnames'
import { Icon } from 'antd'

import { setStorageWidth, toggleFixedTable } from './_utils'
import { DataContext, TableContext } from './context'

const antSelectionColumn = 'ant-table-selection-column'
const antSelectionCol = 'ant-table-selection-col'

// 获取移动相关的数据
function getMoveData(dom) {
	const { width } = dom.getBoundingClientRect()
	return [Math.ceil(width), 50]
	// const titleSpan = dom.querySelector('.ant-table-column-title')
	// const { width: minWidth } = titleSpan.getBoundingClientRect()
	// const left = titleSpan.offsetLeft
	// // 直接取个整避免与实际dom节点的误差
	// const min = Math.ceil(minWidth + 2 * left + 6) // 6px是多预留出来的，因为不同文字实际站位大小不一样，姓名和年龄在8px+28px+8px的宽度下，年龄会折行，而姓名不会
	// return [Math.ceil(width), Math.max(min, 50)]
}

// 获取同级所有自己节点并分组
function splitSibling(cols, colIndex) {
	let isLeft = true
	const forEach = [].forEach;
	const left = []
	const right = []
	forEach.call(cols, (col, index) => {
		if (col.classList.value.includes(antSelectionCol)) return
		if (isLeft) {
			left.unshift(col)
		} else {
			right.push(col)
		}
		if (colIndex === index) isLeft = false
	})
	return [left, right]
}
// 找到当前移动th的父级table
function findTableElement(th) {
	return th.parentElement.parentElement.parentElement
}
function findColElements(table) {
	return table.querySelectorAll("colgroup col")
}
function findColElement(table, index) {
	return findColElements(table)[index]
}
// 找到bodyTable, 设置scroll.y的时候生效,下同
function findBodyTableElement(table) {
	return table.parentElement.parentElement.querySelector('.ant-table-body table')
}

const orderTypeIcon = new Map(
	[
		['ASC', 'caret-up'],
		['DESC', 'caret-down'],
	]
)

export default function HeaderCell(props) {

	// 来自antd原本的属性
	const { style, className, children } = props
	// 自定义属性
	const { resizable, tableKey, cellKey, dataIndex, fixed, headerFixed, hasFixed, flex, orderType, ...resetProps } = props;
	const [handler, sethandler] = useState(null) // 移动的小块
	const isSelection = useMemo(() => className.includes(antSelectionColumn), [className])
	const useHandle = useMemo(() => resizable && !isSelection, [resizable, isSelection])
	const { cellPadding, computedColIndex, computedRowSelection } = useContext(DataContext)
	const { onResize } = useContext(TableContext)
	// 计算col的序号
	const colIndex = useMemo(() => {
		const index = computedColIndex.findIndex(col => col === dataIndex)
		if (computedRowSelection) return index + 1
		return index
	}, [dataIndex, computedRowSelection])
	const thRef = useCallback(
		(node) => {
			if (node !== null) {
				node.dataIndex = dataIndex
				node.resizable = resizable
				node.fixed = fixed
				node.colIndex = colIndex
			}
		}, []
	)

	const setWidth = useCallback(
		(ele, width) => {
			requestAnimationFrame(() => {
				if (!ele) return
				const { cssText } = ele.style
				const text = cssText ? `${cssText};width: ${width}px;min-width:${width}px` : `width: ${width}px;min-width:${width}px`
				ele.style.cssText = text
			})
		}, []
	)

	//#region
	// 固定缩放，列与table共同缩放
	const addMouseDownEvent = useCallback(
		event => {
			const { pageX: startX, target } = event
			// 方案一数据
			const th = target.parentElement
			const [width, minWidth] = getMoveData(th)
			const table = findTableElement(th)
			const col = findColElement(table, colIndex)
			const [tableWidth] = getMoveData(table)
			let bodytable = null
			let bodyCol = null
			// 在设置有scroll.y的情况下、找到主体table
			if (headerFixed) {
				bodytable = findBodyTableElement(table)
				bodyCol = findColElement(bodytable, colIndex)
			}
			const mouseMove = function (e) {
				var diffX = e.pageX - startX;
				//#region
				const resultWidth = Math.max(minWidth, width + diffX)
				// 实际移动的距离
				const disX = resultWidth - width
				const resultTableWidth = tableWidth + disX
				// 设置cell宽度
				setWidth(col, resultWidth)
				// 设置table宽度
				setWidth(table, resultTableWidth)
				if (headerFixed) {
					setWidth(bodyCol, resultWidth)
					setWidth(bodytable, resultTableWidth)
				}
				if (hasFixed) {
					// 找到容器宽度, 根据宽度大小差去设置固定列的滚动条显示和隐藏
					const { width: bodyWidth, height: bodyHeight } = table.parentElement.getBoundingClientRect()
					const scrollY = table.parentElement.offsetWidth > table.parentElement.clientWidth;
					const scrollX = resultTableWidth < bodyWidth
					toggleFixedTable(bodytable || table, scrollY, scrollX)
				}
			}
			const mouseUp = function (e) {
				setStorageWidth(th, tableKey, dataIndex);
				setStorageWidth(table, tableKey, 'table');
				document.removeEventListener('mousemove', mouseMove);
				document.removeEventListener('mouseup', mouseUp);
				onResize()
			}
			document.addEventListener('mousemove', mouseMove);
			document.addEventListener('mouseup', mouseUp);
		}, [colIndex, hasFixed, headerFixed, onResize])
	//#endregion

	//#region
	// table固定,列弹性缩放
	const addFlexMouseDownEvent = useCallback(
		event => {
			const { pageX: startX, target } = event
			const th = target.parentElement
			const [width, minWidth] = getMoveData(th)
			const table = findTableElement(th)
			const cols = findColElements(table)
			const [tableWidth] = getMoveData(table)
			let bodytable = null
			let bodytableCols = null
			let bodyLeft = null
			let bodyRight = null
			// 在设置有scroll.y的情况下、找到主体table
			if (headerFixed) {
				bodytable = findBodyTableElement(table)
				bodytableCols = findColElements(bodytable)
				const [l, r] = splitSibling(bodytableCols, colIndex)
				bodyLeft = l
				bodyRight = r
			}
			const [left, right] = splitSibling(cols, colIndex)
			const leftInit = left.map(getMoveData)
			const rightInit = right.map(getMoveData)
			const mouseMove = function (e) {
				var diffX = e.pageX - startX;
				let leftDis = diffX
				let rightDis = diffX
				if (diffX < 0) {  // 左移动
					// 计算每个列分配多少移动距离
					const distribArr = leftInit.map(([width, minWidth], index) => {
						if (leftDis === 0 || left[index].fixed) return 0 // 剩下的可移动距离为0 或者当前列是固定列，就不分配宽度
						const min = minWidth
						if (width + leftDis > min) {
							let need = leftDis
							leftDis = 0
							return need
						}
						let need = Math.min(min - width, 0)
						leftDis = leftDis - need
						return need
					})
					let reset = leftDis // 向左移动的时候超出的量
					// 操作左边的tr
					for (let i = 0, len = left.length; i < len; i++) {
						const [width] = leftInit[i]
						const need = distribArr[i]
						if (need !== 0) {
							setWidth(left[i], width + need)
							if (bodyLeft) {
								setWidth(bodyLeft[i], width + need)
							}
						}
					}
					// 将实际移动的距离分配给右边的列
					const [width] = rightInit[0]
					setWidth(right[0], width + reset - diffX)
					if (bodyRight) {
						setWidth(bodyRight[0], width + reset - diffX)
					}
				} else { // 右移动
					const distribArr = rightInit.map(([width, minWidth], index) => {
						if (rightDis === 0 || right[index].fixed) return 0
						const min = minWidth
						if (width - rightDis > min) {
							let need = rightDis
							rightDis = 0
							return need
						}
						let need = Math.max(width - min, 0)
						rightDis = rightDis - need
						return need
					})
					let reset = rightDis // 向右移动的时候超出的量
					// 操作右边的tr
					for (let i = 0, len = right.length; i < len; i++) {
						const [width] = rightInit[i]
						const need = distribArr[i]
						if (need !== 0) {
							setWidth(right[i], width - need)
							if (bodyRight) {
								setWidth(bodyRight[i], width - need)
							}
						}
					}
					const [width] = leftInit[0]
					setWidth(left[0], width + diffX - reset)
					if (bodyLeft) {
						setWidth(bodyLeft[0], width + diffX - reset)
					}
				}
			}
			const mouseUp = function (e) {
				[...left, ...right].forEach(th => setStorageWidth(th, tableKey, th.dataIndex))

				document.removeEventListener('mousemove', mouseMove);
				document.removeEventListener('mouseup', mouseUp);
			}
			document.addEventListener('mousemove', mouseMove);
			document.addEventListener('mouseup', mouseUp);
		}, [colIndex])
	//#endregion

	// const listener = useMemo(() => flex ? addFlexMouseDownEvent : addMouseDownEvent, [flex, addFlexMouseDownEvent, addMouseDownEvent])
	const listener = useMemo(() => addMouseDownEvent, [addMouseDownEvent])
	// 重新修改事件
	useEffect(() => {
		if (!handler) return
		handler.removeEventListener('mousedown', listener)
		handler.addEventListener('mousedown', listener, false)
		return () => {
			handler.removeEventListener('mousedown', listener)
		}
	}, [listener])
	const handleRef = useCallback(
		(handle) => {
			if (handle) {
				handle.removeEventListener('mousedown', listener)
				handle.addEventListener('mousedown', listener, false)
				// 解决切换固定列的时候resize失效的问题
				if (!handler) sethandler(handle)
			}
		},
		[handler, listener]
	)

	return (
		<th {...resetProps} className={classnames([{ 'react-resizable': useHandle }, className])} style={{ padding: cellPadding, ...style }} ref={thRef} >
			{children}
			{
				!isSelection && orderType && (
					<span className='gantd-table-header-sort'>
						<Icon type={orderTypeIcon.get(orderType)} theme="filled" />
					</span>
				)
			}
			{useHandle && <span className='react-resizable-handle' ref={handleRef}></span>}
		</th>
	);

}
