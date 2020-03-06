import React from 'react'
// import { Group } from '../input'
import { Input } from 'antd'
export default WrapperedComponent => ({ addonAfter, addonBefore, ...props }) => {
	const factory = React.createFactory(WrapperedComponent)
	return <Input.Group  className='gant-input-group' >
		{addonBefore ? <span className="ant-input-group-addon">{addonBefore}</span> : null}
		{factory(props)}
		{addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
	</Input.Group>
}