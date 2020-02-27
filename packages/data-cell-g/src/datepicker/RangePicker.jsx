import React from 'react'
import { isUndefined } from 'lodash'
import { DatePicker } from 'antd'
import { compose, defaultProps, toClass } from 'recompose'

import { Group } from '../input'
import { getCurTime } from './_utils'
import { withEdit } from '../compose'


const getValue = ({ value, format, separator }) => {

  if (!value) return null
  let formateValue = value
  if (!Array.isArray(formateValue)) {
    formateValue = [formateValue]
  }

  const text = formateValue.map(time => getCurTime(time, format).format(format))
  return text.join(` ${separator} `)
}


const withRangePicker = compose(
  toClass,
  defaultProps({
    style: {},
    format: 'YYYY-MM-DD',
    separator: '~',
    onChange: () => { }
  })
)

@compose(
  withRangePicker,
  withEdit(getValue)
)
class RangePicker extends React.Component {

  onChange = (mom, timeStringArr) => {
    const { onChange } = this.props
    onChange(timeString)
  }

  getValue = () => {
    const { value, format } = this.props
    let formateValue = value
    if (!isUndefined(formateValue)) {
      if (!Array.isArray(formateValue)) {
        formateValue = [formateValue]
      }
      formateValue = formateValue.map(time => getCurTime(time, format))
    }
    return formateValue
  }

  render() {
    const { addonAfter, className, ...props } = this.props


    return (
      <Group gant className={className}>
        <DatePicker.RangePicker {...props} value={this.getValue()} className={'gant-calendar-picker'} />
        {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
      </Group>
    )
  }
}

export default RangePicker
