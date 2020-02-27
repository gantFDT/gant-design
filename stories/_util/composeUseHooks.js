import React, { useState } from 'react'
import { EditStatus } from '@data-cell'

export const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue)
  const factory = React.createFactory(Component)
  return factory({ value, setValue })
}

export const onSave = (id, value, cb) => {
  console.log(id, value);
  cb()
}

export const WrapperEdit = Component => props => {
  const [edit, setEdit] = useState(EditStatus.CANCEL)
  return React.createElement(Component, { edit, setEdit })
}


