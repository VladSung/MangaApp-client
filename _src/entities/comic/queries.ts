'use server';
import { getClient } from '@src/shared/lib/apollo/client';

import { getComicMetaQuery } from './graphql';

export async function getComicMeta(id: string) {
    return await getClient().query({ query: getComicMetaQuery, variables: { id } });
}
