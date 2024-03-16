'use client'
import { ApolloLink, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { getMainDefinition } from '@apollo/client/utilities/index.js';
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { PropsWithChildren } from 'react';
import { apolloLinks } from '../shared/lib/apollo/links';

const wsLink = () =>
    new GraphQLWsLink(
        createClient({
            url: 'ws://localhost:5000/graphql/ws',
        })
    );

const formatDateLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        // nprogress.complete()
        return response;
    });
});

const makeClient = (token?: string) => () => {
    const authLink = setContext((_, { headers }) => {
        // nprogress.start()
        return {
            headers: {
                ...(headers as Headers),
                authorization: `Bearer ${token}`,
            },
        };
    });

    const httpLink = new HttpLink({
        uri: 'http://localhost:5000/graphql',
    });

    const splitLink = () =>
        split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                    definition.kind === Kind.OPERATION_DEFINITION &&
                    definition.operation === OperationTypeNode.SUBSCRIPTION
                );
            },
            wsLink(),
            httpLink
        );

    return new NextSSRApolloClient({
        connectToDevTools: true,
        cache: new NextSSRInMemoryCache(),
        link: ApolloLink.from(
            typeof window === 'undefined'
                ? [
                    new SSRMultipartLink({
                        stripDefer: true,
                    }) as ApolloLink,
                    authLink, formatDateLink,
                    httpLink, ...apolloLinks
                ]
                : [formatDateLink, authLink, splitLink(), ...apolloLinks]
        ),
    });
};

type Props = PropsWithChildren & {
    token?: string;
};


export function ApolloWrapper({ children, token }: Props) {
    return <ApolloNextAppProvider makeClient={makeClient(token)}>{children}</ApolloNextAppProvider>;
}
