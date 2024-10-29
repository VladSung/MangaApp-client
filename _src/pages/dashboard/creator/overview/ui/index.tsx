'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
    Badge,
    Button,
    Container,
    Group,
    Paper,
    Progress,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core';
import { ComicStatuses } from '@src/shared/api';
import { IconBook2, IconChartBar, IconEye, IconNews, IconUsers } from '@tabler/icons-react';

import { dashboardOverviewQuery } from '../api';

export const DashboardOverviewPage = () => {
    const { data, loading, error } = useQuery(dashboardOverviewQuery);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return `Error: + ${error.message};`;
    }

    const user = data?.user?.me;

    return (
        <Container size="xl" py="md">
            <SimpleGrid cols={3} spacing="md" verticalSpacing="md">
                <Paper shadow="sm" p="md" withBorder>
                    <Stack gap="md">
                        <Group>
                            <ThemeIcon variant="light" size="lg">
                                <IconUsers size={24} />
                            </ThemeIcon>
                            <Title order={3}>My Teams</Title>
                        </Group>
                        <Stack gap="sm">
                            {user?.membersOf?.edges?.map(
                                ({ node }) =>
                                    node.team && (
                                        <Group key={node.team.id} align="flex-start">
                                            <Group wrap="nowrap">
                                                <ThemeIcon
                                                    variant="light"
                                                    size="md"
                                                    style={{
                                                        backgroundImage: `url(${node.team.avatar})`,
                                                        backgroundSize: 'cover',
                                                    }}
                                                />
                                                <div>
                                                    <Text lineClamp={1}>{node.team.name}</Text>
                                                    <Text size="xs" c="dimmed">
                                                        {node.role}
                                                    </Text>
                                                </div>
                                            </Group>
                                            <Badge>{`${node.team.comics?.edges?.length} comics`}</Badge>
                                        </Group>
                                    )
                            )}
                        </Stack>
                        <Button variant="light" fullWidth>
                            Manage Teams
                        </Button>
                    </Stack>
                </Paper>

                <Paper shadow="sm" p="md" withBorder>
                    <Stack gap="md">
                        <Group>
                            <ThemeIcon variant="light" size="lg">
                                <IconBook2 size={24} />
                            </ThemeIcon>
                            <Title order={3}>Recent Comics</Title>
                        </Group>
                        <Stack gap="sm">
                            {user?.membersOf?.edges?.flatMap(({ node }) =>
                                node.team?.comics?.edges?.slice(0, 3).map(({ node: comic }) => (
                                    <Group key={comic.id} align="flex-start" wrap="nowrap">
                                        <Group wrap="nowrap">
                                            <ThemeIcon
                                                variant="light"
                                                size="lg"
                                                style={{
                                                    backgroundImage: `url(${comic.cover})`,
                                                    backgroundSize: 'cover',
                                                }}
                                            />
                                            <div>
                                                <Text>{comic.title}</Text>
                                                Last updated: + +{' '}
                                                {new Date(comic.updatedAt).toLocaleDateString()}
                                            </div>
                                        </Group>
                                        <Stack align="flex-end">
                                            <Badge
                                                color={
                                                    comic.status === ComicStatuses.Completed
                                                        ? 'green'
                                                        : 'blue'
                                                }
                                            >
                                                {comic.status}
                                            </Badge>
                                            chapters + {comic.count}
                                        </Stack>
                                    </Group>
                                ))
                            )}
                        </Stack>
                        <Button variant="light" fullWidth>
                            View All Comics
                        </Button>
                    </Stack>
                </Paper>

                <Paper shadow="sm" p="md" withBorder>
                    <Stack gap="md">
                        <Group>
                            <ThemeIcon variant="light" size="lg">
                                <IconChartBar size={24} />
                            </ThemeIcon>
                            <Title order={3}>Statistics</Title>
                        </Group>
                        <Stack gap="xs">
                            <Text>Total Views</Text>
                            <Group justify="flex-start">
                                <Text fw={700}>10,234</Text>
                                <Text size="xs" c="teal">
                                    +5% from last week
                                </Text>
                            </Group>
                            <Progress value={75} size="sm" />
                        </Stack>
                        <Stack gap="xs">
                            <Text>Subscribers</Text>
                            <Group justify="flex-start">
                                <Text fw={700}>1,567</Text>
                                <Text size="xs" c="teal">
                                    +2% from last month
                                </Text>
                            </Group>
                            <Progress value={60} size="sm" color="grape" />
                        </Stack>
                        <Button variant="light" fullWidth leftSection={<IconEye size={16} />}>
                            View Detailed Stats
                        </Button>
                    </Stack>
                </Paper>

                <Paper shadow="sm" p="md" withBorder style={{ gridColumn: 'span 3' }}>
                    <Stack gap="md">
                        <Group>
                            <ThemeIcon variant="light" size="lg">
                                <IconNews size={24} />
                            </ThemeIcon>
                            <Title order={3}>Recent Posts</Title>
                        </Group>
                        <SimpleGrid cols={3}>
                            {user?.notifications?.edges?.map(({ node }) => (
                                <Paper key={node.id} shadow="xs" p="sm" withBorder>
                                    <Stack gap="xs">
                                        <Text fw={700}>{node.title}</Text>
                                        <Text size="sm" lineClamp={2}>
                                            {node.description}
                                        </Text>
                                        <Group justify="flex-start">
                                            <Badge>{node.type}</Badge>
                                            <Text size="xs" c="dimmed">
                                                {new Date(node.createdAt).toLocaleDateString()}
                                            </Text>
                                        </Group>
                                    </Stack>
                                </Paper>
                            ))}
                        </SimpleGrid>
                        <Button variant="light" fullWidth>
                            Manage Posts
                        </Button>
                    </Stack>
                </Paper>
            </SimpleGrid>
        </Container>
    );
};
