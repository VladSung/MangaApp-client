'use ckient';
import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { notifications } from '@mantine/notifications';

export const errorClientLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            notifications.show({
                title: String(error.extensions.code),
                message: error.message,
                color: 'red',
                autoClose: 5000,
            });
        }
    } else if (networkError) {
        notifications.show({
            title: networkError.name,
            message: networkError.message,
            color: 'red',
            autoClose: 5000,
        });
    }
});
