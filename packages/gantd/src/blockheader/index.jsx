import './index.less';
import React, { Component } from 'react';
import { ConfigConsumer } from '../config-provider';
import classnames from 'classnames'
/**
 *
 *
 * @export
 * @class GantBlockHeader
 * @extends {Component}
 * @config type[string('icon'|'line'|'num')] 图标型，短线型，数字型
 *         id[string]供锚点使用
 *         title[string] 标题
 *         beforeExtra[reactnode]  左侧额外容器
 *         extra[reactnode]  右侧额外容器
 *         icon[string]  供图表型使用指定icon
 *         num [string,number] 供数字型使用
 *         color [string('theme'|'default') || string(hex)] 标题，序号，短线，图标颜色 ，theme为主题色，default为深灰色，支持16进制hex颜色
 *         bottomLine[bolean]  分割线
 *          size [string('big'|'small')] 尺寸 高度 50 | 30 
 */
export default class BlockHeader extends Component {
  renderWithConfigConsumer({ getPrefixCls, primaryColor }) {
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
    } = this.props;
    const prefixCls = getPrefixCls('blockheader', customizePrefixCls);
    const clsString = classnames(prefixCls, className);
    if (color && !~color.indexOf('#')) {
      color = color === 'theme' ? primaryColor : '#202020'
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

  render() {
    return (
      <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
    );
  }
}

