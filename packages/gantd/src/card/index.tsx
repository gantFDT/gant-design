/**
 * 卡片组件(layout级别)
 * 默认提供pagecard类名;bordered:false,size:small属性。提供可选的最小高度属性
 */
import { Card as AntCard } from 'antd';
import { CardProps } from 'antd/lib/card'
import React from 'react';
import classnames from 'classnames';

export interface CardIF extends CardProps {
  showBoxShadow?: boolean;
  [key: string]: any;
}

const dafaultBodyStyle = {
  padding: 10
}

const Card = (props: CardIF) => {
  const { children, className,  bodyStyle, showBoxShadow, ...restProps } = props;
  const prefixCls = ('gantd-card');
  return (
    <AntCard
      className={classnames(prefixCls, showBoxShadow ? prefixCls + '-page-boxshadow' : '', className)}
      bodyStyle={{ ...dafaultBodyStyle, ...bodyStyle }}
      size='small'
      {...restProps}
    >
      {children}
    </AntCard>
  );
}

export default Card






