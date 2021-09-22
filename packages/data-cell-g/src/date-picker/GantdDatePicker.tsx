import { DatePickerProps } from 'antd/lib/date-picker/interface';
import classnames from 'classnames';
import { DatePicker } from 'antd';
import * as moment from 'moment';
import * as React from 'react';
import { compose, defaultProps, toClass } from 'recompose';
import { withEdit } from '../compose';
import { getCurTime } from './_utils';

const { WeekPicker } = DatePicker;
interface GantDatePickerProps extends Omit<DatePickerProps, 'format' | 'onChange'> {
  onChange?: (value: string, time: moment.Moment) => void;
  format?: string;
}

function formatValue(value: moment.Moment | null, format: string): string {
  return (value && value.format(format)) || '';
}

const getText = ({ value, format }) => (value ? getCurTime(value, format).format(format) : '');

interface WeekPickerState {
  open: boolean;
  value: moment.Moment | null;
}

@compose<GantDatePickerProps>(withEdit(getText, 'ant-calendar-picker-container'))
class GantDatePicker extends React.Component<GantDatePickerProps, WeekPickerState> {
  onChange = (mom, timeString) => {
    const { onChange } = this.props;
    onChange(timeString, mom);
  };
  render() {
    const { value, defaultPickerValue, defaultValue, onChange, ...props } = this.props;
    const className = classnames('gant-calendar-picker', props.className);
    const dropdownClassName = classnames('gant-calendar', props.dropdownClassName);
    const restprops = {
      value,
      defaultPickerValue,
      defaultValue,
    };
    Object.keys(restprops).map(name => {
      if (Reflect.has(restprops, name)) restprops[name] = getCurTime(restprops[name], props.format);
      else delete restprops[name];
    });
    return (
      <WeekPicker
        {...props}
        {...restprops}
        onChange={this.onChange}
        className={className}
        dropdownClassName={dropdownClassName}
      />
    );
  }
}

export default GantDatePicker;
