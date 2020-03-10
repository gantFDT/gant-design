/**
 * 卡片组件(layout级别)
 * 默认提供pagecard类名;bordered:false,size:small属性。提供可选的最小高度属性
 */
import { Card as AntCard } from 'antd';
import React from 'react';
import classnames from 'classnames';

interface CardIf {
  children: React.ReactNode,
  className: string,
  bordered: boolean,
  bodyStyle: object,
  showBoxShadow: boolean,
  headStyle: object
}

const dafaultBodyStyle = {
  padding: 10
}

const Card = (props: CardIf) => {
  const { children, className, bordered, bodyStyle, showBoxShadow, headStyle, ...restProps } = props;
  const prefixCls = ('gantd-card');
  return (
    <AntCard
      className={classnames(prefixCls, showBoxShadow ? prefixCls + '-page-boxshadow' : '', className)}
      bordered={bordered}
      bodyStyle={{ ...dafaultBodyStyle, ...bodyStyle }}
      size='small'
      headStyle={{ display: 'flex', ...headStyle }}
      {...restProps}
    >
      {children}
    </AntCard>
  );
}

export default Card






