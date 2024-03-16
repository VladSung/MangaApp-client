'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { comicListQuery } from './api';
import { List } from './ui';
import { ComicCardListQuery } from './ui/types';

export const ComicList = () => {
    const { data, loading } = useQuery<ComicCardListQuery['data']>(comicListQuery);

    return <List data={data} loading={loading} />;
};
