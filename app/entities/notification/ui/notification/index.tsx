import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';

type Notification = {
    title: string;
    description: string;
    href: string;
    img: string;
    createdAt: Date;
};

type Properties = {
    notification: Notification;
    loading: boolean;
};

export const Notification = ({ notification }: Properties) => {
    return (
        <ListItem href={notification.href} component={Link}>
            <ListItemAvatar>
                <Avatar variant="rounded" alt={notification.title} src={notification.img} />
            </ListItemAvatar>
            <ListItemText
                primary={notification.title}
                secondary={
                    <>
                        <Typography variant="subtitle1">{notification.description}</Typography>
                        <Typography variant="caption">
                            {notification.createdAt.toDateString()}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    );
};
