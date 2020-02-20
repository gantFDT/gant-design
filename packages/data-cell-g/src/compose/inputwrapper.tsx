import React from 'react'


export default WrapperedComponent => React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const factory = React.createFactory(WrapperedComponent)

  return (
    <div className='gant-input'  ref={ref}>{factory(props)}</div>
  )
})