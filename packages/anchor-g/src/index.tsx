import './index.less';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Dropdown, Menu, Anchor, Icon, Tooltip } from 'antd';
import classnames from 'classnames'

const GantAnchor = (props) => {
  let {
    prefixCls: customizePrefixCls = 'gant',
    list = [],
    content,
    fixedTop = 0,
    layout = 'vertical',
    onLayoutChange,
    minHeight = 400,
    className,
    style,
    ...nextProps
  } = props
  const [stateMode, setStateMode] = useState(layout)
  const [currentId, setId] = useState(list.length ? list[0].id : '') //当前选中id，进入页面默认选中第一
  const [leftArrowsShow, setLeftArrowsShow] = useState(false)   //左侧箭头
  const [rightArrowsShow, setRightArrowsShow] = useState(false) //右侧箭头
  const [menuArrowsShow, setMenuArrowsShow] = useState(true)
  const [silderIdWidth, setSilderIdWidth] = useState(0)          //List外层宽度
  const [contentWidth, setContentWidth] = useState(0)            //List实际宽度
  const [isClickScroll, setIsClickScroll] = useState(false)     //页面滚动判断是点击后的滚动还是手动的滚动
  let scrollHeight = 0;                                         // 滚动的值
  let m2 = 0;                                                   // 对比时间的值
  let timer = null;
  const Data = useCallback((e) => {
    m2 = document.documentElement.scrollTop || document.body.scrollTop;
    if (m2 == scrollHeight) {
      if (isClickScroll) {
        setIsClickScroll(false)
      }
    }
  }, [isClickScroll, setIsClickScroll])

  //   //滚动时触发
  const handleScroll = useCallback((e) => {
    const fixedEle = document.getElementById('anchorBoxId');//定位元素
    const fixedEleParent = document.querySelector('.gant-gantanchor-horAnchorOut');//定位元素的父元素

    if (fixedEle && stateMode == 'horizontal') {
      clearTimeout(timer);
      timer = setTimeout(Data, 300);
      const parentClientTop = fixedEleParent ? fixedEleParent.getBoundingClientRect().top : 0 //定位元素父级距离浏览器的高度
      scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
      const menuboxhor = document.querySelector('.gant-submenu-menuboxhor'); //anchor的外层card
      const extraheight = menuboxhor ? menuboxhor['offsetHeight'] : 0
      if (fixedEle) {
        if (parentClientTop <= (fixedTop + extraheight)) {
          fixedEle.classList.add('gant-gantanchor-activeScroll')
          const active = document.querySelector('.gant-gantanchor-activeScroll');
          active['style'].top = `${fixedTop + extraheight}px`;
          active['style'].width = `${fixedEleParent['offsetWidth']}px`;
        } else if (parentClientTop > (fixedTop + extraheight)) {
          fixedEle.classList.remove('gant-gantanchor-activeScroll')
        }
      }
      if (!isClickScroll) { //水平方向锚点跟随页面滚动高亮
        list.map((item) => {
          const id = document.getElementById(item.id);
          if ((id.getBoundingClientRect().top) > fixedTop + extraheight + 10 && id.getBoundingClientRect().top <= (document.body.clientHeight - extraheight) / 2) { //这里的44是水平锚点条高度
            setId(item.id)
          }
        })
      }
    }
  }, [stateMode, setId, isClickScroll])

  //   //点击左右箭头
  const handleMobileTabs = useCallback((e) => {
    const contentId = document.getElementById('contentId');
    const left = contentId.offsetLeft;
    const right = contentWidth - silderIdWidth + left;
    if (e == 'left') {
      if (left < 0 && left > -500) {
        contentId.style.left = '0px';
      } else if (left < -500) {
        contentId.style.left = `${left + 500}` + 'px';
      }
      const newLeft = contentId.offsetLeft;
      setLeftArrowsShow(newLeft == 0 ? false : true)
      setRightArrowsShow(true)
    } else {
      if (right > 0 && right < 500) {
        contentId.style.left = `${left - right}` + 'px';
      } else if (right >= 0 && right > 500) {
        contentId.style.left = `${left - 500}` + 'px';
      }
      const newRight = contentWidth - silderIdWidth + contentId.offsetLeft;
      setLeftArrowsShow(true)
      setRightArrowsShow(newRight == 0 ? false : true)
    }
  }, [contentWidth, silderIdWidth, setLeftArrowsShow, setRightArrowsShow])

  useEffect(() => {
    setStateMode(stateMode)
  }, [setStateMode])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) //监听滚动
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, setIsClickScroll])

  useEffect(() => {
    const silderId = document.getElementById('silderId');
    const contentId = document.getElementById('contentId');
    const silderIdWidth = silderId ? silderId.offsetWidth : 0;
    const contentWidth = contentId ? contentId.offsetWidth : 0;
    setSilderIdWidth(silderIdWidth);
    setContentWidth(contentWidth);
    setRightArrowsShow(stateMode == 'horizontal' ? (silderIdWidth < contentWidth ? true : false) : false);
    setMenuArrowsShow(stateMode == 'horizontal' ? (silderIdWidth < contentWidth ? true : false) : false);
  }, [stateMode, setSilderIdWidth, setContentWidth, setRightArrowsShow, setMenuArrowsShow])

  //水平方向锚点事件
  const scrollToAnchor = useCallback((anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) { anchorElement.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
      setId(anchorName)
      setIsClickScroll(true)
    }
  }, [setId, setIsClickScroll])

  //水平方向锚点menu内容
  const menu = useMemo(() => {
    return (<Menu selectedKeys={[currentId]}>
      {
        list.map((item) => {
          return <Menu.Item key={item.id} onClick={() => scrollToAnchor(item.id)}>
            {item.title}
          </Menu.Item>
        })
      }
    </Menu>)
  }, [currentId, list]);

  //锚点方向切换
  const onSwitchClick = useCallback((e) => {
    setStateMode(stateMode == 'vertical' ? 'horizontal' : 'vertical')
    onLayoutChange && onLayoutChange(stateMode == 'vertical' ? 'horizontal' : 'vertical')
  }, [stateMode, setStateMode])


  const prefixCls = customizePrefixCls + '-gantanchor';
  return (
    <>
      {stateMode == 'vertical' ?
        <div className={classnames(className, `${prefixCls}-verticallayout`)} style={{ ...style }}>
          <div style={{ padding: '0px', minHeight, width: 'calc(100% - 150px)' }}>
            {content}
          </div>
          <div className='gant-anchor-verticalbox' style={{ width: 150, paddingLeft: '10px', paddingTop: '10px' }}>
            <Anchor offsetTop={28} onClick={(e) => { e.preventDefault() }} {...nextProps}>
              <Icon type="switcher" onClick={onSwitchClick} style={{ width: '100%', paddingRight: '10px', textAlign: 'right' }} />
              {list.map(item => <Anchor.Link key={item.key || item.title} href={`#${item.id || item.title}`} title={<>
                <Tooltip title={item.title}>{item.title}</Tooltip>
                {item.complete ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ paddingLeft: "5px" }} /> : null}
              </>} />)}
            </Anchor>
          </div>
        </div>
        :
        <div className={classnames(className, 'gant-card-horizontalanchor')} style={{ padding: '0 0 10px', zIndex: 1, minHeight, ...style }}>
          <div className={`${prefixCls}-horAnchorOut`}>
            <div className={`gant-gantanchor`} id='anchorBoxId' style={{ zIndex: 1 }}>
              <Icon type="left" style={{ display: leftArrowsShow ? 'block' : 'none', float: 'left' }} className={`${prefixCls}-iconCss`} onClick={() => handleMobileTabs('left')} />
              <div className={`${prefixCls}-silderCss`} id='silderId'>
                <div className={`${prefixCls}-contentCss`} id='contentId'>
                  {
                    list.map((item) => {
                      let nowCss = item.id == currentId ? 'activeCss' : '';
                      return <a className={`${prefixCls}-aCss`} key={item.id} onClick={() => scrollToAnchor(item.id)}><span className={`${prefixCls}-${nowCss}`}>{<>{item.title}{item.complete ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ paddingLeft: "5px" }} /> : null}</>}</span></a>
                    })
                  }
                </div>
              </div>
              <Icon type="switcher" onClick={onSwitchClick} className={`${prefixCls}-iconCss`} style={{ float: 'right' }} />
              <Dropdown overlay={menu}
                // style={{ display: menuArrowsShow ? 'block' : 'none' }}
                placement="bottomRight">
                <Icon type="down" className={`${prefixCls}-iconCss`} style={{ float: 'right' }} />
              </Dropdown>
              <Icon type="right" style={{ display: rightArrowsShow ? 'block' : 'none', float: 'right' }} className={`${prefixCls}-iconCss`} onClick={() => handleMobileTabs('right')} />
            </div>
          </div>
          <div id='gant-anchor-content' style={{ padding: '0', minHeight }}>
            {content}
          </div>
        </div>
      }
    </>
  )

}

export default GantAnchor