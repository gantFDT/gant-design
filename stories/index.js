import React from 'react'
import { storiesOf } from '@storybook/react';
import pages from './router.config.js'

pages.map(page => {
	const storiresPage = storiesOf(page.name, module)
	page.children.map(item => {
		const dirname = item.name.toLocaleLowerCase();
		const Component = require('./' + dirname + "/index.js").default;
		let marked = ``
		let config = {};
		let title = `${item.name} ${item.nameZh}`;
		try {
			marked = require('./' + dirname + "/README.md");
			config = require('./' + dirname + "/config.js");
		} catch (error) {

		}
		storiresPage.addParameters({ jest: [item.name] }).add(title, () => <><h1>{title}</h1><Component /></>, {
			notes: {
				markdown: marked
			},
			...config
		})
	})
	storiresPage
})