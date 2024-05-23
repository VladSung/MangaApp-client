'use client'
import {
    Grid,
    Paper,
    Text,
    SimpleGrid,
    Skeleton,
    Avatar,
    Group,
    Badge,
    GridCol,
    Button,
    Container,
} from '@mantine/core';
import Link from 'next/link';
import { IconBook, IconCalendar, IconUsers } from '@tabler/icons-react';
import { graphql } from '@src/shared/api/graphql';

const OverviewPageQuery = graphql(``)

const OverviewPage = () => {
    // const { data } = await getClient().query({
    //     query: OverviewPageQuery
    // })
    const data = {
        "avatar": "https://example.com/team-avatar.jpg",
        "name": "Vlad ?%#'s team",
        "bio": "Китайско-японская команда создателей комиксов. Добро пожаловать!",
        "followers": 1234,
        "works": 5,
        "lastUpdate": "2023-04-21",
        "members": 2
    }

    return (
        <Container size='xl' pt='lg'>
            <Grid gutter="md" >
                <GridCol span={4}>
                    <Paper withBorder p="md">
                        <Group justify="space-between" mb="md">
                            <Avatar src={data?.avatar} alt={data?.name} size="xl" radius="md" />
                            <Group gap="xs">
                                <Badge color="primary" variant="outline">
                                    Команда
                                </Badge>
                                <Badge color="teal" variant="outline">
                                    Подписчики: {data?.followers}
                                </Badge>
                            </Group>
                        </Group>
                        <Text size="lg" fw={500}>
                            {data?.name}
                        </Text>
                        <Text c="dimmed" size="sm">
                            {data?.bio}
                        </Text>
                        <Group mt="md" gap="xs">
                            <Button component={Link} href="/settings" variant="outline" color="gray" size="compact-md">
                                Настройки
                            </Button>
                            <Button component={Link} href="/logout" variant="outline" color="red" size="compact-md">
                                Выйти
                            </Button>
                        </Group>
                    </Paper>
                </GridCol>
                <GridCol span={8}>
                    <SimpleGrid cols={3}>
                        <Paper withBorder p="md">
                            <IconBook size={24} strokeWidth={2} color="gray" />
                            <Text size="sm" c="dimmed" fw={500}>
                                Произведения
                            </Text>
                            <Text size="xl" fw={700}>
                                {data?.works || <Skeleton height={28} />}
                            </Text>
                        </Paper>
                        <Paper withBorder p="md">
                            <IconCalendar size={24} strokeWidth={2} color="gray" />
                            <Text size="sm" c="dimmed" fw={500}>
                                Последнее обновление
                            </Text>
                            <Text size="xl" fw={700}>
                                {data?.lastUpdate || <Skeleton height={28} />}
                            </Text>
                        </Paper>
                        <Paper withBorder p="md">
                            <IconUsers size={24} strokeWidth={2} color="gray" />
                            <Text size="sm" c="dimmed" fw={500}>
                                Участники команды
                            </Text>
                            <Text size="xl" fw={700}>
                                {data?.members || <Skeleton height={28} />}
                            </Text>
                        </Paper>
                    </SimpleGrid>
                </GridCol>
            </Grid>
        </Container>
    );
};

export default OverviewPage;