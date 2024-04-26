import { getClient } from '@src/shared/lib/apollo/client';
import { Metadata } from 'next';
import { getComicMetaQuery } from '@src/entities/comic/graphql';

type Props = {
    params: {
        id: string;
        lng: string;
    };
};

const client = getClient()
export async function generateMetadata({ params: { id } }: Props) {
    const { data } = await client.query({ query: getComicMetaQuery, variables: { id } })

    const metadata: Metadata = {
        title: data?.comic?.title || '404 Page not found',
        description: data.comic?.description,
        openGraph: {
            images: data?.comic?.cover
        }
    }

    return metadata;
}

export { default } from '@src/pages/[lng]/comic/[id]'