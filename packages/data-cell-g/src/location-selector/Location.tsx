import React, { Component } from 'react'
import { Cascader } from 'antd'
import classnames from 'classnames'
import json from './district_zh.json'
import { withEdit } from '../compose'
import { compose, defaultProps, toClass } from 'recompose';
import { WidthBasicProps } from '../compose/widthbasic';

export interface LocationProps extends WidthBasicProps {
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  value?: string[];
  onChange?: (value: string[]) => void,
  popupClassName?: string,
  onPopupVisibleChange?: (popupVisible: boolean) => void
}


const transformData = ($code, level = 1) => Object.entries(json[$code]).map(([code, name]) => {
  const item: any = {
    label: name,
    value: code,
  }
  // 根据code找到子级单位
  // 确保不会有同名代码或者子级里面的同名代码对应的名字不同
  if (json[code] && (!json[code][code] || json[code][code] !== name)) {
    if (level < 3) {
      item.children = transformData(code, level + 1)
    }
  }
  return item
})

// 获取位置的名称列表
const getLocationNameList = locationList => {
  const nameList = []
  const country = json.COUNTRIES
  if (locationList && locationList.length) {
    locationList.forEach((code, index) => {
      if (index === 0) {
        nameList.push(country[code] || '未知地址')
      }
      else {
        const prevCode = locationList[index - 1]
        const currentCodeList = json[prevCode]
        if (currentCodeList) {
          nameList.push(currentCodeList[code] || '未知地址')
        }
      }
    })
  }
  return nameList
}

// 获取地址的展示值
const getValue = ({ value }) => {
  const msg = getLocationNameList(value)
  return msg.join(' / ')
}


const withLocation = compose(
  toClass,
  defaultProps({
    style: {},
    options: transformData('COUNTRIES'),
    placeholder: '请选择地址'
  })
)


@compose(
  withLocation,
  withEdit(getValue, 'gant-location-cascader-popup')
)
class Location extends React.Component<any> {

  render() {

    const { onEnter, className, popupClassName, ...props } = this.props

    return (
      <Cascader
        {...props}
        className={classnames('gant-location-cascader', className)}
        changeOnSelect
        popupClassName={classnames('gant-location-cascader-popup', popupClassName)}
        showSearch={{
          filter: (value, paths) => paths.some((option: any) => (option.label).toLowerCase().indexOf(value.toLowerCase()) > -1)
        }}
      />
    )
  }
}

export default class LocationWrapper extends Component {
  static getLocationName: (list: any) => void
  render() {
    return <Location {...this.props} />
  }
}

LocationWrapper.getLocationName = locationList => {
  const nameList = getLocationNameList(locationList)
  return nameList
}



