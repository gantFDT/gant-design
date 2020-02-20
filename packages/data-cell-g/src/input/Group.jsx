import React from 'react'
import { Input } from 'antd'
import classnames from 'classnames'
import { ConfigConsumer } from '../config-provider'

export default ({ children, gant, className, ...props }) => (
  <ConfigConsumer>
    {
      ({ getPrefixCls }) => <Input.Group {...props} className={classnames(className, { [getPrefixCls('input-group')]: gant })}>{children}</Input.Group>
    }
  </ConfigConsumer>
)