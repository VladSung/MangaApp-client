import { getSession } from '@auth0/nextjs-auth0';
import {
    AppShellHeader
} from '@mantine/core';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { graphql } from '@src/shared/api/graphql';
import { getClient } from '@src/shared/lib/apollo/client';

import classes from './header.module.css';
import { Navigation } from './navigation';


const ProfileOrLoginMenu = dynamic(() => import('@src/features/auth'), { ssr: false })

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
            <div className={classes.headerInner}>
                <Navigation lng={lng} />
                <div className={classes.profileBox}>
                    <ProfileOrLoginMenu id={auth.data?.auth.id} avatar={auth.data?.auth.avatar} />
                </div>
            </div>
        </AppShellHeader>
    );
}

export default Header
