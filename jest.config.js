// jest.config.js
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/__mocks__/fileMock.js',
    },
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleDirectories: ['src', 'node_modules'],
};

// eslint-disable-next-line no-undef
module.exports = config;
