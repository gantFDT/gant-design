import React, { Component, useMemo, memo, useEffect, useState, useRef } from 'react';
export default memo(function GirdRenderColumnComponent(props: any) {
  const { value, rowIndex, render, data, valueFormatted, context } = props;
  const showValue = useMemo(() => {
    return valueFormatted && !Array.isArray(value) ? valueFormatted : value;
  }, [valueFormatted, value]);
  const renderContent = useMemo(() => {
    return typeof render == 'function' ? render(showValue, data, rowIndex, props) : showValue;
  }, [showValue, data, rowIndex, props]);
  return <>{renderContent}</>;
});
