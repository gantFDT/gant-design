import React, { ReactNode, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { Dropdown, Menu, Button, Icon } from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import ExtraContent from './ExtraContent'
import _ from 'lodash';

export enum headerType {
  icon,
  line,
  num
}
interface HeaderIF {
  type?: headerType,
  bottomLine?: boolean,
  title?: string | ReactNode,
  beforeExtra?: ReactNode,
  extra?: ReactNode,
  icon?: string | ReactNode,
  color?: string,
  style?: object,
  className?: string,
  [props: string]: any
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
    num = "1",
    color = 'var(--text-color)',
    style = {},
    className,
    ...restProps
  } = props;

  const wrapperRef = useRef(null)
  const outerRef = useRef(null)
  const [hiddenStartIndex, setHiddenStartIndex] = useState(0);
  // const [numberArr, setNumberArr] = useState([])
  const [toolsHeight, setToolsHeight] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [tools, setTools] = useState([]);
  //打平extra

  useEffect(() => {
    if (_.isEmpty(extra)) { return }
    let toolsCollection = React.Children.toArray(extra)
    let toolsArr = []
    const interator = (items, parentIndex) => {
      React.Children.map(items, (item, index) => {
        if (item && item.type && item.type.toString() === 'Symbol(react.fragment)') {
          interator([item.props.children], index)
        } else {
          if (React.isValidElement(item) || typeof (item) === 'string') {
            toolsArr.push(
              item
            )
          }
        }
      })
    }
    //过滤掉fragment
    interator(toolsCollection, 0)
    if (_.isEqual(tools, toolsArr)) return;
    setTools(toolsArr)
  }, [extra, tools])
  //计算隐藏index
  const onResize = useCallback(() => {
    if (tools.length <= 1) return;
  }, [tools])
  const renderBlockContent = useMemo(() => {
    return React.Children.map(tools, (item) => {
      return React.cloneElement(item)
    })
  }, [tools])
  //收缩的内容
 
  const getPrefixCls = (cls) => 'gant-' + cls;
  const width = '100%';
  const prefixCls = 'gant-blockheader';
  const clsString = classnames(prefixCls, className);
  return (
    <div className={clsString} style={{ borderBottom: bottomLine && '1px solid rgba(128,128,128,0.2)', ...style }} {...restProps}>
      <div className={prefixCls + '-wrapper'}>
        <div className={prefixCls + '-beforeExtra'}>
          {beforeExtra}
        </div>
        {type == 'icon' && <div className={prefixCls + '-icon'} style={{ color: color }}>
          {typeof icon === 'string' && <Icon type={icon} />}
          {typeof icon === 'object' && { icon }}
        </div>}
        {type == 'line' && title && <div className={prefixCls + '-line'} style={{ background: color }}></div>}
        {type == 'num' && <div className={prefixCls + '-num'} style={{ background: color }}>{num}</div>}
        <div className={prefixCls + '-title'} style={{ color: color }}>{title}</div>
        <div ref={wrapperRef} className={getPrefixCls('overflow-tool-outer')}>
          <div className={getPrefixCls('overflow-tool-inner')} style={{ width: width }} >
            <ReactResizeDetector handleWidth handleHeight onResize={onResize} key={1}>
              {extra && <ExtraContent tools={tools} prefixCls={prefixCls} />}
            </ReactResizeDetector>
            
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header