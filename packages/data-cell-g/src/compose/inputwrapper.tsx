import React, { useRef, useCallback, useEffect } from 'react'
import classnames from 'classnames';


export default WrapperedComponent => React.forwardRef<HTMLDivElement, any>(({ isInner, style, onBlur, ...props }, ref) => {
  const factory = React.createFactory(WrapperedComponent)
  const className = classnames(
    'gant-input-wrapper',
    {
      "gant-input-inner": isInner
    }
  )
  const divRef = useRef<HTMLDivElement>(null)
  const getPopupContainer = useCallback(() => {
    return divRef.current
  }, [divRef.current])
  const handleClick = useCallback((e: MouseEvent) => {
    if (divRef.current) {
      const target: any = e.target;
      if (!divRef.current.contains(target)) onBlur && onBlur()

    }
  }, [divRef.current, onBlur])
  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick)
  }, [handleClick])
  return (
    <div className={className}
      ref={divRef} style={style}>
      <div className="gant-input" ref={ref}>{factory({ ...props, getPopupContainer })}</div>
    </div>
  )
})