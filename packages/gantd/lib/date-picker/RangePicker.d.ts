import React from 'react';
import { PickerProps, RangePickerValue, RangePickerPresetRange } from 'antd/lib/date-picker/interface';
import { WithBasicProps } from '../compose/withbasic';
import { TimePickerProps } from 'antd/lib/time-picker';
declare type GantRangePickerValue = RangePickerValue | [string] | [undefined, string] | [string, undefined] | [null, string] | [string, null] | [string, string];
export interface GantRangePickerProps extends PickerProps, WithBasicProps {
    className?: string;
    tagPrefixCls?: string;
    value?: GantRangePickerValue;
    defaultValue?: GantRangePickerValue;
    defaultPickerValue?: GantRangePickerValue;
    timePicker?: React.ReactNode;
    onChange?: (dateStrings: [string, string]) => void;
    onCalendarChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
    onOk?: (selectedTime: RangePickerPresetRange) => void;
    showTime?: TimePickerProps | boolean;
    showToday?: boolean;
    ranges?: {
        [range: string]: RangePickerPresetRange;
    };
    placeholder?: [string, string];
    mode?: string | string[];
    separator?: React.ReactNode;
    disabledTime?: (current: RangePickerValue, type: string) => {
        disabledHours?: () => number[];
        disabledMinutes?: () => number[];
        disabledSeconds?: () => number[];
    };
    onPanelChange?: (value?: RangePickerValue, mode?: string | string[]) => void;
    renderExtraFooter?: () => React.ReactNode;
    onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
declare class RangePicker extends React.Component<GantRangePickerProps> {
    onChange: (mom: RangePickerValue, timeStringArr: [string, string]) => void;
    getValue: (value: any) => any[];
    render(): JSX.Element;
}
export default RangePicker;
