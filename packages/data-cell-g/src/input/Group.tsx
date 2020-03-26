import React, { useMemo } from 'react'
import { Input } from 'antd'
import classnames from 'classnames'
export default ({ gant = true, edit, ...props }: any) => {
  return (
    <Input.Group {...props} className={classnames(props.className,
      props.size == "small" && 'gant-input-group-sm',
      { ['gant-input-group']: gant, ['gant-input-group-edit']: edit })} />
  )
}