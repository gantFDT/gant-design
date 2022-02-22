/**
 * 卡片组件(layout级别)
 * 默认提供pagecard类名;bordered:false,size:small属性。提供可选的最小高度属性
 */
import { Card as AntCard } from 'antd';
import { CardProps } from 'antd/lib/card';
import React, { Component } from 'react';
import classnames from 'classnames';
import {getGlobalConfig} from './utils'
export interface GantCardProps extends CardProps {
  showBoxShadow?: boolean;
}

const dafaultBodyStyle = {
  padding: 10,
};

const Card = (cardProps: GantCardProps) => {
  const globalConfig = getGlobalConfig();
  const props = { ...globalConfig, ...cardProps };
  const { className, bodyStyle, showBoxShadow, ...restProps } = props;
  const prefixCls = 'gantd-card';
  return (
    <AntCard
      className={classnames(
        prefixCls,
        showBoxShadow ? prefixCls + '-page-boxshadow' : '',
        className,
      )}
      bodyStyle={{ ...dafaultBodyStyle, ...bodyStyle }}
      {...restProps}
    ></AntCard>
  );
};

export default Card;
export {setGlobalConfig} from './utils'