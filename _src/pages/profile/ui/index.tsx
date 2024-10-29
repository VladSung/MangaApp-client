import { AppShellMain, Button, Container, Image, Paper } from '@mantine/core';
import { ComicCard } from '@src/entities/comic';
import { ProfileContent, ProfileHeader } from '@src/entities/profile';
import { TeamCard } from '@src/entities/team';
import { PageProps } from '@src/shared/api/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { notFound } from 'next/navigation';

import { meProfileInfoQuery } from '../api';

export const ProfilePage = async ({}: PageProps) => {
    const { data } = await getClient().query({
        query: meProfileInfoQuery,
        errorPolicy: 'all',
    });

    const me = data.user.me;

    if (!me) {
        notFound();
    }

    const comics = me?.membersOf?.edges
        ?.flatMap((edge) => edge?.node?.team?.comics?.edges ?? [])
        .map((edge) => <ComicCard key={edge.node?.id} data={edge.node} />);

    const teams =
        me?.membersOf?.edges?.map(({ node }) => (
            <TeamCard key={node.team?.id} team={node.team} />
        )) ?? [];

    return (
        <AppShellMain>
            <Container pt={40} size="lg">
                {me?.background && (
                    <Paper mb="lg" radius="md" withBorder>
                        <Image
                            src={me?.background}
                            alt=""
                            h="14dvw"
                            radius="md"
                            mah="172"
                            mih={90}
                        />
                    </Paper>
                )}
                <ProfileHeader user={me} mb="xl">
                    <Button size="sm">Edit profile</Button>
                </ProfileHeader>
                <ProfileContent teams={teams} comics={comics} />
            </Container>
        </AppShellMain>
    );
};
