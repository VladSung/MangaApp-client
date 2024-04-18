import React from 'react';
import { Box, Button, Grid, TimelineItem, Text, Space, Timeline, Flex, Avatar, GridCol, Paper, Container, AppShellMain, AppShellHeader, Group } from '@mantine/core';

const TeamProfile = () => {
    const teamMembers = [
        { name: 'Vlad 79#', role: 'Lead Artist', image: '/avatars/avatar-1.png' },
        { name: 'Dm Sh', role: 'Writer', image: '/avatars/avatar-2.png' },
    ];

    const comicProjects = [
        { title: 'Omniscient Reader', description: 'A thrilling webtoon adaptation of the popular novel' },
        { title: 'Sci-Fi Adventure', description: 'An original sci-fi comic series set in a futuristic world' },
        { title: 'Fantasy Epic', description: 'A sweeping fantasy comic with stunning visuals' },
    ];

    const updates = [
        { title: 'New Comic Release', date: 'April 10, 2024', content: 'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!' },
        { title: 'New Comic Release', date: 'April 10, 2024', content: 'We\'re excited to announce the release of our latest comic, "Sci-Fi Adventure"!' },
        { title: 'Artist Spotlight', date: 'March 25, 2024', content: 'Check out our interview with the talented Vlad 79#, the lead artist behind our fantasy epic!' },
    ];

    return (
        <AppShellMain>
            <Container pt={40} size='lg'>
                <Paper
                    component='header'
                    p="md"
                    mb='md'
                    radius='md'
                    shadow='md'
                >
                    <Flex justify='space-between' align='center'>
                        <Group>
                            <Avatar size='lg' mb="md" />
                            <Text size="xl" fw={700} mb="xs">
                                Our Comic Team
                            </Text>
                        </Group>
                        <Button >
                            Subscribe to Updates
                        </Button>
                    </Flex>
                </Paper>
                <Paper
                    p="lg"
                    mb='md'
                    radius='md'
                    withBorder
                >
                    <Text size="lg" fw={700} mb="md">
                        Team Members
                    </Text>
                    <Group>
                        {teamMembers.map((member, index) => (
                            <Paper p='md' key={index}>
                                <Flex align="center">
                                    <Avatar alt={member.name} size='md' mr="md" />
                                    <div>
                                        <Text>{member.name}</Text>
                                        <Text c="dimmed" size="sm">
                                            {member.role}
                                        </Text>
                                    </div>
                                </Flex>
                            </Paper>
                        ))}
                    </Group>
                </Paper>
                <Group>
                    {/* <Paper
                        shadow='md'
                        radius='md'
                        p="md"
                    >
                        {comicProjects.map((project, index) => (
                            <Box key={index} >
                                <Text fw={500}>{project.title}</Text>
                                <Text c="dimmed" size="sm">
                                    {project.description}
                                </Text>
                            </Box>
                        ))}
                    </Paper> */}

                    <Box>
                        <Text size="lg" fw={700} mb="md">
                            Team Updates
                        </Text>
                        <Timeline autoContrast lineWidth={2} active={updates.length - 1} bulletSize={12}>
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
                    </Box>
                </Group>
            </Container>
        </AppShellMain>
    )

    return (
        <Box p="xl">
            <Grid>
                <GridCol span={4}>
                    <Paper
                        p="xl"
                        radius='md'
                        shadow='md'
                    >
                        <Avatar size={120} mb="md" />
                        <Text size="xl" fw={700} mb="xs">
                            Our Comic Team
                        </Text>
                        <Text c="dimmed" size="sm" mb="md">
                            Meet the creative minds behind our webtoons and comic series.
                        </Text>
                        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} fullWidth>
                            Subscribe to Updates
                        </Button>
                    </Paper>
                </GridCol>
                <GridCol span={8}>
                    <Text size="xl" fw={700} mb="md">
                        Team Members
                    </Text>
                    <Grid>
                        {teamMembers.map((member, index) => (
                            <GridCol key={index} span={6}>
                                <Flex align="center">
                                    <Avatar alt={member.name} size={80} mr="md" />
                                    <div>
                                        <Text>{member.name}</Text>
                                        <Text c="dimmed" size="sm">
                                            {member.role}
                                        </Text>
                                    </div>
                                </Flex>
                            </GridCol>
                        ))}
                    </Grid>
                    <Space h="xl" />
                    <Text size="xl" fw={700} mb="md">
                        Our Comic Projects
                    </Text>
                    <Grid>
                        {comicProjects.map((project, index) => (
                            <GridCol key={index} span={4}>
                                <Paper
                                    shadow='md'
                                    radius='md'
                                    p="md"
                                >
                                    <Text fw={500}>{project.title}</Text>
                                    <Text c="dimmed" size="sm">
                                        {project.description}
                                    </Text>
                                </Paper>
                            </GridCol>
                        ))}
                    </Grid>
                    <Space h="xl" />
                    <Text size="xl" fw={700} mb="md">
                        Team Updates
                    </Text>
                    <Timeline active={2} bulletSize={24} lineWidth={2}>
                        {updates.map((update, index) => (
                            <TimelineItem
                                key={index}
                                title={update.title}
                                bullet={<Avatar size={14} mr="xs" />}
                                lineVariant="dashed"
                            >
                                <Text size="sm" color="dimmed">
                                    {update.date}
                                </Text>
                                <Text size="sm">{update.content}</Text>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </GridCol>
            </Grid>
        </Box>
    );
};

export default TeamProfile;