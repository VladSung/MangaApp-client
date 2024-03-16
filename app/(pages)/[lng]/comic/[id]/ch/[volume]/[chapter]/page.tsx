'use client';
import { AppShellMain, Container, Affix, Button, Transition, rem } from '@mantine/core';
import Image from 'next/image';
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { graphql } from '@/app/shared/api/graphql';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const getChapterImages = graphql(`
    query getChapterImages($volume: ID, $number: ID) {
        chapter(volume: $volume, number: $number) {
            images{
                path
                aspectRatio
            }
        }
    }
`);

const ChapterPage = ({ params }: { params: { chapter: string, volume: string } }) => {

    const [scroll, scrollTo] = useWindowScroll();

    const { data } = useQuery(getChapterImages, {
        variables: { volume: params.volume, number: params.chapter },
    });

    return (<AppShellMain>
        <Container>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
            {data?.chapter?.images?.map((image, index) => (
                <div key={image.path} style={{ position: 'relative', aspectRatio: `${image.aspectRatio}`, height: '100%' }}>
                    <Image
                        fill
                        priority={index === 0 || index === 1}
                        sizes='(max-width: 928px) 100vw, 928px'
                        quality={95}
                        src={image.path || ''}
                        alt={''}
                    />
                </div>
            ))}
        </Container>
    </AppShellMain>)
};

export default ChapterPage;
