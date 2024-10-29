'use client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Paper, Text } from '@mantine/core';
import { startTransition, useRef } from 'react';

import { chapterImagesQuery } from '../api';
import { Chapter, LoadMoreChapters } from './chapter';

export const ChapterPageInner = ({
    lng,
    id,
    chapter,
    volume,
}: {
    lng: string;
    id: string;
    chapter: string;
    volume: string;
}) => {
    const containerRef = useRef(null);

    const isFetching = useRef(false);

    const {
        data: {
            chapter: { all: data },
        },
        fetchMore,
    } = useSuspenseQuery(chapterImagesQuery, {
        variables: {
            comicId: id,
            paginate: {
                after: {
                    volume: Number(volume),
                    number: Number(chapter),
                },
                first: 1,
            },
        },
    });

    const isLastChapter = !data.pageInfo.hasNextPage;

    const handleIntersection = () => {
        if (!isFetching.current && data.pageInfo.hasNextPage) {
            startTransition(() => {
                isFetching.current = true;

                fetchMore({
                    variables: {
                        comicId: id,
                        paginate: {
                            after: {
                                id: data.pageInfo.endCursor,
                            },
                            first: 1,
                        },
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                            return prev;
                        }

                        const prevChapters = prev.chapter.all?.edges || [];
                        const newChapters = fetchMoreResult.chapter.all?.edges || [];

                        fetchMoreResult.chapter.all.edges = [...prevChapters, ...newChapters];

                        return fetchMoreResult;
                    },
                }).finally(() => (isFetching.current = false));
            });
        }
    };

    return (
        <>
            {data?.edges?.map(
                (chapter, index) =>
                    chapter?.node && (
                        <Chapter
                            lng={lng}
                            chapter={chapter?.node}
                            index={index}
                            key={chapter?.node.id}
                            id={id}
                        />
                    )
            )}
            {isLastChapter ? (
                <Paper mb="lg" mx="md" withBorder p="md">
                    <Text mb="lg" ta="center">
                        Конец глав
                    </Text>
                </Paper>
            ) : (
                <LoadMoreChapters handleIntersection={handleIntersection} />
            )}
        </>
    );
};
