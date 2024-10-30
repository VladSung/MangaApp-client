import { ActionIcon, AppShellSection, Container, Group, Paper, rem, Title } from '@mantine/core';
import { ComicCard, ComicGrid } from '@src/entities/comic';
import { teamInfoQuery } from '@src/entities/team';
import { PageProps } from '@src/shared/api/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { TeamPageHeader } from './header';

type Props = PageProps<{
    teamId: string;
}>;

export const DashboardTeamPage = async ({ params }: Props) => {
    const { teamId, lng } = await params;
    const {
        data: {
            team: { one: team },
        },
    } = await getClient().query({
        query: teamInfoQuery,
        variables: { id: teamId },
    });

    if (!team?.id) {
        notFound();
    }

    return (
        <Container size="xl" p="md">
            <Paper>
                <TeamPageHeader team={team} lng={lng} />
                <AppShellSection component="section">
                    <Group mb="md">
                        <Title order={2} size="h3">
                            Comics
                        </Title>
                        <ActionIcon
                            size="xs"
                            href={`/dashboard/comic/add?teamId=${team?.id}`}
                            component={Link}
                            variant="contain"
                        >
                            <IconPlus size={14} stroke={rem(2)} />
                        </ActionIcon>
                    </Group>
                    <ComicGrid>
                        {team?.comics?.edges?.map(
                            ({ node: comic }) =>
                                comic && (
                                    <ComicCard
                                        key={comic?.id}
                                        data={{
                                            id: comic?.id,
                                            title: comic?.title,
                                            cover: comic?.cover,
                                        }}
                                        href={`/dashboard/comic/${comic?.id}`}
                                    />
                                )
                        )}
                    </ComicGrid>
                    {(team?.comics?.pageInfo.totalCount || team?.comics?.edges?.length || 0) <
                        1 && <Title order={4}>Nothing to show</Title>}
                </AppShellSection>
            </Paper>
        </Container>
    );
};
