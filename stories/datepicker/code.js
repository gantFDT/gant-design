export default [
`
import React, { useState } from 'react'
import { DatePicker, EditStatus } from 'gantd'
const { RangePicker } = DatePicker;

const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  const factory = React.createFactory(Component)
  return factory({ value, setValue })
}

const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}

const WrapperEdit = Component => props => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  return React.createElement(Component, { edit, setEdit })
}


const C1 = WrapperValue('2019-06-05 11:01:29')(({ value, setValue }) => <DatePicker format='YYYY-MM-DD HH:mm:ss' value={value} onChange={setValue} onSave={onSave} />)

ReactDOM.render(<C1 />, mountNode)`,`
import React, { useState } from 'react'
import { DatePicker, EditStatus } from 'gantd'
const { RangePicker } = DatePicker;

const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  const factory = React.createFactory(Component)
  return factory({ value, setValue })
}

const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}

const WrapperEdit = Component => props => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  return React.createElement(Component, { edit, setEdit })
}


const C2 = WrapperValue('2019-06-05 11:01:29')(({ value, setValue }) => <DatePicker style={{ margin: "10px 0" }} value={value} onChange={setValue} onSave={onSave} />)

ReactDOM.render(<C2 />, mountNode)`,`
import React, { useState } from 'react'
import { DatePicker, EditStatus } from 'gantd'
const { RangePicker } = DatePicker;

const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  const factory = React.createFactory(Component)
  return factory({ value, setValue })
}

const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}

const WrapperEdit = Component => props => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  return React.createElement(Component, { edit, setEdit })
}


const C3 = WrapperValue('06-05-19 11:01:29')(({ value, setValue }) => <DatePicker format='MM-DD-YY' value={value} onChange={setValue} onSave={onSave} />)

ReactDOM.render(<C3 />, mountNode)`,]