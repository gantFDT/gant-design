import React, { useRef, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';

export default (_popupClassName?: string) => WrapperedComponent =>
  React.forwardRef<HTMLDivElement, any>(
    ({ isInner, style, wrapperClassName, onBlur, ...props }, ref) => {
      const factory = React.createFactory(WrapperedComponent);
      const [popupClassName, setPopupClassName] = useState(_popupClassName);
      const className = classnames(
        'gant-input-wrapper',
        {
          'gant-input-inner': isInner,
        },
        wrapperClassName,
      );
      const divRef = useRef<HTMLDivElement>(null);
      const handleClick = useCallback(
        (e: MouseEvent) => {
          if (divRef.current) {
            const target: any = e.target;
            if (divRef.current.contains(target)) return;
            if (!popupClassName) return onBlur&&onBlur();
            const popupDoms = document.getElementsByClassName(popupClassName);
            const len = popupDoms.length
            for (let i = 0; i < len; i++) {
              if (popupDoms[i].contains(target)) return
            }
            onBlur && onBlur();
          }
        },
        [divRef.current, onBlur, popupClassName],
      );
      useEffect(() => {
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
      }, [handleClick]);
      return (
        <div className={className} ref={divRef} style={style}>
          <div className="gant-input" ref={ref}>
            {factory({ ...props, setPopupClassName })}
          </div>
        </div>
      );
    },
  );
