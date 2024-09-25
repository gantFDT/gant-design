import { Spin } from 'antd';
import React, { useState, useCallback } from 'react';

/**
 * 总条数显示
 * @param props
 * @returns
 */
export default function Total(props: { total: number; getTotal?: () => Promise<void> }) {
  const { total, getTotal } = props;
  const [loading, setLoading] = useState(false);

  const getTotalWrapper = useCallback(async () => {
    try {
      setLoading(true);
      await getTotal?.();
    } catch (error) {}
    setLoading(false);
  }, [getTotal]);

  if (total === -1) {
    return (
      <Spin spinning={loading}>
        <a onClick={getTotalWrapper} style={{ cursor: 'pointer' }}>
          查看总数
        </a>
      </Spin>
    );
  }

  return <div>{`总共 ${total} 条`}</div>;
}
