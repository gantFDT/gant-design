// Show warning for webpack
process.traceDeprecation = true;

// Normal requirement
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const babelConfig = require('../../babelConfig.json');

function resolve(moduleName) {
    return require.resolve(moduleName);
}

const pkg = require(path.join(process.cwd(), 'package.json'));

module.exports = {
    mode: 'production', // "production" | "development" | "none"
    entry: {
      submenu: path.resolve(__dirname, 'src/index.tsx')
    },
    resolve: {
        // 解析模块请求的选项
        // （不适用于对 loader 解析）
        modules: [
            'node_modules'
        ],// 用于查找模块的目录
        extensions: [".js", ".ts", ".tsx", ".json", ".jsx", ".css"],// 使用的扩展名
        alias: {// 模块别名列表
          "@pkgs": path.resolve('..'),
          "@util-g": path.resolve(__dirname, '../util-g/src'),
          "@gantd": path.resolve(__dirname, '../gantd/src'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // 「入口分块(entry chunk)」的文件名模板（出口分块？）
        library: 'colorpicker', // 导出库(exported library)的名称
        libraryTarget: 'umd' // 使用 module.exports 导出
    },
    externals: {
        react: { // UMD
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        "react-dom": { // UMD
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "ReactDOM"
        },
        antd: { // UMD
            commonjs: "antd",
            commonjs2: "antd",
            amd: "antd",
            root: "antd"
        }
    },
    module: {
        rules: [{
            test: /\.(jsx|js)?$/,
            include: [
              path.resolve(__dirname, "../"),
            ],
            // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
            // test 和 include 具有相同的作用，都是必须匹配选项
            // exclude 是必不匹配选项（优先于 test 和 include）
            // 最佳实践：
            // - 只在 test 和 文件名匹配 中使用正则表达式
            // - 在 include 和 exclude 中使用绝对路径数组
            // - 尽量避免 exclude，更倾向于使用 include
            use: [
              {
                loader: 'babel-loader',
                options: babelConfig
              }
            ]
        }, {
            test: /\.(tsx|ts)?$/,
            include: [
              path.resolve(__dirname, "../"),
            ],
            use: 'ts-loader'
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
            ],
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    },
                },
                {
                    loader: resolve('less-loader'),
                    options: {
                        javascriptEnabled: true,
                        sourceMap: true,
                    },
                },
            ],
        }, {
            test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
            loader: 'url-loader',
            options: {
                limit: 10000,
            },
        }]
    },

    plugins: [
        new CaseSensitivePathsPlugin(),
        // 这个Webpack插件强制所有需要的模块的整个路径匹配磁盘上实际路径的具体情况。
        // 使用这个插件可以帮助减轻开发人员在OSX上工作的情况，因为OSX不遵循严格的路径敏感性，这会导致与其他开发人员的冲突，或者构建运行其他操作系统的盒子，这些系统需要正确的路径。
        new webpack.BannerPlugin(`
            ${pkg.name} v${pkg.version}
            Copyright 2019-present, Gant SoftWare, Inc.
            All rights reserved.
        `),
        // 为每个 chunk 文件头部添加 banner。
        new WebpackBar({
            name: '🚚  Gant Design',
            color: '#2f54eb',
        }),
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    performance: {
        hints: false
    }
}