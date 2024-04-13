import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { notifications } from '@mantine/notifications';
import { removeTypenameFromMutationLink } from 'apollo-remove-typename-mutation-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            notifications.show({
                title: 'GraphQL error',
                message: error.message,
                color: 'red',
            });

            console.log(
                `[GraphQL error]: Message: ${error.message}, Location: ${JSON.stringify(
                    error.locations
                )}, Path: ${JSON.stringify(error.path)}`
            );
        }
    }

    if (networkError) {
        notifications.show({
            title: 'Network error',
            message: JSON.stringify(networkError),
            color: 'red',
        });

        console.log(
            `[Network error]: ${JSON.stringify(networkError) || 'Check your internet connection'}`
        );
    }
});

export const apolloLinks = [removeTypenameFromMutationLink, errorLink] as ApolloLink[];
