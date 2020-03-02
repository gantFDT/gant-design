import React from 'react'
import classnames from 'classnames';


export default WrapperedComponent => React.forwardRef<HTMLDivElement, any>(({ isInner, style, wrapperClassName, ...props }, ref) => {
  const factory = React.createFactory(WrapperedComponent)
  const className = classnames(
    'gant-input-wrapper',
    {
      "gant-input-inner": isInner
    },
    wrapperClassName
  )
  return (
    <div className={className} style={style}>
      <div className="gant-input" ref={ref}>{factory(props)}</div>
    </div>
  )
})