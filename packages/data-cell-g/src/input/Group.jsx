import React from 'react'
import { Input } from 'antd'
import classnames from 'classnames'

export default ({ gant = false, ...props }) => {
  return (
    <Input.Group {...props} className={classnames(props.className, { ['gant-input-group']: gant })} />
  )
}