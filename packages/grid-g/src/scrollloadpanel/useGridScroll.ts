import { useDebounceEffect, useLatest } from 'ahooks';
import { RefObject, useCallback, useRef } from 'react';
import { GridApi } from '../interface';

export type UseGridScrollProps = {
  gridApiRef: RefObject<GridApi>;
  /**
   * 高度阈值，滚动条滚动到总高度的百分之多少时，触发加载更多数据
   * 值范围 0~1，默认为 0.7
   * */
  heightThreshold: number;
  /**
   * 时间阈值，滚动条滚动指定高度后，需要再次根据最后滚动方向判断是否触发，如果最后是向上滚动则不触发
   * 单位为毫秒，默认为 50ms
   */
  timeThreshold: number;
  /** 加载数据的方法 */
  fetchData: () => void;
};

/**
 * 表格滚动加载
 * @param props
 */
export default function useGridScroll(props: UseGridScrollProps) {
  const { gridApiRef, heightThreshold, timeThreshold, fetchData } = props;
  const lastScrollTopRef = useRef(-1);
  const currentScrollRef = useRef(-1);
  const timerRef = useRef<any>(null);
  const loadingRef = useRef(false);
  const fetchDataRef = useLatest(fetchData);

  const resetRefState = useCallback(() => {
    loadingRef.current = false;
    lastScrollTopRef.current = -1;
    currentScrollRef.current = -1;
    timerRef.current = null;
  }, []);

  const fetchWrapper = useCallback(async () => {
    fetchDataRef.current?.();
    resetRefState();
  }, [fetchDataRef, resetRefState]);

  const onScroll = useCallback(
    e => {
      const scrollElement = e.target;
      const scrollTop = scrollElement.scrollTop;
      const scrollHeight = scrollElement.scrollHeight;
      const clientHeight = scrollElement.clientHeight;
      const currentScroll = scrollTop + clientHeight;
      const targetScroll = scrollHeight * heightThreshold;

      // 符合查询条件
      if (currentScroll >= targetScroll) {
        if (lastScrollTopRef.current == -1) {
          // console.info('可以触发查询');
          lastScrollTopRef.current = scrollTop;
          timerRef.current = setTimeout(() => {
            if (currentScrollRef.current >= lastScrollTopRef.current) {
              // console.info('触发查询');
              fetchWrapper();
            } else {
              // console.info('取消查询');
              resetRefState();
            }
          }, timeThreshold);
        }
      }

      if (lastScrollTopRef.current !== -1) {
        currentScrollRef.current = scrollTop;
      }
    },
    [fetchWrapper, heightThreshold, resetRefState, timeThreshold],
  );

  useDebounceEffect(
    () => {
      const gridApi = gridApiRef.current;
      if (!gridApi) {
        console.error('gridApi is null');
        return;
      }

      const wrapper = (gridApi as any)?.gridBodyCtrl?.eBodyViewport;

      wrapper?.addEventListener('scroll', onScroll);

      return () => {
        wrapper?.removeEventListener('scroll', onScroll);
      };
    },
    [gridApiRef, onScroll],
    { wait: 300 },
  );
}
