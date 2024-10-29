'use client';
import { useQuery, useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ActionIcon, ActionIconGroup, Button,Flex, Group, Select, Stack } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import {
    ComicCard,
    ComicCardSkeleton,
    ComicGrid,
    ComicListItem,
    ComicListItemSkeleton,
} from '@src/entities/comic';
import { comicFormSelectionsQuery } from '@src/entities/comic/api';
import { Filter, FilterContext, FilterInputs } from '@src/entities/comic/ui/filter';
import { ErrorComponent } from '@src/entities/error';
import { ComicsWithFiltersQuery } from '@src/shared/api';
import {
    IconLayoutGrid,
    IconLayoutList,
    IconSortAscending,
    IconSortDescending,
} from '@tabler/icons-react';
import { MutableRefObject, Suspense, useEffect, useRef, useState } from 'react';

import { comicsWithFiltersQuery } from '../api';

const limit = 25;

export const Comics = () => {
    const [useList, setUseList] = useState(false);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const cursor = useRef<string | null>(null);

    const { data: selectionsData, loading } = useQuery(comicFormSelectionsQuery);
    const { data, error, fetchMore, refetch } = useSuspenseQuery(comicsWithFiltersQuery, {
        errorPolicy: 'all',
        variables: {
            paginate: { first: limit, after: null },
        },
    });

    const [filter, setFilter] = useState<FilterInputs>({
        year: {
            min: null,
            max: null,
        },
        rating: {
            min: null,
            max: null,
        },
        genres: [],
        tags: [],
    });

    const setFilterHandler = (data: FilterInputs) => {
        setFilter(data);
    };

    const handleFetchMore = () => {
        fetchMore({
            variables: {
                paginate: { first: 25, after: cursor.current },
                filter: {
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
                    genres: filter.genres.length > 0 ? filter.genres : undefined,
                    tags: filter.tags.length > 0 ? filter.tags : undefined,
                },
            },
            updateQuery: (prev, { fetchMoreResult, variables }) => {
                cursor.current = fetchMoreResult?.comic.all?.pageInfo?.endCursor || null;

                const prevComics = prev?.comic.all.edges || [];
                const newComics = fetchMoreResult?.comic.all.edges || [];

                if (fetchMoreResult?.comic.all.edges) {
                    fetchMoreResult.comic.all.edges = [...prevComics, ...newComics];

                    return {
                        ...fetchMoreResult,
                    };
                }

                return fetchMoreResult;
            },
        });
    };

    const debouncedLoadComics = useDebouncedCallback(() => {
        refetch({
            paginate: { first: limit, after: null },
            filter: {
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
                genres: filter.genres.length > 0 ? filter.genres : undefined,
                tags: filter.tags.length > 0 ? filter.tags : undefined,
            },
        });
    }, 700);

    useEffect(() => {
        debouncedLoadComics();
    }, [filter]);

    return (
        <FilterContext.Provider value={{ filter, setFilter: setFilterHandler }}>
            <Flex gap="xl">
                <Stack style={{ flexGrow: 1 }}>
                    <Group>
                        <Select
                            size="xs"
                            defaultValue={'По изменению'}
                            data={[
                                'По изменению',
                                'По Названию',
                                'по Году',
                                'по Оценке',
                                'по Статусу',
                            ]}
                        />
                        <ActionIcon
                            variant="default"
                            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        >
                            {order === 'asc' ? (
                                <IconSortDescending size={16} />
                            ) : (
                                <IconSortAscending size={16} />
                            )}
                        </ActionIcon>
                        <ActionIconGroup ml="auto">
                            <ActionIcon
                                onClick={() => setUseList(!useList)}
                                variant={useList ? 'filled' : 'default'}
                            >
                                <IconLayoutList size={14} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => setUseList(!useList)}
                                variant={useList ? 'default' : 'filled'}
                            >
                                <IconLayoutGrid size={14} />
                            </ActionIcon>
                        </ActionIconGroup>
                    </Group>
                    <Suspense fallback={<ComicsSkeletonList useList={useList} />}>
                        {
                            <ComicsList
                                handleFetchMore={handleFetchMore}
                                cursorRef={cursor}
                                comics={data?.comic.all}
                                useList={useList}
                            />
                        }
                    </Suspense>
                </Stack>
                <Filter
                    loading={loading}
                    genres={selectionsData?.genre.all?.map((g) => g.title) || []}
                    tags={selectionsData?.tag.all?.map((t) => t.title) || []}
                />
            </Flex>
        </FilterContext.Provider>
    );
};

const ComicsSkeletonList = ({ useList }: { useList: boolean }) => {
    const arrayList = Array.from({ length: 24 });

    return (
        <>
            <ComicGrid>
                {!useList && arrayList.map((_, index) => <ComicCardSkeleton key={index} />)}
            </ComicGrid>
            <Stack>
                {useList && arrayList.map((_, index) => <ComicListItemSkeleton key={index} />)}
            </Stack>
        </>
    );
};

const ComicsList = ({
    comics,
    cursorRef,
    useList,
    handleFetchMore,
}: {
    handleFetchMore: () => void;
    comics?: ComicsWithFiltersQuery['comic']['all'];
    cursorRef: MutableRefObject<string | null>;
    useList: boolean;
}) => {
    if (!comics?.edges?.length) {
return <ErrorComponent message="Ничего не найдено" errorCode={'404'} />;
}

    cursorRef.current = comics.pageInfo.endCursor || null;

    return (
        <>
            <ComicGrid>
                {!useList &&
                    comics?.edges.map(
                        (edge) =>
                            edge?.node && (
                                <ComicCard
                                    key={edge.node.id}
                                    data={{
                                        title: edge.node.title,
                                        id: edge.node.id,
                                        // subtitle: (comic.alternativeTitles) || undefined,
                                        // lastChange: (comic.updatedAt as Date).toLocaleString(),
                                        cover: edge.node.cover,
                                    }}
                                />
                            )
                    )}
            </ComicGrid>
            <Stack>
                {useList &&
                    comics?.edges.map(
                        (edge) =>
                            edge?.node && (
                                <ComicListItem
                                    key={edge.node.id}
                                    data={{
                                        title: edge.node.title,
                                        id: edge.node.id,
                                        // subtitle: (comic.alternativeTitles) || undefined,
                                        // lastChange: (comic.updatedAt as Date).toLocaleString(),
                                        cover: edge.node.cover,
                                    }}
                                />
                            )
                    )}
            </Stack>
            {comics.pageInfo.hasNextPage && (
                <Button mx="auto" w="max-content" onClick={handleFetchMore}>
                    Load more
                </Button>
            )}
        </>
    );
};
