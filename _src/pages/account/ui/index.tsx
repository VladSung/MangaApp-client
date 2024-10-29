import {
    AppShellMain,
    Button,
    Container,
    Divider,
    Group,
    NavLink,
    Text,
    Title,
} from '@mantine/core';
import { getClient } from '@src/shared/lib/apollo/client';
import { Avatar } from '@src/shared/ui';
import { IconBookmark, IconBrush, IconLock, IconNotification } from '@tabler/icons-react';
import Link from 'next/link';

import { userSettingQuery } from '../api';
import { ToggleTheme } from './toggle-theme';

export const AccountPage = async () => {
    const {
        data: { user },
    } = await getClient().query({ query: userSettingQuery, errorPolicy: 'all' });

    return (
        <AppShellMain>
            <Container>
                <Group align="center" pt="md" mb="md">
                    <Button
                        fullWidth
                        component={Link}
                        variant="default"
                        href="/profile"
                        mih={80}
                        justify="space-between"
                        rightSection={
                            <Text size="xs" inline c="dimmed">
                                Open profile
                            </Text>
                        }
                    >
                        <Avatar src={user?.me?.avatar} size="lg" />
                        <Text component="span" inline ml="sm" fw={500}>
                            {user?.me?.name}
                        </Text>
                    </Button>
                    <div>
                        <Group gap="md">
                            <Text size="sm" c="dimmed">
                                🟡120
                            </Text>
                            <Text size="sm" c="dimmed">
                                🎟️120
                            </Text>
                            <Button size="xs">Пополнить</Button>
                        </Group>
                    </div>
                </Group>

                <Divider mb="sm" />
                <Title order={4} component="p" mb="sm">
                    Settings
                </Title>
                <NavLink
                    active={false}
                    leftSection={<IconNotification size={18} />}
                    label="Notifications"
                />
                <NavLink
                    active={false}
                    leftSection={<IconBookmark size={18} />}
                    label="Hide genres/tags"
                />
                <ToggleTheme />
                <NavLink
                    active={false}
                    leftSection={<IconBrush size={18} />}
                    label="Custom theme"
                />
                <NavLink active={false} leftSection={<IconLock size={18} />} label="Security" />

                <Divider my="sm" />
                {user && (
                    <Button component={Link} href="/api/auth/logout" fullWidth size="sm">
                        Log out
                    </Button>
                )}
            </Container>
        </AppShellMain>
    );
};
