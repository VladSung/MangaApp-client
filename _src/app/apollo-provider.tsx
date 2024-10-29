'use client';
import { ApolloLink, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/index.js';
import { getMainDefinition } from '@apollo/client/utilities/index.js';
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { config } from '@src/shared/config';
import { apolloLinks } from '@src/shared/lib/apollo/links';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { PropsWithChildren } from 'react';
import { setVerbosity } from 'ts-invariant';

setVerbosity('debug');

const wsLink = () =>
    new GraphQLWsLink(
        createClient({
            url: config.apollo.wsUri,
        })
    );

const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Number.POSITIVE_INFINITY,
        jitter: true,
    },
    attempts: {
        max: 3,
        retryIf: (error, _operation) => !!error,
    },
});

const formatDateLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        // nprogress.complete()
        return response;
    });
});

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
        uri: config.apollo.uri,
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
        cache: new NextSSRInMemoryCache({
            typePolicies: {
                // CommentConnection: {
                //     keyFields: ['comicId'],
                // },
                ChapterQueries: {
                    keyFields: [],
                },
                ComicQueries: {
                    keyFields: [],
                },
                CommentQueries: {
                    fields: {
                        allByComic: {
                            keyArgs: false,
                        },
                    },
                    keyFields: [],
                },
                CommentReplyQueries: {
                    keyFields: [],
                },
                GenreQueries: {
                    keyFields: [],
                },
                ReadHistoryQueries: {
                    keyFields: [],
                },
                NotificationQueries: {
                    keyFields: [],
                },
                TagQueries: {
                    keyFields: [],
                },
                TeamQueries: {
                    keyFields: [],
                },
                TeamMemberQueries: {
                    keyFields: [],
                },
                UserQueries: {
                    keyFields: [],
                },
                UserSubscriptionQueries: {
                    keyFields: [],
                },
            },
        }),
        link: ApolloLink.from(
            typeof window === 'undefined'
                ? [
                      new SSRMultipartLink({
                          stripDefer: true,
                      }) as ApolloLink,
                      retryLink,
                      authLink,
                      formatDateLink,
                      ...apolloLinks(),
                      httpLink,
                  ]
                : [retryLink, formatDateLink, authLink, ...apolloLinks(), splitLink()]
        ),
    });
};

type Props = PropsWithChildren & {
    token?: string;
};

export function ApolloProvider({ children, token }: Props) {
    return <ApolloNextAppProvider makeClient={makeClient(token)}>{children}</ApolloNextAppProvider>;
}
