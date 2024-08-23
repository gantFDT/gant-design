import { DatePicker as AntDatePicker } from 'antd';
import { DatePickerMode, PickerProps } from 'antd/lib/date-picker/interface';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { compose, defaultProps, toClass } from 'recompose';
import { withEdit } from '../compose';
import { WithBasicProps } from '../compose/withbasic';
import GantdDatePicker from './GantdDatePicker';
import RangePicker from './RangePicker';
import { getCurTime } from './_utils';
const { WeekPicker } = AntDatePicker;
export interface GantDatePickerProps extends PickerProps, WithBasicProps {
  onChange?: (time: string) => void;
  value?: moment.Moment | string | null;
  defaultValue?: moment.Moment | string | null;
  defaultPickerValue?: moment.Moment | string | null;
  placeholder?: string;
  renderExtraFooter?: (mode: DatePickerMode) => React.ReactNode;
  defaultOpen?: boolean;
}
export interface PickerState {
  open: boolean;
}
const getText = ({ value, format }) => (value ? getCurTime(value, format).format(format) : '');
const withDatePicker = compose(
  toClass,
  defaultProps({
    style: {},
    format: 'YYYY-MM-DD',
    onChange: () => {},
  }),
);

@compose(withDatePicker, withEdit(getText, 'ant-calendar-picker-container'))
class DatePicker extends React.Component<GantDatePickerProps, PickerState> {
  static RangePicker: typeof RangePicker;
  static GantdDatePicker: typeof GantdDatePicker;
  static WraperDatePick: any;
  constructor(props) {
    super(props);
    this.state = {
      open: props?.defaultOpen,
    }
  }
  onChange = (mom, timeString) => {
    const { onChange } = this.props;
    onChange(timeString);
  };
  handleOpenChange = (open: boolean) => {
    const { onOpenChange } = this.props;
    if (!('open' in this.props)) {
      this.setState({ open });
    }

    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  render() {
    const { value, defaultPickerValue, defaultValue, ...props } = this.props;
    const { open } = this.state;
    const className = classnames('gant-calendar-picker', props.className);
    return (
      <AntDatePicker
        {...props}
        value={getCurTime(value, props.format)}
        defaultValue={getCurTime(defaultValue, props.format)}
        defaultPickerValue={getCurTime(defaultPickerValue, props.format)}
        className={className}
        onChange={this.onChange}
        open={open}
        onOpenChange={this.handleOpenChange}
      />
    );
  }
}

export default DatePicker;
