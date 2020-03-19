export default [
`
import React, { useState } from 'react'
import { LocationSelector, EditStatus } from 'gantd'

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


const Demo1 = WrapperValue(["CHN", "510000", "510100"])(({ value, setValue }) => <LocationSelector value={value} onChange={setValue} onSave={onSave} />)

ReactDOM.render(<Demo1 />, mountNode)`,`
import React, { useState } from 'react'
import { LocationSelector, EditStatus } from 'gantd'

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


const Demo2 = WrapperEdit(({ edit, setEdit }) => {
  return (
    <>
      {
        LocationSelector.getLocationName(["CHN", "120000", "120102"]).join('、')
      }
    </>
  )
})

ReactDOM.render(<Demo2 />, mountNode)`,]