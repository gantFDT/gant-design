import React, { memo, useMemo, useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Dropdown, Menu, Button } from 'antd'
interface ExtraContentProps {
	width?: number,
	height?: number,
	tools: any[],
	prefixCls: string
}
export default memo(function ExtraContent({ width = 0, height = 0, tools, prefixCls }: ExtraContentProps) {
	const [startIndex, setStartIndex] = useState(-1);
	const [toolsHeight, setToolsHeight] = useState(height);
	const renderFixed = useMemo(() => {
		return React.Children.map(tools, (item, index) => {
			return React.cloneElement(item, { key: index })
		})
	}, [tools])
	const getDrapContent = useMemo(() => {
		if (startIndex === -1) return null;
		const renderDrapChildren = []
		React.Children.map(tools, (item, index) => {
			if (index > startIndex || startIndex === 0) renderDrapChildren.push(<div key={index} style={{ margin: '5px' }}>{item}</div>)
		})
		return renderDrapChildren
	}, [tools, startIndex])
	const renderExtra = useMemo(() => {
		if (startIndex === 0) return null
		if (startIndex === -1) return React.Children.map(tools, (item, index) => {
			return React.cloneElement(item, { key: index })
		})
		const renderChildren = []
		React.Children.map(tools, (item, index) => {
			if (index <= startIndex) {
				renderChildren.push(React.cloneElement(item, { key: index }))
			}
		})
		return renderChildren
	}, [tools, startIndex]);
	const toolsRef = useRef<HTMLDivElement>(null)
	const ref = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		if (toolsRef.current && (width)) {
			const toolsRefHeight = toolsRef.current.offsetHeight + 1;
			setToolsHeight(toolsRefHeight)
			if (width - toolsRefHeight - 20 >= toolsRef.current.clientWidth) return setStartIndex(-1);
			let toolWidth = 0;
			const childrenItems = toolsRef.current.children;
			for (let i = 0; i < childrenItems.length; i++) {
				const childItem = childrenItems.item(i);
				const { width: styleWidth, marginLeft, marginRight } = getComputedStyle(childItem);
				const itemWidth = parseInt(styleWidth) + parseInt(marginLeft) + parseInt(marginRight);
				toolWidth += itemWidth;
				if (toolWidth + toolsRefHeight + 20 > width) {
					if (i === 0) return setStartIndex(0)
					return setStartIndex(i - 1)
				}
			}

			return setStartIndex(-1)
		}
	}, [toolsRef.current, width, ref.current])

	return (
		<div className={`${prefixCls}-extra`} style={{ width }} >
			<div className={`${prefixCls}-extra-tools`} style={{ height: toolsHeight }} ref={ref} >
				{renderExtra}
				{
					startIndex > -1 && <Dropdown
						trigger={['click']}
						overlay={<Menu style={{ padding: '5px 0' }} >{getDrapContent}</Menu>}
						placement="bottomRight"
						overlayStyle={{ zIndex: 2 }}
						overlayClassName={prefixCls + '-dropdown'}
					>
						<Button icon="ellipsis" className={`${prefixCls}-icon`}
							style={{ height: toolsHeight, width: toolsHeight }}
						/>
					</Dropdown>
				}
			</div>
			<div ref={toolsRef} className={`${prefixCls}-extra-fixed`} >
				{renderFixed}
			</div>
		</div>
	)
})
