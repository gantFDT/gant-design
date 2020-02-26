import React from 'react'
import { storiesOf } from '@storybook/react';
import pages from './router.config.js'
import { Tag } from 'antd'
import './index.css'

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