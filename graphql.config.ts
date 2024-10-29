// For vscode extension:
// https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

/* eslint-disable unicorn/prefer-module */
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    schema: ['http://localhost:5000/graphql'],
    documents: ['**/*.{gql, graphql,ts,tsx}'],
};
