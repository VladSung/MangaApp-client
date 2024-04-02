'use server';
import { comicQuery } from '@/app/shared/api/queries';
import { getClient } from '@/app/shared/lib/apollo/client';

type Props = {
    params: {
        volume: string;
        chapter: string;
        id: string;
        lng: string;
    };
};

export async function generateMetadata({ params: { id, volume, chapter } }: Props) {
    const c = await getClient().query({ query: comicQuery, variables: { id } });

    return {
        title: `Ch. ${volume}-${chapter} ${c?.data?.comic?.title}`,
    };
}
