import { Avatar } from '@src/shared/ui/Avatar';
import { Text, Group, Divider, NavLink, Button, AppShellMain, Container, Title } from '@mantine/core';
import { IconNotification, IconBook, IconBookmark, IconBrush, IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { ToggleTheme } from './toggleTheme';
import { graphql } from '@src/shared/api/graphql';
import { getClient } from '@src/shared/lib/apollo/client';

const UserSettingQuery = graphql(`
    query UserSettingQuery {
        me{
            name
            avatar
            subscriptions{
                __typename
            }
        }
    }
`)

const AccountPage = async () => {
    const userData = await getClient().query({ query: UserSettingQuery, errorPolicy: 'all' });

    return (
        <AppShellMain>
            <Container>
                <Group align="center" pt='md' mb="md">
                    <Button
                        fullWidth
                        component={Link}
                        variant='default'
                        href='/profile'
                        mih={80}
                        justify='space-between'
                        rightSection={<Text size="xs" inline c="dimmed">Перейти в профиль</Text>}

                    >
                        <Avatar src={userData?.data?.me?.avatar} size="lg" />
                        <Text component='span' inline ml='sm' fw={500}>{userData?.data?.me?.name}</Text>
                    </Button>
                    <div>
                        <Group gap='md'>
                            <Text size="sm" c="dimmed">🟡120</Text>
                            <Text size="sm" c="dimmed">🎟️120</Text>
                            <Button size='xs'>Пополнить</Button>
                        </Group>
                    </div>
                </Group>

                <Divider mb='sm' />
                <Title order={4} component='p' mb='sm'>Настройки</Title>
                <NavLink active={false} leftSection={<IconNotification size={18} />} label="Уведомления" />
                <NavLink active={false} leftSection={<IconBook size={18} />} label={`Подписки (${userData?.data?.me?.subscriptions?.length || 0})`} />
                <NavLink active={false} leftSection={<IconBookmark size={18} />} label="Скрыть Жанры\Теги" />
                <ToggleTheme />
                <NavLink active={false} leftSection={<IconBrush size={18} />} label="Своя тема" />
                <NavLink active={false} leftSection={<IconLock size={18} />} label="Безопасность" />

                <Divider my="sm" />
                {userData?.data &&
                    <Button
                        component={Link}
                        href='/api/auth/logout'
                        fullWidth
                        size='sm'
                    >
                        Выйти
                    </Button>
                }
            </Container>
        </AppShellMain>
    );
}

export default AccountPage