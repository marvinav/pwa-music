const path = require('path');

const appWebpack = require(path.join(__dirname, '../webpack.config.js'));

console.log(appWebpack);

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        path.resolve('./.storybook/vanilla-extract.js'),
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-addon-pseudo-states',
    ],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            type: 'asset/source',
            resourceQuery: /raw/,
        });
        console.log(config);
        console.log(appWebpack());
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            ...appWebpack().resolve.alias,
        };
        config.output.devtoolModuleFilenameTemplate = 'file:///[absolute-resource-path]';
        return config;
    },
};
