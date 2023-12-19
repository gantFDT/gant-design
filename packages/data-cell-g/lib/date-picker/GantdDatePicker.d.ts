import { ConfigConsumerProps } from 'antd/lib/config-provider';
import { DatePickerProps } from 'antd/lib/date-picker/interface';
import * as moment from 'moment';
import * as React from 'react';
interface GantDatePickerProps extends Omit<DatePickerProps, 'format' | 'onChange'> {
    onChange?: (value: string, time: moment.Moment) => void;
    format?: string;
}
interface WeekPickerState {
    open: boolean;
    value: moment.Moment | null;
}
export declare class DatePicker extends React.Component<any, WeekPickerState> {
    static defaultProps: {
        format: string;
        allowClear: boolean;
    };
    static getDerivedStateFromProps(nextProps: any): WeekPickerState;
    private input;
    private prefixCls?;
    constructor(props: any);
    componentDidUpdate(_: any, prevState: WeekPickerState): void;
    saveInput: (node: any) => void;
    handleChange: (value: moment.Moment | null) => void;
    handleOpenChange: (open: boolean) => void;
    clearSelection: (e: React.MouseEvent<HTMLElement>) => void;
    focus(): void;
    blur(): void;
    renderFooter: (...args: any[]) => JSX.Element;
    weekDateRender: (current: any) => JSX.Element;
    renderWeekPicker: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export declare const WraperDatePick: any;
declare class GantDatePicker extends React.Component<GantDatePickerProps, WeekPickerState> {
    onChange: (mom: any, timeString: any) => void;
    render(): JSX.Element;
}
export default GantDatePicker;
