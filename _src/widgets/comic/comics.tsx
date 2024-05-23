'use client';
import { useQuery, useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon, Text, ActionIconGroup, Flex, Group, Select, Stack, Button } from '@mantine/core';
import { IconLayoutList, IconLayoutGrid, IconSortAscending, IconSortDescending } from '@tabler/icons-react';

import { Comic, ComicCard, ComicListItem } from '@src/entities/comic';
import { ComicsQuery, ComicWhereInput, Exact, graphql, InputMaybe, PaginateInput } from '@src/shared/api/graphql';

import { Filter, FilterContext, FilterInputs } from '@src/entities/comic/ui/filter';
import { Suspense, useEffect, useState } from 'react';
import { useDebounceCallback } from '@mantine/hooks';
import { InMemoryCache, QueryReference, useLoadableQuery } from '@apollo/client';
import { CardSkeleton } from '@src/entities/comic/ui/card';
import { SkeletonListItem } from '@src/entities/comic/ui/listItem';
import { Error } from '@src/entities/error';
import { getComicSelectionsQuery } from './queries';

const userComicsQuery = graphql(`
    query Comics($paginate: PaginateInput, $where:ComicWhereInput) {
        comics(paginate:$paginate, where:$where) {
            id
            cover
            title
            alternativeTitles
            updatedAt
        }
    }
`);

type QueryVars = Exact<{
    where?: InputMaybe<ComicWhereInput> | undefined;
    paginate?: InputMaybe<PaginateInput> | undefined;
}>

const limit = 25;

export const Comics = () => {
    const [useList, setUseList] = useState(false);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const [offset, setOffset] = useState(limit);

    const { data, loading } = useQuery(getComicSelectionsQuery)
    const [loadComics, queryRef, { fetchMore }] = useLoadableQuery(userComicsQuery, {
        errorPolicy: 'all'
    });

    const [filter, setFilter] = useState<FilterInputs>({
        year: {
            min: null,
            max: null
        },
        rating: {
            min: null,
            max: null
        },
        genres: [],
        tags: []
    })

    const setFilterHandler = (data: FilterInputs) => {
        setFilter(data)
    }

    const handleFetchMore = () => {
        fetchMore({
            variables: {
                paginate: { take: limit, skip: offset },
                where: {
                    searchText: filter.searchText,
                    status: filter.status || undefined,
                    maturityRating: filter.maturityRating || undefined,
                    // year: {
                    //     min: data.year.min,
                    //     max: data.year.max
                    // },
                    // rating: {
                    //     min: data.rating.min,
                    //     max: data.rating.max
                    // },
                    genres: filter.genres,
                    tags: filter.tags
                }
            },
            updateQuery: (prev, { fetchMoreResult, variables }) => {
                setOffset((variables.paginate?.skip || offset) + limit)

                const prevComics = prev?.comics || [];
                const newComics = fetchMoreResult?.comics || [];

                if (fetchMoreResult?.comics) fetchMoreResult.comics = [...prevComics, ...newComics];

                return {
                    ...fetchMoreResult
                }
            }
        })
    }

    const debouncedLoadComics = useDebounceCallback(() => {
        loadComics({
            paginate: { take: limit },
            where: {
                searchText: filter.searchText,
                status: filter.status || undefined,
                maturityRating: filter.maturityRating || undefined,
                // year: {
                //     min: data.year.min,
                //     max: data.year.max
                // },
                // rating: {
                //     min: data.rating.min,
                //     max: data.rating.max
                // },
                genres: filter.genres,
                tags: filter.tags
            }
        })
    }, 700)

    useEffect(() => {
        debouncedLoadComics()
    }, [filter])

    return (
        <FilterContext.Provider value={{ filter, setFilter: setFilterHandler }}>
            <Flex gap='xl'>
                <Stack style={{ flexGrow: 1 }}>
                    <Group>
                        <Select size='xs' defaultValue={'По изменению'} data={['По изменению', 'По Названию', 'по Году', 'по Оценке', 'по Статусу']} />
                        <ActionIcon variant='default' onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                            {order === 'asc' ? <IconSortDescending size={16} /> : <IconSortAscending size={16} />}
                        </ActionIcon>
                        <ActionIconGroup ml='auto'>
                            <ActionIcon onClick={() => setUseList(!useList)} variant={useList ? 'filled' : 'default'}><IconLayoutList size={14} /></ActionIcon>
                            <ActionIcon onClick={() => setUseList(!useList)} variant={!useList ? 'filled' : 'default'}><IconLayoutGrid size={14} /></ActionIcon>
                        </ActionIconGroup>
                    </Group>

                    <Suspense fallback={<ComicsSkeletonList useList={useList} />}>
                        {queryRef && <ComicsList queryRef={queryRef} useList={useList} />}
                    </Suspense>
                    <Button mx='auto' w='max-content' onClick={handleFetchMore}>Load more</Button>
                </Stack>
                <Filter loading={loading} genres={data?.genres?.map(g => g.title) || []} tags={data?.tags?.map(t => t.title) || []} />
            </Flex>
        </FilterContext.Provider>
    );
};

const ComicsSkeletonList = ({ useList }: { useList: boolean }) => {
    const arrayList = Array.from({ length: 24 })
    return (
        <>
            <Group align='stretch'>
                {!useList && arrayList.map((_, index) =>
                    <CardSkeleton key={index} />)}
            </Group>
            <Stack>
                {useList && arrayList.map((_, index) =>
                    <SkeletonListItem key={index} />)}
            </Stack>
        </>
    )
}

const ComicsList = ({ queryRef, useList }: {
    queryRef: QueryReference<ComicsQuery | undefined, QueryVars>, useList: boolean
}) => {
    const { data, error } = useReadQuery(queryRef);

    if (error) return <Error message={error.message} errorCode={error.name} />

    if (!data?.comics?.length) return <Error message='Ничего не найдено' errorCode={'404'} />
    return (
        <>
            <Group align='stretch'>
                {!useList && data?.comics?.map((comic) => (
                    comic && <ComicCard
                        key={comic.id}
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
            <Stack>
                {useList && data?.comics?.map((comic) => (
                    comic && <ComicListItem
                        key={comic.id}
                        data={{
                            title: comic.title,
                            id: comic.id,
                            // subtitle: (comic.alternativeTitles) || undefined,
                            // lastChange: (comic.updatedAt as Date).toLocaleString(),
                            cover: comic.cover,
                        }}
                    />
                ))}
            </Stack>
        </>
    )
}