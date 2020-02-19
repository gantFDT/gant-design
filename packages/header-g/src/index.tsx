import './index.less';
import React, { ReactNode, useRef, useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ConfigContext } from '@gantd/config-provider';
import classnames from 'classnames'
import { Dropdown, Menu, Button } from 'antd'
import Icon from '@gantd/icon';
import ReactResizeDetector from 'react-resize-detector';
import _ from 'lodash'

export enum headerType {
  icon,
  line,
  num
}
interface HeaderIF {
  // id?: string,
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
    // id,
    type = '',
    bottomLine = false,
    title,
    beforeExtra,
    extra = null,
    icon = null,
    num = "1",
    color = '#202020',
    style = {},
    className,
    ...restProps
  } = props;

  const outerRef = useRef(null)
  const dropRef = useRef(null)
  const [hiddenStartIndex, setHiddenStartIndex] = useState(0);
  // const [numberArr, setNumberArr] = useState([])
  const [toolsHeight, setToolsHeight] = useState()
  const [showMore, setShowMore] = useState(false)


  const [tools, setTools] = useState([])

  //打平extra
  useEffect(() => {
    if(_.isEmpty(extra)){return}
    let toolsCollection = React.Children.toArray(extra)
    let tools = []
    const interator = (items, parentIndex) => {
      React.Children.map(items, (item, index) => {
        if (item && item.type && item.type.toString() === 'Symbol(react.fragment)') {
          interator([item.props.children], index)
        } else {
          if (React.isValidElement(item)) {
            tools.push(
              item
            )
          }
        }
      })
    }
    //过滤掉fragment
    interator(toolsCollection, 0)
    setTools(tools)
  }, [extra])


  //计算隐藏index
  const onResize = useCallback(() => {
    if(_.isEmpty(extra)){return}
    const childrenEL = [...outerRef.current.children[0].children,...dropRef.current.children]
    const numberArr = []
    let total = 0
    let toolsHeight: number = 0
    const length = childrenEL.length

    for (let index = 0; index < length; index++) {
      const child = childrenEL[index]

      if (index === 0)//排除space占位
        continue;

      if (child.style.display === 'none') {//排除隐藏的tool
        continue;
      }

      toolsHeight = child.offsetHeight > toolsHeight ? child.offsetHeight : toolsHeight
      let margin = (child.style.marginLeft && parseInt(child.style.marginLeft)) + (child.style.marginRight && parseInt(child.style.marginRight));
      margin = margin ? margin : 10
      total = total + child.offsetWidth + margin;

      numberArr.push(total);
    }

    setToolsHeight(toolsHeight)

    const outerWidth = outerRef.current.offsetWidth - (showMore ? 35 : 0)
    let startIndex = tools.length
    numberArr.map((item, index, arr) => {
      if (outerWidth <= arr[0]) {
        startIndex = 0
        return
      } else if (arr[index] < outerWidth && outerWidth <= arr[index + 1]) {
        startIndex = index
        return
      } else if (outerWidth >= arr[arr.length - 1]) {
        startIndex = tools.length
        return
      }
    })
    if (outerWidth < numberArr[numberArr.length - 1]) {
      setShowMore(true)
    } else {
      setShowMore(false)
    }
    setHiddenStartIndex(startIndex)
  }, [showMore, tools, extra])

  //收缩的内容
  const getDrapContent = useMemo(() => {
    return React.Children.map(tools, (item, index) => {
      if (index >= hiddenStartIndex) {
        return <div style={{ margin: '5px' }}>{item}</div>
      }
    })
  }, [hiddenStartIndex, tools])

  //默认内容
  const getContent = useMemo(() => {
    return React.Children.map(tools, (item, index) => {
      return index < hiddenStartIndex && item
    })
  }, [hiddenStartIndex, tools])


  const getPrefixCls = (cls) => 'gant-' + cls
  const width = '100%'

  const prefixCls = 'gant-blockheader';
  const clsString = classnames(prefixCls, className);

  return (

    <div className={clsString} style={{ borderBottom: bottomLine && '1px solid #edebe9', ...style }} {...restProps}>
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
        <div ref={(ref) => outerRef.current = ref} className={getPrefixCls('overflow-tool-outer')}>
          <div className={getPrefixCls('overflow-tool-inner')} style={{ width: width }} >
            <ReactResizeDetector handleWidth handleHeight onResize={onResize} key={1}>
              <div className={getPrefixCls('overflow-tool-space')}></div>
            </ReactResizeDetector>
            {getContent}

            {showMore && <Dropdown
              trigger={['click']}
              overlay={<Menu style={{ padding: '5px 0' }} >{getDrapContent}</Menu>}
              placement="bottomRight"
              getPopupContainer={(triggerNode) => triggerNode}
              overlayStyle={{ zIndex: 1 }}
              overlayClassName={prefixCls + '-dropdown'}
            >
              <Button icon="ellipsis" className={getPrefixCls('overflow-tool-icon')} style={{ height: toolsHeight,width: toolsHeight}} />
            </Dropdown>}
          </div>
          <div className={prefixCls + '-menu'} style={{ position: 'fixed', top: 0, left: 0,transform:'translateY(-1000px)' }} ref={(ref) => dropRef.current = ref}>{getDrapContent}</div>
        </div>
      </div>
    </div>

  )
}

export default Header