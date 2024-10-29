import { Group, List, Text, Tooltip } from '@mantine/core';
import { Chapter } from '@src/shared/api/graphql';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

type ItemProps = {
    comicId: string | number;
    chapter: Partial<Chapter>;
    actions: ReactNode;
};

export const ChapterListItem = ({ chapter, actions, comicId }: ItemProps) => {
    return (
        <List.Item
            key={chapter?.id}
            styles={{
                itemWrapper: {
                    width: '100%',
                },
                itemLabel: {
                    width: '100%',
                },
            }}
        >
            <Group>
                <Text>
                    Vol. {chapter.volume} Ch. {chapter.number}
                    {chapter.title && (
                        <Text component="span" ml="xs" c="dimmed" size="sm">
                            {chapter.title}
                        </Text>
                    )}
                </Text>
                {chapter?.publishDate && (
                    <Tooltip label={dayjs(chapter.publishDate).format('YYYY-MM-DD HH:mm')}>
                        <Text size="xs" c="dimmed">
                            {dayjs().to(chapter.publishDate)}
                        </Text>
                    </Tooltip>
                )}
                <Group gap="sm" ml="auto">
                    {actions}
                </Group>
            </Group>
        </List.Item>
    );
};
