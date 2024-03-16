'use client'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactNode, useEffect } from 'react';
import { ApolloWrapper } from './apollo-wrapper';
import { usePathname, useSearchParams } from 'next/navigation';
import { nprogress } from '@mantine/nprogress';

type Props = {
    children: ReactNode;
    token?: string;
};

const WithProviders = ({ children, token }: Props) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {
        const handleStart = () => {
            nprogress.start()
        }
        const handleStop = () => {
            nprogress.complete()
        }

        handleStop()

        return () => {
            handleStart()
        }
    }, [pathname])
    return (
        <UserProvider>
            <ApolloWrapper token={token}>
                {children}
            </ApolloWrapper>
        </UserProvider>
    );
};

export { WithProviders };
