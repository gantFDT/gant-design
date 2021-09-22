import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
import InputIcon from 'antd/lib/date-picker/InputIcon';
import { DatePickerProps } from 'antd/lib/date-picker/interface';
import wrapPicker from 'antd/lib/date-picker/wrapPicker';
import interopDefault from 'antd/lib/_util/interopDefault';
import { default as classnames, default as classNames } from 'classnames';
import * as moment from 'moment';
import Calendar from 'rc-calendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { compose, defaultProps, toClass } from 'recompose';
import { withEdit } from '../compose';
import Icon from '../icon';
import { getCurTime } from './_utils';
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

const withDatePicker = compose(
  toClass,
  defaultProps({
    format: 'YYYY-MM-DD',
  }),
);
export class DatePicker extends React.Component<any, WeekPickerState> {
  static defaultProps = {
    format: 'gggg-wo',
    allowClear: true,
  };

  static getDerivedStateFromProps(nextProps: any) {
    if ('value' in nextProps || 'open' in nextProps) {
      const state = {} as WeekPickerState;
      if ('value' in nextProps) {
        state.value = nextProps.value;
      }
      if ('open' in nextProps) {
        state.open = nextProps.open;
      }
      return state;
    }
    return null;
  }

  private input: any;

  private prefixCls?: string;

  constructor(props: any) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of WeekPicker must be ' +
          'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value',
      );
    }
    this.state = {
      value,
      open: props.open,
    };
  }

  componentDidUpdate(_: any, prevState: WeekPickerState) {
    if (!('open' in this.props) && prevState.open && !this.state.open) {
      this.focus();
    }
  }

  saveInput = (node: any) => {
    this.input = node;
  };

  handleChange = (value: moment.Moment | null) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value, formatValue(value, this.props.format));
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

  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.handleChange(null);
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  renderFooter = (...args: any[]) => {
    const { prefixCls, renderExtraFooter } = this.props;
    return renderExtraFooter ? (
      <div className={`${prefixCls}-footer-extra`}>{renderExtraFooter(...args)}</div>
    ) : null;
  };
  weekDateRender = (current: any) => {
    const selectedValue = this.state.value;
    const { prefixCls } = this;
    const { dateRender } = this.props;
    const dateNode = dateRender ? dateRender(current) : current.date();
    if (
      selectedValue &&
      current.year() === selectedValue.year() &&
      current.week() === selectedValue.week()
    ) {
      return (
        <div className={`${prefixCls}-selected-day`}>
          <div className={`${prefixCls}-date`}>{dateNode}</div>
        </div>
      );
    }
    return <div className={`${prefixCls}-date`}>{dateNode}</div>;
  };

  renderWeekPicker = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      disabled,
      pickerClass,
      popupStyle,
      pickerInputClass,
      format,
      allowClear,
      locale,
      localeCode,
      disabledDate,
      style,
      onFocus,
      onBlur,
      id,
      suffixIcon,
      defaultPickerValue,
    } = this.props;

    const prefixCls = getPrefixCls('calendar', customizePrefixCls);
    // To support old version react.
    // Have to add prefixCls on the instance.
    // https://github.com/facebook/react/issues/12397
    this.prefixCls = prefixCls;

    const { open, value: pickerValue } = this.state;
    if (pickerValue && localeCode) {
      pickerValue.locale(localeCode);
    }

    const placeholder =
      'placeholder' in this.props ? this.props.placeholder : locale.lang.placeholder;

    const calendar = (
      <Calendar
        showWeekNumber
        dateRender={this.weekDateRender}
        prefixCls={prefixCls}
        format={format}
        locale={locale.lang}
        showDateInput={false}
        showToday={false}
        disabledDate={disabledDate}
        renderFooter={this.renderFooter}
        defaultValue={defaultPickerValue}
        className="gant-calendar"
      />
    );
    const clearIcon =
      !disabled && allowClear && this.state.value ? (
        <Icon
          type="close-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
          theme="filled"
        />
      ) : null;

    const inputIcon = <InputIcon suffixIcon={suffixIcon} prefixCls={prefixCls} />;

    const input = ({ value }: { value: moment.Moment | undefined }) => (
      <span style={{ display: 'inline-block', width: '100%' }}>
        <input
          ref={this.saveInput}
          disabled={disabled}
          readOnly
          value={(value && value.format(format)) || ''}
          placeholder={placeholder}
          className={pickerInputClass}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {clearIcon}
        {inputIcon}
      </span>
    );
    return (
      <span className={classNames(className, pickerClass)} style={style} id={id}>
        <RcDatePicker
          {...this.props}
          calendar={calendar}
          prefixCls={`${prefixCls}-picker-container`}
          value={pickerValue}
          onChange={this.handleChange}
          open={open}
          onOpenChange={this.handleOpenChange}
          style={popupStyle}
        >
          {input}
        </RcDatePicker>
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderWeekPicker}</ConfigConsumer>;
  }
}

polyfill(DatePicker);

export const WraperDatePick = wrapPicker(DatePicker, 'date');
@compose<GantDatePickerProps>(withDatePicker, withEdit(getText, 'ant-calendar-picker-container'))
class GantDatePicker extends React.Component<GantDatePickerProps, WeekPickerState> {
  onChange = (mom, timeString) => {
    const { onChange } = this.props;
    onChange(timeString, mom);
  };
  render() {
    const { value, defaultPickerValue, defaultValue, onChange, ...props } = this.props;
    const className = classnames('gant-calendar-picker', props.className);
    const restprops = {
      value,
      defaultPickerValue,
      defaultValue,
    };
    Object.keys(restprops).map(name => {
      if (Reflect.has(restprops,name)) restprops[name] = getCurTime(restprops[name], props.format);
      else delete restprops[name];
    });
    return (
      <WraperDatePick {...props} {...restprops} onChange={this.onChange} className={className} />
    );
  }
}


export default GantDatePicker;
