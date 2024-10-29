import { Box, Divider, Loader, Text, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { CommentsList } from '@src/widgets/comment';
import React, { useCallback, useEffect, useRef } from 'react';

import { ChapterImage } from './chapter-image';

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

export const Chapter = React.memo(
    ({
        chapter,
        lng,
        index,
        id,
    }: {
        lng: string;
        chapter: ChapterProps;
        index: number;
        id: string;
    }) => {
        const ref = useRef<HTMLDivElement>(null);
        const titleRef = useRef<HTMLHeadingElement>(null);
        const lastScrollTopRef = useRef(0);

        const chapterPathname = useCallback(
            (number: number | string) => `/${lng}/comic/${id}/ch/${chapter.volume}/${number}`,
            [lng, id, chapter.volume]
        );

        useEffect(() => {
            let rafId: number;

            const handleScroll = () => {
                rafId = requestAnimationFrame(() => {
                    if (titleRef.current && ref.current) {
                        const scrollTop = window.scrollY || document.documentElement.scrollTop;
                        const scrollDirection =
                            scrollTop > lastScrollTopRef.current ? 'down' : 'up';

                        lastScrollTopRef.current = scrollTop;

                        const titleRect = titleRef.current.getBoundingClientRect();
                        const chapterRect = ref.current.getBoundingClientRect();
                        const windowHeight = window.innerHeight;

                        const newPathname = chapterPathname(chapter.number);

                        if (window.location.pathname !== newPathname) {
                            if (
                                scrollDirection === 'down' &&
                                titleRect.top <= windowHeight / 3 &&
                                titleRect.top > 0
                            ) {
                                window.history.replaceState(null, '', newPathname);
                            } else if (
                                scrollDirection === 'up' &&
                                chapterRect.bottom >= (windowHeight * 2) / 3 &&
                                chapterRect.bottom < windowHeight
                            ) {
                                window.history.replaceState(null, '', newPathname);
                            }
                        }
                    }
                });
            };

            window.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                window.removeEventListener('scroll', handleScroll);
                cancelAnimationFrame(rafId);
            };
        }, [chapter.number, chapterPathname]);

        return (
            <div ref={ref} style={{ marginBottom: '20px' }} data-chapter={chapter.number}>
                {index !== 0 && <Divider my="sm" />}
                <Text mt="sm" c="dimmed" inline ta="center">
                    Глава:
                </Text>
                <Title ref={titleRef} mb="sm" ta="center" order={2}>
                    {chapter.volume}-{chapter.number}. {chapter.title}
                </Title>
                {chapter?.images?.map((image, index) => (
                    <div
                        key={image.path}
                        style={{ position: 'relative', aspectRatio: image.aspectRatio! }}
                    >
                        <ChapterImage index={index} path={image.path} />
                    </div>
                ))}
                <Box px="md">
                    <CommentsList chapterId={chapter.id} comicId={id} />
                </Box>
            </div>
        );
    }
);

export const LoadMoreChapters = React.memo(
    ({ handleIntersection }: { handleIntersection: () => void }) => {
        const { entry, ref } = useIntersection({
            threshold: 1,
        });

        useEffect(() => {
            if (entry?.isIntersecting) {
                handleIntersection();
            }
        }, [entry?.isIntersecting, handleIntersection]);

        return (
            <Box py="md" ta="center" ref={ref} mb="sm">
                <Loader />
            </Box>
        );
    }
);
