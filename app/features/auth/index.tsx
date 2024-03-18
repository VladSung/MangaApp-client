import { getSession } from '@auth0/nextjs-auth0';
import { Button } from '@mantine/core';

import { graphql } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';

import { Avatar } from './avatar';
import { redirect } from 'next/navigation';

const authMutation = graphql(`
    mutation getAuth($input: AuthInput) {
        auth(input: $input) {
            id
            avatar
        }
    }
`);



export const LoginButtonOrAvatar = async () => {
    const session = await getSession();

    if (session?.user) {
        const { data, errors } = await getClient().mutate({
            mutation: authMutation,
            errorPolicy: 'all',
            variables: {
                input: {
                    email: (session.user?.email as string) || null,
                    username: (session.user?.name as string) || null,
                    avatar: null,
                },
            },
        });

        if (errors?.filter(err => (err.extensions.code === 'TOKEN_EXPIRED'))[0]) {
            // if (session?.accessTokenExpiresAt && session?.accessTokenExpiresAt * 1000 < new Date().getTime()) {
            redirect('/api/auth/authorize')
            // }
        }

        if (data?.auth) {
            return <Avatar avatar={data.auth.avatar} />;
        }
    }

    return <Button href={'/api/auth/login'} component='a'>Sign Up | In</Button>;
};

