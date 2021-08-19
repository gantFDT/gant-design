import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { compose, defaultProps, toClass } from 'recompose';
import classnames from 'classnames';
import { withEdit } from '../compose';
import { getCurTime } from './_utils';
import { PickerProps, DatePickerMode } from 'antd/lib/date-picker/interface';
import { WithBasicProps } from '../compose/withbasic';
import moment from 'moment';
import RangePicker from './RangePicker';
import GantdDatePicker from './GantdDatePicker';
export interface GantDatePickerProps extends PickerProps, WithBasicProps {
  onChange?: (time: string) => void;
  value?: moment.Moment | string | null;
  defaultValue?: moment.Moment | string | null;
  defaultPickerValue?: moment.Moment | string | null;
  placeholder?: string;
  renderExtraFooter?: (mode: DatePickerMode) => React.ReactNode;
}
const getText = ({ value, format }) => (value ? getCurTime(value, format).format(format) : '');
const withDatePicker = compose(
  toClass,
  defaultProps({
    style: {},
    format: 'gggg-wo',
    onChange: () => {},
  }),
);

@compose(withDatePicker, withEdit(getText, 'ant-calendar-picker-container'))
class DatePicker extends React.Component<GantDatePickerProps> {
  static RangePicker: typeof RangePicker;
  static GantdDatePicker: typeof GantdDatePicker;
  onChange = (mom, timeString) => {
    const { onChange } = this.props;
    onChange(timeString);
  };
  render() {
    const { value, defaultPickerValue, defaultValue, ...props } = this.props;
    const className = classnames('gant-calendar-picker', props.className);
    return (
      <AntDatePicker
        {...props}
        value={getCurTime(value, props.format)}
        defaultValue={getCurTime(defaultValue, props.format)}
        defaultPickerValue={getCurTime(defaultPickerValue, props.format)}
        className={className}
        onChange={this.onChange}
      />
    );
  }
}

export default DatePicker;
