import ThemeRegistry from './ThemeRegistry';
import { DndProvider } from './dnd';
import { ApolloWrapper } from './apollo-wrapper';
import { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

type Props = {
    children: ReactNode;
    token?: string;
};

const WithProviders = ({ children, token }: Props) => {
    return (
        <UserProvider>
            <ApolloWrapper token={token}>
                <DndProvider>
                    <ThemeRegistry>{children}</ThemeRegistry>
                </DndProvider>
            </ApolloWrapper>
        </UserProvider>
    );
};

export { WithProviders };
