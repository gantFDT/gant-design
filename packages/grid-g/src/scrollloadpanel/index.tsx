import React, { RefObject } from 'react';
import { Spin } from 'antd';
import useGridScroll, { UseGridScrollProps } from './useGridScroll';
import Total from './Total';
import { GridApi, GridManager } from '../interface';
import './index.less';

const sizeHeightMap = {
  small: 30,
  default: 40,
  large: 50,
};

type ScrollLoad = {
  /** 已加载条数 */
  loadTotal: number;
  /** 总条数 */
  total: number;
  /** 下拉加载的状态 */
  loading: boolean;
  /**
   * 下拉加载的回调
   * force 为 true 时，表示强制查询，此时为出错后，用户手动点击继续查询
   */
  onScroll: (force?: boolean) => void;
  /** 下拉加载是否出现错误 */
  hasError: boolean;
  /**
   * 获取数据总数的方法
   * 对于类似于零件库模块（数据量较大，需要单独通过接口获取总数）
   *  */
  getTotal?: () => Promise<void>;
} & Pick<UseGridScrollProps, 'heightThreshold' | 'timeThreshold'>;

export interface ScrollLoadPanelProps {
  size: 'small' | 'default' | 'large';
  scrollLoad: ScrollLoad;
  gridApiRef: RefObject<GridApi>;
}

export default function ScrollLoadPanel(props: ScrollLoadPanelProps) {
  const { size = 'default', scrollLoad, gridApiRef } = props;
  const height = sizeHeightMap[size];
  const {
    loadTotal,
    total,
    onScroll,
    loading,
    hasError,
    getTotal,
    heightThreshold = 0.7,
    timeThreshold = 300,
  } = scrollLoad || {};

  useGridScroll({
    gridApiRef,
    heightThreshold,
    timeThreshold,
    fetchData: onScroll,
  });

  return (
    <Spin spinning={loading}>
      <div
        className="wrapper"
        style={{
          height,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="left-content">
          <div style={{ marginRight: 12 }}>{`已加载 ${loadTotal} 条数据`}</div>
          <Total total={total} getTotal={getTotal} />
        </div>
        <div style={{ flex: 1 }}>
          {hasError && !loading && (
            <div style={{ color: 'red' }}>
              数据加载出错，是否重试？ <a onClick={() => onScroll?.(true)}>继续加载</a>
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    </Spin>
  );
}
