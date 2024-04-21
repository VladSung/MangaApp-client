import React from 'react';
import { Button, Grid, TimelineItem, Text, Timeline, Paper, Container, AppShellMain, Group, UnstyledButton, Tabs, TabsTab, TabsList, TabsPanel } from '@mantine/core';
import { useTranslation } from '@/app/shared/lib/i18n';
import { PageProps } from '@/app/shared/types';
import { getClient } from '@/app/shared/lib/apollo/client';
import { graphql } from '@/app/shared/api/graphql';
import { ComicCard } from '@/app/entities/comic';
import { Avatar } from '@/app/shared/ui/Avatar';
import { TeamHeader } from '@/app/entities/team';
import Link from 'next/link';

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
            tagline
            members{
                id
                role
                    user{
                        id
                        username
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

const TeamProfile = async ({ params }: Props) => {

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
                <TeamHeader
                    rightSlot={<Button>{t('header.follow')}</Button>}
                    team={data.team}
                >
                    <Text>{data.team?.tagline}</Text>

                </TeamHeader>
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
                                                <Text>{member?.user?.username}</Text>
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

    // return (
    //     <Box p="xl">
    //         <Grid>
    //             <GridCol span={4}>
    //                 <Paper
    //                     p="xl"
    //                     radius='md'
    //                     shadow='md'
    //                 >
    //                     <Avatar size={120} mb="md" />
    //                     <Text size="xl" fw={700} mb="xs">
    //                         Our Comic Team
    //                     </Text>
    //                     <Text c="dimmed" size="sm" mb="md">
    //                         Meet the creative minds behind our webtoons and comic series.
    //                     </Text>
    //                     <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} fullWidth>
    //                         Subscribe to Updates
    //                     </Button>
    //                 </Paper>
    //             </GridCol>
    //             <GridCol span={8}>
    //                 <Text size="xl" fw={700} mb="md">
    //                     Team Members
    //                 </Text>
    //                 <Grid>
    //                     {teamMembers.map((member, index) => (
    //                         <GridCol key={index} span={6}>
    //                             <Flex align="center">
    //                                 <Avatar alt={member.name} size={80} mr="md" />
    //                                 <div>
    //                                     <Text>{member.name}</Text>
    //                                     <Text c="dimmed" size="sm">
    //                                         {member.role}
    //                                     </Text>
    //                                 </div>
    //                             </Flex>
    //                         </GridCol>
    //                     ))}
    //                 </Grid>
    //                 <Space h="xl" />
    //                 <Text size="xl" fw={700} mb="md">
    //                     Our Comic Projects
    //                 </Text>
    //                 <Grid>
    //                     {comicProjects.map((project, index) => (
    //                         <GridCol key={index} span={4}>
    //                             <Paper
    //                                 shadow='md'
    //                                 radius='md'
    //                                 p="md"
    //                             >
    //                                 <Text fw={500}>{project.title}</Text>
    //                                 <Text c="dimmed" size="sm">
    //                                     {project.description}
    //                                 </Text>
    //                             </Paper>
    //                         </GridCol>
    //                     ))}
    //                 </Grid>
    //                 <Space h="xl" />
    //                 <Text size="xl" fw={700} mb="md">
    //                     Team Updates
    //                 </Text>
    //                 <Timeline active={2} bulletSize={24} lineWidth={2}>
    //                     {updates.map((update, index) => (
    //                         <TimelineItem
    //                             key={index}
    //                             title={update.title}
    //                             bullet={<Avatar size={14} mr="xs" />}
    //                             lineVariant="dashed"
    //                         >
    //                             <Text size="sm" color="dimmed">
    //                                 {update.date}
    //                             </Text>
    //                             <Text size="sm">{update.content}</Text>
    //                         </TimelineItem>
    //                     ))}
    //                 </Timeline>
    //             </GridCol>
    //         </Grid>
    //     </Box>
    // );
};

export default TeamProfile;