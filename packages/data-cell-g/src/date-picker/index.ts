type DatePickerShape = {
    RangePicker?: any
}

import DatePicker from './DatePicker'
import RangePicker from './RangePicker'

(<DatePickerShape>DatePicker).RangePicker = RangePicker

export default DatePicker
export {
    RangePicker
}