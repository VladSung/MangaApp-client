import { Button, TimelineItem, Text, Timeline, Paper, Container, AppShellMain, Group, UnstyledButton, Tabs, TabsTab, TabsList, TabsPanel } from '@mantine/core';
import { useTranslation } from '@src/shared/lib/i18n';
import { PageProps } from '@src/shared/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { graphql } from '@src/shared/api/graphql';
import { Avatar } from '@src/shared/ui/Avatar';
import Link from 'next/link';
import { ProfileContent, ProfileHeader } from '@src/entities/profile';
import { notFound } from 'next/navigation';

type Props = PageProps & {
    params: {
        userId: string
    }
}

const userQuery = graphql(`
    query UserInfo($id:ID!) {
        user(id:$id){
            id
            avatar
            name
            description
            background
            member{
                id
                role
                comics{
                    id
                    cover
                    title
                }
                team{
                    id
                    name
                    avatar
                }
            }
        } 
    }
`)

const UserPage = async ({ params }: Props) => {

    const { t } = await useTranslation(params.lng, 'team/profile');
    const { data } = await getClient().query({ query: userQuery, variables: { id: params.userId } });

    if (!data.user?.id) return notFound()

    const updates = [
        { title: 'New Comic Release', date: 'April 10, 2024', content: 'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!' },
        { title: 'New Comic Release', date: 'April 10, 2024', content: 'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!' },
        { title: 'Artist Spotlight', date: 'March 25, 2024', content: 'Check out our interview with the talented Vlad 79#, the lead artist behind our fantasy epic!' },
    ];

    const teams = data?.user?.member?.map((member) => member?.team) ?? [];
    const comics = data?.user?.member?.map((member) => member?.comics)?.flat() ?? [];

    return (
        <AppShellMain>
            <Container pt={40} size='lg'>
                <ProfileHeader
                    user={data.user}
                    mb='xl'
                >
                    <Button size='sm'>{t('header.follow')}</Button>
                </ProfileHeader>
                <ProfileContent teams={teams} comics={comics} />

            </Container>
        </AppShellMain>
    )
};

export default UserPage;