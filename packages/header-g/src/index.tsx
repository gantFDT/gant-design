import React, { ReactNode, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { Dropdown, Menu, Button, Icon } from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import ResizeDetector from './ResizeDetector';
import ExtraContent from './ExtraContent';
import _ from 'lodash';

interface HeaderIF {
  type?: 'line' | 'num' | 'icon';
  bottomLine?: boolean;
  title?: string | ReactNode;
  beforeExtra?: ReactNode;
  extra?: ReactNode;
  icon?: string | ReactNode;
  color?: string;
  style?: object;
  className?: string;
  [props: string]: any;
}

const Header = (props: HeaderIF) => {
  let {
    prefixCls: customizePrefixCls,
    type = '',
    bottomLine = false,
    title,
    beforeExtra,
    extra = null,
    icon = null,
    num = '1',
    color = 'var(--text-color)',
    style = {},
    className,
    ...restProps
  } = props;
  const [tools, setTools] = useState([]);
  const [innerExtra, setInnerExtra] = useState({} as any);
  //打平extra
  const [allWidth, setAllWidth] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (_.isEmpty(extra)) {
      return;
    }
    let toolsCollection = React.Children.toArray(extra);
    let toolsArr = [];
    const interator = items => {
      React.Children.map(items, (item, index) => {
        if (item && item.type && item.type.toString() === 'Symbol(react.fragment)') {
          interator([item.props.children]);
        } else {
          if (React.isValidElement(item) || typeof item === 'string') {
            toolsArr.push(item);
          }
        }
      });
    };
    //过滤掉fragment
    // interator(toolsCollection)
    React.Children.map(toolsCollection, item => {
      interator(item);
    });
    if (_.isEqual(tools, toolsArr) || _.isEqual(extra, innerExtra)) return;
    setInnerExtra(extra);

    setTools(toolsArr);
  }, [extra, tools, innerExtra]);
  const getPrefixCls = cls => 'gant-' + cls;
  const width = '100%';
  const prefixCls = 'gant-blockheader';
  const clsString = classnames(prefixCls, className);
  const toolWidth = useMemo(() => {
    if (leftRef.current) {
      return isNaN(allWidth - leftRef.current.clientWidth)
        ? 0
        : allWidth - leftRef.current.clientWidth;
    }
    return 0;
  }, [allWidth, leftRef.current]);
  return (
    <div
      className={clsString}
      style={{ borderBottom: bottomLine && '1px solid rgba(128,128,128,0.2)', ...style }}
      {...restProps}
    >
      {extra && (
        <ReactResizeDetector handleWidth handleHeight key={1}>
          <ResizeDetector setAllWidth={setAllWidth} />
        </ReactResizeDetector>
      )}
      <div className={prefixCls + '-container'}>
        <div className={prefixCls + '-wrapper'} ref={leftRef}>
          <div className={prefixCls + '-beforeExtra'}>{beforeExtra}</div>
          {type == 'icon' && (
            <div className={prefixCls + '-icon'} style={{ color: color }}>
              {typeof icon === 'string' && <Icon type={icon} />}
              {typeof icon === 'object' && { icon }}
            </div>
          )}
          {type == 'line' && title && (
            <div className={prefixCls + '-line'} style={{ background: color }}></div>
          )}
          {type == 'num' && (
            <div className={prefixCls + '-num'} style={{ background: color }}>
              {num}
            </div>
          )}
          <div className={prefixCls + '-title'} style={{ color: color }}>
            {title}
          </div>
        </div>
        <div className={getPrefixCls('overflow-tool-outer')}>
          <div className={getPrefixCls('overflow-tool-inner')}>
            {extra && <ExtraContent tools={tools} prefixCls={prefixCls} width={toolWidth} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
