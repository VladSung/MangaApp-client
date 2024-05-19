import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { removeTypenameFromMutationLink } from 'apollo-remove-typename-mutation-link';

export const errorServerLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            console.log(error);
        }
    } else if (networkError) {
        console.log(networkError);
    }
});

export const apolloLinks = [removeTypenameFromMutationLink] as ApolloLink[];
