import React, { memo, useEffect } from 'react'

export default memo(function ResizeDetector(props: any) {
	const { width, setAllWidth } = props;
	useEffect(() => {
		setAllWidth(width);
	}, [width, setAllWidth])
	return <div style={{ width: "100%", height: 1, position: "absolute" }} >

	</div>
})
