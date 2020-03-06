import React from 'react'
import { Cascader } from 'antd'
import json from './district_zh.json'

import { Group } from '../input'
import { withEdit } from '../compose'
import { compose, defaultProps, toClass } from 'recompose';


const transformData = ($code, level = 1) => Object.entries(json[$code]).map(([code, name]) => {
  const item = {
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
  withEdit(getValue)
)
class Location extends React.Component {

  render() {

    const { onEnter, ...props } = this.props

    return (
      <Cascader
          {...props}
          className={'gant-location-cascader'}
          changeOnSelect
          showSearch={{
            filter: (value, paths) => paths.some(option => (option.label).toLowerCase().indexOf(value.toLowerCase()) > -1)
          }}
        />
    )
  }
}

export default Location

Location.getLocationName = locationList => {
  const nameList = getLocationNameList(locationList)
  return nameList
}



