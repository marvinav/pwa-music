module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config, { configType }) => {
        config.module.rules.push({
            test: /\.(scss)$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        });
        return config;
    },
};
