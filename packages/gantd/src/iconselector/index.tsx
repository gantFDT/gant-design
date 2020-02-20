/* eslint-disable compat/compat */
/* eslint-disable no-useless-escape */

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Drawer, Radio, Empty } from 'antd'
import { ConfigContext } from '@gantd/config-provider';
import { Icon, Input, EditStatus } from '../'
import classnames from 'classnames'
import './index.less';
// import styles from './index.less'
// import { tr } from '../formatmessage';
const tr = a => a
import _ from 'lodash'


const { getOutLine } = Icon
const outline = getOutLine()
const iconstyle = {
  // transform: "scale(1.5) translate(3.5px,0)"
  display: 'inline-block',
  cursor: 'pointer'
}
const bodyStyle = {
  height: 'calc(100vh - 41px)',
  padding:10,
  overflow: 'hidden'
}

enum IconTypes {
  IconFont = 'IconFont',
  AntIcon = 'AntIcon'
}





type IconHouseProps = {
  onBlur?: Function,
  value: string,
  onChange(icon: string): void,
} & Partial<typeof defaultProps>

const IconHouse: React.FC<IconHouseProps> = ({ inForm, onChange, value, onBlur = undefined }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon-selector');

  // 图标抽屉
  const [visible, setvisible] = useState(false)
  // 图标id
  const [IDs, setIDs] = useState([] as string[])
  // 搜索框
  const [text, settext] = useState()
  // 当前icon
  const [currentId, setCurrentId] = useState(value)
  // 当前显示的图标类型

  const iconTypes = useMemo(() => {
    let iconTypeArr = [IconTypes.AntIcon]
    if(!_.isEmpty(IDs)){
      iconTypeArr.push(IconTypes.IconFont)
    }
    return iconTypeArr
  }, [IDs])

  const [iconType, seticonType] = useState(iconTypes[0])

  const icons = useMemo(() => ({
    IconFont: IDs,
    AntIcon: outline
  }), [IDs])

  
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current) {
        // 点击了其他区域
        if (!ref.current.contains(e.target as Node)) {
          if (onBlur && typeof onBlur === 'function') {
            onBlur()
          }
        }
      }

    }
    window.addEventListener('click', click, false)
    return () => {
      window.removeEventListener('click', click)
    };
  }, [ref, onBlur])

  useEffect(() => {
    setCurrentId(value)
  }, [value])

  const toggleVisible = useCallback(
    () => {
      if (!visible) { // 打开
        settext('')
      }
      setvisible(!visible)
    },
    [visible],
  )

  const onSelectIcon = useCallback((id: string) => {
    setCurrentId(id)
    if (onChange) onChange(id)
    toggleVisible()
  }, [])

  // 获取图标id
  useState(() => {
    // const tag = queryIconHouse(iconWareHouse)
    const tag = document.querySelector('svg');
    if (!tag) return
    const iconIds = [].slice.call(tag.querySelectorAll('symbol')).map((symbol: Element) => symbol.id)
    setIDs(iconIds)
  })

  // 切换图标
  const handleTypeChange = useCallback(
    (e) => {
      seticonType(e.target.value)
    },
    [],
  )

  const iconsWithFilter = useMemo(() => (
    icons[iconType].filter(id => {
      // if (text) {
      //   const findIndex = [...text].reduce((start, word) => {
      //     if (start === -1) return start
      //     const index = id.indexOf(word, start)
      //     // 没有搜索到
      //     if (index === -1) return -1
      //     return index + 1
      //   }, 0)
      //   if (findIndex === -1) return false
      // }
      // return true
      return id.includes(text)
    })
  ), [icons, iconType, text])

  return (
    <div ref={ref}>
      <div style={inForm ? { ...iconstyle, minWidth: 12 } : iconstyle} onClick={toggleVisible}>
        {
          currentId ? <Icon type={currentId} title={tr('点击切换')} style={inForm ? iconstyle : {}} /> : <span className={prefixCls + 'select-btn'}>{tr('点击选择')}</span>
        }
      </div>
      <Drawer
        width={visible ? 500 : 0}
        title={tr("请选择图标")}
        destroyOnClose
        placement='right'
        onClose={toggleVisible}
        visible={visible}
        bodyStyle={bodyStyle}
        getContainer={ref.current as HTMLElement}
      >
        <div className={classnames(prefixCls + '-search')}>
          <Radio.Group value={iconType} onChange={handleTypeChange}>
            {
              iconTypes.map(type => <Radio.Button key={type} value={type}>{type}</Radio.Button>)
            }
          </Radio.Group>
          <div style={{ flex: 1, marginLeft: 10, }}>
            <Input edit={EditStatus.EDIT} value={text} onChange={settext} placeholder={tr('搜索')} allowClear />
          </div>
        </div>
        <div className={classnames(prefixCls + '-scroll')}>
          {iconsWithFilter.length ? null : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={tr('没有匹配图标')} style={{ margin: '30px auto 0' }} />}
          <div className={classnames(prefixCls + '-content')}>
            {
              iconsWithFilter.map(id => (
                <div className={prefixCls + '-content-item'} title={id} key={id} onClick={() => onSelectIcon(id)}>
                  <Icon type={id} className={prefixCls + '-content-item-iconitem'} />
                  <div style={{ width: '100%' }}>{id}</div>
                </div>
              ))
            }
          </div>
        </div>
      </Drawer>
    </div>
  )
}

const defaultProps = {
  inForm: true,
  onChange(icon: string) { },
  value: '',
}

IconHouse.defaultProps = defaultProps

export default IconHouse