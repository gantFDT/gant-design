/**
 * 卡片组件(layout级别)
 * 默认提供pagecard类名;bordered:false,size:small属性。提供可选的最小高度属性
 */
import { Card as AntCard } from 'antd';
import React from 'react';
import classnames from 'classnames';
import './index.less';


// const contentHei = window.mainContainerMinHeight;
const dafaultBodyStyle = {
  padding: 10
}
export const Card = () => {
  // static propTypes = {
  //     className: propTypes.string,
  //     size: propTypes.string,
  //     bordered: propTypes.bool,
  //     bodyStyle: propTypes.object,
  //     defaultMinHei: propTypes.bool,
  //     showBoxShadow: propTypes.bool,
  //     headStyle:propTypes.object,
  //     headeHeight:propTypes.number
  // }

  // static defaultProps = {
  //     className: '',
  //     defaultMinHei: false,
  //     showBoxShadow: false,
  //     bordered: true,
  //     bodyStyle: {},
  //     headStyle:{},
  //     headeHeight:40
  // }


  const { children, className, size, bordered, bodyStyle, defaultMinHei, showBoxShadow, headStyle, headeHeight, ...restProps } = this.props;
  // let _defaultBodyStyle = defaultMinHei ? { ...dafaultBodyStyle, minHeight: contentHei - (bordered ? 52 : 50) } : dafaultBodyStyle;

  const prefixCls = ('gantd-card');

  return (
    <AntCard
      className={classnames(prefixCls, showBoxShadow ? prefixCls + '-page-boxshadow' : '', className)}
      bordered={bordered}
      bodyStyle={{ ...bodyStyle }}
      size='small'
      headStyle={{ height: headeHeight, display: 'flex', ...headStyle }}
      {...restProps}
    >
      {children}
    </AntCard>
  );


}






