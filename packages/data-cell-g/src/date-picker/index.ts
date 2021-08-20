import DatePicker from './DatePicker';
import GantdDatePicker, { WraperDatePick as _WraperDatePick } from './GantdDatePicker';
import RangePicker from './RangePicker';

DatePicker.RangePicker = RangePicker;
DatePicker.GantdDatePicker = GantdDatePicker;
export default DatePicker;
export const WraperDatePick = _WraperDatePick;
