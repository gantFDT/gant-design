import React from 'react'
import { storiesOf } from '@storybook/react';
import pages from './router.config.js'
import { Tag } from 'antd'
import './index.css'
import favicon from '../assests/images/favicon.ico'

const updateFavicon = (img) => {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = img;
	document.getElementsByTagName('head')[0].appendChild(link);
}
const updateTitle = (title) => {
  document.title = title
}

setTimeout(()=>{
	const updateTitle = (title) => {
		document.title = title
	}
	updateFavicon(favicon)
	updateTitle('GantD | 专注于数据密集型业务场景React组件库')
},200)

pages.map(page => {
	const storiresPage = storiesOf(page.name, module)
	page.children.map(item => {
		const dirname = item.name.toLocaleLowerCase();
		const Component = require('./' + dirname + "/index.js").default;
		let marked = ``
		let config = {};
		let title = `${item.name} ${item.nameZh} ${item.package ? '📦' : ''}`;
		
		try {
			marked = require('./' + dirname + "/README.md");
			config = require('./' + dirname + "/config.js");
		} catch (error) {

		}
		storiresPage.addParameters({ jest: [item.name] }).add(title, () => <>
			{!item.home && <div style={{
				display: 'flex',
				alignItems: 'center'
			}}>
				<div style={{ fontSize: '30px', color: '#000' }}>{title}</div>
				{item.package && <Tag color="#108ee9" style={{ marginLeft: '10px' }}>可使用独立包</Tag>}
				{item.package && <Tag style={{ marginLeft: '10px' }}>npm i {item.package} -S</Tag>}
			</div>}
			<Component /></>, {
			notes: {
				markdown: marked
			},
			...config
		})
	})
})