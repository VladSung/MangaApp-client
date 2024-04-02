import { Text } from '@mantine/core';
import Link from 'next/link';

import { Avatar } from '@/app/shared/ui/Avatar';
import { ListItemWithAvatar } from '@/app/shared/ui/ListItemWithAvatar';

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
        <ListItemWithAvatar avatar={<Avatar src={cover} />} href={link}>
            <Text>{title}</Text>
            <Text>
                    Глава {lastChapterRead.volume}-{lastChapterRead.number}. {lastChapterRead.title}
            </Text>
            <Text>{createdAt.getDate()}</Text>
        </ListItemWithAvatar>
    );
};
