import {
    Avatar,
    Box,
    Button,
} from '@mantine/core';
import Link from 'next/link';

interface Properties {
    avatar: React.ReactNode;
    children: React.ReactNode;
    rightChildren?: React.ReactNode;
    href: string;
}

export const ListItemWithAvatar = ({
    avatar,
    rightChildren,
    children,
    href
}: Properties) => {
    return (
        <Button radius='sm' px={16} py={8} justify='flex-start' fullWidth variant='default' href={href} component={Link}>
            {avatar}
            <Box>{children}</Box>
            {rightChildren}
        </Button>
    );
};
