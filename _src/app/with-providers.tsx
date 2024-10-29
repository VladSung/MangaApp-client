'use client';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactNode } from 'react';

import { ApolloProvider } from './apollo-provider';

type Props = {
    children: ReactNode;
    token?: string;
};

const WithProviders = ({ children, token }: Props) => {
    return (
        <UserProvider>
            <ApolloProvider token={token}>{children}</ApolloProvider>
        </UserProvider>
    );
};

export { WithProviders };
