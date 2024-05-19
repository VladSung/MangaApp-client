'use client'
import { AppShellMain, Text, Box, Container, Loader, Title, Divider, Paper, Button, Flex } from '@mantine/core';

import { graphql } from '@src/shared/api/graphql';
import { ChapterImage } from './chapterImage';
import { useMutation } from '@apollo/client';
import { memo, startTransition, Suspense, useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react';
import { CommentList } from '@src/widgets/comment';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useIntersection } from '@mantine/hooks';
import { AspectRatio } from "@mantine/core";
import { useState } from "react";

const addReadingHistoryMutation = graphql(`
    mutation setReadingHistory($comicId:ID!, $chapterId:ID!){
        addReadingHistory(comicId:$comicId, chapterId:$chapterId){
            id
            chapter{
                id
            }
        }
    }
`)

const getChapterImagesQuery = graphql(`
    query getChapterImages($comicId:ID!, $paginate:ChapterPaginateInput){
        chapters(comicId:$comicId, paginate:$paginate){
          count  
            chapters{
              id
              title
              volume
              number
              images{
                  path
                  aspectRatio
              }
            }
        }
    }
`);

const usersReadHistoryFragment = graphql(`
    fragment _ on Chapter {
        usersReadHistory {
            id
        }
    }
`)

interface ChapterImageProps {
    path?: string | null;
    aspectRatio?: string | null;
}

interface ChapterProps {
    id: string;
    title?: string | null;
    volume: number;
    number: number;
    images?: ChapterImageProps[] | null;
}


const ChapterPage = ({ lng, id, chapter, volume }: { lng: string; id: string; chapter: string; volume: string }) => {

    const containerRef = useRef(null);

    const isFetching = useRef(false);

    const { data: { chapters: data }, fetchMore } = useSuspenseQuery(getChapterImagesQuery, {
        variables: {
            comicId: id,
            paginate: {
                cursor: {
                    number: parseInt(chapter),
                    volume: parseInt(volume),
                },
                take: 1,
            },
        },
    });

    const isLastChapter = (data?.count || 0) - (data?.chapters?.[data?.chapters?.length - 1].number || 0) < 1;

    const handleIntersection = () => {
        if (data?.count && data?.chapters?.length && !isFetching.current) {
            if (!isLastChapter) {
                const lastChapter = data?.chapters?.[data?.chapters?.length - 1];
                startTransition(() => {
                    isFetching.current = true;
                    fetchMore({
                        variables: {
                            comicId: id,
                            paginate: {
                                cursor: {
                                    number: lastChapter.number,
                                    volume: lastChapter.volume,
                                },
                                take: 1,
                                skip: 1,
                            },
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            const prevChapters = prev.chapters?.chapters || [];
                            const newChapters = fetchMoreResult.chapters?.chapters || [];

                            return {
                                chapters: {
                                    __typename: prev.chapters?.__typename,
                                    count: fetchMoreResult.chapters?.count || prev.chapters?.count,
                                    chapters: [...prevChapters, ...newChapters],
                                }
                            };
                        },
                    }).finally(() => isFetching.current = false);
                })
            }
        }
    }

    return (
        <Container ref={containerRef}>
            {data?.chapters?.map((chapter, index) => (
                <Chapter lng={lng} chapter={chapter} index={index} key={chapter.id} id={id} />
            ))}
            {isLastChapter
                ? <Paper mb='lg' withBorder p='md'>
                    <Text mb='lg' ta='center'>Конец глав</Text>
                </Paper>
                : <LoadMoreChapters handleIntersection={handleIntersection} />}
        </Container>
    );
};

const Chapter = ({ chapter, lng, index, id }: { lng: string, chapter: ChapterProps; index: number; id: string }) => {
    const { entry, ref } = useIntersection({
        threshold: 0,
    })
    const chapterPathname = (number: number | string) => `/${lng}/comic/${id}/ch/${chapter.volume}/${number}`;

    useEffect(() => {
        if (entry && entry.isIntersecting) {
            console.log(entry.isIntersecting)
            if (typeof window !== 'undefined' && entry.target instanceof HTMLElement) {
                if (window.location.pathname !== chapterPathname(chapter.number)) {
                    window.history.pushState(null, '', chapterPathname(chapter.number))
                }
            }
        }

    }, [entry?.isIntersecting, window.location.pathname])

    return <div key={chapter.id} ref={ref} style={{ marginBottom: '20px' }} data-chapter={chapter.number}>
        {index !== 0 && <Divider my="sm" />}
        <Title my='sm' ta="center" order={2}>{chapter.volume}-{chapter.number}. {chapter.title}</Title>
        {chapter?.images?.map((image, index) => (
            <div key={image.path} style={{ position: 'relative', aspectRatio: image.aspectRatio! }}>
                <ChapterImage index={index} path={image.path!} />
            </div>
        ))}
        <CommentList chapterId={chapter.id} comicId={id} />
    </div>
}

const LoadMoreChapters = ({ handleIntersection }: { handleIntersection: any }) => {


    const { entry, ref } = useIntersection({
        threshold: 1,
    })

    useEffect(() => {
        entry?.isIntersecting && handleIntersection()
    }, [entry?.isIntersecting])

    return (
        <Box py='md' ta='center' ref={ref} mb='sm'>
            <Loader />
        </Box>)
}

export default ({ params: { lng, id, chapter, volume } }: { params: { lng: string; id: string; chapter: string; volume: string } }) => {
    return <AppShellMain>
        <Suspense>
            <ChapterPage lng={lng} id={id} chapter={chapter} volume={volume} />
        </Suspense>
    </AppShellMain>
};
