import React from 'react'
import { omit } from 'lodash'
import { DatePicker as AntDatePicker } from 'antd'
import { compose, defaultProps, toClass } from 'recompose'
import classnames from 'classnames'

import { Group } from '../input'
import { withEdit } from '../compose'
import { getCurTime } from './_utils'




const getText = ({ value, format }) => value ? getCurTime(value, format).format(format) : ''

const withDatePicker = compose(
  toClass,
  defaultProps({
    style: {},
    format: 'YYYY-MM-DD',
    onChange: () => { }
  })
)

@compose(
  withDatePicker,
  withEdit(getText)
)
class DatePicker extends React.Component {

  onChange = (mom, timeString) => {
    const { onChange } = this.props
    onChange(timeString)
  }

  render() {
    const { addonAfter, value, ...props } = this.props
    const className = classnames('gant-calendar-picker', props.className)
    if (addonAfter) {
      return (
        <Group gant>
          <AntDatePicker {...props} value={getCurTime(value, props.format)} className={className} onChange={this.onChange} />
          {addonAfter ? <span className="ant-input-group-addon">{addonAfter}</span> : null}
        </Group>
      )
    }
    return <AntDatePicker {...props} value={getCurTime(value, props.format)} className={className} onChange={this.onChange} />
  }
}


export default DatePicker