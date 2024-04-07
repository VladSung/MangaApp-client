/* eslint-env node */

module.exports = {
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
        'plugin:boundaries/recommended',
        'plugin:unicorn/recommended',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: [
        'react-refresh',
        'react-hooks',
        'import',
        'boundaries',
        'unicorn',
        'simple-import-sort',
    ],
    ignorePatterns: ['**/node_modules', '**/public', '**/build', '/app/shared/api'],

    overrides: [
        {
            files: ['**/*.stories.*'],
            rules: {
                'import/no-anonymous-default-export': 'off',
            },
        },
        {
            files: ['**/styles.*', '**/styled.*'],
            rules: {
                'no-useless-computed-key': 0,
            },
        },
    ],
    settings: {
        'import/ignore': ['node_modules', '/'],
        'import/resolver': {
            typescript: true,
            node: {
                extensions: ['.js', '.jsx', 'mjs', 'cjs', '.ts', '.tsx', '.native.js'],
                paths: ['app'],
            },
        },
        'boundaries/elements': [
            { type: '/', mode: 'folder', pattern: 'public/*' },
            {
                type: 'app',
                mode: 'folder',
                pattern: 'app/*',
            },
            {
                type: 'pages',
                mode: 'folder',
                pattern: 'app/[lng]/*',
            },
            {
                type: 'widgets',
                mode: 'folder',
                pattern: 'app/widgets/*',
            },
            {
                type: 'features',
                mode: 'folder',
                pattern: 'app/features/',
            },
            {
                type: 'entities',
                mode: 'folder',
                pattern: 'app/entities/*',
            },
            {
                type: 'shared',
                mode: 'folder',
                pattern: 'app/shared/*',
            },
        ],
    },
    rules: {
        'import/no-unresolved': [2, { ignore: ['\\.img$', 'assets/*'] }],
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-floating-promises': ['warn'],
        "require-await": "off",
    "@typescript-eslint/require-await": "warn",
        '@typescript-eslint/no-misused-promises': ['warn'],

        'linebreak-style': [2, process.platform === 'win32' ? 'windows' : 'unix'],

        // 'arrow-parens': [2, 'always'],
        'block-scoped-var': 2,
        'brace-style': [2, '1tbs'],
        // 'camelcase': [2, { properties: 'never' }],
        'curly': [2, 'all'],
        'dot-location': [1, 'property'],
        'dot-notation': 2,
        'eol-last': 2,
        'eqeqeq': 2,
        'no-alert': 2,
        'no-console': ['warn', { allow: ['error'] }],
        'no-else-return': 2,
        'no-empty': [2, { allowEmptyCatch: true }],
        'no-eq-null': 2,
        'no-eval': 2,
        'no-extra-semi': 2,
        'no-extend-native': 2,
        'no-fallthrough': 2,
        'no-implicit-coercion': [2, { allow: ['!!'] }],
        'no-implied-eval': 2,
        'no-lone-blocks': 2,
        'no-loop-func': 2,
        'no-multi-str': 2,
        'no-native-reassign': 2,
        'no-new': 2,
        'no-new-func': 2,
        'no-new-wrappers': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-return-assign': 2,
        'no-script-url': 2,
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-throw-literal': 2,
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],

        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['off'],

        // note you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', caughtErrors: 'none' },
        ],

        'no-useless-call': 2,
        'no-useless-concat': 2,
        'no-useless-escape': 2,
        'no-void': 1,
        'no-var': 2,
        'one-var': [2, 'never'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'multiline-const', next: '*' },
            { blankLine: 'always', prev: 'multiline-let', next: '*' },
            { blankLine: 'always', prev: '*', next: 'block-like' },
            { blankLine: 'always', prev: 'block-like', next: '*' },
            { blankLine: 'always', prev: '*', next: 'multiline-expression' },
            { blankLine: 'always', prev: 'multiline-expression', next: '*' },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'prefer-const': 2,
        'prefer-arrow-callback': 2,
        // 'quotes': [2, 'single', { avoidEscape: true }],
        'yoda': 2,

        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',

        'react/display-name': 'warn',

        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',

        'unicorn/no-abusive-eslint-disable': 2,
        'unicorn/no-for-loop': 2,
        'unicorn/no-array-instanceof': 2,
        'unicorn/no-zero-fractions': 2,
        'unicorn/prefer-includes': 2,
        'unicorn/prefer-text-content': 2,
        'unicorn/import-index': 0,
        'unicorn/throw-new-error': 2,

        'unicorn/template-indent': [
            'warn',
            {
                tags: ['outdent', 'dedent', 'html', 'styled'],
                functions: ['dedent', 'stripIndent'],
                selectors: [],
                comments: ['HTML', 'indent'],
            },
        ],
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    kebabCase: true,
                },
            },
        ],
        'unicorn/no-null': ['warn'],
        'unicorn/prevent-abbreviations': [
            'off',
            {
                ignore: ['env', 'Props'],
            },
        ],
    },
};
