import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:5000/graphql',
    debug: true,
    documents: [
        'app/**/*.{ts,tsx}',
        '_src/**/*.{ts,tsx}',
    ],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './_src/shared/api/graphql/generated/': {
            preset: 'client',
            config: {
                // avoidOptionals: true,
                skipTypename: true,
                scalars: {
                    Date: 'string',
                    URL: 'string',
                },
            },
        },
    },
};

export default config;
