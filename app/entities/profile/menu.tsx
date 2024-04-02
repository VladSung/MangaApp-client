'use client'
import { ActionIcon, Button, Menu, rem, useMantineColorScheme } from "@mantine/core";
import { IconLogout,IconMessageCircle, IconMoonStars, IconPhoto, IconSettings, IconSun } from "@tabler/icons-react";
import Link from "next/link";

import { Avatar } from "@/app/shared/ui/Avatar";

export const ProfileMenu = ({ avatar }: { avatar?: string | null }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Menu shadow="md" width={200} position='bottom-end'>
            <Menu.Target>
                <ActionIcon style={{ flexGrow: 0 }} size='xl' variant='transparent'>
                    <Avatar component='span' size='md' src={avatar} alt='' />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => {
                        toggleColorScheme()
                    }} leftSection={dark ? <IconSun color='yellow' size={14} /> : <IconMoonStars color='blue' size={14} />}>
                    Switch theme
                </Menu.Item>
                <Menu.Divider />
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
