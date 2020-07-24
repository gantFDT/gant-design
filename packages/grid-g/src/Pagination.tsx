import React, { memo } from 'react';
import { Pagination } from 'antd';
export default memo(function GantPagination(props: any) {
  const { pagination } = props;
  if (!pagination) return null;
  const { addonAfter, addonBefore, ...resetProps } = pagination;
  /* 分页高度为30 */
  return (
    <div className="gantd-grid-footer">
      {addonBefore && <div>{addonBefore}</div>}
      <Pagination className="gant-grid-pagination" {...resetProps} />
      {addonAfter && <div>{addonAfter}</div>}
    </div>
  );
});
