import { ApolloLink, HttpLink, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { getMainDefinition } from '@apollo/client/utilities/index.js';
import { createClient } from 'graphql-ws';
import { removeTypenameFromMutationLink } from 'apollo-remove-typename-mutation-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            console.log(
                `[GraphQL error]: Message: ${error.message}, Location: ${JSON.stringify(
                    error.locations
                )}, Path: ${JSON.stringify(error.path)}`
            );
        }
    }

    if (networkError) {
        console.log(`[Network error]: ${JSON.stringify(networkError)}`);
    }
});

export const apolloLinks = [removeTypenameFromMutationLink, errorLink] as ApolloLink[];
