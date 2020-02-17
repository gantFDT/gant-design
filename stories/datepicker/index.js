import React, { useState } from 'react'
import { DatePicker, RangePicker } from '@pkgs/gantd/src'
import CodeDecorator from '../_util/CodeDecorator'
import { WrapperValue, WrapperEdit, onSave } from '../_util/composeUseHooks'

const codeList = [
  `const [value, setValue] = useState();
return (
  <>
    <DatePicker value={value} onChange={setValue} onSave={onSave} />
    <div style={{marginTop: 10}}>
      <DatePicker edit />
    </div>
  </>
)`,
  `const [value, setValue] = useState('2019-06-05 11:01:29');
return (
  <>
    <DatePicker format='YYYY-MM-DD HH:mm:ss' value={value} onChange={setValue} onSave={onSave} style={{ marginBottom: 10 }} />
    <DatePicker value={value} onChange={setValue} onSave={onSave} />
    <DatePicker format='MM-DD-YY' value='06-05-19' onChange={setValue} onSave={onSave} />
  </>
)`,
  `const [value, setValue] = useState('2019-06-01 00:00+0100');
return (
  <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime value={value} onChange={setValue} onSave={onSave} />
)`,
  `const [value, setValue] = useState(['2019-06-01 00:00+0100', '2019-06-05 05:00+0100']);
  return (
    <RangePicker showTime value={value} onChange={setValue} onSave={onSave} />
  )`,
]


const config = {
  codes: codeList.map(code => (
    `import { DatePicker } from 'gantd';
import React, { useState } from 'react';

const onSave=(id, value ,cb)=>cb()

function Demo(){
  ${code}
}

ReactDOM.render(<Demo />, mountNode)`
  )),
  inline: true,
  children: [
    {
      title: '基本使用',
      describe: '接受一个时间字符串或者一个moment对象.如果是字符串,默认当作东八区时间处理',
      cmp: WrapperValue('')(({ value, setValue }) => (
        <>
          <DatePicker value={value} onChange={v => setValue(v)} onSave={onSave} />
          <div style={{ marginTop: 10 }}>
            <DatePicker edit />
          </div>
        </>
      ))
    },
    {
      title: '指定一个时间字符串',
      describe: '不带时区信息,默认当作东八区时间处理, 通过format指定格式，format默认`YYYY-MM-DD`',
      cmp: () => (
        <>

          {WrapperValue('2019-06-05 11:01:29')(({ value, setValue }) => <DatePicker format='YYYY-MM-DD HH:mm:ss' value={value} onChange={setValue} onSave={onSave} />)()}

          <div style={{ margin: `10px 0` }}>
            {WrapperValue('2019-06-05 11:01:29')(({ value, setValue }) => <DatePicker value={value} onChange={setValue} onSave={onSave} />)()}
          </div>
          {WrapperValue('06-05-19 11:01:29')(({ value, setValue }) => <DatePicker format='MM-DD-YY' value={value} onChange={setValue} onSave={onSave} />)()}
        </>
      )
    },
    {
      title: '指定一个带时区的时间字符串',
      describe: '将指定时区时间转换到当前时区, 通过指定showTime增加时间选择的功能',
      cmp: WrapperValue('2019-06-01 00:00+0100')(({ value, setValue }) => <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime value={value} onChange={setValue} onSave={onSave} />)
    },
    {
      title: '时间范围选择器',
      describe: '接受一个表示范围的数组',
      cmp: WrapperValue(['2019-06-01 00:00+0100', '2019-06-05 05:00+0100'])(({ value, setValue }) => <RangePicker showTime value={value} onChange={setValue} onSave={onSave} />)
    },
  ]
}

export default () => <CodeDecorator config={config} />