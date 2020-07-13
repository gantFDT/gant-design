import React, { Component, useMemo, memo, useEffect, useState, useRef } from 'react';
export default memo(function GirdRenderColumnComponent(props: any) {
  const { value, rowIndex, render, data, valueFormatted, context } = props;
  const timerRef = useRef(null);
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCanRender(true);
    }, 50);
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  const showValue = useMemo(() => {
    return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
  }, [valueFormatted, value]);

  const renderContent = useMemo(() => {
    if (!canRender) return null;
    return typeof render == 'function' ? render(showValue, data, rowIndex, props) : showValue;
  }, [showValue, data, rowIndex, props, canRender]);
  return <>{renderContent}</>;
});
