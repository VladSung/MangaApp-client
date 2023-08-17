module.exports = {
    $schema: "http://json.schemastore.org/prettierrc",
    printWidth: 100,
    quoteProps: "consistent",
    semi: true,
    singleQuote: true,

    tabWidth: 4,
    trailingComma: "es5",
    endOfLine: "auto",
    overrides: [
        {
            files: ["*.{ts,tsx}"],
            options: {
                parser: "typescript",
            },
        },
    ],
};