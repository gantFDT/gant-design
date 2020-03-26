import React from 'react'
import Group from '../input/Group'
export default WrapperedComponent => ({ editAfter, ...props }) => {
	const factory = React.createFactory(WrapperedComponent)
	return <Group gantd size={props.size} edit={editAfter} >
		<span className="gant-input-group-inner" >{factory(props)}</span>
		{editAfter && <span className="gant-input-group-addon ant-input-group-addon">{editAfter}</span>}
	</Group>
}