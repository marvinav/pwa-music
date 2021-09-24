/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// web pack plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const AssetsPlugin = require('assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevServer = process.env.WEBPACK_DEV_SERVE;
const isDevelopment = process.env.NODE_ENV !== 'production';

console.log(isDevServer);

const publicPath = path.resolve(__dirname, 'dist/public');

/**
 * @type {import('webpack-dev-server').Configuration}
 */
var devServer = {
    devMiddleware: {
        writeToDisk: (path) => {
            return path.includes(publicPath);
        },
    },
    static: path.resolve(__dirname, 'dist/'),
    host: 'localhost',
    historyApiFallback: true,
    https: true,
    hot: true,
};

/**
 * @type {import('webpack').Configuration}
 */
var config = {
    entry: [`./src/index`],
    plugins: [
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['*/**', , '*.*', '!plugins/**'] }),
        new MiniCssExtractPlugin({
            filename: `static/styles/[chunkhash].css`,
        }),
        new HtmlWebpackPlugin({
            template: 'static/index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: 'public', to: 'public' }],
        }),
        new FaviconsWebpackPlugin({
            logo: './static/favicon.png',
            favicons: {
                appName: 'marvinav',
                appDescription: 'Blog about web, dev and science',
                developerName: 'marvinav',
                developerURL: 'https://www.githib.com/marvinav',
            },
        }),
        /**Generate webpack-asset file with all static files url */
        new AssetsPlugin({
            useCompilerPath: true,
            includeManifest: true,
            keepInMemory: isDevServer,
            removeFullPathAutoPrefix: true,
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
                        options: {
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
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
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: (path) => {
            // Place Service Worker in root scope
            if (path.chunk.name === 'service-worker') {
                return 'service-worker.chunk.js';
            }
            return `scripts/[name].[chunkhash].chunk.js`;
        },
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer,
};

module.exports = (env, argv) => {
    config.mode = argv.mode;
    config.devtool = argv.mode === 'development' ? 'eval' : false;
    if (isDevelopment) {
        config.plugins.push(new ReactRefreshWebpackPlugin());
    }
    return config;
};
