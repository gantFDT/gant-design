import React from 'react'
import classnames from 'classnames';


export default WrapperedComponent => React.forwardRef<HTMLDivElement, any>(({ isInner, ...props }, ref) => {
  const factory = React.createFactory(WrapperedComponent)
  const className = classnames(
    'gant-input',
    {
      "gant-input-inner": isInner
    }
  )
  return (
    <div className={className} ref={ref}>{factory(props)}</div>
  )
})