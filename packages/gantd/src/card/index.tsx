/**
 * 卡片组件(layout级别)
 * 默认提供pagecard类名;bordered:false,size:small属性。提供可选的最小高度属性
 */
import { Card as AntCard } from 'antd';
import { CardProps } from 'antd/lib/card'
import React, { Component } from 'react';
import classnames from 'classnames';


export interface GantCardProps extends CardProps {
  showBoxShadow?: boolean;
}

const dafaultBodyStyle = {
  padding: 10
}
export default class Card extends Component<GantCardProps> {
  render() {
    const { className, bodyStyle, showBoxShadow, ...props } = this.props;
    const prefixCls = ('gantd-card');
    return (
      <AntCard
        className={classnames(prefixCls, showBoxShadow ? prefixCls + '-page-boxshadow' : '', className)}
        bodyStyle={{ ...dafaultBodyStyle, ...bodyStyle }}
        size='small'
        {...props}
      >
      </AntCard>
    );
  }
}






