/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// web pack plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const AssetsPlugin = require('assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevServer = process.env.WEBPACK_DEV_SERVER;
const publicPath = path.resolve(__dirname, 'dist/public');

/**
 * @type {import('webpack').Configuration}
 */
var config = {
    entry: [`./src/index.tsx`],
    mode: 'development',
    plugins: [
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
        chunkFilename: (path, asset) => {
            let dir = 'scripts/';
            if (path.chunk.id.includes('src_workers')) {
                dir = path.chunk.id.includes('service-worker') ? '' : 'workers/';
            }
            return `${dir}[name].[fullhash].bundle.js`;
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
        https: true,
        port: 3000,
        hot: true,
    },
};

module.exports = (env, argv) => {
    return config;
};
