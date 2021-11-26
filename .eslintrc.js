module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: ['prettier', 'react', '@typescript-eslint', 'react-hooks', 'boundaries'],
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'boundaries/include': ['src/**/*', 'static/*/**'],
        'boundaries/ignore': ['src/tests/**/*'],
        'boundaries/elements': [
            {
                type: 'entry-point',
                pattern: 'src/index.tsx',
                mode: 'full',
            },
            {
                type: 'global-declaration',
                pattern: 'src/d.ts',
                mode: 'full',
            },
            {
                type: 'shared',
                pattern: 'shared',
                capture: ['slice', 'segment', 'file'],
            },
            {
                type: 'entities',
                pattern: 'entities',
                capture: ['slice', 'segment', 'file'],
            },
            {
                type: 'features',
                pattern: 'features',
                capture: ['slice', 'segment', 'file'],
            },
            {
                type: 'pages',
                pattern: 'pages',
                capture: ['slice', 'segment', 'file'],
            },
            {
                type: 'app',
                pattern: 'app',
                capture: ['slice', 'segment', 'file'],
            },
            {
                type: 'static',
                pattern: 'static',
            },
        ],
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:boundaries/strict',
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier',
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'react/prop-types': [0],
        'boundaries/element-types': [
            2,
            {
                // Allow or disallow any dependency by default
                default: 'disallow',
                // Define a custom message for this rule
                message: '${file.type} is not allowed to import ${dependency.type}',
                rules: [
                    {
                        from: ['entry-point'],
                        allow: ['app', 'features'],
                    },
                    {
                        from: ['shared'],
                        allow: ['static'],
                    },
                    {
                        from: ['entities'],
                        allow: ['shared', 'static'],
                    },
                    {
                        from: ['features'],
                        allow: ['entities', 'shared', 'static'],
                    },
                    {
                        from: ['pages'],
                        disallow: ['pages'],
                        allow: ['entities', 'features', 'static', 'shared', ['pages', { slice: '${slice}' }]],
                    },
                    {
                        from: ['app'],
                        allow: ['entities', 'features', 'static', 'shared', 'pages'],
                    },
                ],
            },
        ],
    },
};
