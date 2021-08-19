import '@data-cell/date-picker/style';
import CodeDecorator from '../_util/CodeDecorator';
import codes from './code.js';
/*! Start !*/
import React, { useState } from 'react';
import { DatePicker, EditStatus } from '@gantd';
const { RangePicker, GantdDatePicker } = DatePicker;

const WrapperValue = defaultValue => Component => props => {
  const [value, setValue] = useState(defaultValue);
  const factory = React.createFactory(Component);
  return factory({ value, setValue });
};

const onSave = (id, value, cb) => {
  console.log(id, value);
  cb();
};

/*! Split !*/
const C1 = WrapperValue('2019-06-05 11:01:29')(({ value, setValue }) => (
  <DatePicker format="YYYY-MM-DD HH:mm:ss" value={value} onChange={setValue} onSave={onSave} />
));
/*! Split !*/
const C2 = WrapperValue('2019-06-05 11:01:29')(({ value, setValue }) => (
  <DatePicker value={value} onChange={setValue} onSave={onSave} />
));
/*! Split !*/
const C3 = WrapperValue('06-05-19 11:01:29')(({ value, setValue }) => (
  <DatePicker
    format="MM-DD-YY"
    allowEdit={false}
    value={value}
    onChange={setValue}
    onSave={onSave}
  />
));
/*! End !*/
const config = {
  useage: `<b>🖍 读写分离</b></br>
  `,
  codes,
  inline: true,
  children: [
    {
      title: '基本使用',
      describe: '接受一个时间字符串或者一个moment对象.如果是字符串,默认当作东八区时间处理',
      cmp: WrapperValue('')(({ value, setValue }) => (
        <>
          <DatePicker value={value} onChange={setValue} onSave={onSave} />
        </>
      )),
    },
    {
      title: '指定一个时间字符串',
      describe: '不带时区信息,默认当作东八区时间处理, 通过format指定格式，format默认`YYYY-MM-DD`',
      cmp: () => (
        <>
          <C1 />
          <C2 />
          <C3 />
        </>
      ),
    },
    {
      title: '带周日期选择器',
      describe: '带周日期选择器',
      cmp: WrapperValue('2019-06-01 00:00+0100')(({ value, setValue }) => (
        <>
          <GantdDatePicker format="YYYY-MM-DD"  value={value}  onChange={setValue} onSave={onSave} />
        </>
      )),
    },
    {
      title: '指定一个带时区的时间字符串',
      describe: '将指定时区时间转换到当前时区, 通过指定showTime增加时间选择的功能(不允许编辑)',
      cmp: WrapperValue('2019-06-01 00:00+0100')(({ value, setValue }) => (
        <>
          东1区的时间 2019-06-01 00:00 在当前时区是
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime
            allowEdit={false}
            value={value}
            onChange={setValue}
            onSave={onSave}
          />
        </>
      )),
    },
    {
      title: '时间范围选择器',
      describe: '接受一个表示范围的数组',
      cmp: WrapperValue([
        '2019-06-01 00:00+0100',
        '2019-06-05 05:00+0100',
      ])(({ value, setValue }) => (
        <RangePicker showTime value={value} onChange={setValue} onSave={onSave} />
      )),
    },
  ],
};

export default () => <CodeDecorator config={config} />;
