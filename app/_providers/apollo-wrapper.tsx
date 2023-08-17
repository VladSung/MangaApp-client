'use client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink, HttpLink, split } from '@apollo/client';
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { PropsWithChildren } from 'react';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { getMainDefinition } from '@apollo/client/utilities/index.js';
import { createClient } from 'graphql-ws';
import { apolloLinks } from '@/_src/shared/lib/apollo/links';

const makeClient = (token?: string) => () => {
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...(headers as Headers),
                authorization: `Bearer ${token}`,
            },
        };
    });

    const httpLink = new HttpLink({
        uri: 'http://localhost:5000/api/graphql',
    });

    const wsLink = () =>
        new GraphQLWsLink(
            createClient({
                url: 'ws://localhost:5000/graphql/ws',
            })
        );
    const splitLink = () =>
        split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === 'OperationDefinition' &&
                    definition.operation === 'subscription'
                );
            },
            wsLink(),
            httpLink
        );

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: ApolloLink.from(
            typeof window === 'undefined'
                ? [
                      new SSRMultipartLink({
                          stripDefer: true,
                      }) as ApolloLink,
                      ...apolloLinks,
                      authLink,
                      httpLink,
                  ]
                : [...apolloLinks, authLink, splitLink()]
        ),
    });
};

type Props = PropsWithChildren & {
    token?: string;
};

export function ApolloWrapper({ children, token }: Props) {
    return <ApolloNextAppProvider makeClient={makeClient(token)}>{children}</ApolloNextAppProvider>;
}
