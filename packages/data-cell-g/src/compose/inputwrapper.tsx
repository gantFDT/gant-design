import React, { useRef, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';

export default (_popupClassName?: string) => WrapperedComponent =>
  React.forwardRef<HTMLDivElement, any>(
    ({ isInner, wrapperStyle, wrapperClassName, onBlur, onFocus, disabledBlur: _disabledBlur, ...props }, ref) => {
      const factory = React.createFactory(WrapperedComponent);
      const [popupClassName, setPopupClassName] = useState(_popupClassName);
      const [disabledBlur, setDisabledBlur] = useState(_disabledBlur);
      useEffect(() => {
        setDisabledBlur(_disabledBlur)
      }, [_disabledBlur])
      const [isFoucs, setFoucs] = useState(props.autoFocus);
      useEffect(() => {
        setFoucs(props.autoFocus);
      }, [props.autoFocus])
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
          if (divRef.current && isFoucs && !disabledBlur) {

            const target: any = e.target;
            if (divRef.current.contains(target)) return;
            if (!popupClassName) {
              setFoucs(false)
              return onBlur && onBlur();
            }

            const popupDoms = document.getElementsByClassName(popupClassName);
            const len = popupDoms.length
            for (let i = 0; i < len; i++) {
              if (popupDoms[i].contains(target)) return
            }
            setFoucs(false)
            onBlur && onBlur();
          }
        },
        [divRef.current, onBlur, popupClassName, isFoucs, disabledBlur],
      );
      useEffect(() => {
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
      }, [handleClick]);
      const handleFoucs = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isFoucs) return;
        setFoucs(true);
        onFocus && onFocus();
      }, [onFocus, isFoucs])
      return (
        <div className={className} ref={divRef} onClick={handleFoucs} style={wrapperStyle}>
          <div className="gant-input" ref={ref} >
            {factory({ ...props, setPopupClassName, setDisabledBlur })}
          </div>
        </div>
      );
    },
  );
