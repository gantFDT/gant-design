import React from 'react'
// import classnames from 'classnames'

// export default WrapperedComponent => React.forwardRef<HTMLDivElement, any>((props, ref) => {
//   const factory = React.createFactory(WrapperedComponent)
//   const {style,className,...restProps} = props
//   return (
//     <div className={classnames('gant-input',className)} style={{...style}} ref={ref}>{factory(restProps)}</div>
//   )
// })

import classnames from 'classnames'

export default WrapperedComponent => React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const factory = React.createFactory(WrapperedComponent)
  return (
    <div className={classnames('gant-input')} ref={ref}>{factory(props)}</div>
  )
})