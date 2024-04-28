'use client'
import { AppShellMain, Container, Loader } from '@mantine/core';

// import { AddHistory } from '@src/features/read-history/add-read-history';
import { graphql } from '@src/shared/api/graphql';
import { NotFoundError } from '@src/widgets/not-found';
import { ChapterImage } from './chapterImage';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import { useLayoutEffect, useRef } from 'react';

const AddHistory = dynamic(() => import('@src/features/read-history/add-read-history').then(mod => mod.AddHistory), { ssr: false })

const getChapterImagesQuery = graphql(`
    query getChapterImages($comicId:ID, $volume: ID, $number: ID) {
        chapter(volume: $volume, number: $number, comicId:$comicId) {
            id
            images{
                path
                aspectRatio
            }
        }
    }
`);

const ChapterPage = ({ params }: { params: { lng: string, id: string; chapter: string, volume: string } }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { data, loading } = useQuery(getChapterImagesQuery, {
        variables: { comicId: params.id, volume: params.volume, number: params.chapter },
    });

    const currentImage = useRef(0)

    let options = {
        root: scrollRef.current,
        rootMargin: "0px",
        threshold: 0,
    };

    useLayoutEffect(() => {
        const scroll = scrollRef.current as HTMLDivElement;

        console.log('ccc', scroll)
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let elem = entry.target;
                    currentImage.current = elem.getAttribute('data-index') as unknown as number
                }
            });
        }, options);
        if (scroll?.childNodes) {
            console.log(scroll?.childNodes)
            Array.from(scroll.childNodes).forEach((child) => observer.observe(child as Element))

        }
        return () => {
            if (scroll) scroll.childNodes.forEach((child) => observer.unobserve(child as Element))
            observer.disconnect()
        }
    }, [data?.chapter])

    if (loading) return <Loader size='sm' />

    if (!data?.chapter) {
        return <AppShellMain><NotFoundError params={params} /></AppShellMain>
    }

    return (<AppShellMain>
        <Container p={0}>

            <AddHistory scroll={{ image: currentImage, all: data?.chapter?.images?.length }} chapterId={data?.chapter?.id} params={params} />
            <div data-chapter={data.chapter?.id} ref={scrollRef}>
                {data?.chapter?.images?.map((image, index) => (
                    <div data-index={index} key={image.path} style={{ position: 'relative', aspectRatio: `${image.aspectRatio}`, height: '100%' }}>
                        <ChapterImage index={index} path={image.path} />
                    </div>
                ))}
            </div>
        </Container>
    </AppShellMain>)
};

export default ChapterPage;
