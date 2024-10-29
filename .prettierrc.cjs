module.exports = {
    printWidth: 100,
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,

    tabWidth: 4,
    trailingComma: 'es5',
    endOfLine: 'auto',
    overrides: [
        {
            files: ['*.{ts,tsx}'],
            options: {
                parser: 'typescript',
            },
        },
        {
            files: ['*.{ts,tsx}'],
            processor: '@graphql-eslint/graphql',
            extends: ['plugin:prettier/recommended'],
        },
        {
            files: ['*.{ts,tsx}'],
            parser: '@graphql-eslint/eslint-plugin',
            plugins: ['@graphql-eslint'],
            rules: {
                'prettier/prettier': 'error',
            },
        },
    ],
};