import React from 'react';
import {
    Container,
    AppShellMain,
    Image,
    Text,
    ActionIcon
} from '@mantine/core';
import { Header } from './header';
import { PageProps } from '@src/shared/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { graphql } from '@src/shared/api/graphql';
import { Error } from '@src/entities/error';
import { redirect } from 'next/navigation';
import { IconSettings } from '@tabler/icons-react';


const ProfileQuery = graphql(`
    query ProfileQuery {
        me{
            username
            avatar
            description
            background
        }
    }
`)

const ProfilePage = async ({ params }: PageProps) => {
    const { data, error } = await getClient().query({ query: ProfileQuery });

    if (!data?.me) {
        redirect('/api/auth/login');
    }

    if (error) {
        return <AppShellMain><Error errorCode={error?.name} message={error.message} /></AppShellMain>;
    }

    return (
        <AppShellMain>
            <Container pt='lg'>
                {data.me?.background && <Image src={data.me?.background} w='100%' mb='md' radius='md' mah={200} mih={128} />}
                <Header
                    data={{ avatar: data.me?.avatar, name: data.me?.username }}
                    rightSlot={<ActionIcon variant='default' size='lg' aria-label='Edit profile'><IconSettings size={20} /></ActionIcon>}
                >
                    <Text>{data?.me?.description}</Text>
                </Header>

            </Container>
        </AppShellMain >
    );
};

export default ProfilePage;