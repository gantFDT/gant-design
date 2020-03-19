import React, { memo, useMemo, useLayoutEffect, useRef, useState } from 'react'
interface ExtraContentProps {
	width?: number,
	height?: number,
	tools: any[],
	prefixCls: string
}
export default memo(function ExtraContent({ width = 0, height = 0, tools, prefixCls }: ExtraContentProps) {
	const [startIndex, setStartIndex] = useState(-1);
	const renderExtra = useMemo(() => {
		return React.Children.map(tools, (item) => {
			return React.cloneElement(item)
		})
	}, [tools]);

	const toolsRef = useRef<HTMLDivElement>(null)
	useLayoutEffect(() => {
		if (toolsRef.current) {
			const childrenItems = toolsRef.current.children;
			for (let i = 0; i < childrenItems.length; i++) {
				console.log(childrenItems.item(i).clientWidth)
			}
		}
	}, [toolsRef.current, width])
	return (
		<div className={`${prefixCls}-extra`}  >
			<div className={`${prefixCls}-extra-tools`} ref={toolsRef} >
				{renderExtra}
			</div>
		</div>
	)
})
