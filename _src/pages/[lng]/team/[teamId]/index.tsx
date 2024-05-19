import { Button, TimelineItem, Text, Timeline, Paper, Container, AppShellMain, Group, UnstyledButton, Tabs, TabsTab, TabsList, TabsPanel } from '@mantine/core';
import { useTranslation } from '@src/shared/lib/i18n';
import { PageProps } from '@src/shared/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { graphql } from '@src/shared/api/graphql';
import { ComicCard } from '@src/entities/comic';
import { Avatar } from '@src/shared/ui/Avatar';
import Link from 'next/link';
import { ProfileHeader } from '@src/entities/profile';

type Props = PageProps & {
    params: {
        teamId: string
    }
}

const teamQuery = graphql(`
    query TeamInfo($id:ID!) {
        team(id:$id){
            id
            avatar
            name
            description
            members{
                id
                role
                    user{
                        id
                        name
                        avatar
                    }
            }
            comics{
                id
                cover
                title
            }
        } 
}
`)

const TeamPage = async ({ params }: Props) => {

    const { t } = await useTranslation(params.lng, 'team/profile');
    const { data } = await getClient().query({ query: teamQuery, variables: { id: params.teamId } });

    const updates = [
        { title: 'New Comic Release', date: 'April 10, 2024', content: 'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!' },
        { title: 'New Comic Release', date: 'April 10, 2024', content: 'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!' },
        { title: 'Artist Spotlight', date: 'March 25, 2024', content: 'Check out our interview with the talented Vlad 79#, the lead artist behind our fantasy epic!' },
    ];

    return (
        <AppShellMain>
            <Container pt={40} size='lg'>
                <ProfileHeader mb='xl' user={{ name: data?.team?.name!, description: data?.team?.description, avatar: data?.team?.avatar }}>
                    <Button size='sm'>{t('header.follow')}</Button>
                </ProfileHeader>

                <Tabs defaultValue='members'>
                    <TabsList mb='lg'>
                        <TabsTab value='members'>
                            {t('members')}
                        </TabsTab>
                        <TabsTab value='comics'>
                            {t('comics')}
                        </TabsTab>
                        <TabsTab value='updates'>
                            {t('updates')}
                        </TabsTab>
                    </TabsList>
                    <TabsPanel value='members'>
                        <Paper
                            p="lg"
                            mb='md'
                            radius='md'
                            withBorder
                        >
                            <Text size="lg" fw={700} mb="md">
                                {t('members')}
                            </Text>
                            <Group>
                                {data.team?.members?.map((member) => (
                                    <UnstyledButton
                                        className='mantine-active'
                                        p='md'
                                        variant='transparent'
                                        key={member.id}
                                        component={Link}
                                        href={`/user/${member?.user?.id}`}
                                    >
                                        <Group align="center" gap='sm'>
                                            <Avatar src={member?.user?.avatar} size='lg' />
                                            <div>
                                                <Text>{member?.user?.name}</Text>
                                                <Text c="dimmed" size="sm">
                                                    {member.role}
                                                </Text>
                                            </div>
                                        </Group>
                                    </UnstyledButton>
                                ))}
                            </Group>
                        </Paper>
                    </TabsPanel>
                    <TabsPanel value='comics'>
                        <Group align='stretch'>
                            {data.team?.comics?.map((comic) => (
                                <ComicCard key={comic.id} data={comic} />
                            ))}
                        </Group>
                    </TabsPanel>
                    <TabsPanel value='updates'>
                        <Paper withBorder p='md' radius='md'>
                            <Text size="lg" fw={700} mb="md">
                                {t('updates')}
                            </Text>
                            <Timeline maw='300px' lineWidth={2} active={updates.length - 1} bulletSize={12}>
                                {updates.map((update, index) => (
                                    <TimelineItem
                                        key={index}
                                        component='article'
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
    )
};

export default TeamPage;