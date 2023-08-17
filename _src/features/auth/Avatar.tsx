import { Avatar as MuiAvatar, Button } from '@mui/material';
import { getCldImageUrl } from 'next-cloudinary';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { graphql } from '@/_src/shared/api/graphql';
import { getClient } from '@/_src/shared/lib/apollo/client';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type Props = {
    user?: UserProfile;
};

const authMutation = graphql(`
    mutation getAuth($input: AuthInput) {
        auth(input: $input) {
            avatar
        }
    }
`);

export const Avatar = async ({ user }: Props) => {
    const { data, errors } = await getClient().mutate({
        mutation: authMutation,
        errorPolicy: 'all',
        variables: {
            input: {
                email: user?.email,
                username: user?.name,
            },
        },
    });
    console.log(errors);

    if (errors) {
        return <>{redirect('/api/auth/logout')}</>;
    }

    const avatar = getCldImageUrl({
        src: data?.auth?.avatar || '',
        width: 40,
        height: 40,
        gravity: 'face',
        transformations: ['media_lib_thumb'],
        crop: 'thumb',
    });

    return (
        <MuiAvatar variant="circular">
            <Image width="40" height="40" src={avatar} alt="me" />
        </MuiAvatar>
    );
};
