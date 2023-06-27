import React, { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Pagination, Button, Tooltip, Switch, InputNumber } from 'antd';
import { GantPaginationProps } from './interface';
import { isNumber, pick, omit } from 'lodash';
import Receiver from './locale/Receiver';
import { usePrev } from './hooks';
interface Page {
  current: number;
  pageSize: number;
  beginIndex: number;
}

const heightSize = {
  small: 30,
  default: 40,
  large: 50,
};

export default memo(function GantPagination(props: GantPaginationProps) {
  const {
    addonAfter,
    addonBefore,
    numberGoToMode,
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
    size: _size,
    align,
    ...resetProps
  } = props;

  //如果传入的是large, 就转为default , 因为antd原生分页条没有large
  const size = _size === 'large' ? 'default' : _size;

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
        <PaginationTotal
          total={total}
          range={range}
          limit={limit}
          tooltipTotal={tooltipTotal}
          size={size}
        />
      );
    },
    [limit, tooltipTotal],
  );

  const paginationProps = useMemo(() => {
    const { beginIndex, ..._pageInfo } = pageInfo;
    return {
      size,
      ...resetProps,
      ..._pageInfo,
      onChange: onPageChange,
      onShowSizeChange: onPageChange,
      showTotal,
      total: limit ? countLimit : total,
    };
  }, [onPageChange, size, resetProps, pageInfo, total, countLimit, limit, showTotal]);

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
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          height: heightSize[size],
          overflow: 'hidden',
          justifyContent: align === 'left' ? 'start' : 'end',
        }}
      >
        {addonBefore && <div>{addonBefore}</div>}
        <Pagination
          className="gant-grid-pagination"
          {...omit(paginationProps, numberGoToMode ? ['showQuickJumper', 'quickGo'] : [])}
        />
        {numberGoToMode && (
          <NumberGoTo
            {...pick(paginationProps, [
              'quickGo',
              'disabled',
              'showQuickJumper',
              'pageSize',
              'total',
              'goButton',
              'size',
            ])}
            onPageChange={onPageChange}
          />
        )}
        {onRefresh && (
          <Button
            icon="reload"
            size={size as any}
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
        <Receiver>
          {locale => (
            <>
              <label style={{ marginLeft: 4 }}>{`${locale.exactSearch}${
                locale.targetLang === 'zh-CN' ? '：' : ':'
              }`}</label>
              <Switch
                onChange={onSwitchChange}
                size="small"
                className="grid-pagination-mode-switch"
              />
            </>
          )}
        </Receiver>
      )}
    </div>
  );
});

function PaginationTotal(props: any) {
  const { total: propsTotal, range, limit, tooltipTotal, size } = props;
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
        {locale =>
          locale.targetLang === 'zh-CN' ? (
            // 中文
            <>
              {`第${range[0]} - ${range[1]}条，${propsTotal}+ `}
              <Tooltip
                title={loading ? locale.loadingOoo : `${locale.exactNumber}:` + total}
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
          ) : (
            // 其他语言
            <>{`${range[0]}-${range[1]} ${locale.of} ${propsTotal} ${locale.items}`}</>
          )
        }
      </Receiver>
    );

  return (
    <Receiver>
      {locale =>
        locale.targetLang === 'zh-CN' ? (
          <>{`第${range[0]} - ${range[1]}条，共${propsTotal}条`}</>
        ) : (
          <>{`${range[0]}-${range[1]} ${locale.of} ${propsTotal} ${locale.items}`}</>
        )
      }
    </Receiver>
  );
}

const NumberGoTo = (props: any) => {
  const {
    quickGo,
    disabled,
    showQuickJumper,
    goButton,
    pageSize,
    total,
    onPageChange,
    size,
  } = props;

  if (!showQuickJumper || total <= pageSize) {
    return <></>;
  }

  const [value, setValue] = useState<number>(undefined);
  const prevValue = usePrev(value);

  let gotoButton = null;
  const inputRef = useRef<any>({});
  const max = Math.ceil(total / pageSize);

  const parser = (val: string) => val && val.replace(/\D+|^0/g, '');
  const onChange = (v: number) => setValue(v);
  const validValue = (val: number) => (val > max ? max : val);
  const failed = !value || !onPageChange || prevValue === value;

  const handleBlur = () => {
    if (goButton || failed) {
      return;
    }
    onPageChange(validValue(value), pageSize);
  };

  const go = (e: any) => {
    if (failed) return;
    if (e.keyCode === 13 || e.type === 'click') {
      // 当用回车触发回调且输入值大于最大页码时，直接触发失焦事件让输入值更改为max值
      if (e.keyCode === 13 && value > max) {
        inputRef.current?.inputNumberRef.blur();
        return;
      }
      onPageChange(validValue(value), pageSize);
    }
  };

  return (
    <Receiver>
      {locale => {
        if (quickGo && goButton) {
          gotoButton =
            typeof goButton === 'boolean' ? (
              <button
                type="button"
                onClick={go}
                onKeyUp={go}
                disabled={disabled}
                className={`gant-quick-jumper-button`}
              >
                {locale.jump_to_confirm}
              </button>
            ) : (
              <span onClick={go} onKeyUp={go}>
                {goButton}
              </span>
            );
        }
        return (
          <div className="gantd-pagination-number-goto">
            {locale.jumpTo}
            <InputNumber
              ref={inputRef}
              size={size}
              min={1}
              max={max}
              disabled={disabled}
              value={value}
              parser={parser}
              onBlur={handleBlur}
              onKeyUp={go}
              onChange={onChange}
              aria-label={locale.page}
            />
            {locale.targetLang === 'zh-CN' && locale.page}
            {gotoButton}
          </div>
        );
      }}
    </Receiver>
  );
};

export const paginationShowTotal = (total, range, limit, tooltipTotal) => {
  return <PaginationTotal total={total} range={range} limit={limit} tooltipTotal={tooltipTotal} />;
};
