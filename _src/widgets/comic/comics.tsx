'use client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon, Flex, Group, Select, Stack, Text } from '@mantine/core';
import { IconSortAscending } from '@tabler/icons-react';

import { ComicCard } from '@src/entities/comic';
import { graphql } from '@src/shared/api/graphql';

import { Filter } from '@src/entities/comic/ui/filter';

const userComicsQuery = graphql(`
    query Comics {
        comics(paginate:{take: 50}) {
            id
            cover
            title
            alternativeTitles
            updatedAt
        }
    }
`);

export const Comics = () => {
    const { data, loading } = useQuery(userComicsQuery);

    if (loading) {
        return <></>;
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

                <Group gap='md' align='stretch'>
                    {data?.comics?.map((comic) => (
                        comic && <ComicCard
                            key={comic.id}
                            href={`/comic/${comic.id}`}
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
