'use client'
import { ActionIcon, Button, useMantineColorScheme } from '@mantine/core'
import Image from 'next/image';
import { Menu, rem } from '@mantine/core';
import {
    IconSettings,
    IconPhoto,
    IconMessageCircle,
    IconLogout,
    IconSun,
    IconMoonStars,
} from '@tabler/icons-react';

import Link from 'next/link';
import { Avatar as InnerAvatar } from '@/app/shared/ui/Avatar';

type Props = {
    avatar: string | null;
};

export const Avatar = ({ avatar }: Props) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Menu shadow="md" width={200} position='bottom-end'>
            <Menu.Target>
                <ActionIcon w={40} h={40} radius={99} style={{ overflow: 'hidden' }}>
                    <InnerAvatar size='md' src={avatar} alt='me' />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item component={Button}
                    onClick={() => toggleColorScheme()} leftSection={dark ? <IconSun color='yellow' size={14} /> : <IconMoonStars color='blue' size={14} />}>
                    Switch theme
                </Menu.Item>
                <Menu.Item href='/dashboard' component={Link} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Dashboard
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Settings
                </Menu.Item>
                <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                    Messages
                </Menu.Item>
                <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                    Library
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color="red"
                    component={Link}
                    href='/api/auth/logout'
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                    Log out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}