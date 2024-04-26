import { AppShellMain, Container } from '@mantine/core';

import { AddHistory } from '@src/features/read-history/add-read-history';
import { graphql } from '@src/shared/api/graphql';
import { getClient } from '@src/shared/lib/apollo/client';
import { NotFoundError } from '@src/widgets/not-found';
import { ChapterImage } from './chapterImage';

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
        <Container p={0}>
            <AddHistory chapterId={data?.chapter?.id} params={params} />
            {data?.chapter?.images?.map((image, index) => (
                <div key={image.path} style={{ position: 'relative', aspectRatio: `${image.aspectRatio}`, height: '100%' }}>
                    <ChapterImage index={index} path={image.path} />
                </div>
            ))}
        </Container>
    </AppShellMain>)
};

export default ChapterPage;
