
type DatePickerShape = {
    RangePicker?: any
}

import DatePicker from './DatePicker'
import RangePicker from './RangePicker'

import './index.less'




(<DatePickerShape>DatePicker).RangePicker = RangePicker


export default DatePicker
export {
    RangePicker
}