import { configure } from '@storybook/react';
import { addParameters, addDecorator } from '@storybook/react';
// import { withContexts } from 'addon-contexts/react';
// import contexts from './contexts';
import * as themes from './themes';
// import { themes } from '@storybook/theming'; // 自带主题
import CenterDecorator from '../stories/_util/CenterDecorator';

const NODE_ENV = process.env.NODE_ENV;

// 组件容器背景色
addParameters({
	backgrounds: [
		{ name: 'light', value: themes['light'].appContentBg },
		{ name: 'dark', value: themes['dark'].appContentBg },
	],
});

// 组件容器
addDecorator(CenterDecorator)
// if (NODE_ENV == 'development') {
// 	let results;
// 	try {
// 		results = require('../.jest-test-results.json');
// 	} catch (err) {
// 		console.warn('Warning: .jest-test-results.json is not exist, if you want to know the tests info , run "npm run test" first. ')
// 	};
// 	addDecorator(withTests({ results }))
// }

// 响应式预览
// addParameters({
// 	viewport: {
// 		/**
// 		 * name to display in the dropdown
// 		 * @type {String}
// 		 */
// 		name: 'Responsive',

// 		/**
// 		 * Inline styles to be applied to the story (iframe).
// 		 * styles is an object whose key is the camelCased version of the style name, and whose
// 		 * value is the style’s value, usually a string
// 		 * @type {Object}
// 		 */
// 		styles: {
// 			width: '100%',
// 			height: '100%',
// 		},

// 		/**
// 		 * type of the device (e.g. desktop, mobile, or tablet)
// 		 * @type {String}
// 		 */
// 		type: 'desktop',
// 	}
// });

// 控制台
// addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// 全局上下文
// addDecorator(withContexts(contexts));

// 主题色更改
addParameters({
	darkMode: {
		light: { ...themes.light },
		dark: { ...themes.dark }
	}
});

// 引入文件
function loadStories() {
	require('../stories/index.js');
}
configure(loadStories, module);