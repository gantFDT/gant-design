import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { Pagination, Button, Tooltip, Switch } from 'antd';
import { GantPaginationProps } from './interface';
import { isNumber } from 'lodash';
import Receiver from './locale/Receiver';
interface Page {
  current: number;
  pageSize: number;
  beginIndex: number;
}
export default memo(function GantPagination(props: GantPaginationProps) {
  const {
    addonAfter,
    addonBefore,
    onRefresh,
    countLimit,
    mode = 'default',
    tooltipTotal,
    total,
    onChange,
    current: propCurrent,
    pageSize: PropPageSize,
    beginIndex,
    defaultPageSize,
    defaultCurrent,
    ...resetProps
  } = props;
  const [innerMode, setInnerMode] = useState<'limit' | 'default'>('limit');
  const [pageInfo, setPageInfo] = useState<Page>({
    current: defaultCurrent,
    pageSize: defaultPageSize,
    beginIndex: 0,
  });
  const disableLimit = useMemo(() => {
    return total != countLimit;
  }, [total, countLimit]);
  useEffect(() => {
    const pageSize = PropPageSize ? PropPageSize : defaultPageSize;
    let current = propCurrent ? propCurrent : defaultCurrent;
    if (isNumber(beginIndex)) current = Math.floor(beginIndex / pageSize) + 1;
    const _beginIndex = (current - 1) * pageSize;
    setPageInfo({ pageSize, current, beginIndex: _beginIndex });
    return () => {};
  }, [propCurrent, PropPageSize, beginIndex]);
  const limit = useMemo(() => {
    return mode === 'limit' && innerMode === 'limit' && !disableLimit;
  }, [mode, innerMode, disableLimit]);

  const onPageChange = useCallback(
    (page, pageSize) => {
      const beginIndex = (page - 1) * pageSize;
      setPageInfo({ beginIndex, pageSize, current: page });
      if (onChange) {
        limit
          ? onChange(beginIndex, pageSize, page, countLimit)
          : onChange(beginIndex, pageSize, page);
      }
    },
    [onChange, limit, countLimit],
  );
  const showTotal = useCallback(
    (total: number, range: number[]) => {
      return (
        <PaginationTotal total={total} range={range} limit={limit} tooltipTotal={tooltipTotal} />
      );
    },
    [limit, tooltipTotal],
  );
  const paginationProps = useMemo(() => {
    const { beginIndex, ..._pageInfo } = pageInfo;
    return {
      ...resetProps,
      ..._pageInfo,
      onChange: onPageChange,
      onShowSizeChange: onPageChange,
      showTotal,
      total: limit ? countLimit : total,
    };
  }, [onPageChange, resetProps, pageInfo, total, countLimit, limit, showTotal]);

  const onSwitchChange = useCallback(
    value => {
      const { current, pageSize, beginIndex } = pageInfo;
      !value
        ? onChange(beginIndex, pageSize, current, countLimit)
        : onChange(beginIndex, pageSize, current);
      const _mode = value ? 'default' : 'limit';
      setInnerMode(_mode);
    },
    [pageInfo, onChange, countLimit],
  );

  return (
    <div className="gantd-grid-footer">
      <div
        style={{ display: 'flex', flex: 1, alignItems: 'center', height: 30, overflow: 'hidden' }}
      >
        {addonBefore && <div>{addonBefore}</div>}
        <Pagination className="gant-grid-pagination" {...paginationProps} />
        {onRefresh && (
          <Button
            icon="reload"
            size="small"
            onClick={() => {
              if (onRefresh) return onRefresh();
              console.warn('Function refresh is null');
            }}
            style={{ fontSize: 12 }}
          />
        )}
        {addonAfter && <div>{addonAfter}</div>}
      </div>
      {mode === 'limit' && (
        <>
          <label style={{ marginLeft: 4 }}>精确查询：</label>
          <Switch onChange={onSwitchChange} size="small" className="grid-pagination-mode-switch" />
        </>
      )}
    </div>
  );
});
function PaginationTotal(props: any) {
  const { total: propsTotal, range, limit, tooltipTotal } = props;
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const onHover = useCallback(async () => {
    if (typeof tooltipTotal === 'number') return setTotal(tooltipTotal);
    if (typeof tooltipTotal === 'function') {
      setLoading(true);
      try {
        const total = await tooltipTotal();
        setTotal(total);
      } finally {
        setLoading(false);
      }
    }
  }, [tooltipTotal]);

  if (limit)
    return (
      <Receiver>
        {(locale) => (
          locale.targetLang !== 'zh-CN'
            ?
            // 英文
            <>{`${range[0]}-${range[1]} of ${propsTotal} items`}</>
            :
            // 中文
            <>
            {`第${range[0]} - ${range[1]}条，${propsTotal}+ `}
            <Tooltip
              title={loading ? '加载中...' : '精确数量:' + total}
              onVisibleChange={visible => {
                visible && onHover();
              }}
            >
              <Button
                size="small"
                className="gantd-pagination-total-btn"
                type="link"
                icon="exclamation-circle"
              ></Button>
            </Tooltip>
          </>
        )}
      </Receiver>
    );

  return (
    <Receiver>
      {(locale) => (
        locale.targetLang !== 'zh-CN'
          ?
          <>{`${range[0]}-${range[1]} of ${propsTotal} items`}</>
          :
          <>{`第${range[0]} - ${range[1]}条，共${propsTotal}条`}</>
      )}
    </Receiver>
  )
}
export const paginationShowTotal = (total, range, limit, tooltipTotal) => {
  return <PaginationTotal total={total} range={range} limit={limit} tooltipTotal={tooltipTotal} />;
};
