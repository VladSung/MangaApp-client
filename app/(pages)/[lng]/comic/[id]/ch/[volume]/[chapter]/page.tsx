import { useMutation } from '@apollo/client';
import { Affix, AppShellMain, Button, Container, rem, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import Image from 'next/image';

import { getComicQuery } from '@/app/entities/comic/graphql';
import { graphql } from '@/app/shared/api/graphql';
import { getComicChapters } from '@/app/shared/api/queries';
import { getClient } from '@/app/shared/lib/apollo/client';
import { NotFoundError } from '@/app/widgets/not-found';

import { AddHistory } from './addReadHistory';




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

const ChapterPage = async ({ params }: { params: { lng: string, id: string; chapter: string, volume: string } }) => {

    // const [scroll, scrollTo] = useWindowScroll();
    const { data } = await getClient().query({
        query: getChapterImagesQuery,
        variables: { comicId: params.id, volume: params.volume, number: params.chapter },
    });

    if (!data?.chapter) {
        return <AppShellMain><NotFoundError params={params} /></AppShellMain>
    }

    return (<AppShellMain>
        <Container>
            <AddHistory chapterId={data?.chapter?.id} params={params} />
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

export {generateMetadata} from './metadata';
