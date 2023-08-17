import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:5000/api/graphql',
    documents: [
        '_src/**/*.tsx',
        '_src/widgets/**/*.tsx',
        '_src/features/**/*.tsx',
        '_src/pages/**/*.tsx',
    ],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './_src/shared/api/graphql/': {
            preset: 'client',
        },
    },
};

export default config;
