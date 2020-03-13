const code_1 = `
import React, { useState } from 'react';
import { AutoReload } from 'gantd';
// import { AutoReload } from 'auto-reload-g';//与gantd中引入效果相同

function Use1() {
  return <>
    <AutoReload
      refresh={() => { console.log('refresh1') }}
    />
  </>
}

ReactDOM.render(
    <Use1 />,
    mountNode,
);
`

const code_2 = `
import React, { useState } from 'react';
import { AutoReload } from 'gantd';
// import { AutoReload } from 'auto-reload-g';//与gantd中引入效果相同

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

ReactDOM.render(
    <Use2 />,
    mountNode,
);
`
const code_3 = `
import React, { useState } from 'react';
import { Radio, Switch, ConfigProvider } from 'antd';
import { AutoReload } from 'gantd';
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
// import { AutoReload } from 'auto-reload-g';//与gantd中引入效果相同

function Use3() {
  const initalLocale = {
    tips: '自定义-tips',
    close: '自定义-close',
    open: '自定义-open',
    set: '自定义-set',
    unit: '自定义-unit'
  }

  const [i18n, setI18n] = useState(zhCN)
  const [customLocale, setCustomLocale] = useState(false)

  return <>
    <ConfigProvider locale={i18n}>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group size='small' onChange={(e) => setI18n(e.target.value)} value={i18n}>
          <Radio.Button value={enUS}>英文</Radio.Button>
          <Radio.Button value={zhCN}>中文</Radio.Button>
        </Radio.Group>
        <span style={{ marginLeft: 10 }}>自定义local：</span><Switch checked={customLocale} onChange={(checked) => { setCustomLocale(checked) }} />
      </div>
      <AutoReload
        locale={customLocale ? initalLocale : null}
        refresh={() => { console.log('refresh1') }}
      />
    </ConfigProvider>
  </>
}

ReactDOM.render(
    <Use3 />,
    mountNode,
);
`
export default [code_1, code_2, code_3];
