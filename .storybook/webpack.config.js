const path = require('path');
const webpackMerge = require('webpack-merge');
const babelConfig = require('../babelConfig');

module.exports = async ({ config, mode }) => {
  return webpackMerge(config, {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.(jsx|js)?$/,
          include: [path.resolve(__dirname, '../packages'), path.resolve(__dirname, '../stories')],
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig,
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              // options: {
              // 	modules: false,
              // 	localIdentName: '[name]__[local]-[hash:base64:5]'
              // }
            },
            {
              loader: 'less-loader',
              options: { javascriptEnabled: true },
            },
          ],
          include: [path.resolve(__dirname, '../packages')],
        },
        {
          test: /.ts(x)?$/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    resolve: {
      // 用于查找模块的目录

      extensions: ['.js', '.ts', '.jsx', '.tsx','.mjs'],
      alias: {
        '@packages': path.resolve('packages'),
        '@util': path.resolve('packages/util-g/src'),
        '@gantd': path.resolve('packages/gantd/src'),
        '@color-picker': path.resolve('packages/color-picker-g/src'),
        '@data-cell': path.resolve('packages/data-cell-g/src'),
        '@header': path.resolve('packages/header-g/src'),
        '@modal': path.resolve('packages/modal-g/src'),
        '@schema-form': path.resolve('packages/schema-form-g/src'),
        '@auto-reload': path.resolve('packages/auto-reload-g/src'),
        '@anchor': path.resolve('packages/anchor-g/src'),
        '@submenu': path.resolve('packages/submenu-g/src'),
        '@table': path.resolve('packages/table-g/src'),
        '@grid': path.resolve('packages/grid-g/src'),
        '@smart-table': path.resolve('packages/smart-table-g/src'),
        '@smart-grid': path.resolve('packages/smart-grid-g/src'),
        '@keyevent': path.resolve('packages/keyevent-g/src'),
      },
    },
  });
};
