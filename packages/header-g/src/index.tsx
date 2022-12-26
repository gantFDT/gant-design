import React, { ReactNode, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { Dropdown, Menu, Button, Icon } from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import ResizeDetector from './ResizeDetector';
import ExtraContent from './ExtraContent';
import _ from 'lodash';
import { getGlobalConfig } from './utils';
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
  num?: number;
  prefixCls?: string;
  size?: 'small' | 'large' | 'default';
  suppressMap?: boolean;
}

//大小配置
export const sizeDefinitions = {
  //组件高度
  height: {
    small: 30,
    default: 40,
    large: 50,
  },
  //标题高度
  title: {
    small: 12,
    default: 15,
    large: 18,
  },
  //短线宽度
  lineWidth: {
    small: 3,
    default: 4,
    large: 5,
  },
  //短线高度
  lineHeight: {
    small: 15,
    default: 20,
    large: 25,
  },
  //图标大小
  icon: {
    small: 18,
    default: 22,
    large: 24,
  },
  //number框
  num: {
    minWidth: {
      small: 16,
      default: 22,
      large: 24,
    },
    fontSize: {
      small: 12,
      default: 15,
      large: 18,
    },
    lineHeight: {
      small: 16,
      default: 22,
      large: 24,
    },
    height: {
      small: 16,
      default: 22,
      large: 24,
    },
  },
};

const Header = (headerProps: HeaderIF) => {
  const globalConfig = getGlobalConfig();
  const props = { ...globalConfig, ...headerProps };
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
    size = 'small',
    suppressMap = true,
    ...restProps
  } = props;
  const [tools, setTools] = useState([]);
  const [innerExtra, setInnerExtra] = useState({} as any);
  //打平extra
  const [allWidth, setAllWidth] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (_.isEmpty(extra) || suppressMap) {
      return () => {};
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
  }, [allWidth, leftRef.current, size]);

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
        <div
          className={prefixCls + '-wrapper'}
          style={{ height: sizeDefinitions.height[size] }}
          ref={leftRef}
        >
          <div className={prefixCls + '-beforeExtra'}>{beforeExtra}</div>
          {type == 'icon' && (
            <div
              className={prefixCls + '-icon'}
              style={{ color: color, fontSize: sizeDefinitions.icon[size] }}
            >
              {typeof icon === 'string' && <Icon type={icon} />}
              {typeof icon === 'object' && { icon }}
            </div>
          )}
          {type == 'line' && title && (
            <div
              className={prefixCls + '-line'}
              style={{
                background: color,
                width: sizeDefinitions.lineWidth[size],
                height: sizeDefinitions.lineHeight[size],
              }}
            ></div>
          )}
          {type == 'num' && (
            <div
              className={prefixCls + '-num'}
              style={{
                background: color,
                fontSize: sizeDefinitions.num.fontSize[size],
                lineHeight: sizeDefinitions.num.lineHeight[size] + 'px',
                height: sizeDefinitions.num.height[size],
                minWidth: sizeDefinitions.num.minWidth[size],
              }}
            >
              {num}
            </div>
          )}
          <div
            className={prefixCls + '-title'}
            style={{ color: color, fontSize: sizeDefinitions.title[size] }}
          >
            {title}
          </div>
        </div>
        <div className={getPrefixCls('overflow-tool-outer')}>
          <div className={getPrefixCls('overflow-tool-inner')}>
            {extra && !suppressMap && (
              <ExtraContent tools={tools} prefixCls={prefixCls} width={toolWidth} />
            )}
            {extra}
          </div>
        </div>
      </div>
    </div>
  );
};

export { setGlobalConfig } from './utils';
export default Header;
