import React from 'react'
import { Input } from 'antd'
import classnames from 'classnames'

export default ({ children, gant, className, ...props }) => (
  <Input.Group {...props} className={classnames(className, { ['gant-input-group']: gant })}>{children}</Input.Group>
)