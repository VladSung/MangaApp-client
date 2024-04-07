import { getSession } from '@auth0/nextjs-auth0';
import {
    AppShellHeader,
    Group
} from '@mantine/core';
import { redirect } from 'next/navigation';
import { graphql } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';

import classes from './header.module.css';
import { Navigation } from './navigation';
import dynamic from 'next/dynamic';


const ProfileOrLoginMenu = dynamic(() => import('@/app/features/auth'), { ssr: false })

const authMutation = graphql(`
    mutation getAuth($input: AuthInput) {
        auth(input: $input) {
            id
            avatar
        }
    }
`);

async function Header({ lng }: { lng: string }) {
    const session = await getSession();

    const auth = session?.user ? await getClient().mutate({
        mutation: authMutation,
        errorPolicy: 'all',
        variables: {
            input: {
                email: (session?.user?.email as string) || null,
                username: (session?.user?.name as string) || null,
                avatar: null,
            },
        },
    }) : {};

    if (auth.errors?.find(err => (err.extensions.code === 'TOKEN_EXPIRED'))) {
        redirect('/api/auth/authorize')
    }

    return (
        <AppShellHeader className={classes.header}>
            <Group px={32} wrap='nowrap' justify="space-between" h="100%">
                <Navigation lng={lng} />
                <Group justify='flex-end' grow w='50%'>
                    <ProfileOrLoginMenu id={auth.data?.auth.id} avatar={auth.data?.auth.avatar} />
                </Group>
            </Group>
        </AppShellHeader>
    );
}

export default Header
