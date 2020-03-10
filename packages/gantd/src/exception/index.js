import React, { Component, createElement } from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import classnames from 'classnames';
import { ConfigConsumer } from '../config-provider'

export default class Exception extends Component {
  renderWithConfigConsumer = ({ getPrefixCls }) => {
    const prefixCls = getPrefixCls('exception');
    const {
      className,
      backText,
      linkElement = 'a',
      type,
      title,
      desc,
      img,
      actions,
      redirect,
      ...rest
    } = this.props;
    const pageType = type in config ? type : '404';
    const clsString = classnames(prefixCls, className);
    return (
      <div className={clsString} {...rest}>
        <div className='imgBlock'>
          <div
            className='imgEle'
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className='content'>
          <h1>{title || config[pageType].title}</h1>
          <div className='desc'>{desc || config[pageType].desc}</div>
          <div className='actions'>
            {actions ||
              createElement(
                linkElement,
                {
                  to: redirect,
                  href: redirect,
                },
                <Button type="primary">{backText}</Button>
              )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>{this.renderWithConfigConsumer}</ConfigConsumer>
    )
  }
}






