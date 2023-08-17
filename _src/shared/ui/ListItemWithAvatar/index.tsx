import {
    ListItemAvatar,
    ListItemButton as MuiListItemButton,
    ListItemButtonProps,
    ListItemText,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Properties extends ListItemButtonProps {
    avatar: React.ReactNode;
    rightChildren?: React.ReactNode;
    href?: string;
}

export const ListItemWithAvatar = ({
    avatar,
    rightChildren,
    children,
    ...properties
}: Properties & ListItemButtonProps) => {
    return (
        <MuiListItemButton {...properties} LinkComponent={Link}>
            <ListItemAvatar>{avatar}</ListItemAvatar>
            <ListItemText>{children}</ListItemText>
            {rightChildren}
        </MuiListItemButton>
    );
};
