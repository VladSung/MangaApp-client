'use server';
import { comicMetaQuery } from '@src/entities/comic';
import { getClient } from '@src/shared/lib/apollo/client';

type Props = {
    params: {
        volume: string;
        chapter: string;
        id: string;
        lng: string;
    };
};

export async function generateMetadata({ params: { id, volume, chapter } }: Props) {
    const c = await getClient().query({ query: comicMetaQuery, variables: { id } });

    return {
        title: `Ch. ${volume}-${chapter} ${c?.data?.comic.one?.title}`,
    };
}
