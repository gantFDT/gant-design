/*
 * @Descripttion: 
 * @MainAuthor: 
 */
import React, { Component, createElement } from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import classnames from 'classnames';

export interface IExceptionProps {
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | any;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
  [key: string]: any;
}

const Exception = (props: IExceptionProps) => {
  const prefixCls = 'gant-exception'
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
  } = props;
  const pageType = type in config ? type : '404';
  const clsString = classnames(prefixCls, className);
  return <div className={clsString} {...rest}>
    <div className='imgBlock' >
      <div className='imgEle'
        style={{ backgroundImage: `url(${img || config[pageType].img})` }
        }
      />
    </div>
    <div className='content' >
      <h1>{title || config[pageType].title
      }</h1>
      <div className='desc' > {desc || config[pageType].desc}</div>
      <div className='actions' >
        {actions ||
          createElement(
            linkElement,
            {
              to: redirect,
              href: redirect,
            },
            <Button type="primary" > {backText} </Button>
          )}
      </div>
    </div>
  </div>
}


export default Exception



