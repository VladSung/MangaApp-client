'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon, Flex, Group, Select, SimpleGrid, Stack, Text } from '@mantine/core';

import { ComicCard, ComicListItem } from '@/app/entities/comic';
import { graphql } from '@/app/shared/api/graphql';
import { Filter } from './ComicFilter';
import { IconSortAscending } from '@tabler/icons-react';

const userComicsQuery = graphql(`
    query getUserComics {
        me {
            id
            member {
                id
                team {
                    id
                    name
                    comics {
                        id
                        cover
                        title
                        alternativeTitles
                        updatedAt
                    }
                }
            }
        }
    }
`);

export const Comics = () => {
    const { data, loading } = useQuery(userComicsQuery);

    const comics = [];

    if (loading) {
        return <></>;
    }

    if (!data?.me?.member) {
        return <Text>Здесь пусто</Text>;
    }

    for (let i = 0; i < data?.me?.member.length; ++i) {
        const member = data?.me?.member[i];

        if (member?.team?.comics) {
            comics.push(...member.team.comics);
        }
    }

    if (comics.length < 1) {
        return <Text>Здесь пусто</Text>;
    }

    return (
        <Flex gap='xl'>
            <Stack style={{ flexGrow: 1 }}>
                {/* <SimpleGrid
                    cols={{ base: 1, md: 2, lg: 3 }}
                    spacing={{ base: 'sm', sm: 'md' }}
                    verticalSpacing={{ base: 'sm', sm: 'md' }}
                > */}
                <Group>
                    <Select size='xs' defaultValue={'По изменению'} data={['По изменению', 'По Названию', 'по Году', 'по Оценке', 'по Статусу']} />
                    <ActionIcon variant='default'>
                        <IconSortAscending size={16} />
                    </ActionIcon>
                </Group>

                <Group gap='md' align='flex-start'>
                    {comics.map((comic) => (
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
                </Group>
                {/* </SimpleGrid> */}
            </Stack>
            <Filter onSubmitHandler={() => { }} />
        </Flex>
    );
};
