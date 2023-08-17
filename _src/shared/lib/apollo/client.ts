import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { HttpLink, from } from '@apollo/client';
import { apolloLinks } from './links';
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '@auth0/nextjs-auth0';

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
    } catch (err) {
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
        uri: process.env.APP_API_SERVER!,
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        credentials: 'same-origin',
        link: from([...apolloLinks, authLink, httpLink]),
    });
});
