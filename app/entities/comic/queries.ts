'use server';
import { getClient } from '@/app/shared/lib/apollo/client';

import { getComicMetaQuery, getComicQuery } from './graphql';

export async function getComic(id: string) {
    return await getClient().query({ query: getComicQuery, variables: { id } });
}

export async function getComicMeta(id: string) {
    return await getClient().query({ query: getComicMetaQuery, variables: { id } });
}
