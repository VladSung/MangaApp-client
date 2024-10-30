'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
    Card,
    Container,
    Grid,
    Group,
    Paper,
    Select,
    SimpleGrid,
    Stack,
    Table,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core';
import {
    IconChartBar,
    IconEye,
    IconHeart,
    IconMessageCircle,
    IconUsers,
} from '@tabler/icons-react';
import { useState } from 'react';
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { dashboardStatisticsQuery } from '../api';

const tableHeaderStyle = {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
};

const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const DashboardStatisticsPage = () => {
    const { data, loading, error } = useQuery(dashboardStatisticsQuery);
    const [selectedTeam, setSelectedTeam] = useState<string | null>('');

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return `Error: + {error.message}`;
    }

    const teams =
        data?.user?.me?.membersOf?.edges?.filter(
            (edge) => edge?.node?.team?.id && edge?.node?.team?.name
        ) || [];

    const teamOptions = teams.map(({ node: { team } }) => ({
        value: team?.id as string,
        label: team?.name as string,
    }));

    const selectedTeamData = teams.find(({ node }) => node.team?.id === selectedTeam)?.node.team;
    const comicsData = selectedTeamData?.comics?.edges?.map(({ node }) => node) || [];

    const totalViews = comicsData.reduce(
        (sum, comic) => sum + (comic.usersReadHistory?.pageInfo?.totalCount || 0),
        0
    );

    const totalLikes = comicsData.reduce((sum, comic) => sum + (comic.rating?.totalCount || 0), 0);
    const totalComments = comicsData.reduce(
        (sum, comic) => sum + (comic.comments?.pageInfo.totalCount || 0),
        0
    );

    const totalSubscribers = comicsData.reduce(
        (sum, comic) => sum + (comic.subscriptions?.pageInfo.totalCount || 0),
        0
    );

    const pieChartData = comicsData.map((comic) => ({
        name: comic.title,
        value: comic.usersReadHistory?.pageInfo.totalCount || 0,
    }));

    const lineChartData = [
        { name: 'Jan', views: 4000, likes: 2400 },
        { name: 'Feb', views: 3000, likes: 1398 },
        { name: 'Mar', views: 2000, likes: 9800 },
        { name: 'Apr', views: 2780, likes: 3908 },
        { name: 'May', views: 1890, likes: 4800 },
        { name: 'Jun', views: 2390, likes: 3800 },
    ];

    return (
        <Container size="xl" py="md">
            <Stack gap="lg">
                <Group justify="flex-start">
                    <Title order={2}>Statistics</Title>
                    <Select
                        placeholder="Select a team"
                        data={teamOptions}
                        value={selectedTeam}
                        onChange={setSelectedTeam}
                        style={{ width: 200 }}
                    />
                </Group>

                <SimpleGrid cols={4} spacing="md">
                    <Paper shadow="sm" p="md" withBorder>
                        <Group>
                            <ThemeIcon variant="light" size="lg" color="blue">
                                <IconEye size={24} />
                            </ThemeIcon>
                            <div>
                                <Text>Total Views</Text>
                                <Title order={3}>{totalViews.toLocaleString()}</Title>
                            </div>
                        </Group>
                    </Paper>
                    <Paper shadow="sm" p="md" withBorder>
                        <Group>
                            <ThemeIcon variant="light" size="lg" color="red">
                                <IconHeart size={24} />
                            </ThemeIcon>
                            <div>
                                <Text>Total Likes</Text>
                                <Title order={3}>{totalLikes.toLocaleString()}</Title>
                            </div>
                        </Group>
                    </Paper>
                    <Paper shadow="sm" p="md" withBorder>
                        <Group>
                            <ThemeIcon variant="light" size="lg" color="green">
                                <IconMessageCircle size={24} />
                            </ThemeIcon>
                            <div>
                                <Text>Total Comments</Text>
                                <Title order={3}>{totalComments.toLocaleString()}</Title>
                            </div>
                        </Group>
                    </Paper>
                    <Paper shadow="sm" p="md" withBorder>
                        <Group>
                            <ThemeIcon variant="light" size="lg" color="grape">
                                <IconUsers size={24} />
                            </ThemeIcon>
                            <div>
                                <Text>Total Subscribers</Text>
                                <Title order={3}>{totalSubscribers.toLocaleString()}</Title>
                            </div>
                        </Group>
                    </Paper>
                </SimpleGrid>

                <Grid gutter="md">
                    <Grid.Col span={8}>
                        <Card shadow="sm" p="lg" withBorder>
                            <Title order={4} mb="md">
                                Views and Likes Over Time
                            </Title>
                            {/* <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="likes"
                                        stroke="#82ca9d"
                                    />
                                </LineChart>
                            </ResponsiveContainer> */}
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card shadow="sm" p="lg" withBorder style={{ height: '100%' }}>
                            <Title order={4} mb="md">
                                Views Distribution
                            </Title>
                            {/* <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer> */}
                        </Card>
                    </Grid.Col>
                </Grid>

                <Card shadow="sm" p="lg" withBorder>
                    <Title order={4} mb="md">
                        Comics Performance
                    </Title>
                    <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Views</Table.Th>
                                <Table.Th>Likes</Table.Th>
                                <Table.Th>Comments</Table.Th>
                                <Table.Th>Subscribers</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {comicsData.map((comic) => (
                                <Table.Tr key={comic.id}>
                                    <Table.Td style={tableCellStyle}>{comic.title}</Table.Td>
                                    <Table.Td style={tableCellStyle}>
                                        {comic.usersReadHistory?.pageInfo.totalCount?.toLocaleString()}
                                    </Table.Td>
                                    <Table.Td style={tableCellStyle}>
                                        {comic.rating?.totalCount || 0}
                                    </Table.Td>
                                    <Table.Td style={tableCellStyle}>
                                        {comic.comments?.pageInfo.totalCount?.toLocaleString()}
                                    </Table.Td>
                                    <Table.Td style={tableCellStyle}>
                                        {comic.subscriptions?.pageInfo.totalCount?.toLocaleString()}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Card>
            </Stack>
        </Container>
    );
};
