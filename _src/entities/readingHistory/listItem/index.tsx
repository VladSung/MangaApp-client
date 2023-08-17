import { ListItemWithAvatar } from '@/_src/shared/ui/ListItemWithAvatar';
import { Avatar, Typography } from '@mui/material';
import Link from 'next/link';

type Properties = {
    link: string;
    cover: string;
    title: string;
    createdAt: Date;
    lastChapterRead: {
        volume: number;
        number: number;
        title: string;
    };
};

export const ListItem = ({ link, cover, title, createdAt, lastChapterRead }: Properties) => {
    return (
        <Link href={link}>
            <ListItemWithAvatar avatar={<Avatar src={cover} />}>
                <Typography>{title}</Typography>
                <Typography>
                    Глава {lastChapterRead.volume}-{lastChapterRead.number}. {lastChapterRead.title}
                </Typography>
                <Typography>{createdAt.getDate()}</Typography>
            </ListItemWithAvatar>
        </Link>
    );
};
