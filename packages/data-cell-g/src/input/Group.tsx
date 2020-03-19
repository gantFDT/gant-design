import React, { useMemo } from 'react'
import { Input } from 'antd'
import classnames from 'classnames'
export default ({ gant = true, ...props }: any) => {
  const len = useMemo(() => {
    let eleLen = 0
    React.Children.map(props.children, item => {
      if (item) eleLen += 1;
    })
    return eleLen
  }, [props.children])
  return (
    <Input.Group {...props} className={classnames(props.className,
      { ['gant-input-group']: gant, ['gant-input-group-child']: len === 1, ['gant-input-group-children']: len > 1 })} />
  )
}