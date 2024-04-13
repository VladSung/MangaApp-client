import { AppShellMain, Container } from '@mantine/core';
import Image from 'next/image';

import { AddHistory } from '@/app/features/read-history/add-read-history';
import { graphql } from '@/app/shared/api/graphql';
import { getClient } from '@/app/shared/lib/apollo/client';
import { NotFoundError } from '@/app/widgets/not-found';




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
