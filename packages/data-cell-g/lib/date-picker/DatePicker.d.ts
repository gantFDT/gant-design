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
    defaultOpen?: boolean;
}
export interface PickerState {
    open: boolean;
}
declare class DatePicker extends React.Component<GantDatePickerProps, PickerState> {
    static RangePicker: typeof RangePicker;
    static GantdDatePicker: typeof GantdDatePicker;
    static WraperDatePick: any;
    constructor(props: any);
    onChange: (mom: any, timeString: any) => void;
    handleOpenChange: (open: boolean) => void;
    render(): React.JSX.Element;
}
export default DatePicker;
