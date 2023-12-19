import { DatePickerMode, PickerProps } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import React from 'react';
import { WithBasicProps } from '../compose/withbasic';
import GantdDatePicker from './GantdDatePicker';
import RangePicker from './RangePicker';
export interface GantDatePickerProps extends PickerProps, WithBasicProps {
    onChange?: (time: string) => void;
    value?: moment.Moment | string | null;
    defaultValue?: moment.Moment | string | null;
    defaultPickerValue?: moment.Moment | string | null;
    placeholder?: string;
    renderExtraFooter?: (mode: DatePickerMode) => React.ReactNode;
}
declare class DatePicker extends React.Component<GantDatePickerProps> {
    static RangePicker: typeof RangePicker;
    static GantdDatePicker: typeof GantdDatePicker;
    static WraperDatePick: any;
    onChange: (mom: any, timeString: any) => void;
    render(): JSX.Element;
}
export default DatePicker;
