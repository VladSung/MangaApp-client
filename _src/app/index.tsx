'use client'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactNode } from 'react';

import { ApolloWrapper } from './apollo-wrapper';

type Props = {
    children: ReactNode;
    token?: string;
};

const WithProviders = ({ children, token }: Props) => {

    return (
        <UserProvider>
            <ApolloWrapper token={token}>
                {children}
            </ApolloWrapper>
        </UserProvider>
    );
};

export { WithProviders };
