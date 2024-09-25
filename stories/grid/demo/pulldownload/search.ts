import { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import {
  useRequest,
  useSetState,
  useUpdateEffect,
  useDeepCompareEffect,
  useMemoizedFn,
} from 'ahooks';
import _ from 'lodash';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { GridManager } from '@grid';

interface UseSearchOptions extends Omit<Options<any, any>, 'refreshDeps' | 'defaultParams'> {
  gridManagerRef?: React.MutableRefObject<GridManager | undefined>;
  namespace?: string;
  defaultParams?: any;
  refreshDeps?: React.DependencyList;
  debounceMaxWait?: number;
  debounceWait?: number;
  fetchRefreshDeps?: React.DependencyList;
  /** 无需缓存的查询属性列表 */
  omitFieldNames?: string[];
}

const searchParamsCache = {};

export const useSearch = (
  fetch: (
    params: any,
    pageInfo?: {
      pageSize: number;
      beginIndex: number;
    },
  ) => any,
  options?: UseSearchOptions,
) => {
  const [hasSearch, setHasSearch] = useState(false);
  const gridManagerRef = options?.gridManagerRef;
  const refreshDeps = _.get(options, 'refreshDeps', []);
  const namespace = useMemo(() => {
    return _.get(options, 'namespace') ? _.get(options, 'namespace') + 'useSearch' : undefined;
  }, []);
  const initParams = useMemo(() => {
    if (namespace && _.has(searchParamsCache, namespace))
      return _.get(searchParamsCache, namespace);
    return _.get(options, 'defaultParams', {});
  }, [_.get(options, 'defaultParams')]);
  const omitFieldNamesRef = useRef<string[] | undefined>();
  omitFieldNamesRef.current = options?.omitFieldNames;

  const [searchParams, setSearchParams] = useState<any>(initParams);

  const useRequestOptions = _.omit(options, [
    'gridManagerRef',
    'namespace',
    'refreshDeps',
    'defaultParams',
  ]);
  const { run: onFetch, loading } = useRequest(
    async (params?: any, pageInfo?: any) => {
      await fetch(params, pageInfo);
      setHasSearch(true);
      if (namespace) _.set(searchParamsCache, namespace, params);
      setSearchParams(params);
    },
    { manual: true, ...useRequestOptions, refreshDeps: useRequestOptions.fetchRefreshDeps },
  );

  const onSearch = useCallback((params?: any, pageInfo?: any) => {
    if (gridManagerRef?.current?.isChanged) {
      const isContinue = confirm('数据已发生变化，是否放弃修改继续查询？');

      if (isContinue) {
        gridManagerRef?.current?.cancel();
        onFetch(params, pageInfo);
      }
    }
    onFetch(params, pageInfo);
  }, []);

  const onRefresh = useCallback(() => {
    onSearch(searchParams);
  }, [searchParams]);

  const clear = () => {
    if (namespace && _.has(searchParamsCache, namespace)) delete searchParamsCache[namespace];
    setSearchParams({});
  };

  const rest = () => {
    if (namespace && _.has(searchParamsCache, namespace)) delete searchParamsCache[namespace];
    setSearchParams(initParams);
  };

  useUpdateEffect(() => {
    rest();
  }, refreshDeps);

  useDeepCompareEffect(() => {
    setSearchParams(initParams);
  }, [initParams]);

  useEffect(() => {
    return () => {
      const omitFieldNames = omitFieldNamesRef.current;

      if (!_.isEmpty(omitFieldNames) && namespace && _.has(searchParamsCache, namespace)) {
        const params = searchParamsCache[namespace];

        const isExistFilterInfo = !_.isEmpty(params.filterInfo);
        const isExistWhereList = !_.isEmpty(params.whereList);

        if (isExistFilterInfo || isExistWhereList) {
          if (isExistFilterInfo) {
            omitFieldNames?.forEach(fieldName => {
              _.set(searchParamsCache, `${namespace}.filterInfo.${fieldName}`, undefined);
            });
          }

          if (isExistWhereList) {
            const whereList = (params.whereList || []).filter(
              (item: any) => !omitFieldNames.includes(item.fieldName),
            );
            _.set(searchParamsCache, `${namespace}.whereList`, whereList);
          }
        } else {
          omitFieldNames?.forEach(fieldName => {
            _.set(searchParamsCache, `${namespace}.filterInfo.${fieldName}`, undefined);
          });
        }
      }
    };
  }, []);

  return { onSearch, onRefresh, loading, clear, rest, params: searchParams, hasSearch };
};

interface UseScrollLoadSearchOptions extends UseSearchOptions {
  /** 每次滚动加载的数量 */
  pageSize?: number;
  /**
   * 高度阈值，滚动条滚动到总高度的百分之多少时，触发加载更多数据
   * 值范围 0~1，默认为 0.7
   * */
  heightThreshold?: number;
  /**
   * 时间阈值，滚动条滚动指定高度后，需要再次根据最后滚动方向判断是否触发，如果最后是向上滚动则不触发
   * 单位为毫秒，默认为 300ms
   */
  timeThreshold?: number;
  /**
   * 获取数据总数的方法
   * 对于类似于零件库模块（数据量较大，需要单独通过接口获取总数）
   *  */
  getTotalCount?: (params: any, pageInfo: any) => Promise<number>;
}

const scrollLoadSearchCache: Record<string, any> = {};

/**
 * 表格滚动加载的查询
 * @param fetch
 * @param options
 * @returns
 */
export const useScrollLoadSearch = (
  fetch: (params: any, pageInfo: any) => any,
  options?: UseScrollLoadSearchOptions,
) => {
  const refreshDeps = _.get(options, 'refreshDeps', []);
  const searchOptions = useMemo(() => {
    return _.omit(options, ['pageSize', 'heightThreshold', 'timeThreshold', 'getTotalCount']);
  }, [options]);
  const { heightThreshold = 0.7, timeThreshold = 300, getTotalCount, pageSize = 100 } =
    options || {};
  const namespace = useMemo(() => {
    return _.get(options, 'namespace')
      ? _.get(options, 'namespace') + 'useScrollLoadSearch'
      : undefined;
  }, []);

  const initState = useMemo(() => {
    return {
      loadTotal: 0,
      total: 0,
      hasError: false,
      loading: false,
      // 业务层状态，无需传给 scrollLoad
      beginIndex: 0,
      pageSize,
      dataSource: [],
      hasLoadAll: false,
      searchParams: {},
    };
  }, [pageSize]);
  const [gridLoading, setGridLoading] = useState(false);

  const [state, setState] = useSetState(() => {
    if (namespace && _.has(scrollLoadSearchCache, namespace))
      return _.get(scrollLoadSearchCache, namespace);
    return initState;
  });
  const [dataSource, setDataSource] = useState(() => {
    return state.allDataSource || [];
  });

  const scrollToTop = useCallback(() => {
    const gridManager = searchOptions.gridManagerRef?.current;
    if (!gridManager) {
      console.error('当前未配置 gridManager');
      return;
    }
    const wrapper = gridManager.agGridApi?.gridBodyCtrl?.eBodyViewport;

    if (wrapper) {
      wrapper.scrollTop = 0;
    }
  }, []);

  const onPageFetch = useCallback(
    async (params: any, pageInfo: any) => {
      const { beginIndex, pageSize } = pageInfo;
      const isSearchBeginIndexStart = beginIndex === 0;

      if (isSearchBeginIndexStart) {
        setGridLoading(true);
      } else {
        setState(pre => ({ ...pre, loading: true }));
      }

      let res = {
        totalCount: -1,
        content: [],
        hasError: false,
      };

      try {
        res = await fetch(params, {
          ...pageInfo,
          countLimit: -1,
        });
      } catch (error) {
        res.hasError = true;
      }

      const { totalCount, content, hasError } = res;

      if (isSearchBeginIndexStart) {
        if (!hasError) {
          setDataSource(content);
          setState({
            ...initState,
            beginIndex: 0,
            pageSize: pageSize,
            loadTotal: content.length,
            total: content.length < pageSize ? content.length : -1,
            loading: false,
            allDataSource: content,
          });
          // 滚动条置顶
          scrollToTop();
        }
      } else {
        if (hasError) {
          setState(pre => {
            return {
              ...pre,
              hasError,
              loading: false,
            };
          });
        } else {
          const gridManager = searchOptions.gridManagerRef?.current;
          if (!gridManager) {
            console.error('当前未配置 gridManager');
            return;
          }
          const allDataSource = gridManager.getPureData() || [];
          if (content.length > 0) {
            const getRowIdFunc = gridManager.agGridConfig.getRowNodeId;
            const allDataKeys = allDataSource.map(item => getRowIdFunc(item));

            // 根据页面上已有数据去重
            const filterDataSource = content.filter(
              item => !allDataKeys.includes(getRowIdFunc(item)),
            );
            // 通过 api 添加数据
            gridManager.agGridApi.applyTransaction({
              add: filterDataSource,
            });

            const newAllDataSource = [...allDataSource, ...filterDataSource];

            // 更新 gridManager 的数据
            gridManager.reset({
              dataSource: newAllDataSource,
            });

            const hasLoadAll = content.length < pageSize;

            setState(pre => ({
              ...pre,
              loading: false,
              hasError: false,
              beginIndex: beginIndex,
              loadTotal: newAllDataSource.length,
              total: hasLoadAll
                ? newAllDataSource.length
                : pre.total !== -1 && _.isEqual(pre.searchParams, params)
                ? pre.total
                : totalCount,
              hasLoadAll,
              allDataSource: newAllDataSource,
            }));
          } else {
            const allDataSource = gridManager.getPureData() || [];
            setState(pre => ({
              ...pre,
              loading: false,
              hasError: false,
              beginIndex,
              loadTotal: allDataSource.length,
              total: allDataSource.length,
              hasLoadAll: true,
              allDataSource,
            }));
          }
        }
      }

      setGridLoading(false);
    },
    [fetch],
  );

  const { onSearch: _onSearch, params, clear: _clear, rest: _rest, loading, hasSearch } = useSearch(
    onPageFetch,
    searchOptions,
  );

  const getTotalWrapper = useMemoizedFn(async () => {
    try {
      let total = await getTotalCount?.(params, { beginIndex: 0, pageSize: 100 });
      setState(pre => ({
        ...pre,
        // 这里需要将查询到的总条数，绑定查询条件
        total: total,
        searchParams: params,
      }));
    } catch (error) {}
  });

  const onScroll = useMemoizedFn((force: boolean) => {
    const { loading, hasLoadAll, hasError, beginIndex, pageSize } = state;
    console.info({ loading, hasLoadAll, hasError });

    if (loading || hasLoadAll || (hasError && !force)) {
      return;
    }

    _onSearch(params, { beginIndex: beginIndex + pageSize, pageSize });
  });

  const scrollLoad = useMemo(() => {
    return {
      ..._.omit(state, ['beginIndex', 'pageSize', 'allDataSource', 'hasLoadAll', 'searchParams']),
      onScroll,
      heightThreshold,
      timeThreshold,
      ...(() => {
        if (typeof getTotalCount === 'function') {
          return {
            getTotal: getTotalWrapper,
          };
        }
        return {};
      })(),
    };
  }, [state, heightThreshold, timeThreshold, onScroll, getTotalCount, getTotalWrapper]);

  const onSearch = useCallback(
    (params: any) => {
      _onSearch(params, { beginIndex: 0, pageSize: state.pageSize });
    },
    [state],
  );
  const onRefresh = useCallback(() => {
    _onSearch(params, { ..._.pick(state, ['beginIndex', 'pageSize']) });
  }, [state, params]);

  const clear = () => {
    _clear();
    if (namespace && _.has(scrollLoadSearchCache, namespace))
      delete scrollLoadSearchCache[namespace];
    setState(initState);
  };

  const rest = () => {
    _rest();
    if (namespace && _.has(scrollLoadSearchCache, namespace))
      delete scrollLoadSearchCache[namespace];
    setState(initState);
  };

  useUpdateEffect(() => {
    if (namespace && _.has(scrollLoadSearchCache, namespace))
      delete scrollLoadSearchCache[namespace];
    setState(initState);
  }, refreshDeps);

  useDeepCompareEffect(() => {
    if (namespace) {
      _.set(scrollLoadSearchCache, namespace, state);
    }
  }, [state]);

  return {
    onRefresh,
    onSearch,
    /**
     * 这里只有非滚动加载查询时，loading 才会为 true
     */
    loading: gridLoading,
    scrollLoad,
    clear,
    rest,
    params,
    hasSearch,
    dataSource,
  };
};
