import { DatePicker } from '@data-cell';
import moment from 'moment';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
const WraperDatePick = DatePicker.WraperDatePick;
export default forwardRef(function GantDateComponent(props: any, ref: any) {
  const { onDateChanged } = props;
  const [placeholder, setplaceholder] = useState('');
  const [date, setDate] = useState<string>();
  useImperativeHandle(
    ref,
    () => ({
      setInputPlaceholder: (placeholder: any) => {
        setplaceholder(placeholder);
      },
      getDate: () => {
        return date ? new Date(date) : null;
      },
      setDate: (date: string) => {
        setDate(date);
      },
    }),
    [date],
  );
  return (
    <WraperDatePick
      size="small"
      style={{ width: '100%' }}
      dropdownClassName="ag-custom-component-popup"
      placeholder={placeholder}
      value={date ? moment(date) : null}
      onChange={(value: moment.Moment, timeString) => {
        setDate(value ? value.format() : null);
        onDateChanged();
      }}
    />
  );
});
