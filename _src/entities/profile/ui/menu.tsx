'use client'
import { ActionIcon, Menu, rem, useMantineColorScheme } from "@mantine/core";
import { IconBookmarks, IconLogout, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    userIsAuthenticated?: boolean;
};

export const ProfileMenu = ({ children, userIsAuthenticated = false }: Props) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon size="xl" variant="transparent">
                    {children}
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={toggleColorScheme}>
                    {dark ? 'Light theme' : 'Dark theme'}
                </Menu.Item>
                {userIsAuthenticated && (
                    <>
                        <Menu.Item
                            href="/dashboard"
                            component={Link}
                            leftSection={
                                <IconSettings style={{ width: rem(14), height: rem(14) }} />
                            }
                        >
                            Dashboard
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            href="/profile"
                            component={Link}
                            leftSection={
                                <IconSettings style={{ width: rem(14), height: rem(14) }} />
                            }
                        >
                            Profile
                        </Menu.Item>
                    </>
                )}
                {userIsAuthenticated && (
                    <>
                        <Menu.Item
                            leftSection={
                                <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
                            }
                        >
                            Messages
                        </Menu.Item>
                        <Menu.Item
                            href="/library"
                            component={Link}
                            leftSection={
                                <IconBookmarks style={{ width: rem(14), height: rem(14) }} />
                            }
                        >
                            Library
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="red"
                            component={Link}
                            href="/api/auth/logout"
                            leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                        >
                            Log out
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};
