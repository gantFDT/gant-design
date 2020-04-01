import React from 'react'
import classnames from 'classnames'
import { isUndefined, } from 'lodash'
import { DatePicker } from 'antd'
import { compose, defaultProps, toClass } from 'recompose'
import { getCurTime } from './_utils'
import { withEdit } from '../compose'
import { PickerProps, RangePickerValue, RangePickerPresetRange } from 'antd/lib/date-picker/interface'
import { WithBasicProps } from '../compose/withbasic';
import { TimePickerProps } from 'antd/lib/time-picker';
type GantRangePickerValue = RangePickerValue | [string] | [undefined, string] | [string, undefined] | [null, string] | [string, null] | [string, string]
export interface GantRangePickerProps extends PickerProps, WithBasicProps {
  className?: string;
  tagPrefixCls?: string;
  value?: GantRangePickerValue;
  defaultValue?: GantRangePickerValue;
  defaultPickerValue?: GantRangePickerValue;
  timePicker?: React.ReactNode;
  onChange?: (dateStrings: [string, string]) => void;
  onCalendarChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  onOk?: (selectedTime: RangePickerPresetRange) => void;
  showTime?: TimePickerProps | boolean;
  showToday?: boolean;
  ranges?: {
    [range: string]: RangePickerPresetRange;
  };
  placeholder?: [string, string];
  mode?: string | string[];
  separator?: React.ReactNode;
  disabledTime?: (current: RangePickerValue, type: string) => {
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
  };
  onPanelChange?: (value?: RangePickerValue, mode?: string | string[]) => void;
  renderExtraFooter?: () => React.ReactNode;
  onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
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
class RangePicker extends React.Component<GantRangePickerProps> {

  onChange = (mom: RangePickerValue, timeStringArr: [string, string]) => {
    const { onChange } = this.props
    onChange(timeStringArr)
  }
  getValue = (value) => {
    const { format } = this.props
    let formateValue: any[] = value
    if (!isUndefined(formateValue)) {
      if (!Array.isArray(formateValue)) {
        formateValue = [formateValue]
      }
      formateValue = formateValue.map(time => getCurTime(time, format))
    }
    return formateValue
  }

  render() {
    const { className, value, defaultPickerValue, defaultValue, style, ...props } = this.props
    return (
      <DatePicker.RangePicker
        {...props}
        defaultPickerValue={this.getValue(defaultPickerValue)}
        defaultValue={this.getValue(defaultPickerValue)}
        value={this.getValue(value)}
        onChange={this.onChange}
        style={{ ...style, width: "100%" }}
        className={classnames('gant-calendar-picker', className)} />
    )
  }
}

export default RangePicker
