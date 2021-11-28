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
        'boundaries/ignore': ['src/tests/*/**'],
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
                pattern: 'shared/*/**',
                capture: ['package', 'segment', 'file'],
                mode: 'file',
            },
            {
                type: 'shared',
                pattern: 'shared/*.ts',
                capture: ['declaration'],
                mode: 'file',
            },
            {
                type: 'entities',
                pattern: 'entities/*/**',
                capture: ['slice', 'segment', 'file'],
                mode: 'file',
            },
            {
                type: 'features',
                pattern: 'features/*/**',
                capture: ['slice', 'segment', 'file'],
                mode: 'file',
            },
            {
                type: 'pages',
                pattern: 'pages/*/**',
                capture: ['slice', 'segment', 'file'],
                mode: 'file',
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
        'plugin:import/typescript',
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:boundaries/strict',
        'prettier',
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'react/prop-types': [0],
        'boundaries/no-private': [2, { allowUncles: false }],
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
                        allow: ['static', ['shared', { package: '${package}' }], ['shared', { declaration: 'types' }]],
                    },
                    {
                        from: ['entities'],
                        allow: ['shared', 'static', ['entities', { slice: '${slice}' }]],
                    },
                    {
                        from: ['features'],
                        allow: ['entities', 'shared', 'static', ['features', { slice: '${slice}' }]],
                    },
                    {
                        from: ['pages'],
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
