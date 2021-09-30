import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import pages from './router.config.js';
import { Tag, ConfigProvider,Radio } from 'antd';
import './index.css';

const ComponentPage = (item,title,Component) => {
  const [local, setLocal] = useState('zh-cn');
  const handleSizeChange = e => {
    setLocal(e.target.value);
  };
	console.log('local',local)
  return (
    <>
      {!item.home && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '30px', color: '#000', fontWeight: 'bold' }}>{title}</div>
          {item.package && (
            <Tag color="#108ee9" style={{ marginLeft: '10px' }}>
              可使用独立包
            </Tag>
          )}
          {item.package && <Tag style={{ marginLeft: '10px' }}>npm i {item.package} -S</Tag>}
        </div>
      )}
      <Radio.Group value={local} onChange={handleSizeChange} size="small">
        <Radio.Button value="zh-cn">中文</Radio.Button>
        <Radio.Button value="en">English</Radio.Button>
      </Radio.Group>
      <ConfigProvider localeCode={local}>
        <Component/>
      </ConfigProvider>
    </>
  );
};

pages.map(page => {
  const storiresPage = storiesOf(page.name, module);
  page.children.map(item => {
    const dirname = item.name.toLocaleLowerCase();
    let Component;
    try {
      Component = require('./' + dirname + '/index.js').default;
    } catch (e) {}
    try {
      Component = require('./' + dirname + '/index.jsx').default;
    } catch (e) {}

    let marked = ``;
    let config = {};
    let title = `${item.name} ${item.nameZh} ${item.package ? '📦' : ''}`;

    try {
      marked = require('./' + dirname + '/README.md');
      config = require('./' + dirname + '/config.js');
    } catch (error) {}
    storiresPage.addParameters({ jest: [item.name] }).add(title, () => ComponentPage(item,title,Component), {
      notes: {
        markdown: marked,
      },
      ...config,
    });
  });
});
