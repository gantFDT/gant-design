import React, { memo } from 'react';
import { Pagination, Button } from 'antd';
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

export const paginationShowTotal = (total, range, limit, pagination) => {
  if (total <= 0) return '';
  if (limit)
    return (
      <>
        {`第${range[0]} - ${range[1]}条，${total}+ `} <a onClick={() => pagination.onChange(pagination.current, pagination.pageSize, pagination.current)}>more</a>
      </>
    );
  return `第${range[0]} - ${range[1]}条，共${total}条`;
};
