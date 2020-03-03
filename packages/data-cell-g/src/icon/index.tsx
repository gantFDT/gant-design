import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Drawer, Radio, Empty } from 'antd'
import { CustomIconOptions } from 'antd/lib/icon/IconFont'
import classnames from 'classnames'
import _ from 'lodash'
import { compose, defaultProps, toClass, setStatic } from 'recompose'

import './index.less';
import { Input, EditStatus, Group } from '..'
import Icon, { IconComponent, IconProps } from './Icon'
import { withEdit } from '../compose'
import { WithEditInProps, WithEditOutProps } from '../compose/withEdit'


const tr = a => a

const { getOutLine, updateFromIconfontCN, Ant } = Icon
const outline = getOutLine()

const bodyStyle = {
  height: 'calc(100vh - 41px)',
  padding: 10,
  overflow: 'hidden'
}

enum IconTypes {
  IconFont = 'IconFont',
  AntIcon = 'AntIcon'
}


const defaultprops = {
  allowEdit: false,
  perfix: 'icon-'
  // onChange(icon: string) { },
  // value: '',
}

type PropExtend<T, U> = U & {
  [K in Exclude<keyof T, keyof U>]?: T[K]
}

type BasicProps = PropExtend<
  IconProps,
  PropExtend<typeof defaultprops, {
    onBlur?: Function,
    [key: string]: any,
  }>
>

type IconHouseProps<T> = BasicProps & WithEditOutProps<T>

type IconSelectorProps<T> = PropExtend<WithEditInProps<T>, BasicProps>


const IconHouse: React.FC<IconHouseProps<string>> = ({ onChange, value, onBlur = undefined, addonAfter, allowEdit, onEnter, ...props }) => {
  const prefixCls = 'gant-icon-selector';

  // 图标抽屉
  const [visible, setvisible] = useState(false)
  // 图标id
  const [IDs, setIDs] = useState([] as string[])
  // 搜索框
  const [text, settext] = useState('')
  // 当前icon
  const [currentId, setCurrentId] = useState(value)
  // 当前显示的图标类型

  const iconTypes = useMemo(() => {
    let iconTypeArr = [IconTypes.AntIcon]
    if (!_.isEmpty(IDs)) {
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
      return id.includes(text)
    })
  ), [icons, iconType, text])

  return (
    <div ref={ref} className="gant-icon-selector-wrapper">
      <Group gant>
        <div className="gant-icon-select" onClick={toggleVisible}>
          {
            currentId ? <Icon type={currentId} title={tr('点击切换')} {...props} /> : <span className={prefixCls + 'select-btn'}>{tr('点击选择')}</span>
          }
        </div>
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : undefined}
      </Group>
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

interface IconSelectorCmp {
  (props: IconSelectorProps<string>): React.ReactElement,
  updateFromIconfontCN: (config: CustomIconOptions) => void,
  Ant: IconComponent<IconProps>
}

const IconSelector = compose(
  toClass,
  defaultProps(defaultprops),
  withEdit(({ value, style, theme, spin, rotate, component, twoToneColor }) => value ? <Icon type={value} style={style} theme={theme} spin={spin} rotate={rotate} component={component} twoToneColor={twoToneColor} /> : undefined)
)(IconHouse) as IconSelectorCmp

IconSelector.updateFromIconfontCN = updateFromIconfontCN
IconSelector.Ant = Ant

export default IconSelector;

export {
  IconSelector
}