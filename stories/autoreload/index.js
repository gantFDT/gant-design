import React, { useState } from 'react';
import { Radio, Switch } from 'antd'
import AutoReload from '@packages/auto-reload-g/src';
import '@packages/auto-reload-g/src/style';
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js';

function Use1() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh1') }}
    />
  </>
}

function Use2() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh2') }}
      auto={true}
      interval={10}
      time={'自定义显示'}
    />
  </>
}

function Use3() {
  const initalLocale = {
    tips: '自定义-tips',
    close: '自定义-close',
    open: '自定义-open',
    set: '自定义-set',
    unit: '自定义-unit'
  }

  const [i18n, setI18n] = useState('en-US')
  const [customLocale, setCustomLocale] = useState(false)

  return <>
    <div style={{ marginBottom: 10 }}>
      <Radio.Group size='small' onChange={(e) => setI18n(e.target.value)} value={i18n}>
        <Radio.Button value={'en-US'}>英文</Radio.Button>
        <Radio.Button value={'zh-CN'}>中文</Radio.Button>
      </Radio.Group>
      <span style={{ marginLeft: 10 }}>自定义local：</span><Switch checked={customLocale} onChange={(checked) => { setCustomLocale(checked) }} />
    </div>
    <AutoReload
      i18n={i18n}
      locale={customLocale ? initalLocale : null}
      refresh={() => { console.log('refresh1') }}
    />
  </>
}


const config = {
  codes: code,
  inline: true,
  useage: `有些业务场景需要轮询，AutoReload即可满足让用户决定是否开启定时刷新`,
  children: [
    {
      title: '基本用法',
      describe: '最简单的用法',
      cmp: Use1
    },
    {
      title: '其他属性',
      describe: '其他属性的用法',
      cmp: Use2
    },
    {
      title: '支持国际化',
      describe: '可进行语言的切换，同时支持自定义',
      cmp: Use3
    }
  ]
};
export default () => <CodeDecorator config={config} />

