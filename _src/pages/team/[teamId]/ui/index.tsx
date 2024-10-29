import {
    AppShellMain,
    Button,
    Container,
    Group,
    Paper,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    Text,
    Timeline,
    TimelineItem,
    UnstyledButton,
} from '@mantine/core';
import { ComicCard, ComicGrid } from '@src/entities/comic';
import { ProfileHeader } from '@src/entities/profile';
import { teamInfoQuery } from '@src/entities/team';
import { PageProps } from '@src/shared/api';
import { getClient } from '@src/shared/lib/apollo/client';
import { fetchTranslation } from '@src/shared/lib/i18n';
import { Avatar } from '@src/shared/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const TeamPage = async ({
    params,
}: PageProps<{
    teamId: string;
}>) => {
    const { teamId, lng } = await params;

    const { t } = await fetchTranslation(lng, 'team/profile');
    const { data } = await getClient().query({
        query: teamInfoQuery,
        variables: { id: teamId },
    });

    if (!data.team.one) {
        notFound();
    }

    const updates = [
        {
            title: 'New Comic Release',
            date: 'April 10, 2024',
            content:
                'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!',
        },
        {
            title: 'New Comic Release',
            date: 'April 10, 2024',
            content:
                'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!',
        },
        {
            title: 'Artist Spotlight',
            date: 'March 25, 2024',
            content:
                'Check out our interview with the talented Vlad 79#, the lead artist behind our fantasy epic!',
        },
    ];

    const teamComics = data?.team.one?.comics?.edges?.map((comic) => comic?.node) || [];
    const teamMembers = data.team.one?.members?.edges?.map((member) => member?.node) || [];

    return (
        <AppShellMain>
            <Container pt={40} size="lg">
                <ProfileHeader
                    mb="xl"
                    user={{
                        name: data?.team.one?.name,
                        publicId: data?.team.one?.publicId,
                        description: data?.team.one?.description,
                        avatar: data?.team.one?.avatar,
                    }}
                >
                    <Button size="sm">{t('header.follow')}</Button>
                </ProfileHeader>

                <Tabs defaultValue="members">
                    <TabsList mb="lg">
                        <TabsTab value="members">{t('members')}</TabsTab>
                        <TabsTab value="comics">{t('comics')}</TabsTab>
                        <TabsTab value="updates">{t('updates')}</TabsTab>
                    </TabsList>
                    <TabsPanel value="members">
                        <Paper p="lg" mb="md" radius="md" withBorder>
                            <Text size="lg" fw={700} mb="md">
                                {t('members')}
                            </Text>
                            <Group>
                                {teamMembers?.map((member) => (
                                    <UnstyledButton
                                        className="mantine-active"
                                        p="md"
                                        variant="transparent"
                                        key={member?.id}
                                        component={Link}
                                        href={`/user/${member?.user?.publicId}`}
                                    >
                                        <Group align="center" gap="sm">
                                            <Avatar src={member?.user?.avatar} size="lg" />
                                            <div>
                                                <Text>{member?.user?.name}</Text>
                                                <Text c="dimmed" size="sm">
                                                    {member?.role}
                                                </Text>
                                            </div>
                                        </Group>
                                    </UnstyledButton>
                                ))}
                            </Group>
                        </Paper>
                    </TabsPanel>
                    <TabsPanel value="comics">
                        <ComicGrid>
                            {teamComics.map((comic) => (
                                <ComicCard key={comic?.id} data={comic} />
                            ))}
                        </ComicGrid>
                    </TabsPanel>
                    <TabsPanel value="updates">
                        <Paper withBorder p="md" radius="md">
                            <Text size="lg" fw={700} mb="md">
                                {t('updates')}
                            </Text>
                            <Timeline
                                maw="300px"
                                lineWidth={2}
                                active={updates.length - 1}
                                bulletSize={12}
                            >
                                {updates.map((update, index) => (
                                    <TimelineItem
                                        key={index}
                                        component="article"
                                        title={update.title}
                                        lineVariant="dashed"
                                    >
                                        <Text size="sm" c="dimmed">
                                            {update.date}
                                        </Text>
                                        <Text size="sm">{update.content}</Text>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </Paper>
                    </TabsPanel>
                </Tabs>
            </Container>
        </AppShellMain>
    );
};
