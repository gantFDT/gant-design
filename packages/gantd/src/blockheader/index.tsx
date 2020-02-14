import './index.less';
import React, { useContext, ReactNode } from 'react';
import { ConfigContext } from '../config-provider';
import classnames from 'classnames';

export interface BlockHeaderProps {
  className: string,
  prefixCls: string,
  id: string,
  type: string,
  bottomLine: boolean,
  title: string,
  beforeExtra?: ReactNode,
  extra?: ReactNode,
  icon?: null | ReactNode,
  num: string,
  color: string,
  style: object
}

const BlockHeader = (props) => {
  let {
    className,
    prefixCls: customizePrefixCls,
    id,
    type = '',
    bottomLine = false,
    title,
    beforeExtra,
    extra,
    icon = null,
    num = "1",
    color,
    style = {}
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('blockheader', customizePrefixCls);

  const clsString = classnames(prefixCls, className);

  if (color && !~color.indexOf('#')) {
    color = color === 'theme' ? '#1890FF' : '#202020'
  }

  return (
    <div id={id} className={clsString} style={{ borderBottom: bottomLine && '1px solid #edebe9', ...style }}>
      <div className={prefixCls + '-wrapper'}>
        <div className={prefixCls + '-beforeExtra'}>
          {beforeExtra}
        </div>
        {type == 'icon' && <div className={prefixCls + '-icon'} style={{ color: color }}>{icon}</div>}
        {type == 'line' && title && <div className={prefixCls + '-line'} style={{ background: color }}></div>}
        {type == 'num' && <div className={prefixCls + '-num'} style={{ background: color }}>{num}</div>}
        <div className={prefixCls + '-title'} style={{ color: color }}>{title}</div>
        <div className={prefixCls + '-extra'}>{extra}</div>
      </div>
    </div>
  )
}

export default BlockHeader;