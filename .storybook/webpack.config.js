
const path = require('path');
const webpackMerge = require('webpack-merge');
const babelConfig = require('../babelConfig');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// Return the altered config
	// config.module.rules.push({
	// 	test: /\.less$/,
	// 	use: ['style-loader', 'css-loader', 'less-loader'],
	// 	include: path.resolve(__dirname, '../components'),
	// });

	// https://github.com/storybookjs/storybook/issues/6204


	return webpackMerge(config, {
		module: {
			rules: [
        {
          test: /\.(jsx|js)?$/,
          include: [
            path.resolve(__dirname, "../packages"),
            path.resolve(__dirname, "../stories"),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig
            }
          ]
        },
				{
					test: /\.less$/,
					use: ['style-loader', 'css-loader', {
						loader: 'less-loader',
						options: { javascriptEnabled: true },
					}],
					include: [
            path.resolve(__dirname, '../packages'),
          ]
				},
				{
					test: /.ts(x)?$/,
					use: {
						loader: "ts-loader",
					}
				}
			]
		},
		resolve: {
      // 用于查找模块的目录
      
			extensions: [".js", ".ts", ".json", ".jsx", ".tsx"],
			alias: {
				"@pkgs": path.resolve('packages'),
				"@util-g": path.resolve('packages/util-g/src'),
				"@gantd": path.resolve('packages/gantd/src'),
			}
		},
	})
};