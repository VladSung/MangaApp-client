import { comicMetaQuery } from '@src/entities/comic';
import { getClient } from '@src/shared/lib/apollo/client';
import { Metadata } from 'next';

type Props = {
    params: Promise<{
        id: string;
        lng: string;
    }>;
};

const client = getClient();

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        id
    } = params;

    const { data } = await client.query({ query: comicMetaQuery, variables: { id } });

    const metadata = {
        title: data?.comic.one?.title || '404 Page not found',
        description: data.comic.one?.description,
        openGraph: {
            images: data?.comic.one?.cover,
            title: data?.comic.one?.title || '404 Page not found',
            description: data.comic.one?.description || undefined,
        },
    } satisfies Metadata;

    return metadata;
}

export { /* @next-codemod-error `ComicPage` export is re-exported. Check if this component uses `params` or `searchParams`*/
ComicPage as default } from '@src/pages/comic/[id]';
