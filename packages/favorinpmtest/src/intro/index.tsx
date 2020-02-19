import './index.less';

import React from 'react';
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import { ConfigConsumer } from '../config-provider'

interface IntroIF{
  imageAlign?:string,
  imageRadius?:number,
  image?:string,
  title?:string | React.ReactNode,
  content?:string | React.ReactNode,
  [props:string]:any
}

const Intro = (props:IntroIF) => {
  const renderContent = (locale) => {
    const {
      prefixCls: customizePrefixCls,
      imageAlign = 'left',
      imageRadius = 0,
      image,
      title,
      content
    } = props;
    return (
      <ConfigConsumer>
        {({ getPrefixCls }) => {
          const prefixCls = getPrefixCls('intro', customizePrefixCls);
          const wrapPrefixCls = prefixCls + '-wrap';
          return (
            <div className={prefixCls} style={{
              flexDirection: imageAlign == 'right' ? 'row-reverse' : 'row',
              padding: image ? '15px' : 0,
              marginBottom: !image ? '15px' : 0
            }} >
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

  return (
    <LocaleReceiver componentName="Intro">
      {renderContent}
    </LocaleReceiver>
  );

}

export default Intro