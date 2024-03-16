import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:5000/graphql',
    debug: true,
    documents: [
        'app/**/*.{ts,tsx}',
        // 'app/features/**/*.{ts,tsx}',
        // 'app/(pages)/**/*.{ts,tsx}',
    ],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './app/shared/api/graphql/generated/': {
            preset: 'client',
            config: {
                avoidOptionals: true,
            },
        },
    },
};

export default config;
