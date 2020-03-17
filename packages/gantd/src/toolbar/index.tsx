import React from 'react';
import classNames from 'classnames';

export interface ToolBarPropsIF {
  extraLeft?: React.ReactNode;
  extraRight?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  fixed?:boolean;
  [restProps: string]: any;
}

const Toolbar = (props: ToolBarPropsIF) => {
  const { extraLeft, extraRight, fixed,className, style, ...restProps } = props;
  const prefixCls = 'gant-toolbar'
  return (
    <div className={classNames(prefixCls, fixed ? prefixCls + '-fixed' : '', className)} style={{ ...style }} {...restProps}>
      <div className={prefixCls + `-left`}>{extraLeft}</div>
      <div className={prefixCls + '-space'}></div>
      <div className={prefixCls + `-right`}>{extraRight}</div>
    </div>
  );
}

export default Toolbar

