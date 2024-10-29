'use client';
import { useQuery } from '@apollo/client';
import { Button, Group, Skeleton } from '@mantine/core';
import { ProfileMenu } from '@src/entities/profile';
import { Avatar } from '@src/shared/ui';
import { IconSettings } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

import { userAvatarQuery } from '../api';

export const UserMenu = () => {
    const { data, loading } = useQuery(userAvatarQuery);

    const pathname = usePathname();

    if (loading) {
        return <Skeleton radius="xl" />;
    }

    if (data?.user.me?.publicId) {
        return (
            <ProfileMenu userIsAuthenticated>
                <Avatar component="span" size="md" src={data?.user.me?.avatar} alt="" />
            </ProfileMenu>
        );
    }

    return (
        <Group gap="sm" justify="flex-end" mr={8}>
            <Button size="xs" href={`/api/auth/login?returnTo=${pathname}`} component="a">
                Sign In
            </Button>
            <ProfileMenu>
                <IconSettings size={16} />
            </ProfileMenu>
        </Group>
    );
};
