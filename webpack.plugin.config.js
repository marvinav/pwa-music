/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// web pack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const CopyPlugin = require('copy-webpack-plugin');

/**
 * @type {import('webpack').Configuration}
 */
var config = {
    entry: [`./src/plugins/yandex-disk/src/index`],
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `static/styles/[chunkhash].css`,
        }),
        new HtmlWebpackPlugin({
            template: 'static/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/plugins/yandex-disk/manifest.json', to: 'manifest.json' },
                { from: 'src/plugins/yandex-disk/public', to: 'public', noErrorOnMissing: true },
            ],
        }),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                // Загрузчик typescript
                test: /\.(tsx$|ts$|js$)/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
                exclude: /node_modules/,
            },
            {
                // Загрузчик css
                test: /\.(scss|css)$/i,
                use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                // Загрузчик картинок
                test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2|eot|ttf|otf|json)$/,
                type: 'asset/resource',
                generator: {
                    filename: (m) => m.filename,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        chunkFilename: (path) => {
            // Place Service Worker in root scope
            if (path.chunk.name === 'service-worker') {
                return 'service-worker.chunk.js';
            }
            return `scripts/[name].[chunkhash].chunk.js`;
        },
        path: path.resolve(__dirname, 'dist/plugins/yandex-disk'),
        publicPath: '/plugins/yandex-disk/',
        libraryTarget: 'amd',
    },
};

module.exports = (env, argv) => {
    config.mode = argv.mode ?? 'development';
    if (argv.mode === 'production') {
        delete config.devtool;
    }
    return config;
};
