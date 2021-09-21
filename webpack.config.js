/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
// web pack plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const AssetsPlugin = require('assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const util = require('util');

const isDevServer = process.env.WEBPACK_DEV_SERVER;
const publicPath = path.resolve(__dirname, 'dist/public');

/**
 * @type {import('webpack').Configuration}
 */
var config = {
    entry: [`./src/index.tsx`],
    plugins: [
        /**Generate webpack-asset file with all static files url */
        new AssetsPlugin({
            useCompilerPath: true,
            keepInMemory: isDevServer,
            includeManifest: true,
            removeFullPathAutoPrefix: true,
        }),
        new CleanWebpackPlugin(),
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
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                // Загрузчик typescript
                test: /\.(tsx$|ts$|js$)/,
                use: 'babel-loader',
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
            let dir = path.chunk.name === 'service-worker' ? '' : 'scripts/';
            return `${dir}[name].[chunkhash].chunk.js`;
        },
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
    },
    devServer: {
        writeToDisk: (path) => {
            return path.includes(publicPath);
        },
        contentBase: path.resolve(__dirname, 'dist/'),
        host: 'localhost',
        https: {
            key: fs.readFileSync(path.resolve(__dirname, '.development/private.key')),
            cert: fs.readFileSync(path.resolve(__dirname, '.development/private.crt')),
            cacert: fs.readFileSync(path.resolve(__dirname, '.development/private.pem')),
        },
        hot: true,
    },
};

module.exports = (env, argv) => {
    config.mode = argv.mode;
    config.devtool = argv.mode === 'development' ? 'eval' : false;
    return config;
};
