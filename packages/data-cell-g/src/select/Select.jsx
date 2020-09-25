import React from 'react'
import propTypes from 'prop-types'
import { isNil, zipWith } from 'lodash'
import { Select as AntSelect, Tag } from 'antd'
import { compose, defaultProps, withPropsOnChange, withState } from 'recompose'

import { Group } from '../input'
import { withEdit } from '../compose'

// 支持boolean类型的传值
const boolMap = new Map(
  [
    ['false', false],
    ['true', true],
    [false, "false"],
    [true, 'true']
  ]
)

function formatBoolValue(value) {
  if (boolMap.has(value)) {
    return boolMap.get(value)
  }
  return value
}

const withSelect = compose(
  defaultProps({
    valueProp: 'value',
    labelProp: 'label',
    style: {},
    dataSource: [],
    allowClear: true,
    mode: '',
    onChange: () => { }
  }),
  withState('label', 'setLabel', null),
  withState('selectRef', 'setSelectRef', null),
  withPropsOnChange(
    ['value'],
    ({ mode, value: originValue, setLabel, dataSource, children }) => {
      if (isNil(originValue)) {
        setLabel(null)
        return
      }

      let value = originValue
      let label = null
      let data = []
      if (!Array.isArray(originValue)) value = [value]
      value = value.map(formatBoolValue)
      if (dataSource && dataSource.length) {
        data = dataSource
      } else if (children) {
        data = React.Children.map(children, item => {
          const { value, children, label } = item.props
          return {
            value,
            label: label || children
          }
        })
      }
      label = value.map(v => {
        const currentItem = data.find(source => source.value === v) // datasource中使用key、或者value
        if (currentItem && currentItem.label) {
          return currentItem.label
        }
      })
      if (['multiple', 'tags'].includes(mode)) {
        setLabel(label)
      } else {
        setLabel(label[0])
      }
    }
  )
)

@compose(
  withSelect,
  withEdit(({ label, mode }) => {
    if (!label || !label.length) return ''
    if (mode === 'multiple') {
      return label.filter(Boolean).join('、')
    } else if (mode === 'tags') {
      return label.filter(Boolean).map(l => <Tag key={l}>{l}</Tag>)
    }
    return label
  }),
  // 计算lanbelinvalue需要的value
  withPropsOnChange(
    ['value', 'label'],
    ({ mode, value: originValue, label }) => {
      // console.log(originValue, label)
      if (isNil(originValue)) return { value: undefined }

      let value = originValue
      if (!Array.isArray(originValue)) value = [value]
      if (['multiple', 'tags'].includes(mode)) {
        return {
          value: zipWith(value, label, (key, label) => ({ key, label }))
        }

      } else {
        return {
          value: {
            key: value[0],
            label: label
          }
        }
      }
    }
  )
)
class Select extends React.Component {

  static properTypes = {
    mode: propTypes.oneOf(['multiple', 'tags'])
  }

  onSelect = (...args) => {
    const { onSelect, selectRef, mode } = this.props

    if (onSelect && typeof onSelect === 'function') {
      onSelect(...args)
    }
    if (!['multiple', 'tags'].includes(mode)) { // 单选的情况下、选中失焦
      setTimeout(() => {
        selectRef.blur()
      }, 0)
    }
  }

  onChange = (selected) => {
    const { onChange: originOnChange, setLabel } = this.props;
    const isArray = Array.isArray(selected)
    const value = isArray ? selected : [selected]
    const [keys, label] = (['key', 'label']).map(key => value.map(v => v && v[key]))
    const formatedValue = isArray ? keys.map(formatBoolValue) : formatBoolValue(keys[0])
    const formatedLabel = isArray ? label : label[0]
    originOnChange(formatedValue)
    setLabel(formatedLabel)
  }

  renderSelect = () => {
    const { dataSource = [], style: { width, ...style }, children, setSelectRef, valueProp, labelProp, ...props } = this.props
    return (
      <AntSelect
        dropdownMatchSelectWidth={false}
        {...props}
        ref={setSelectRef}
        labelInValue
        style={style}
        onSelect={this.onSelect}
        onChange={this.onChange}
        className={'gant-select'}
      >
        {
          children ? children : dataSource.map((item) => {
            const formatValue = String(item[valueProp])
            return <AntSelect.Option value={formatValue} key={formatValue}>{item[labelProp]}</AntSelect.Option>
          })
        }
      </AntSelect>
    )
  }

  render() {
    const { addonAfter, style, className } = this.props

    return (
      <Group gant style={style} className={className}>
        {this.renderSelect()}
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }
}
Select.Option = AntSelect.Option

export default Select