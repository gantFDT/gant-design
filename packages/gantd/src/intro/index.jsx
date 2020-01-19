import './index.less';

import React from 'react';
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import { ConfigConsumer } from '../config-provider'

export default class Intro extends React.Component {
  renderContent(locale) {
    const {
      prefixCls: customizePrefixCls,
      imageAlign = 'left',
      imageRadius = 0,
      image,
      title,
      content
    } = this.props;
    return (
      <ConfigConsumer>
        {({getPrefixCls})=>{
          const prefixCls = getPrefixCls('intro', customizePrefixCls);
          const wrapPrefixCls = prefixCls + '-wrap';
          return (
            <div className={prefixCls} style={{ flexDirection: imageAlign == 'right' && 'row-reverse', padding: image && '15px', marginBottom: !image && '15px' }} >
              {image && <div className={`${prefixCls}-image`} style={{ backgroundImage: `url(${image}`, borderRadius: `${imageRadius}px` }}></div>}
              <div className={wrapPrefixCls} style={{ padding: image && '15px' }}>
                <div className={`${wrapPrefixCls}-title`}>{title || locale.title}</div>
                <div className={`${wrapPrefixCls}-content`}>{content || locale.content}</div>
              </div>
            </div>
          )
        }}
      </ConfigConsumer>
    )
  }
  render() {
    return (
      <LocaleReceiver componentName="Intro">
        {this.renderContent}
      </LocaleReceiver>
    );
  }
}

