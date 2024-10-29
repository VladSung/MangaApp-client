'use client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
    ActionIcon,
    Anchor,
    Breadcrumbs,
    Button,
    Card,
    Container,
    Grid,
    Group,
    Paper,
    Stack,
    Table,
    Tabs,
    Text,
    Title,
} from '@mantine/core';
import { PageProps } from '@src/shared/api';
import { useTranslation } from '@src/shared/lib/i18n/client';
import {
    IconBook,
    IconBookmarks,
    IconChartBar,
    IconEdit,
    IconPlus,
    IconSettings,
    IconTrendingUp,
    IconUser,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { use } from 'react';

import { comicBaseInfoQuery } from '../api';
import { ChaptersTab } from './chapters-tab';
import { SettingsTab } from './settings-tab';

type Props = PageProps<{
    comicId: string;
}>;

export const ComicPage = ({ params }: Props) => {
    const { lng, comicId } = use(params);
    const { t } = useTranslation(lng, 'comic/id');
    const { data } = useSuspenseQuery(comicBaseInfoQuery, { variables: { id: comicId } });
    const comic = data.comic.one;

    const stats = [
        { icon: IconTrendingUp, title: 'Popularity', value: '89%' },
        { icon: IconUser, title: 'Readers', value: '10,245' },
        { icon: IconBookmarks, title: 'Bookmarks', value: '5,678' },
        { icon: IconChartBar, title: 'Views', value: '1.2M' },
    ];

    if (!comic?.id) {
        notFound();
    }

    const OverviewTab = () => (
        <Grid>
            <Grid.Col span={8}>
                <Stack>
                    <Title order={4}>Statistics</Title>
                    <Group>
                        {stats.map((stat) => (
                            <Paper key={stat.title} shadow="xs" p="xs" withBorder>
                                <Group>
                                    <ActionIcon variant="light" size="md">
                                        <stat.icon size={18} />
                                    </ActionIcon>
                                    <div>
                                        <Text size="xs" c="dimmed">
                                            {stat.title}
                                        </Text>
                                        <Text fw={500}>{stat.value}</Text>
                                    </div>
                                </Group>
                            </Paper>
                        ))}
                    </Group>
                    <Title order={4} mt="md">
                        Recent Activity
                    </Title>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Date</Table.Th>
                                <Table.Th>Action</Table.Th>
                                <Table.Th>User</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td>2024-10-11</Table.Td>
                                <Table.Td>New chapter added</Table.Td>
                                <Table.Td>Admin</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>2024-10-10</Table.Td>
                                <Table.Td>Description updated</Table.Td>
                                <Table.Td>Editor</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
                <Stack>
                    <Title order={4}>Quick Actions</Title>
                    <Button
                        component={Link}
                        href={`/comic/${comicId}`}
                        fullWidth
                        leftSection={<IconBook size={14} />}
                    >
                        View Comic
                    </Button>
                    <Button
                        component={Link}
                        href={`/dashboard/comic/${comicId}/edit`}
                        fullWidth
                        variant="light"
                        leftSection={<IconEdit size={14} />}
                    >
                        Edit Details
                    </Button>
                    <Button
                        component={Link}
                        href={`/dashboard/comic/${comicId}/ch-new`}
                        fullWidth
                        variant="light"
                        leftSection={<IconPlus size={14} />}
                    >
                        Add New Chapter
                    </Button>
                    <Button
                        component={Link}
                        href={`/dashboard/comic/${comicId}/chapter`}
                        fullWidth
                        variant="light"
                        leftSection={<IconSettings size={14} />}
                    >
                        Manage Chapters
                    </Button>
                </Stack>
            </Grid.Col>
        </Grid>
    );

    return (
        <Container size="xl" p="md">
            <Breadcrumbs mb={32}>
                <Anchor component={Link} href="/dashboard">
                    Dashboard
                </Anchor>
                <Anchor component={Link} href="/dashboard/comic">
                    Projects
                </Anchor>
                <Anchor component={Link} href={`/dashboard/comic/${comicId}`}>
                    {comic?.title}
                </Anchor>
            </Breadcrumbs>
            <Grid gutter="md">
                <Grid.Col span={3}>
                    <Card shadow="sm" p="md" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src={comic?.cover}
                                width={300}
                                height={480}
                                alt={`${comic?.title} cover`}
                                style={{ objectFit: 'cover' }}
                            />
                        </Card.Section>
                        <Stack gap="xs" mt="sm">
                            <Title order={3}>{comic?.title}</Title>
                            <Text size="sm" c="dimmed" lineClamp={3}>
                                {comic?.description}
                            </Text>
                        </Stack>
                    </Card>
                </Grid.Col>
                <Grid.Col span={9}>
                    <Paper shadow="sm" p="md" radius="md" withBorder>
                        <Tabs defaultValue="overview">
                            <Tabs.List>
                                <Tabs.Tab value="overview" leftSection={<IconChartBar size={14} />}>
                                    Overview
                                </Tabs.Tab>
                                <Tabs.Tab value="chapters" leftSection={<IconBook size={14} />}>
                                    Chapters
                                </Tabs.Tab>
                                <Tabs.Tab value="settings" leftSection={<IconSettings size={14} />}>
                                    Settings
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="overview" pt="xs">
                                <OverviewTab />
                            </Tabs.Panel>

                            <Tabs.Panel value="chapters" pt="xs">
                                <ChaptersTab lng={lng} comicId={comicId} />
                            </Tabs.Panel>

                            <Tabs.Panel value="settings" pt="xs">
                                <SettingsTab lng={lng} comicId={comicId} />
                            </Tabs.Panel>
                        </Tabs>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
};
