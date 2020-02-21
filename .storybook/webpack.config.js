
const path = require('path');
const webpackMerge = require('webpack-merge');
const babelConfig = require('../babelConfig');

module.exports = async ({ config, mode }) => {
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
				"@packages": path.resolve('packages'),
				"@util": path.resolve('packages/util-g/src'),
				"@gantd": path.resolve('packages/gantd/src'),
				"@color-picker": path.resolve('packages/color-picker-g/src'),
				"@data-cell": path.resolve('packages/data-cell-g/src'),
				"@header": path.resolve('packages/header-g/src'),
			}
		},
	})
};