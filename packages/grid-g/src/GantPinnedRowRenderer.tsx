import React, { memo, useMemo } from 'react';

export default memo(function GantPinnedRowRenderer(props: any) {
  const { style, value, render, className, ...restProps } = props;
  if (!render) return null;
  const renderContent = useMemo(() => {
    return render(value, props);
  }, [restProps, value]);
  return (
    <div style={style} className={className}>
      {renderContent}
    </div>
  );
});
