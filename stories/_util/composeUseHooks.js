import React, { useState } from 'react'
import { EditStatus } from '@'

export const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  return React.createElement(Component, { value, setValue })
}

export const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}

export const WrapperEdit = Component => props => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  return React.createElement(Component, { edit, setEdit })
}


