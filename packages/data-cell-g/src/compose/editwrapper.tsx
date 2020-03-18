import React from 'react'
import Group from '../input/Group'
export default WrapperedComponent => ({ addonAfter, addonBefore, ...props }) => {
	const factory = React.createFactory(WrapperedComponent)
	return <Group gantd >
		{addonBefore && <span className="ant-input-group-addon">{addonBefore}</span>}
		{factory(props)}
		{addonAfter && <span className="ant-input-group-addon">{addonAfter}</span>}
	</Group>
}