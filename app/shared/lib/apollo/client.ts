import { from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getAccessToken } from '@auth0/nextjs-auth0';

import { config } from '@/app/shared/config';
import { apolloLinks } from './links';

const authLink = setContext(async (_, { headers }) => {
    let headersWithAuthToken: { headers: Headers & { authorization?: string } };

    try {
        const token = await getAccessToken();

        headersWithAuthToken = {
            headers: {
                ...(headers as Headers),
                authorization: `Bearer ${token.accessToken}`,
            },
        };
    } catch {
        headersWithAuthToken = {
            headers: {
                ...(headers as Headers),
                authorization: `Bearer `,
            },
        };
    }

    return headersWithAuthToken;
});

export const { getClient } = registerApolloClient(() => {
    const httpLink = new HttpLink({
        uri: config.apollo.uri,
    });

    return new NextSSRApolloClient({
        connectToDevTools: true,
        cache: new NextSSRInMemoryCache(),
        credentials: 'same-origin',
        link: from([...apolloLinks, authLink, httpLink]),
    });
});
