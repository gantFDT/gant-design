import React, { Component, useMemo, memo } from 'react';
export default memo(function GirdRenderColumnComponent(props: any) {
  const { value, rowIndex, render, data, valueFormatted, context } = props;
  console.log("GirdRenderColumnComponent",context)
  const showValue = useMemo(() => {
    return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
  }, [valueFormatted, value]);
  return <>{typeof render == 'function' ? render(showValue, data, rowIndex, props) : showValue}</>;
});
