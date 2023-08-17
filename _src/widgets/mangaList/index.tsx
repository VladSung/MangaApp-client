import { useQuery } from '@apollo/client';

import { mangaListQuery } from './api';
import { List } from './ui';
import { MangaCardListQuery } from './ui/types';

export const MangaList = () => {
    const { data, loading } = useQuery<MangaCardListQuery['data']>(mangaListQuery);

    return <List data={data} loading={loading} />;
};
