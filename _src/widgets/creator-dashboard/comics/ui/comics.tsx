'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon, Flex, Group, Select, Stack, Text } from '@mantine/core';
import { ComicCard, ComicFilter,ComicGrid  } from '@src/entities/comic';
import { IconSortAscending } from '@tabler/icons-react';

import { userComicsQuery } from '../api';

export const Comics = () => {
    const { data, loading } = useQuery(userComicsQuery);

    const user = data?.user.me;

    const comics = [];

    if (loading) {
        return <></>;
    }

    if (!user?.membersOf?.edges?.length) {
        return <Text>Здесь пусто</Text>;
    }

    for (let i = 0; i < user.membersOf.edges.length; ++i) {
        const member = user.membersOf.edges[i].node;

        if (member.team?.comics?.edges) {
            comics.push(...member.team.comics.edges);
        }
    }

    if (comics.length === 0) {
        return <Text>Здесь пусто</Text>;
    }

    return (
        <Flex gap="xl">
            <Stack style={{ flexGrow: 1 }}>
                <Group>
                    <Select
                        size="xs"
                        defaultValue={'По изменению'}
                        data={['По изменению', 'По Названию', 'по Году', 'по Оценке', 'по Статусу']}
                    />
                    <ActionIcon variant="default">
                        <IconSortAscending size={16} />
                    </ActionIcon>
                </Group>

                <ComicGrid>
                    {comics.map(({ node: comic }) => (
                        <ComicCard
                            key={comic.id}
                            href={`/dashboard/comic/${comic.id}`}
                            data={{
                                title: comic.title,
                                id: comic.id,
                                // subtitle: (comic.alternativeTitles) || undefined,
                                // lastChange: (comic.updatedAt as Date).toLocaleString(),
                                cover: comic.cover,
                            }}
                        />
                    ))}
                </ComicGrid>
            </Stack>
            <ComicFilter genres={[]} tags={[]} loading={false} />
        </Flex>
    );
};
